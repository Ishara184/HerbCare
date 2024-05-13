import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";

import User_searching from "./pages/inventory/user_searching/User_searching"
import Producttesting from "./pages/inventory/Inventory_Dashboard/Producttesting";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Product from "./pages/inventory/user_searching/Product";
import Staff_Dashboard from "./pages/inventory/Staff_Inventory_Management/Staff_Dashboard";

import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";
import SellerMainHome from "./pages/sellerPartnership/Home/SellerMainHome";

import ConsultationsCustomer from "./pages/consultation/consultationsCustomer/ConsultationsCustomer";
import SpecialistInterface from "./pages/consultation/specialist/specialistInterface/SpecialistInterface";
import ConsultationStaff from "./pages/consultation/staff/consultationStaff/ConsultationStaff";

import FeedbackDashboard from "./pages/Feedback&complaints/FeedbackDashboard/FeedbackDashboard";

import GiftPackage_manage from "./pages/giftPackage/staff/Dashboard/GiftPackage_manage";
import AddDefaultGiftPack from "./components/gift package/defaultGiftPackage/AddDefaultGiftPack";
import DefaultGiftpackages from "./components/gift package/defaultGiftPackage/DefaultGiftPackages";
import UpdateDefaultGiftPackage from "./components/gift package/defaultGiftPackage/UpdateDefaultGiftPackage";


import MyOrders from "./pages/Order_Management/myOrders/MyOrders";

import DisplayDefaultGiftPackages from "./components/gift package/customizeGiftPackage/DisplayDefaultGiftPackages";
import PlaceOrder from "./components/gift package/giftPackageOrders/PlaceOrder";
import DisplayGiftPackOrders from "./components/gift package/giftPackageOrders/DisplayGiftPackOrders";
import SinglePackageDetails from "./components/gift package/customizeGiftPackage/DisplaySingleDefaultGiftPackage";
import UserDisplayOrder from "./pages/giftPackage/User/DisplayOrderUser";

import StaffMainDashboard from "./pages/common/staff/StaffMainDashboard";
import ManagerDashboard from "./pages/common/manager/ManagerDashboard";
import UserDashboard from "./pages/common/User/UserDashboard";
import RegisterPage from "./pages/common/register/RegisterPage";
import Cart from "./pages/Order_Management/Cart";
import Checkout_user from "./pages/Order_Management/checkout/Checkout_user";
import Pending from "./pages/Order_Management/checkout/Pending";


import ContactUs from "./pages/common/contactUs/ContactUs";
import AboutUs from "./pages/inventory/AboutUs/about_us";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        

        <Route path="/Feedback&Complains/*" element={<FeedbackDashboard/>}></Route>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard/*" element={<Inventory_Dashboard />} />
        <Route path="/User_searching/*" element={<User_searching />} />
        <Route path="/Producttesting/*" element={<Producttesting />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Staff_Dashboard/*" element={<Staff_Dashboard/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />



        <Route path="/sellerMainHome/*" element={<SellerMainHome />} />
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard />} />
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/consultation/*" element={<ConsultationsCustomer />} />
        <Route path="/specialistInterface/*" element={<SpecialistInterface />} />
        <Route path="/consultationStaff/*" element={<ConsultationStaff />} />

      
        <Route path="/staffGift/*" element={<GiftPackage_manage/>}></Route>
        <Route path="/add_Default_gift_pack" element={<AddDefaultGiftPack/>}></Route>
        <Route path="/Default_gift_packages" element={<DefaultGiftpackages/>}></Route>


        <Route path="/myOrders/*" element={<MyOrders />} />
          

        <Route path="/Update_default_gift_packages/:id" element={<UpdateDefaultGiftPackage/>}></Route>
        <Route path="/Gift-Package-Orders" element={<DisplayGiftPackOrders/>}></Route>
        <Route path="/Gift_Packages" element={<DisplayDefaultGiftPackages/>}></Route>
        <Route path="/DisplaySinglePackage" element={<SinglePackageDetails/>}></Route>
        <Route path="/DisplayGiftPackageUser" element={<UserDisplayOrder/>}></Route>

        <Route path="/Place-Order/" element={<PlaceOrder/>}></Route>

        <Route path="/staff/*" element={<StaffMainDashboard/>}></Route>
        <Route path="/manager/*" element={<ManagerDashboard/>}></Route>
        <Route path="/user" element={<UserDashboard/>}></Route>


        <Route path="/contactUs" element={<ContactUs/>}></Route>


        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/checkout/:price" element={<Checkout_user/>}></Route>
        <Route path="/pending_orders" element={<Pending/>}></Route>



        
      </Routes>
    </BrowserRouter>

  );
}


export default App;
