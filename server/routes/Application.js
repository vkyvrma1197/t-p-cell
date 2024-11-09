const express = require("express");
const router = express.Router();

const {
    getAllAplication,
     
} = require("../controllers/Application");

 
router.get("/getAllAplication", getAllAplication);
 
 
module.exports = router;
  