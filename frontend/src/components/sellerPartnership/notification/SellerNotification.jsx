import React, { useEffect, useState } from 'react'
import './sellerNotification.css'
import { Tabs } from  "antd";
import axios from 'axios';
import './sellerNotification.css'


function SellerNotification() {

    const [seller, setSeller] = useState({});


    useEffect(() => {
        axios.get("http://localhost:8070/sellerNotification/getNotifications")
        .then((res) => {
            setSeller(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

    } , [])

    const refreshPage = () => {
            axios.get("http://localhost:8070/sellerNotification/getNotifications")
            .then((res) => {
                setSeller(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUnReadNotification = () => {
            axios.put("http://localhost:8070/sellerNotification/markAsReadNotification")
            .then((res) => {
                console.log('Marked as read successfully');
                console.log(res.data)
                refreshPage();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const deleteReadNotification = () => {
        axios.put("http://localhost:8070/sellerNotification/deleteNotification")
        .then((res) => {
            console.log('Delete notifications');
            console.log(res.data)
            refreshPage();
        })
        .catch((err) => {
            console.log(err);
        })
};
    
  return (
    <>
    <div style={{ maxWidth:"60%", margin: "auto"}}>
    <h2 className='p-3 text-center'>SellerNotification</h2>
    <Tabs>
        <Tabs.TabPane tab="Un Read" key="1">
        <hr />
            <div className='d-flex justify-content-end'>
                <h5 className='p-2 ' style={{ cursor:"pointer" }} onClick={handleUnReadNotification}>Mark as Read</h5>
            </div>
            {
                seller?.unread_notification?.map((notification, index) => (
                    <div class="card w-75 mb-3" key={index}>
                        <div className="card-body notification_card">
                            <div className='notification_image'>
                                <img src={require("../../../Images/logo/HerbCare Logo.png")} alt="" />
                            </div>
                            <div className='notification_info'>
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">{notification}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="2">
        <hr />
            <div className='d-flex justify-content-end'>
                <h5 className='p-2' style={{ cursor:"pointer" }} onClick={deleteReadNotification}>Delete All</h5>
            </div>
            {
                seller?.read_notification?.map((notification, index) => (
                    <div class="card w-75 mb-3" key={index}>
                        <div className="card-body notification_card">
                            <div className='notification_image'>
                                <img src={require("../../../Images/logo/HerbCare Logo.png")} alt="" />
                            </div>
                            <div className='notification_info'>
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">{notification}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
    </Tabs>
    </div>
    </>
  )
  
}

export default SellerNotification