const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const EModel = require("../models/Emodel");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // Set destination folder for storing images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set unique filename for uploaded image
  },
});

// Multer upload 
const upload = multer({ storage: storage });

// Route to add employee
router.post('/add', upload.single('file'), async (req, res) => {
  try {
    const { name, email, number, designation, gender, course } = req.body;
    const imageUrl = req.file ? req.file.filename : '';

    const response = await EModel.create({
      name,
      email,
      number,
      designation,
      gender,
      course,
      imageUrl, 
    });

    res.status(201).json(response);
  } catch (error) {
      }
});

//Route To Get Employes List
router.get("/" , async(req,res)=>{
  try {
    const response = await EModel.find({})
    res.status(201).json(response)
  } catch (error) {
    res.status(500).json("Server error")
  }
})

//Route to get specific employe
router.get("/user/:id" , async(req,res)=>{
  const {id} = req.params.id
  try {
    const response = await EModel.find({id})
    res.status(201).json(response)
  } catch (error) {
    res.status(500).json("Server error")
  }
})

//Route to delete employee

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await EModel.findByIdAndDelete(id);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json("Server error");
  }
});


//Route to edit employee
router.put('/update/:id', upload.single('file'), async (req, res) => {
  const id = req.params.id
  try {
    const { name, email, number, designation, gender, course } = req.body;
    const imageUrl = req.file ? req.file.filename : '';

    const response = await EModel.findByIdAndUpdate({id},{
      name,
      email,
      number,
      designation,
      gender,
      course,
      imageUrl, 
    });

    res.status(201).json(response);
  } catch (error) {
      }
});

module.exports = router;
