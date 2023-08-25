import { PatientType } from "../../types/appTypes";
import Patient from "./patient.mongo";

export async function getAllPatients(skip:number, limit:number, sort:{[key:string]:number}) {
  return await Patient.find({}, { __v: 0 }).skip(skip).limit(limit).sort(sort);
}

export async function getTotalPatient() {
  return await Patient.find({}).count();
}

export async function savePatient(patient:PatientType) {
  return await Patient.create(patient);
}

export async function isExistingPatient(patientId:string) {
  const existingUser = await Patient.findOne({
    _id: patientId,
  });

  return existingUser;
}

export async function updatePatient(patient:PatientType) {
  return await Patient.updateOne(
    {
      _id: patient.id,
    },
    patient
  );
}

export async function deletePatient(patientId:string) {
  return await Patient.deleteOne({
    _id: patientId,
  });
}

export async function searchPatient(searchKey:string) {
  return await Patient.find(
    {
      $or: [
        { firstName: { $regex: searchKey, $options: "i" } },
        { middleName: { $regex: searchKey, $options: "i" } },
        { lastName: { $regex: searchKey, $options: "i" } },
        { address: { $regex: searchKey, $options: "i" } },
        { contact_number: { $regex: searchKey, $options: "i" } },
        { email: { $regex: searchKey } },
      ],
    },
    {
      __v: 0,
    }
  );
}

export async function filterPatientByAge(minAge:number, maxAge:number) {
  return await Patient.find(
    {
      $and: [{ age: { $gte: minAge } }, { age: { $lt: maxAge } }],
    },
    {
      __v: 0,
    }
  );
}

export async function uploadFile(csvData:any){
  return await Patient.insertMany(csvData);
}
