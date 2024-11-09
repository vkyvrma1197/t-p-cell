const express = require("express");
const router = express.Router();

const {
    getAllComapny,
    // AddCompany,
    // deleteCompany,
} = require("../controllers/companies");

const { isStudent, auth } = require("../middlewares/auth");

router.get("/getAllComapny", getAllComapny);
 
 
module.exports = router;
  