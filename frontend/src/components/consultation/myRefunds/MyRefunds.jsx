import React, { useContext, useEffect, useState } from 'react';
import './myRefunds.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function MyRefunds(props) {
    const [refunds, setRefunds] = useState([]);
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null); // State to hold appointment details
    const { user } = useContext(AuthContext); // get the customer ID from authentication context

    useEffect(() => {
        axios.get(`http://localhost:8070/refund/customerRefunds/${user._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setRefunds(res.data);
            })
            .catch((err) => {
                console.log('Error getting Refunds', err);
            });
    }, []);

    const fetchAppointmentDetails = async (appointmentId) => {
        try {
            const response = await axios.get(`http://localhost:8070/consultAppointment/getAppointment/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting appointment details:', error);
            return null;
        }
    };

    const handleViewAppointmentDetails = async (appointmentId) => {
        try {
            if (selectedAppointmentDetails && selectedAppointmentDetails._id === appointmentId) {
                // If the selected appointment details are already shown, hide them by resetting the state
                setSelectedAppointmentDetails(null);
            } else {
                // Otherwise, fetch and display the appointment details
                const appointmentDetails = await fetchAppointmentDetails(appointmentId);
                setSelectedAppointmentDetails(appointmentDetails);
            }
        } catch (error) {
            console.error('Error fetching appointment details:', error);
        }
    };

    return (
        <div className='refunds-allContents'>
            <h3 className='refunds-header'>My All Refunds</h3>
            <table className='refunds-table'>
                <thead className='refunds-thead'>
                    <tr>
                        <th>No.</th>
                        <th>Appointment</th>
                        <th>Refund Date</th>
                        <th>Refund Type</th>
                        <th>Refund Amount</th>
                        <th>Bank Account Details</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='refunds-tbody'>
                    {refunds.map((refund, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{refund.appointment}</td>
                                <td>{refund.refundDateTime}</td>
                                <td>{refund.refundType}</td>
                                <td>{refund.refundAmount}</td>
                                <td>{refund.bankAccountDetails}</td>
                                <td>{refund.refundStatus}</td>
                                <td>
                                    {refund.appointment && (
                                        <button onClick={() => handleViewAppointmentDetails(refund.appointment)}>
                                            {selectedAppointmentDetails && selectedAppointmentDetails._id === refund.appointment ? 'Hide Appointment Details' : 'View Appointment Details'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {selectedAppointmentDetails && refund.appointment === selectedAppointmentDetails._id && (
                                <tr>
                                    <td colSpan="7">
                                    <div className='refunds-appointment-details'>
                                        <div className="refunds-appointment-details-left">
                                          <p><strong>Center:</strong> {selectedAppointmentDetails.centerName}</p>
                                          <p><strong>Center Location:</strong> {selectedAppointmentDetails.centerLocation}</p>
                                          <p><strong>Type:</strong> {selectedAppointmentDetails.type}</p>
                                          <p><strong>Appointment Amount:</strong> {selectedAppointmentDetails.appointmentAmount}</p>
                                          <p><strong>Time Slot:</strong> {selectedAppointmentDetails.timeSlot}</p>
                                        
                                        </div>
                                        <div className="refunds-appointment-details-right">
                                        <h5>Patient Info:</h5>
                                            <p><strong>patientName:</strong> {selectedAppointmentDetails.patientInfo.patientName}</p>
                                            <p><strong>patientAge:</strong> {selectedAppointmentDetails.patientInfo.patientAge}</p>
                                            <p><strong>patientGender:</strong> {selectedAppointmentDetails.patientInfo.patientGender}</p>
                                            <p><strong>patientName:</strong> {selectedAppointmentDetails.patientInfo.patientPhone}</p>                          
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
    );
}

export default MyRefunds;
