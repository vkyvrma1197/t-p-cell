const express = require("express");
const router = express.Router();

const {
    getAllAplication,
    getAllInterviewSchedule
     
} = require("../controllers/Application");

 
router.get("/getAllAplication", getAllAplication);
router.get("/getAllInterviewSchedule", getAllInterviewSchedule);
 
 
module.exports = router;
  