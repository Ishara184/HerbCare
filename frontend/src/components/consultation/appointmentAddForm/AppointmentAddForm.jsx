import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../../context/AuthContext';
import './appointmentAddForm.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function AppointmentAddForm(props) {

  const [date, setDate] = useState("");
  const [center, setCenter] = useState(null);
  const [centerInfo, setCenterInfo] = useState(null);
  const [type, setType] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilitiesForSelectedDate, setAvailabilitiesForSelectedDate] = useState([]);
  const navigator = useNavigate();
  const { user } = useContext(AuthContext); // get the customer ID from authentication context
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false); // State to control visibility of time slots
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientPhone: "",
  });

  useEffect(() => {
    if (props.selectedSpecialist) {
      fetchAvailabilities();
    }
  }, [props.selectedSpecialist]);

  useEffect(() => {
    // Reset date state to null when props.selectedSpecialist changes
    setDate(null);
  }, [props.selectedSpecialist]);
  
  useEffect(() => {
    if (date && props.selectedSpecialist) {
      fetchAvailabilities();
    }
  }, [date, props.selectedSpecialist]);

  useEffect(() => {
    if (date && props.selectedSpecialist && showTimeSlots) { // Fetch availabilities only if showTimeSlots is true
      fetchAvailabilitiesForSelectedDate();
    }
  }, [date, props.selectedSpecialist, showTimeSlots]);

  useEffect(() => {
    setSelectedTimeSlot(null); // Reset selected time slot when date changes
  }, [date]);
  
  
  useEffect(() => {
    // Check if there are availabilities for the selected date
    if (availabilitiesForSelectedDate.length > 0) {
      // Update startTime and endTime based on the first availability
      setStartTime(availabilitiesForSelectedDate[0].startTime);
      setEndTime(availabilitiesForSelectedDate[0].endTime);
    }
  }, [availabilitiesForSelectedDate]); // Run this effect whenever availabilitiesForSelectedDate changes
  



  useEffect(() => {
    // Function to generate time slots
    const generateTimeSlots = () => {
      const slots = [];
      // Split time strings into hours and minutes
      const startTimeParts = startTime.split(':');
      const endTimeParts = endTime.split(':');
      
      // Create Date objects with current date and parsed hours and minutes
      let currentTime = new Date();
      currentTime.setHours(parseInt(startTimeParts[0], 10));
      currentTime.setMinutes(parseInt(startTimeParts[1], 10));
  
      const endTimeDate = new Date();
      endTimeDate.setHours(parseInt(endTimeParts[0], 10));
      endTimeDate.setMinutes(parseInt(endTimeParts[1], 10));
  
      // Loop until currentTime reaches endTime
      while (currentTime < endTimeDate) {
        const slot = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
        slots.push(slot);
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by 30 minutes
      }
      return slots;
    };
  
    // Update time slots whenever startTime or endTime changes
    const updatedTimeSlots = generateTimeSlots();
    setTimeSlots(updatedTimeSlots);
  }, [startTime, endTime]);
  
  

  useEffect(() => {
    const fetchCenterInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/center/${center}`);
        setCenterInfo(response.data);
      } catch (error) {
        console.error("Error fetching center information:", error);
      }
    };

    if (type !== "virtual" && center) {
      fetchCenterInfo();
    } else {
      setCenterInfo(null); // Reset centerInfo when conditions are not met
    }
  }, [type, center, showTimeSlots])


  
  

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/availability/getAvailabilities/${props.selectedSpecialist._id}`);
      setAvailabilities(response.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };


  const fetchAvailabilitiesForSelectedDate = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/availability/getAvailabilitiesByDateAndSpecialist?date=${date}&specialistId=${props.selectedSpecialist._id}`);
      setAvailabilitiesForSelectedDate(response.data);

    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };



  const handleDateChange = async  (selectedDate) => {
    try {
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(adjustedDate.getHours() + 5);
      adjustedDate.setMinutes(adjustedDate.getMinutes() + 30);
    
      const utcDate = adjustedDate.toISOString();
      setDate(utcDate);

      // Reset showTimeSlots to false when the date changes
      setShowTimeSlots(false);

      const availabilityForDate = availabilities.find(availability => {
        const availabilityDate = new Date(availability.date);
        return (
          availabilityDate.getDate() === adjustedDate.getDate() &&
          availabilityDate.getMonth() === adjustedDate.getMonth() &&
          availabilityDate.getFullYear() === adjustedDate.getFullYear()
        );
      });
    
      if (availabilityForDate) {
        setType(availabilityForDate.type);
        setCenter(availabilityForDate.center);
      } else {
        setType("");
        setCenter(null);
      }

    } catch (error) {
      console.error("Error handling date change:", error);
    }
    
  };


  
    const handleShowTimeSlots = () => {
      setShowTimeSlots(true); // Set showTimeSlots to true to trigger fetching of availabilities
    };
    



  
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    
    // If the selected type is virtual, set the center state to null
    if (selectedType === "virtual") {
      setCenter(null);
    }
  };




  const handlePatientInfoChange = (e) => {
    const { id, value } = e.target;
    setPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      [id]: value,
    }));
  };



  const handlePatientGenderChange = (e) => {
    setPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      patientGender: e.target.value,
    }));
  };





  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot((prevSlot) => (prevSlot === slot ? null : slot));
  };
  




  

  const isDateDisabled = ({ date }) => {
    // Check if the date is disabled based on availability
    return !availabilities.some(availability => {
      const availabilityDate = new Date(availability.date);
      return date.getDate() === availabilityDate.getDate() &&
             date.getMonth() === availabilityDate.getMonth() &&
             date.getFullYear() === availabilityDate.getFullYear();
    });
  };



  const isTimeSlotBooked = (slot) => {
    // Check if the selected time slot matches any of the booked time slots
    return availabilitiesForSelectedDate.some(availability => {
      return availability.bookedTimeSlots.includes(slot);
    });
  };
  
  

  const submit = (e) => {
    e.preventDefault();

    if (!props.selectedSpecialist) {
      console.error("Selected specialist is null");
      return;
    }
    else if (!user){
      console.error("Selected patient is null");
      return;
    }
    else if (!date) {
      console.error("Selected date is null");
      return;
    }
    else if (!type) {
      console.error("Selected type is null");
      return;
    }
    else if (type == "physical" && !center) {
      console.error("Selected center is null");
      return;
    }

    if (!selectedTimeSlot) {
      console.error("No time slot selected");
      return;
    }

    const newAppointment = {
      date: date,
      specialist: props.selectedSpecialist._id,
      specialistName: props.selectedSpecialist.specialistName,
      patient: user,
      center: center,
      centerName: centerInfo ? centerInfo.name : null,
      centerLocation: centerInfo ? centerInfo.location : null,
      type: type,
      appointmentAmount: props.selectedSpecialist.consultationFee,
      timeSlot: selectedTimeSlot,
      availabilityId: availabilitiesForSelectedDate[0]._id,
      patientInfo: patientInfo
    }
    console.log("new appointment is",  newAppointment);
    axios.post('http://localhost:8070/consultAppointment/add', newAppointment).then((res)=>{
      navigator('../myConsultations/myOngoingConsultations');
    }).catch((err)=>{
      console.error(err);
    })
  };


  console.log("center location ", centerInfo ? centerInfo.location : null,);


  return (
    <div className='AppointmentAddForm-container'>
        <form className="AppointmentAddForm-form" onSubmit={submit}>
          {props.selectedSpecialist && (

            <>

              <div className="AppointmentAddForm-specialistCard">
                  <img src="https://www.shutterstock.com/image-vector/vector-medical-icon-doctor-image-600nw-1170228883.jpg" alt="SampleSpecialistImage" className="AppointmentAddForm-specialistImg" />
                  <div className="AppointmentAddForm-specialistInfo">
                      <div className="AppointmentAddForm-specialistName">{ props.selectedSpecialist.specialistName }</div>
                      <div className="AppointmentAddForm-specialistDetail">{ props.selectedSpecialist.speciality }</div>
                      <div className="AppointmentAddForm-specialistRating">
                          { props.selectedSpecialist.rating }/5
                      </div>
                      <div className="AppointmentAddForm-specialistDetail">Consultation fee : Rs.{ props.selectedSpecialist.consultationFee }</div>
                  </div>
              </div>

              

              <div className="AppointmentAddForm-calendarAndPatientInfo">

                <div className="AppointmentAddForm-date">
                  <label htmlFor="date" className="form-label">Select a Date</label>
                  <div className="AppointmentAddForm-date-cal">
                    <Calendar onChange={handleDateChange} value={date} tileDisabled={isDateDisabled} />
                  </div>
                  <button type="button" onClick={handleShowTimeSlots}>Search Available Time Slots</button> 
                </div>


                <div className="AppointmentAddForm-customerInfo">
                  <h4>Patient Info</h4>
                  <div className="AppointmentAddForm-patientName">
                    <label htmlFor="patientName" className="form-label">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientName"
                      value={patientInfo.patientName}
                      onChange={handlePatientInfoChange}
                    />
                  </div>
                  <div className="AppointmentAddForm-patientPhone">
                    <label htmlFor="patientPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientPhone"
                      value={patientInfo.patientPhone}
                      onChange={handlePatientInfoChange}
                    />
                  </div>
                  <div className="AppointmentAddForm-patientAge">
                    <label htmlFor="patientAge" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientAge"
                      value={patientInfo.patientAge}
                      onChange={handlePatientInfoChange}
                    />
                  </div>
                  <div className="AppointmentAddForm-patientGender">
                    <label className="form-label">Gender</label>
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={patientInfo.patientGender === 'male'}
                        onChange={handlePatientGenderChange}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={patientInfo.patientGender === 'female'}
                        onChange={handlePatientGenderChange}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>

                </div>

              </div>



                {date && (
                  <>
                
              <div className="AppointmentAddForm-sessionInfo">

                    <div>
                      {type !== "virtual" && (
                        <>
                          <span>Physical</span><br/>
                        </>
                      )}
                      {type !== "physical" && (
                        <>
                          <span>Virtual</span><br/>
                        </>
                      )}
                    </div>

                    {type !== "virtual" && centerInfo && (
                      <div className="AppointmentAddForm-centerInfo">
                        <span>Center Name: {centerInfo ? centerInfo.name : 'Loading...'}</span><br />
                        <span>Location: {centerInfo ? centerInfo.location : 'Loading...'}</span>
                      </div>
                    )}
                  
                  

                  


                  {showTimeSlots && availabilitiesForSelectedDate.length > 0 && (
                    <div className="AppointmentAddForm-doctorSession">
                      <span>Session time: {availabilitiesForSelectedDate[0].startTime} - {availabilitiesForSelectedDate[0].endTime}</span>
                    </div>
                  )}


                  {/* Time slots */}
                  {showTimeSlots && timeSlots.length > 0 && (
                    <div className="AppointmentAddForm-timeSlots">
                    <h4>Available Time Slots</h4>
                    <div className="AppointmentAddForm-timeSlotButtons">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`AppointmentAddForm-timeSlotButton ${selectedTimeSlot === slot ? 'selected' : ''} ${
                            isTimeSlotBooked(slot) ? 'disabled' : ''
                          }`}
                          onClick={() => handleTimeSlotClick(slot)}
                          disabled={isTimeSlotBooked(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  )}

              </div>

              </>

                )}
              

              <button type="submit" className="btn btn-primary">Submit</button>
            </>

            
          )}  

        </form>

        
    </div>
  )
}

export default AppointmentAddForm