const Patient = require("./patient.mongo");

async function getAllPatients(skip, limit,sort) {
  return await Patient.find({}, { __v: 0 }).skip(skip).limit(limit).sort(sort);
}

async function getTotalPatient(){
    return await Patient.find({}).count();
}

async function savePatient(patient) {
  return await Patient.create(patient);
}

async function isExistingPatient(patientId) {
  const existingUser = await Patient.findOne({
    _id: patientId,
  });

  return existingUser;
}

async function updatePatient(patient) {
  return await Patient.updateOne(
    {
      _id: patient.id,
    },
    patient
  );
}

async function deletePatient(patientId) {
  return await Patient.deleteOne({
    _id: patientId,
  });
}
module.exports = {
  getAllPatients,
  savePatient,
  isExistingPatient,
  updatePatient,
  deletePatient,
  getTotalPatient
};
