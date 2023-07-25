import React, { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { Card } from "antd";

export default function PatientDetails() {
  const [patientDetail, setPatientDetail] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      apiService.getPatientById(params.id).then((response) => {
        setPatientDetail(response.data.data?.result);
      });
    }
  }, [params.id]);
  return (
    <Card className="card-container view-details">
      <h1 className="heading">Patient Details</h1>
      <p>
        Name:
        {patientDetail.firstName +
          " " +
          patientDetail.middleName +
          " " +
          patientDetail.lastName}
      </p>
      <p>Age: {patientDetail.age}</p>
      <p>Address: {patientDetail.address}</p>
      <p>Contact number: {patientDetail.contact_number}</p>
      <p>Email: {patientDetail.email}</p>
    </Card>
  );
}
