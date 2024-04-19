import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Staff_Dashboard_Sidebar from '../../../components/inventory/DashBoard_All/Staff_Dashboard/Staff_Dashboard_Sidebar'
import ProductProposalForm from '../../../components/inventory/DashBoard_All/Staff_Dashboard/ProductProposalForm';
import ViewAllProducts from '../../../components/inventory/DashBoard_All/Staff_Dashboard/ViewAllProducts';
import Staff_Notifications from '../../../components/inventory/DashBoard_All/Staff_Dashboard/Staff_Notifications';
import './Staff_Dashboard.css'


function Staff_Dashboard() {
  return (
    <>
        <div className="Staff-container">
          <div className="Staff-dashboard-nav-bar">
        
            <Staff_Dashboard_Sidebar/>

          </div>

          <div className="Staff-DashBoard-pages">

          <Routes>
            <Route path="/" element={<Staff_Notifications/>}></Route>
            <Route path="/AddProductProposal" element={<ProductProposalForm/>}></Route>
            <Route path="/ViewProducts" element={<ViewAllProducts/>}></Route>
            <Route path="/notifications" element={<Staff_Notifications/>}></Route>
            
          </Routes>
          </div>
        </div>
    </>
  )
}

export default Staff_Dashboard