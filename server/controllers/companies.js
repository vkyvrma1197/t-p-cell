const { connect } = require('../config/database');


exports.getAllComapny = async (req, res) => {
    try {
        let connection = await connect();
        const [count] = await connection.execute('SELECT COUNT(*) AS count FROM companies');
        await connection.end();
        res.status(200).json({ success: true, count: count[0].count, message: 'Companies retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving companies', error:error.message });
    } 
    
}   



// Get all companies
exports.getAllComapnyDetails = async (req, res) => {
    try {
        const userId=req.user.id;
        let connection = await connect();
        const query = 'select * from companies where coordinator_id=?';
        const [result] = await connection.execute(query,[userId]);
        await connection.end();
        res.status(200).json({ success: true, result: result, message: 'Companies Data retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving companies data', error:error.message });
    } 
    
}   // Get all companies

