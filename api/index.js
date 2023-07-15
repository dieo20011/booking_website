const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const Place = require("./models/Places");
const Booking = require("./models/Bookings");
const bcryptSalt = 10;
const path = require("path");
const pathUtils = require('path');
const jwtSecret = "askjdhsakjdhk";
const cookieParser = require("cookie-parser");
const imageDowloader = require("image-downloader");
const multer = require("multer");

const fs = require("fs");
const PlaceModel = require("./models/Places");

app.use(express.json());
const message = "This is an error message";
const err = new Error(message);
app.use(cookieParser());
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req){
  return new Promise((resolve, reject)=>{
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err;
      resolve(userData);
    });
  })
}
app.get("/api/test", (req, res) => {
  res.json("oke");
});
//LG0q2vdtiMrDZruz
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});
app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const imagePath = __dirname + "/uploads/" + newName; // Đường dẫn đầy đủ cho tệp tin
  try {
    await imageDowloader.image({
      url: link,
      dest: imagePath,
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: "Failed to download image" });
  }
});
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/api/uploads", photosMiddleware.array("photos", 100), (req, res) => {
    const upLoadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newName = 'photo' + Date.now() + '.' + ext;
        const newPath = pathUtils.join(__dirname, 'uploads', newName);
        fs.renameSync(path, newPath);
        upLoadedFiles.push(newPath.replace(pathUtils.join(__dirname, 'uploads'), ''));
    }
    res.json(upLoadedFiles);
});
app.post("/api/places", (req, res)=>{
  const { token } = req.cookies;
  const {title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos, description, 
        perks, extraInfo, checkIn, checkOut, maxGuests, price
      });
      res.json(placeDoc);
    });
});
app.get('/api/user-places', (req, res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      // Xử lý lỗi xác thực
      console.error(err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Tiếp tục xử lý và trả về dữ liệu
    const { id } = userData;
    const places = await Place.find({ owner: id });
    res.json(places);
  });
});
app.get('/api/places', async (req,res) =>{
  res.json(await Place.find()); 
})
app.get('/api/places/:id', async (req, res)=>{
  const {id} = req.params;
  res.json(await Place.findById(id));
});
app.put('/api/places/:id', async (req, res) =>{
  const { token } = req.cookies;
  const {id, title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price} = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if(err) throw err;
  const placeDoc = await Place.findById(id);
    if(userData.id === placeDoc.owner.toString()){
      placeDoc.set({
        title, address, photos, description, 
        perks, extraInfo, checkIn, checkOut, maxGuests,price
      })
      await placeDoc.save();
      res.json('ok');
    }
  });
});
app.post('/api/bookings', async (req, res)=>{
  const userData = await getUserDataFromToken(req);
  const {place, checkIn, checkOut, numberOfGuests, name, phone, price} =req.body;
  await Booking.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
    user:userData.id,
  }).then((doc)=>{
      res.json(doc);
  }).catch((err)=>{
    throw err;
  })
});


app.get('/api/bookings', async (req, res)=>{
  const userData =  await getUserDataFromToken(req);
  res.json(await Booking.find({user:userData.id}).populate('place'))
})
app.listen(5000);
