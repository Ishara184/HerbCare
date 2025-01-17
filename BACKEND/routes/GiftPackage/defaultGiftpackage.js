// http://localhost:8070/defaultGiftpackage

const router = require("express").Router();
const DefaultGiftPack = require("../../models/GiftPackage/defaultGiftpackage");
const Product = require("../../models/inventory/Product")
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');


// Image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
 
const upload = multer({ storage: storage });


// Fetch available products
router.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// From gift package adding form, by Staff
// Create default gift packagesand add them
router.route("/addDefault-gift-package").post(upload.array('images', 10), async (req, res) => {
  try {
      const { packageName, description } = req.body;
      const productIds = JSON.parse(req.body.productIds)
      const images = req.files.map(file => file.path);

      // Fetch products by IDs
      const productObjectIds=productIds.map(productId=>mongoose.Types.ObjectId(productId));
      const products = await Product.find({ _id: { $in: productObjectIds } });

      const newDefaultGiftPack = new DefaultGiftPack({
          packageName,
          description,
          products,
          images
      });

      const savedDefaultGiftPack = await newDefaultGiftPack.save();

      res.status(201).json({ message: "Package added successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});


// Display added all default gift packages to staff
// Display all default gift packages to customer
router.route("/default-gift-packages").get(async(req,res)=>{

  try {
      const defaultGiftPackages = await DefaultGiftPack.find();
      res.json(defaultGiftPackages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

  
})
//After select a package system will display package details
// Display a single default gift package
router.route("/default-gift-package/:id").get(async (req, res) => {
    try {
      const defaultGiftPack = await DefaultGiftPack.findById(req.params.id);
      if (defaultGiftPack == null) {
        return res.status(404).json({ message: "Default gift package not found"});
      }
      res.json(defaultGiftPack);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

});


// Staff can update default package details
// Update added default gift packages
router.route("/updateDefault-gift-package/:id").put(async(req,res)=>{

  try {
    const { packageName, description, productIds} = req.body;
    const images = req.files.map(file => file.path);

    const updatedDefaultGiftPack = await DefaultGiftPack.findById(req.params.id);

    if (!updatedDefaultGiftPack) {
      return res.status(404).json({ message: "Custom gift package not found" });
    }

    updatedDefaultGiftPack.packageName = packageName;
    updatedDefaultGiftPack.description = description;
    updatedDefaultGiftPack.products = productIds;
    updatedDefaultGiftPack.images = images;

    await updatedDefaultGiftPack.save();

    res.status(200).json({message: "Package updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
    
    /*try {
        const updatedDefaultGiftPack = await DefaultGiftPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Package updated successfully"});
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }*/

    
}) 


// Staff can delete default packages
// Delete package
router.route("/deleteDefault-gift-packages/:id").delete(async (req, res) => {
    try {
      await DefaultGiftPack.findByIdAndDelete(req.params.id);
      res.json({ message: 'Default gift package deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
});

module.exports = router;