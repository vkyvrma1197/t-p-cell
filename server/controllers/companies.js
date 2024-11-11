const { connect } = require('../config/database');


exports.getAllComapny = async (req, res) => {
    try {
        let connection = await connect();
        const [count] = await connection.execute('SELECT COUNT(*) AS count FROM companies');
        await connection.end();
        res.status(200).json({ success: true, count: count[0].count, message: 'Companies retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving companies', error: error.message });
    }

}



// Get all companies
exports.getAllComapnyDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        let connection = await connect();
        const query = 'select * from companies where coordinator_id=?';
        const [result] = await connection.execute(query, [userId]);
        await connection.end();
        res.status(200).json({ success: true, result: result, message: 'Companies Data retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving companies data', error: error.message });
    }

}   // Get all companies
// Get all companies
exports.addCompanyDetails = async (req, res) => {
    try {
        console.log("Hello from add company",req.body);
        
        const { company_name, industry, website, address, company_description } = req.body;
        const userId = req.user.id;
        if(!company_name || !industry || !website || !address || !company_description) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        let connection;
        
        try {
            connection = await connect();
            const query = `
                INSERT INTO companies 
                (company_name, industry, website, address, company_description, coordinator_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const values = [company_name, industry, website, address, company_description, userId];
            const [result] = await connection.execute(query, values); // Execute query and store result
            console.log('Company added successfully');
            
            res.status(200).json({ success: true, result: result[0], message: 'Company added successfully' });
        } catch (error) {
            console.error('Error inserting company:', error);
            res.status(500).json({ success: false, message: 'Error adding company', error: error.message });
        } finally {
            if (connection) {
                await connection.end(); // Properly close the connection
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unexpected error', error: error.message });
    }
};
