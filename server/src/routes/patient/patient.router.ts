import express from "express";
import {
  httpGetAllPatients,
  httpSavePatient,
  httpUpdatePatient,
  httpDeletePatient,
  httpFindPatientById,
  httpSearchPatient,
  httpFilterPatientByAge,
  uploadCSV,
} from "./patient.controller";
import { uploads } from "../../services/multer";
import { patientValidations } from "./patient.validations";
import { verifyToken } from "../../utils/accessToken";

const patientRouter = express.Router();                

patientRouter.post('/upload',verifyToken,uploads.single('csvFile'),uploadCSV);
patientRouter.get("/filter",verifyToken,httpFilterPatientByAge);
patientRouter.get("/all", verifyToken, httpGetAllPatients);
patientRouter.post("/add", verifyToken, patientValidations(), httpSavePatient);
patientRouter.put(
  "/update",
  verifyToken,
  patientValidations(),
  httpUpdatePatient
);
patientRouter.delete("/:id", verifyToken, httpDeletePatient);
patientRouter.get("/:id", verifyToken, httpFindPatientById);
patientRouter.get("/search/:key",verifyToken,httpSearchPatient);


export {patientRouter};
