const { connect } = require('../config/database');

// Apply for a job
// Apply for a job
const applyJob = async (req, res) => {
    const student_id = req.user.id;
    console.log("student_id", student_id);

    const { job_id } = req.body;
    let connection;
    try {
        connection = await connect();
        const [rows] = await connection.execute('SELECT * FROM applications WHERE job_id = ? ', [job_id]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: 'You have already applied for this job' });
        }
        const result = await connection.execute('INSERT INTO applications (job_id, student_id) VALUES (?, ?)',
            [job_id, student_id]  // Removed the extra comma here
        );
        await connection.end();
        res.status(201).json({ success: true, message: 'Application submitted successfully', applicationId: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error applying for job', error });
    }
};

// Delete an application by ID
const deleteApplyJobById = async (req, res) => {
    let db;
    const { application_id } = req.body;
    try {
        db = await connect();
        await db.execute('DELETE FROM applications WHERE application_id = ?', [application_id]);
        await db.end()
        res.status(200).json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting application', error });
    }
};

// Get all applications
const getAllApplyJobs = async (req, res) => {
    
    try {
        let connection = await connect();
        const student_id = req.user.id;
        const [rows] = await connection.execute('SELECT ap.application_id,ap.student_id, jp.*, c.* FROM applications AS ap INNER JOIN job_postings AS jp ON ap.job_id = jp.job_id INNER JOIN companies AS c ON jp.company_id = c.company_id where ap.student_id=?', [student_id]);
        await connection.end();
        res.status(200).json({ success: true, rows: rows, message: 'Applications retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving applications', error });
    } 
};

module.exports = {
    applyJob,
    deleteApplyJobById,
    getAllApplyJobs
};