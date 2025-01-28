var express = require('express');
const auth = require('../middleware/auth');
const roleSuperAdmin = require('../middleware/roleSuperAdmin');
const multer = require('multer');
const Photo = require('../models/photo');
var router = express.Router();
const upload = multer({ dest: 'uploads/' })
/* GET home page. */
router.get('/',auth ,function(req, res, next) {
  res.send("Home page");
});


/* Upload a photo----- any user wil be able to do this superadmin or admin */
router.post('/upload', auth,upload.single("photo") ,async(req, res, next)=> {

  const fileToUpload = req.file
  console.log("fileToUpload", fileToUpload)

  const {orignalname, filename, path, destination} = fileToUpload; 

  if(!fileToUpload){
    res.json({message: "No file found"});

  }
    const photoUpload = await Photo.create({
      name: filename,
      destination: destination,
      url: path,
      originalName: orignalname,
      //viewed: false,
    })

    photoUpload.save()

  res.json({message: "Uploaded", photoUpload});
});

/* View all photos which are unviewed */
router.get('/verify',auth, roleSuperAdmin ,async (req, res, next) =>{
const allPhotos = await Photo.find({viewed: false})
if(allPhotos.length<1){
  res.json({message: "No unverified photos to show"})
}
  res.json(allPhotos)
});

/* View a photo----- only wil be able to do this superadmin */
router.post('/verify',auth, roleSuperAdmin ,async(req, res, next) =>{

  const photoID = req.body.id

  const photo = await Photo.findById(photoID)

  if(!photo){
    res.json({message:"Please send a valid photo ID"});

  }else{

    photo.viewed = true;
    photo.save() 
    res.json({message:"Photo viewed"});

  }



});


module.exports = router;
