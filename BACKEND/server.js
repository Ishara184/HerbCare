const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express(); 
require("dotenv").config();

const PORT = process.env.PORT || 8070;
// Allow requests from the specified origin
const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json());

const ConsultAppointmentsRouter = require("./routes/consultation/consultAppointments.js");
const RefundRouter = require("./routes/consultation/refunds.js");
const AvailabilityRouter = require("./routes/consultation/availabilities.js");
const SpecialistRouter = require("./routes/consultation/specialists.js");
const CenterRouter = require("./routes/consultation/centers.js");

const customerRouter = require( "./routes/user/customer.js" );

const sellerRouter = require( "./routes/sellerPartnership/seller.js" );
const sellerPartnershipRequestRouter = require( "./routes/sellerPartnership/sellerPartnershipRequest.js" );
const sellerProducts = require( "./routes/sellerPartnership/sellerProducts.js" )
const sellerBag = require( "./routes/sellerPartnership/sellerBag.js" );
const sellerOrder = require( "./routes/sellerPartnership/sellerOrders.js" );

const productRouter = require("./routes/inventory/inventoryManagers.js");

const customizeGiftPackageRouter = require("./routes/GiftPackage/customizeGiftPackage.js");
const defaultGiftpackageRouter = require("./routes/GiftPackage/defaultGiftpackage.js");
const giftPackageOrderRouter = require("./routes/GiftPackage/giftPackageOrder.js");

const authRouter = require( "./routes/auth.js" );

const cookieParser = require("cookie-parser");

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, 
    //useFindAndModify: false
});


app.use(cookieParser());


app.use("/consultAppointment", ConsultAppointmentsRouter);
app.use("/refund", RefundRouter);
app.use("/availability", AvailabilityRouter);
app.use("/specialist", SpecialistRouter);
app.use("/center", CenterRouter);

app.use("/seller", sellerRouter);
app.use("/sellerPartnershipRequest", sellerPartnershipRequestRouter);
app.use("/sellerProducts",  sellerProducts);
app.use("/sellerBag",  sellerBag);
app.use("/sellerOrder",  sellerOrder);

app.use("/product", productRouter);





app.use("/customizeGiftPackage",customizeGiftPackageRouter);
app.use("/defaultGiftpackage",defaultGiftpackageRouter);
app.use("/giftPackageOrder",giftPackageOrderRouter);

app.use("/auth", authRouter);

app.use("/customer", customerRouter);


const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})



app.listen(PORT,() =>{

    console.log(`Server is up and running on port number: ${PORT}`);
})
