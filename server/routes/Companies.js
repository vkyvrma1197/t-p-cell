const express = require("express");
const router = express.Router();

const {
    getAllComapny,
    getAllComapnyDetails
    // AddCompany,
    // deleteCompany,
} = require("../controllers/companies");

const { isStudent, auth,isAdmin,isCordinator } = require("../middlewares/auth");

router.get("/getAllComapny", getAllComapny);
router.post("/getAllComapnyDetails",auth,isCordinator, getAllComapnyDetails);
 

module.exports = router;
  