const { connect } = require('../config/database');
const poolPromise = connect();


exports.addGap = async (req, res) => {
    try {
        const userId = req.user.id;  // Extracting userId from the request
        const { gap_duration, reason } = req.body;  // Extracting other details from the body
        const pool = await poolPromise;  // Awaiting connection to the pool

        // Executing the query and returning the new inserted id using SCOPE_IDENTITY()
        const result = await pool.request()
            .input('user_id', userId)
            .input('gap_duration', gap_duration)
            .input('reason', reason)
            .query(`
                INSERT INTO academic_gaps (user_id, gap_duration, reason)
                VALUES (@user_id, @gap_duration, @reason);
                SELECT SCOPE_IDENTITY() AS insertId;
            `);
        
        const insertId = result.recordset[0].insertId;  // Extracting the inserted ID

        // Sending response
        res.status(201).json({ id: insertId, userId, gap_duration, reason });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getGapById = async (req, res) => {
    try {
        const { gap_id } = req.params;  // Get gap_id from the request parameters
        const pool = await poolPromise;  // Await connection to the pool

        const result = await pool.request()
            .input('gap_id', gap_id)  // Use the correct variable 'gap_id'
            .query('SELECT * FROM academic_gaps WHERE gap_id = @gap_id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Gap not found' });  // Return 404 if no record is found
        }

        res.status(200).json(result.recordset[0]);  // Return the first result from the recordset
    } catch (err) {
        res.status(500).json({ error: err.message });  // Return error if something goes wrong
    }
};

exports.updateGapById = async (req, res) => {
    try {
        const { gap_id } = req.params;  // Extract gap id from request parameters
        const { gap_duration, reason } = req.body;  // Extracting other details from the body
        const pool = await poolPromise;  // Await connection to the pool

        // Execute the UPDATE query
        const result = await pool.request()
            .input('gap_id', gap_id)  // Bind the id parameter
            .input('reason', reason)  // Bind the name parameter
            .input('gap_duration', gap_duration)  // Bind the description parameter
            .query('UPDATE academic_gaps SET reason = @reason, gap_duration = @gap_duration WHERE gap_id = @gap_id');

        // Check if any rows were affected
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Gap not found' });  // Return 404 if no record is found
        }

        // Return the updated information
        res.status(200).json({ id, name, description });
    } catch (err) {
        res.status(500).json({ error: err.message });  // Return error if something goes wrong
    }
};

exports. deleteGapById = async (req, res) => {
    try {
        const { gap_id } = req.params;  // Extract the gap ID from request parameters
        const pool = await poolPromise;  // Await connection to the pool

        // Execute the DELETE query
        const result = await pool.request()
            .input('gap_id', gap_id)  // Bind the id parameter
            .query('DELETE FROM academic_gaps WHERE gap_id = @gap_id');

        // Check if any rows were affected
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Gap not found' });  // Return 404 if no record is found
        }

        // Return success message
        res.status(200).json({ message: 'Gap deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });  // Return error if something goes wrong
    }
};
 


exports.getAllGaps = async (req, res) => {
    try {
        const pool = await poolPromise;  // Await connection to the pool

        // Execute the SELECT query
        const result = await pool.request().query('SELECT * FROM academic_gaps');

        // Return the result
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });  // Return error if something goes wrong
    }
};                                                                                                                  