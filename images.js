const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')
const mysql_eight = require('mysql8')
const multer = require('multer')
const path = require('path')
const fs = require('fs');

let photo = require("./models/photo")

//use express static folder
app.use(express.static("./public"))

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(express.static('public'));
app.use('/photos/images', express.static('images'));




// Database connection



  const db = mysql_eight.createConnection({
      host: "41.76.175.65",
      user: "mary",
     password: "B0st#20zz",
      database: "versions",

      options: {
          encrypt: false,
          trustServerCertificate: true,
      }
  })


  db.connect(function (err) {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log('Connected to the MySQL server.');
  })



// IMG_0605.jpg


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

//! Routes start

//route for Home page
app.get('/photos', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//@type   POST
//route for post data
// https://core.posta.co.ke
app.post("/photos/post", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        let payload = {
            // http://127.0.0.1:6000/images/image-1656502176366.png
            Photo: "https://core.posta.co.ke/photos/images/"+req.file.filename,
        }
        photo().create(payload)
            .then(function (result){
                res.send(result);

            },function (err){
                console.log(err)
                res.status(400)
                res.send("an error occurred")

            })

    }
});


app.get('/photos/fetch', (req, res) => {
photo().findAll()
    .then(function (result){
        res.send(result);

    },function (err){
        console.log(err)
        res.status(400)
        res.send("an error occurred")

    })
});








//create connection 192.168.0.204
// "192.168.0.204",
const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))