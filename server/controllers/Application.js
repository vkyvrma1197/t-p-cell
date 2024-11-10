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


exports.getAllInterviewSchedule = async (req, res) => {
    const { application_id, interview_date, interview_time } = req.body;
    let connection;
    try {
        connection = await connect();
        const [results]=await connection.execute("SELECT ps.rounds,ps.date, c.company_name, us.name as SPOC ,js.job_title FROM placement_schedules AS ps  JOIN companies AS c ON ps.company_id = c.company_id JOIN users AS us ON us.user_id = ps.coordinator_id JOIN job_postings AS js ON js.company_id = ps.company_id;");
        res.status(200).json({ success: true, data:results,message: "FEtch all data success"});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error scheduling interview', error });
    }
}   // Schedule an interview