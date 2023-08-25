import {
  getAllPatients,
  savePatient,
  isExistingPatient,
  updatePatient,
  deletePatient,
  getTotalPatient,
  searchPatient,
  filterPatientByAge,
  uploadFile,
} from "../../models/patient/patient.model";
import { validationResult } from "express-validator";
import { getPagination, getSorting } from "../../utils/query";
import { httpResponse, httpErrorResponse } from "../../utils/httpResponse";
import csv from "csvtojson";
import { Request, Response } from "express";
import { PaginationConfig, SortConfig } from "../../types/appTypes";

export async function httpGetAllPatients(req: Request, res: Response) {

  try {
    const { skip, limit } = getPagination(req.query as unknown as PaginationConfig);
    const sort = getSorting(req.query as unknown as SortConfig);

    return httpResponse(res, 200, '', {
      patients: await getAllPatients(skip, limit, sort),
      total: await getTotalPatient()
    })
  } catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function httpSavePatient(req: Request, res: Response) {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg }, null);
    }

    const patient = req.body;
    const result = await savePatient(patient);
    return httpResponse(res, 201, 'Patient created successfully', { result });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function httpUpdatePatient(req: Request, res: Response) {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg }, null);
    }

    const patient = req.body;
    if (!patient.id) {
      return httpResponse(res, 400, { error: 'Patient id is required' }, null);
    }
    const existingPatient = await isExistingPatient(patient.id);
    if (!existingPatient) {
      return httpResponse(res, 404, { error: 'Patient not found' }, null);
    }
    const result = await updatePatient(patient);
    return httpResponse(res, 200, 'Patient details updated successfully', { result });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function httpDeletePatient(req: Request, res: Response) {
  const patientId = req.params.id;

  try {
    const patient = await isExistingPatient(patientId);
    if (!patient) {
      return httpResponse(res, 404, { error: 'Patient not found' }, null);
    }

    const deletedPatient = await deletePatient(patientId);
    if (!deletedPatient) {
      return httpResponse(res, 400, { error: 'Problem deleting patient' }, null);
    }

    return httpResponse(res, 200, 'Patient deleted successfully', null);
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function httpFindPatientById(req: Request, res: Response) {
  const patientId = req.params.id;

  try {
    const patient = await isExistingPatient(patientId);
    if (!patient) {
      return httpResponse(res, 404, { error: 'Patient not found' }, null);
    }
    return httpResponse(res, 200, '', { result: patient });
  } catch (error) {
    return httpErrorResponse(res, error);
  }

}

export async function httpSearchPatient(req: Request, res: Response) {
  const searchKey = req.params.key;

  try {
    const patients = await searchPatient(searchKey);
    if (patients.length == 0) {
      return httpResponse(res, 200, 'No records found', null);
    }
    return httpResponse(res, 200, '', { result: patients });
  } catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function httpFilterPatientByAge(req: Request, res: Response) {
  const { minAge, maxAge } = req.query as any;

  try {
    if (!minAge || !maxAge) {
      return httpResponse(res, 400, { error: 'Please enter valid age' }, null);
    }

    if (minAge > maxAge) {
      return httpResponse(res, 400, { error: 'MinAge should not be greater than maxAge' }, null);
    }

    const patients = await filterPatientByAge(minAge, maxAge);
    if (patients.length == 0) {
      return httpResponse(res, 200, 'No records found', null);
    }
    return httpResponse(res, 200, '', { result: patients });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export function uploadCSV(req: Request, res: Response) {
  let { file } = req as any;
  if (!file.path) {
    return httpResponse(res, 200, 'No CSV file found', null);
  }
  csv()
    .fromFile(file.path)
    .then(async (response) => {
      try {
        await uploadFile(response);
        return httpResponse(res, 200, 'CSV file uploaded successfully', null);
      }
      catch (error) {
        return httpResponse(res, 400, { error: 'Error in uploading CSV file' }, null);
      }
    })
}
