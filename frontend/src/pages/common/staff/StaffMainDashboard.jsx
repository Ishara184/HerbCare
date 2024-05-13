import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SellerStaffDashboard from '../../sellerPartnership/staffDashboard/SellerStaffDashboard'
import Staff_Dashboard from '../../inventory/Staff_Inventory_Management/Staff_Dashboard'
import ConsultationStaffDashboard from '../../consultation/staff/consultationStaff/ConsultationStaff'
import Display_Staff from '../../Feedback&complaints/Complaints/DisplayStaff'
import GiftPackage_manage from '../../giftPackage/staff/Dashboard/GiftPackage_manage'
import DisplayFeedback_staff from "../../Feedback&complaints/Feedback/DisplayStaff"
import './staffMainDashboard.css'
import StaffDashboardHome from './staffDashboardHome/StaffDashboardHome'

function StaffMainDashboard() {
  return (
    <>
    <div className='staffContainer'>

    <div className="main-staff-sidebar">
  <ul className="main-staff-sidebar-nav">
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to={"/staff"}
        aria-current="page"
      >
        Dashboard
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to={"/staff/SellerStaffDashboard"}
      >
        Seller
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to={"/staff/consultationStaff"}
      >
        Consultation
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to="/staff/staffGift/Default_gift_packages"
      >
        Gift Packages
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to="/staff/Staff_Dashboard"
      >
        Inventory
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to="/staff/DisplayFeedbackStaff"
      >
        Feedbacks / Complanes
      </Link>
    </li>
    {/* Main Link with Sub-links */}
  </ul>
</div>

   
      <Routes>
        <Route path="/" element={<StaffDashboardHome />}></Route>
        <Route path="/Staff_Dashboard/*" element={<Staff_Dashboard/>} />
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard/>} />
        <Route path="/consultationStaff/*" element={<ConsultationStaffDashboard/>} />
        <Route path="/DisplayFeedbackStaff" element={<DisplayFeedback_staff/>}></Route>
        <Route path="/DisplayComplaintsStaff" element={<Display_Staff/>}></Route>
        <Route path="/staffGift/*" element={<GiftPackage_manage/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default StaffMainDashboard