const { connect } = require('../config/database');
const poolPromise = connect();
// GET all job listings
exports.getAllJobListings = async (req, res) => {
    let connection;
    try {
        
        connection = await connect();
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [results] = await connection.execute('SELECT jp.*, us.* , c.*  FROM job_postings AS jp INNER JOIN users AS us ON jp.user_id = us.user_id INNER JOIN companies AS c ON jp.company_id = c.company_id WHERE us.user_id ');
        res.status(200).json({
            success: true,
            message: "Job listings retrieved successfully",
            data: results
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving job listings",
            error: err.message
        });
    }
};

// GET a specific job listing by ID
exports.getJobListingById = async (req, res) => {
    const jobId = req.params.id;
    let connection;
    try {
        connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [results] = await connection.execute('SELECT  jp.*, c.* FROM job_postings AS jp INNER JOIN companies AS c ON jp.company_id = c.company_id where jp.job_id=?', [jobId]);
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Job listing retrieved successfully",
            data: results[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving job listing",
            error: err.message
        });
    }
};



// POST a new job listing
exports.postJoblistings = async (req, res) => {
    // Destructure properties from req.body
    const user_id = req.user.id;
    const company_id = req.params;
    const {
        job_title,
        job_description,
        eligibility,
        salary,
        location,
        application_deadline,
        application_post_date
    } = req.body;

    try {
        const pool = await poolPromise;  // Use the pool connection
        const query = `
            INSERT INTO job_postings (
                        user_id,
                        job_title,
                        job_description,
                        eligibility,
                        salary,
                        location,
                        application_deadline,
                        application_post_date,
                        company_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            user_id,
            job_title,
            job_description,
            eligibility,
            salary,
            location,
            application_deadline,
            application_post_date,
            company_id
        ];
        const [result] = await pool.query(query, values);
        res.status(201).json({
            success: true,
            message: "Job listing created successfully",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error creating job listing",
            error: err.message
        });
    }
};


exports.updateJobListingById = async (req, res) => {
    const jobId = req.params.id;
    const updatedJobListing = req.body;

    // Construct the SET part of the query dynamically
    const setClause = Object.keys(updatedJobListing)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = [...Object.values(updatedJobListing), jobId]; // Append jobId at the end

    const query = `UPDATE job_postings SET ${setClause} WHERE job_id = ?`;

    try {
        const connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }

        const [result] = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job listing not found',
                updatedJobListing:result[0]
            });
        }

        res.status(200).json({
            success: true,
            message: "Job listing updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error updating job listing",
            error: err.message
        });
    }
};


// DELETE a job listing
exports.deleteJobListingById = async (req, res) => {
    const jobId = req.params.id;
    let connection;
    try {
        connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [result] = await connection.execute('DELETE FROM job_postings WHERE job_id = ?', [jobId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job Postings not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Job Postings deleted successfully",
            error: err.message
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error deleting job Postings",
            error: err.message
        });
    }
};




