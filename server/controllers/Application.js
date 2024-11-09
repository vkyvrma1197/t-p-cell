const { connect } = require('../config/database');


exports.getAllAplication= async (req, res) => {
    try {
        let connection = await connect();
        const [count] = await connection.execute('SELECT COUNT(*) AS count FROM applications');
        res.status(200).json({ success: true, count: count[0].count, message: 'Applications retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving applications', error:error.message });
    }
}   // Get all applications