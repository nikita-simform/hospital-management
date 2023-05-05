import React, { useEffect, useState } from "react";
import { apiService } from "../../sevices/apiService";
import { useParams } from "react-router-dom";

export default function patientDetails(props) {
  const [patientDetail, setPatientDetail] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      apiService.getPatientById(params.id).then((response) => {
        setPatientDetail(response.data);
      });
    }
  }, [params.id]);
  return (
    <div>
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
    </div>
  );
}
