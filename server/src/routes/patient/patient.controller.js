const {
  getAllPatients,
  savePatient,
  isExistingPatient,
  updatePatient,
  deletePatient,
  getTotalPatient,
} = require("../../models/patient/patient.model");
const { validationResult } = require("express-validator");
const { getPagination, getSorting } = require("../../services/query");

async function httpGetAllPatients(req, res) {
  const { skip, limit } = getPagination(req.query);
  const sort = getSorting(req.query);
  console.log("sort::,",sort)
  return res.status(200).json({
    patients: await getAllPatients(skip, limit, sort),
    total: await getTotalPatient(),
  });
}

async function httpSavePatient(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const patient = req.body;

  const result = await savePatient(patient);
  return res.status(201).json({
    message: "Patient created succesfully",
    patient: result,
  });
}

async function httpUpdatePatient(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const patient = req.body;

  if (!patient.id) {
    return res.status(400).json({
      error: "Patient id is required",
    });
  }

  const result = await updatePatient(patient);
  return res.status(200).json({
    message: "Patient details updated succesfully",
  });
}

async function httpDeletePatient(req, res) {
  const patientId = req.params.id;

  const patient = await isExistingPatient(patientId);
  if (!patient) {
    return res.status(404).json({
      error: "Patient not found",
    });
  }

  const deletedPatient = await deletePatient(patientId);
  if (!deletedPatient) {
    return res.status(400).json({
      error: "Patient not deleted",
    });
  }

  return res.status(200).json({
    message: "Patient deleted successfully",
  });
}

module.exports = {
  httpGetAllPatients,
  httpSavePatient,
  httpUpdatePatient,
  httpDeletePatient,
};
