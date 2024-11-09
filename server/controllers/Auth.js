const bcrypt = require('bcryptjs');
const otpGenerate = require("otp-generator")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const { otpMail } = require("../Mail/Template/Otpmail")
const { connect } = require('../config/database');
const { AccoutCreate } = require("../Mail/Template/AccountCreation")
const { accountLogin } = require("../Mail/Template/accountLogin")
const generateUniqueId = require("generate-unique-id")
// +++++++++++++++++++++++++++++++++++Send Otp FUnction+++++++++++++++++++++++++++++++
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email);

    let connection;

    try {
        connection = await connect();
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }

        // Check if the email is already registered
        // Destructuring: The result of the query is an array where the first element contains the query result.
        // Here, userRows will be an object like { count: 2 }, indicating that there are 2 rows with the email 'john@example.com'.
        const [userRows] = await connection.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        console.log("User Rows: ", userRows);

        if (userRows[0].count > 0) {
            await connection.end();
            return res.status(200).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // Generate and ensure OTP uniqueness
        let otp;
        let otpRows;
        do {
            otp = otpGenerate.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            [otpRows] = await connection.query('SELECT COUNT(*) AS count FROM otp_table WHERE otp = ?', [otp]);
        } while (otpRows[0].count > 0);
        console.log("OTP:", otp);
        // Store OTP in the database
        const otps = await connection.query('INSERT INTO otp_table (email_id, otp) VALUES (?, ?)', [email, otp]);
        console.log("Otp Request from Backend", otps);


        // Close the connection
        await connection.end();

        // Sending email with OTP
        try {
            const mailResponse = await mailSender(email, "Verification OTP from TP Cell Manit", otpMail(otp));
            console.log("Email sent successfully:", mailResponse);
        } catch (error) {
            console.log("Error occurred while sending the email:", error);
        }

        res.status(200).json({
            success: true,
            message: "OTP Generated Successfully",
            otp
        });
    } catch (error) {
        console.error("Error generating OTP:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while generating OTP.",
            error: error.message
        });
    } finally {
        if (connection) {
            connection.end(); // Ensure the connection is closed
        }
    }
};






// Sign Up function for student
exports.signup = async (req, res) => {
    try {
        const {
            user_id,
            first_name,
            last_name,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        if (!first_name || !last_name || !email || !password || !confirmPassword || !accountType || !otp || !user_id) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords must be the same, please try again"
            });
        }

        const connection = await connect();

        // Check if the user already exists
        const [existingUserRows] = await connection.execute('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        // console.log(existingUserRows[0].count);

        if (existingUserRows[0].count > 0) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        // Validate OTP
        const [recentOtpRows] = await connection.execute('SELECT otp FROM otp_table WHERE email_id = ? ORDER BY created_at DESC LIMIT 1', [email]);
        console.log("Recent OTP rows:", recentOtpRows.length);
       
        if (recentOtpRows.length === 0 || otp != recentOtpRows[0].otp) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        await connection.execute('INSERT INTO users (user_id,name, email, password, accountType, photo_url) VALUES (?, ?, ?, ?, ?, ?)', [user_id,first_name+" "+last_name,  email, hashedPassword, accountType, `https://api.dicebear.com/5.x/initials/svg?seed=${first_name} ${last_name}`]);

        const [allDetails] = await connection.execute('SELECT *  FROM users WHERE email = ?', [email])
        // Sending email with OTP
        try {
            const mailResponse = await mailSender(email, "You're In! Welcome to Manit", AccoutCreate(first_name));
            console.log("Email sent successfully:", mailResponse);
        } catch (error) {
            console.log("Error occurred while sending the email:", error);
        }
        await connection.end();

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            student_Details: allDetails[0]
        });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later",
            error: error.message
        });
    }
};

 

// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received email:",email, password);
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const connection = await connect();

        // Check if the user exists
        const [userRows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            await connection.end();
            return res.status(401).json({
                success: false,
                message: "User not registered. Please sign up first."
            });
        }

        const user = userRows[0];
        console.log("User:", user);
        
        // Check if the password matches
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user.user_id,
                accountType: user.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            // Create cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            await mailSender(user.s_email, "Login activity", accountLogin(user.s_firstName, user.s_email));

            await connection.end();

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        } else {
            await connection.end();
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.changePassword = async (req, res) => {
    let connection;
    try {
        // Fetch Data
        console.log("Hety")
        console.log(req.body)
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user
       

        // Validate the input
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords must be the same, please try again"
            });
        }

        // Connect to the database
        connection = await connect();

        // Get user detail for verification
        const [userRows] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
        if (userRows.length === 0) {
            await connection.end();
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];

        // Check if the old password matches
        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        if (!checkPassword) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: "Old password does not match"
            });
        }

        // Hash the new password
        const finalPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        await connection.execute('UPDATE users SET password = ? WHERE user_id = ?', [finalPassword, userId]);

        // Close the connection
        await connection.end();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.log("Error in changePassword",error)    ;
        if (connection) await connection.end(); // Ensure connection is closed
        return res.status(500).json({
            success: false,
            message: "An error occurred while changing the password",
            error: error.message
        });
    }
};



exports.getAllUser = async (req, res) => {
    let connection;
    try {
        // Fetch Data
         
       

      

        // Connect to the database
        connection = await connect();

        // Get user detail for verification
        const [userRows] = await connection.execute('SELECT COUNT(*) AS count FROM users');
        if (userRows.length === 0) {
            await connection.end();
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];

        // Close the connection
        await connection.end();

        return res.status(200).json({
            success: true,
            message: "Useer COutn Successfully",
            count:user.count
        });
    } catch (error) {
        console.log("Error in get user",error)    ;
        if (connection) await connection.end(); // Ensure connection is closed
        return res.status(500).json({
            success: false,
            message: "An error occurred while get the user",
            error: error.message
        });
    }
};

