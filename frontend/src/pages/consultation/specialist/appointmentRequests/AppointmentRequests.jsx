import React, { useEffect, useState } from 'react'
import './appointmentRequests.css'
import axios from 'axios';

function AppointmentRequests(props) {

  const  [appointments, setAppointments] = useState([]);
  const [specialist, setSpecialist] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState(null);

  useEffect(() => {
    setSpecialist(props.specialistID);
  }, [props.specialistID]);

  console.log("logged specialist: " + JSON.stringify(specialist));

  useEffect(() => {
    axios.get(`http://localhost:8070/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
      .then((res) => {
        console.log("Got data: ", res.data);
        // Sort appointments by date before setting state
        const sortedAppointments = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(sortedAppointments);
      })
      .catch((err) => {
        console.log('Error getting pending appointments', err);
      });
  }, []);
  



  const handleReject = (id) => {
    axios.put(`http://localhost:8070/consultAppointment/rejectAppointment/${id}`)
        .then((res) => {
            console.log("Request rejected successfully", res.data);

            
            axios.get(`http://localhost:8070/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
              .then((res) => {
                  console.log("Got data: ", res.data);
                  setAppointments(res.data);
              })
              .catch((err) => {
                  console.log('Error getting pending appointments', err);
              });
            
        })
        .catch((err) => {
            // Handle error, show error message, etc.
            console.error('Error rejecting appointment', err);
        });
  };



  const handleComplete = (id) => {
    axios.put(`http://localhost:8070/consultAppointment/completeAppointment/${id}`)
      .then((res) => {
        console.log("Appointment completed successfully", res.data);
        // Fetch appointments again to update the list
        axios.get(`http://localhost:8070/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
          .then((res) => {
              console.log("Got data: ", res.data);
                setAppointments(res.data);
          })
          .catch((err) => {
              console.log('Error getting pending appointments', err);
          });
      })
      .catch((err) => {
        console.error('Error completing appointment', err);
      });
  };



  const toggleExpandedDetails = (index) => {
    setExpandedAppointment(expandedAppointment === index ? null : index);
  };


  return (
    <div className="appointmentRequests-container">
      <h1>Upcoming Appointments</h1>
      <table className="appointmentRequests-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Time</th>
            <th>Center</th>
            <th>Patient Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((request, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleExpandedDetails(index)}>
                <td>{index + 1}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>{request.timeSlot}</td>
                <td>{request.centerName ? request.centerName : "Virtual Session"}</td>
                <td>{request.patientInfo.patientName}</td>
                
              </tr>
              {expandedAppointment === index && (
                <tr className="appointmentRequests-expanded-details active">
                  <td colSpan="5">
                    <div className="appointmentRequests-expanded-details-innerContainer">
                      <div className="appointmentRequests-expanded-details-innerContainer-left">
                        <p><strong>Date: </strong> {new Date(request.date).toLocaleDateString()}</p>
                        <p><strong>Time: </strong> {request.timeSlot}</p>
                        <p>{request.centerName ? request.centerName : "Virtual Session"}</p>
                        <p><strong>Appointment Amount:</strong> {request.appointmentAmount}</p>
                        <div className="appointmentRequest-specialist-actionButtons">
                            <button className="appointmentRequests-reject-btn" onClick={() => handleReject(request._id)}>Reject</button>
                            <button className="appointmentRequests-complete-btn" onClick={() => handleComplete(request._id)} >Complete</button>
                        </div>
                      </div>
                      <div className="appointmentRequests-expanded-details-innerContainer-right">
                        <h5>Patient Info:</h5>
                        <p><strong>Name:</strong> {request.patientInfo.patientName}</p>
                        <p><strong>Age:</strong> {request.patientInfo.patientAge}</p>
                        <p><strong>Gender:</strong> {request.patientInfo.patientGender}</p>
                        <p><strong>Phone:</strong> {request.patientInfo.patientPhone}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentRequests