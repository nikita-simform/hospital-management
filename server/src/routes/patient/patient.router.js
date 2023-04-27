const express = require("express");
const { verifyToken } = require("../login/login.controller");
const {
  httpGetAllPatients,
  httpSavePatient,
  httpUpdatePatient,
  httpDeletePatient,
  httpFindPatientById,
  httpSearchPatient,
  httpFilterPatientByAge,
  temp,
  uplaodCSV,
} = require("./patient.controller");
const { check } = require("express-validator");
const { uploads } = require("../../services/multer");

const patientRouter = express.Router();

const patientValidations = [
  check("firstName", "First name is required").notEmpty(),
  check("firstName", "First name should be atleast be 3 characters").isLength({
    min: 3,
  }),
  check("lastName", "Last name should be atleast be 3 characters").isLength({
    min: 3,
  }),
  check("age", "age is required").notEmpty(),
  check("age", "please add valid age").isNumeric(),
  check("contact_number", "contact number is required").notEmpty(),
  check("contact_number", "please add valid contact number").isNumeric(),
  check("contact_number", "contact number should be of 10 numbers").isLength({
    min: 10,
    max: 10,
  }),
  check("email", "Email should be valid").isEmail(),
];
patientRouter.post('/upload',verifyToken,uploads.single('csvFile'),uplaodCSV);
patientRouter.get("/filter",verifyToken,httpFilterPatientByAge);
patientRouter.get("/all", verifyToken, httpGetAllPatients);
patientRouter.post("/add", verifyToken, patientValidations, httpSavePatient);
patientRouter.put(
  "/update",
  verifyToken,
  patientValidations,
  httpUpdatePatient
);
patientRouter.delete("/:id", verifyToken, httpDeletePatient);
patientRouter.get("/:id", verifyToken, httpFindPatientById);
patientRouter.get("/search/:key",verifyToken,httpSearchPatient);


module.exports = patientRouter;
