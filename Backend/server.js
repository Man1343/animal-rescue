const path = require('path');
const multer = require('multer');
const express = require('express')
// const mysql = require('mysql')
const cors = require('cors')
const nodemailer = require('nodemailer');



const app = express()
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

const imageBasePath = "public/uploads";
app.use("/public", express.static(path.join(__dirname, 'public')));

const imageBasePath2 = "public/images";
app.use("/public", express.static(path.join(__dirname, 'public')));

const imageBasePath3 = "public/products";
app.use("/public", express.static(path.join(__dirname, 'public')));
// app.use("/public", express.static(path.join(__dirname, 'public/products')));
// app.use('/products', express.static('public/products'));




// Create a connection pool
// const db = mysql.createPool({
//   connectionLimit: 100, // Adjust based on your application's needs
//   host: 'localhost',
//   user: 'root',
//   password: 'OmSomani@789',
//   database: 'animal',
// });

// const db = mysql.createPool({
//   connectionLimit: 100, // Adjust based on your application's needs
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'animal',
// });

// this is the database connection from xampp
const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'animal',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
    connection.release(); // Release connection back to pool
  }
});
module.exports = db;





// You don't need db.connect() with a connection pool


const uploadFilePath = path.resolve(__dirname, '', imageBasePath);
const storage = multer.diskStorage({
  destination: uploadFilePath,
  filename : (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));  
  }
})

const uploadFilePath2 = path.resolve(__dirname, '', imageBasePath2);
const storage2 = multer.diskStorage({
  destination: uploadFilePath2,
  filename : (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));  
  }
})

const uploadFilePath3 = path.resolve(__dirname, '', imageBasePath3);
const storage3 = multer.diskStorage({
  destination: uploadFilePath3,
  filename : (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

// this is for adding new product from admin side
const uploadFile3 = multer({
  storage: storage3,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg', '.webp', '.avif'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType  = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});

// this is for creating adoption post
const uploadFile2 = multer({
  storage: storage2,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg', '.webp', '.avif'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType  = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});

// this is for reporting emergency
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg', '.webp', '.avif'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType  = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});

// for user signup
app.post('/api/signup', (req, res) => {
  try {
    const { first_name, email, mobile_no, password } = req.body;
    const sql = 'INSERT INTO registration_user (first_name, email, mobile_no, password) VALUES (?, ?, ?, ?)';
    
    // Use parameterized query to prevent SQL injection
    db.query(sql, [first_name, email, mobile_no, password], (err, result) => {
      if (err) {
        console.error('MySQL insert error:', err);
        res.status(500).json({ message: 'Registration failed. Please try again later.' });
      } else {
        sendConfirmationEmail(email);
        res.json({ message: 'Registration successful. Confirmation email sent.' });
      }
    });
  } catch (error) {
    console.error('Error processing signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'omsomani789@gmail.com',
      pass: 'trmu jotp qbqr juzj'  
  }
});

function sendConfirmationEmail(email) {
  const mailOptions = {
      from: 'omsomani789@gmail.com',
      to: email,
      subject: 'Registration Confirmation',
      text: 'Thank you for Joining with Paw Protectors! Your account is now active,you can login now.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

// for shelter signupp
app.post('/api/signupp', (req, res) => {
  try {
    const {shelter_name, email, mobile_no, password, shelter_address } = req.body;
    const sql = 'INSERT INTO registration_shelter (shelter_name, email, mobile_no, password, shelter_address) VALUES (?, ?, ?, ?,?)';
    
    // Use parameterized query to prevent SQL injection
    db.query(sql, [shelter_name, email, mobile_no, password,shelter_address], (err, result) => {
      if (err) {
        console.error('MySQL insert error:', err);
        res.status(500).json({ message: 'Registration failed. Please try again later.' });
      } else {
        sendConfirmationEmail(email);
        res.json({ message: 'Registration successful. Confirmation email sent.' });
      }
    });
  } catch (error) {
    console.error('Error processing signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});






app.post('/Navbar',(req, res) => {
  const sql = "INSERT INTO feedback (`email`, `message`) VALUES (?)";
  const values = [
   
    req.body.email,
    req.body.message,
    
  ]
  db.query(sql, [values], (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/upload',uploadFile.single('image'),(req,res) => {
  console.log(req);
  console.log(req.file.filename);
  console.log(req.file);   
  const image = req.file.filename;
  return res.json(image);
})

app.get('/Reportemergency',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.emergency_report;";

  db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.get('/Adoptionpost',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.animal_for_adoption;";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.post('/Reportemergency',uploadFile.single('image'),(req, res) => {
  const {email,address,contact} = req.body;
  const image = req.file.filename;

  // const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ?';
  const getUserInfoSql = 'SELECT user_id FROM registration_user WHERE email = ?';
  db.query(getUserInfoSql, [email], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const lastLoginTime = new Date().toISOString().split('T')[0];
    const img = imageBasePath + "/" +image;
    // const logLastLoginSql = 'INSERT INTO emergency_report (`unique_id`, `address`, `contact`, `photo_url`, `date`, `email`) VALUES (?, ?, ?, ?, ?,?)';
    const logLastLoginSql = 'INSERT INTO emergency_report (`user_id`, `address`, `contact`, `photo_url`, `date`, `email`) VALUES (?, ?, ?, ?, ?,?)';
    // db.query(logLastLoginSql, [user.unique_id, address, contact, img, lastLoginTime, email ], (logErr) => {
    db.query(logLastLoginSql, [user.user_id, address, contact, img, lastLoginTime, email ], (logErr) => {
        if (logErr) {
        console.error('Error logging last login', logErr);
      }
      res.json("reported successfully");
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ? AND password = ?';
  const getUserInfoSql = 'SELECT user_id FROM registration_user WHERE email = ? AND password = ?';
  db.query(getUserInfoSql, [email,password], (err, results) => {
    // if (err) return res.json(err);
    if (err) {
      console.error("Database Error:", err);
      return res.json({ success: false, message: 'Database error' });
    }
    console.log("Query Results:", results);
  
    if (results.length === 0) {
      // return res.json('no record');
      console.log("No record found for email:", email);
      return res.json({ success: false, message: 'No record found' });
    }
    const user = results[0];
    // const lastLoginTime = new Date().toISOString();
    const lastLoginTime = new Date().toISOString().split('T')[0]; //gets only YYYY-MM-DD
    // const logLastLoginSql = 'INSERT INTO user_activity (unique_id, email, login_time) VALUES (?, ?, ?)';
    const logLastLoginSql = 'INSERT INTO user_activity (user_id, email, login_time) VALUES (?, ?, ?)';
    db.query(logLastLoginSql, [user.user_id, email, lastLoginTime], (logErr) => {
      if (logErr) {
        console.error('Error logging last login', logErr);
      }
      // res.json("login successfully");
      // res.json({
      const responseData = {
        success: true,
        message: "Login successful",
        user_id: user.user_id,  // Return user_id
        userEmail: email,        // Return email
      };
      // console.log("login successful");
      console.log("Response Data:", responseData);
      res.json(responseData);
    });
  });
});

app.post('/images',uploadFile2.single('image'),(req,res) => {
  console.log(req);
  console.log(req.file.filename);
  //console.log(req.file);   
  const image = req.file.filename;
  return res.json(image);
})

app.post('/Adoptionpost',uploadFile2.single('image'),(req, res) => {
  const {email, animal_name, species, age, description, mobile_no} = req.body;
  const image = req.file.filename;

  // const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ?';
  // const getUserInfoSql = 'SELECT user_id FROM registration_user WHERE email = ?';
  const getUserInfoSql = 'SELECT shelter_id FROM registration_shelter WHERE email = ?';
  db.query(getUserInfoSql,[email], (err,results) => {
    if(err) return res.json(err);
    if(results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const img =  imageBasePath2 +"/" +image;
    // const logLastLoginSql = "INSERT INTO animal_for_adoption (`unique_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    // const logLastLoginSql = "INSERT INTO animal_for_adoption (`user_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const logLastLoginSql = "INSERT INTO animal_for_adoption (`shelter_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    // db.query(logLastLoginSql,[user.unique_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
    // db.query(logLastLoginSql,[user.user_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
    db.query(logLastLoginSql,[user.shelter_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
        if (logErr) {
        console.error("error logging last login",logErr);
      }
      res.json("post successfully");
    });
  });
});

app.post('/Adoptionpostt',uploadFile2.single('image'),(req, res) => {
  const {email, animal_name, species, age, description, mobile_no} = req.body;
  const image = req.file.filename;

  // const getUserInfoSql = 'SELECT unique_id FROM registration_shelter WHERE email = ?';
  const getUserInfoSql = 'SELECT shelter_id FROM registration_shelter WHERE email = ?';
  db.query(getUserInfoSql,[email], (err,results) => {
    if(err) return res.json(err);
    if(results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const img =  imageBasePath2 +"/" +image;
    // const logLastLoginSql = "INSERT INTO animal_for_adoption (`unique_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const logLastLoginSql = "INSERT INTO animal_for_adoption (`shelter_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    // db.query(logLastLoginSql,[user.unique_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
    db.query(logLastLoginSql,[user.shelter_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
        if (logErr) {
        console.error("error logging last login",logErr);
      }
      res.json("post successfully");
    });
  });
});


// shelter loginn api
app.post('/loginn', (req, res) => {
  const { email, password } = req.body;
  // const getUserInfoSql = 'SELECT unique_id, mobile_no,shelter_name,shelter_address FROM registration_shelter WHERE email = ? AND password = ?';
  const getUserInfoSql = 'SELECT shelter_id, mobile_no,shelter_name,shelter_address FROM registration_shelter WHERE email = ? AND password = ?';

  db.query(getUserInfoSql, [email, password], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('no record');
    }

    const user = results[0];
    // const lastLoginTime = new Date().toISOString(); // Local time of the server
    const lastLoginTime = new Date().toISOString().split('T')[0]; // Gets only YYYY-MM-DD

    // const logLastLoginSql = 'INSERT INTO shelter_activity (unique_id, mobile_no, email, login_time, shelter_name, shelter_address) VALUES (?, ?, ?, ?, ?, ?)';
    const logLastLoginSql = 'INSERT INTO shelter_activity (shelter_id, mobile_no, email, login_time, shelter_name, shelter_address) VALUES (?, ?, ?, ?, ?, ?)';
    
    // db.query(logLastLoginSql, [user.unique_id, user.mobile_no, email, lastLoginTime, user.shelter_name, user.shelter_address], (logErr) => {
    db.query(logLastLoginSql, [user.shelter_id, user.mobile_no, email, lastLoginTime, user.shelter_name, user.shelter_address], (logErr) => {
        if (logErr) {
        console.error('Error logging last login', logErr);
      }
      res.json("login successfully");
    });
  });
});




app.post('/Admin',(req, res) => {
  const sql = "SELECT email,password FROM admin WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    if(data.length > 0) {
      return res.json("login successfully");
    }
    else {
      return res.json("No record")
    }
  })
})

app.get('/User',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.registration_user;";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.get('/Shelter',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.registration_shelter;";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.put('/updateuser', (req, res) => {
  // const { unique_id, newName, newEmail, newContact } = req.body;
  // const sql = 'UPDATE registration_user SET first_name = ? , email = ? , mobile_no = ? WHERE unique_id = ?';
  // db.query(sql, [newName, newEmail, newContact, unique_id], (err, result) => {
  const { user_id, newName, newEmail, newContact } = req.body;
  const sql = 'UPDATE registration_user SET first_name = ? , email = ? , mobile_no = ? WHERE user_id = ?';
  db.query(sql, [newName, newEmail, newContact, user_id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data updated successfully');
      res.status(200).send('Data updated successfully');
    }
  });
});

app.put('/updateshelter', (req, res) => {
  // const { unique_id, newName, newEmail, newContact, newAddress } = req.body;
  // const sql = 'UPDATE registration_shelter SET shelter_name = ? , email = ? , mobile_no = ? , shelter_address = ? WHERE unique_id = ?';
  // db.query(sql, [newName, newEmail, newContact, newAddress, unique_id], (err, result) => {
  const { shelter_id, newName, newEmail, newContact, newAddress } = req.body;
  const sql = 'UPDATE registration_shelter SET shelter_name = ? , email = ? , mobile_no = ? , shelter_address = ? WHERE shelter_id = ?';
  db.query(sql, [newName, newEmail, newContact, newAddress, shelter_id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data updated successfully');
      res.status(200).send('Data updated successfully');
    }
  });
});

// app.delete('/deleteUser/:unique_id', (req, res) => {
// const unique_id = req.params.unique_id;
// const deleteQuery = 'DELETE FROM registration_user WHERE unique_id = ?';
// db.query(deleteQuery, [unique_id], (err, result) => {
app.delete('/deleteUser/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  
  const deleteQuery = 'DELETE FROM registration_user WHERE user_id = ?';

  db.query(deleteQuery, [user_id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});

// app.delete('/deleteshelter/:unique_id', (req, res) => {
//   const unique_id = req.params.unique_id;
//   const deleteQuery = 'DELETE FROM registration_shelter WHERE unique_id = ?';
//   db.query(deleteQuery, [unique_id], (err, result) => {
app.delete('/deleteshelter/:shelter_id', (req, res) => {
    const shelter_id = req.params.shelter_id;
  
    const deleteQuery = 'DELETE FROM registration_shelter WHERE shelter_id = ?';
  
    db.query(deleteQuery, [shelter_id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});

app.delete('/deletepost/:animal_id', (req, res) => {
  const animal_id = req.params.animal_id;

  const deleteQuery = 'DELETE FROM animal_for_adoption WHERE animal_id = ?';

  db.query(deleteQuery, [animal_id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});



app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;

  // const om = 'SELECT email,mobile_no FROM shelter_activity ORDER BY activity_id DESC LIMIT 1; ';
  const om = 'SELECT email,mobile_no FROM shelter_activity ORDER BY shelter_id DESC LIMIT 1; ';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'omsomani789@gmail.com',
      pass: 'trmu jotp qbqr juzj',
    },
  });

  try {
  
    db.query(om, (error, results) => {
      if (error) {
        throw error;
      }

      const shelterDetails = results[0];

      const mailOptions = {
        from: 'omsomani789@gmail.com',
        to: email,
        subject: 'Emergency Accepted',
        html: `<p>Your Reported Emergency has been accepted by the shelter home. Click <a href="http://localhost:3000/Ratings">here</a> to Give Any Feedback To Shelter Home</p> Shelter details are: ${JSON.stringify(shelterDetails)}`,
      };

      transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
          console.error('Error sending email:', mailError);
          res.status(500).send('Failed to send email');
        } else {
          console.log('Email sent: ', info.messageId);
          res.status(200).send('Email sent successfully');
        }
      });
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Failed to connect to the database');
  }
});

// api to store ratings
// app.post('/ratings', (req, res) => {
//   const { email,feedback } = req.body;
//   // const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ? ';
//   const getUserInfoSql = 'SELECT user_id FROM registration_user WHERE email = ? ';
//   db.query(getUserInfoSql, [email], (err, results) => {
//     if (err) return res.json(err);
//     if (results.length === 0) {
//       return res.json('submitted successfully');
//     }
//     const user = results[0];
//     // const logLastLoginSql = 'INSERT INTO ratings (unique_id, email, feedback) VALUES (?, ?, ?)';
//     // db.query(logLastLoginSql, [user.unique_id, email,feedback], (logErr) => {
//     const logLastLoginSql = 'INSERT INTO ratings (user_id, email, feedback) VALUES (?, ?, ?)';
//     db.query(logLastLoginSql, [user.user_id, email,feedback], (logErr) => {
//       if (logErr) {
//         console.error('Error logging last login', logErr);
//       }
//       res.json("submitted successfully");
//     });
//   });
// });
app.post('/ratings', (req, res) => {
  const { email, adoption, emergency, petstore, shelter } = req.body;

  const getUserInfoSql = 'SELECT user_id FROM registration_user WHERE email = ?';
  db.query(getUserInfoSql, [email], (err, results) => {
    if (err) return res.json(err);

    if (results.length === 0) {
      return res.json('User not found');
    }

    const user = results[0];
    const insertRatingSql = `
      INSERT INTO ratings (user_id, email, adoption_rating, emergency_rating, petstore_rating, shelter_rating)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertRatingSql, [user.user_id, email, adoption, emergency, petstore, shelter], (logErr) => {
      if (logErr) {
        console.error('Error saving ratings:', logErr);
        return res.status(500).json("Server error");
      }

      res.json("submitted successfully");
    });
  });
});


app.get('/Ratings',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT email,feedback FROM animal.ratings;";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.get('/Ratingss',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.ratings;";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.delete('/deleteRating/:id', (req, res) => {
  const id = req.params.id;

  const deleteQuery = 'DELETE FROM ratings WHERE id = ?';

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});



app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omsomani789@gmail.com',
        pass: 'trmu jotp qbqr juzj',
      },
    });

    const mailOptions = {
      from: 'omsomani789@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
      }

      res.status(200).json({ success: true, message: 'OTP sent successfully.' });
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

const otp = Math.floor(100000 + Math.random() * 900000).toString();

app.post('/verify-otp', (req, res) => {
  try {
    const {ootp} = req.body;
      if (ootp === otp) {
        return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
      }
   
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


app.post('/send-otpp', async (req, res) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omsomani789@gmail.com',
        pass: 'trmu jotp qbqr juzj',
      },
    });

    const mailOptions = {
      from: 'omsomani789@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
      }

      res.status(200).json({ success: true, message: 'OTP sent successfully.' });
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/verify-otpp', (req, res) => {
  try {
    const {ootp} = req.body;
      if (ootp === otp) {
        return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
      }
   
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmailSql = 'SELECT * FROM registration_user WHERE email = ?';
    db.query(checkEmailSql, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking email:', checkErr);
        res.status(500).json({ message: 'Internal server error.' });
      } else {
        if (checkResult.length > 0) {
          const newPassword = checkResult[0].password;
              sendNewPasswordEmail(email, newPassword);
              res.json({ message: 'Password Sent to your email' });
        } else {
          res.json({ message: 'No Record Found' });
        }
      }
    });
  } catch (error) {
    console.error('Error processing forgot password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


app.post('/forgot-passwordd', async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmailSql = 'SELECT * FROM registration_shelter WHERE email = ?';
    db.query(checkEmailSql, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking email:', checkErr);
        res.status(500).json({ message: 'Internal server error.' });
      } else {
        if (checkResult.length > 0) {
          const newPassword = checkResult[0].password;
              sendNewPasswordEmail(email, newPassword);
              res.json({ message: 'Password Sent to your email' });
        } else {
          res.json({ message: 'No Record Found' });
        }
      }
    });
  } catch (error) {
    console.error('Error processing forgot password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

function sendNewPasswordEmail(email, newPassword) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'omsomani789@gmail.com', 
      pass: 'trmu jotp qbqr juzj' 
    }
  });

  const mailOptions = {
    from: 'omsomani789@gmail.com', 
    to: email,
    subject: 'New Password',
    text: `Your password is: ${newPassword}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending new password email:', error);
    } else {
      console.log('New password email sent:', info.response);
    }
  });
}

app.get('/api/userUniqueId', (req, res) => {
  // const query = 'SELECT unique_id FROM registration_user ORDER BY unique_id DESC LIMIT 1';
  const query = 'SELECT user_id FROM registration_user ORDER BY user_id DESC LIMIT 1';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result[0]);
    }
  });
});

// Define route to fetch last unique_id from registration_shelter table
app.get('/api/shelterUniqueId', (req, res) => {
  // const query = 'SELECT unique_id FROM registration_shelter ORDER BY unique_id DESC LIMIT 1';
  const query = 'SELECT shelter_id FROM registration_shelter ORDER BY shelter_id DESC LIMIT 1';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result[0]);
    }
  });
});


app.get('/api/accepted', (req, res) => {
  const query = `
  SELECT
  er.address,
  er.contact,
  er.date,
  er.email,
  sa.shelter_name,
  sa.shelter_address,
  sa.mobile_no
FROM
  (SELECT address,contact,date,email FROM emergency_report ORDER BY report_id DESC LIMIT 1) er
JOIN
 (SELECT mobile_no,shelter_name,shelter_address FROM shelter_activity ORDER BY shelter_id DESC LIMIT 1) sa;
  `;
//  (SELECT mobile_no,shelter_name,shelter_address FROM shelter_activity ORDER BY activity_id DESC LIMIT 1) sa;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result[0]);
    }
  });
});

// accept emergency shelter
// this worked correctly 
app.post('/api/acceptRecord', (req, res) => {
  const acceptQuery = 'INSERT INTO accepted_emergency (address, contact, date, email, shelter_name, shelter_address, mobile_no) VALUES (?, ?, ?, ?, ?, ?, ?)';

  // Assuming req.body contains the data received from /api/accepted
  const { address, contact, date, email, shelter_name, shelter_address, mobile_no } = req.body;

  // Adjust the date format to 'YYYY-MM-DD HH:MM:SS'
  // const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  const formattedDate = new Date(date).toISOString().split('T')[0];

  if (!address || !contact || !formattedDate || !email || !shelter_name || !shelter_address || !mobile_no) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  db.query(acceptQuery, [address, contact, formattedDate, email, shelter_name, shelter_address, mobile_no], (err, result) => {
    if (err) {
      console.error('Error accepting record:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Record accepted and stored successfully' });
    }
  });
});

// app.post('/api/acceptRecord', (req, res) => {
//   const {
//     address, contact, date, email,
//     shelter_email, shelter_name, shelter_address, mobile_no
//   } = req.body;

//   const formattedDate = new Date(date).toISOString().split('T')[0];
  
//   console.log('address:', address);
//   console.log('contact:', contact);
//   console.log('date:', date);
//   console.log('email:', email);
//   console.log('shelter_name:', shelter_name);
//   console.log('shelter_address:', shelter_address);
//   console.log('mobile_no:', mobile_no);
  
//   if (!address || !contact || !formattedDate || !email || !shelter_email || !shelter_name || !shelter_address || !mobile_no) {
//     return res.status(400).json({ success: false, message: 'All fields are required' });
//   }
  
//   // Step 1: Get report_id and user_id from emergency_report
//   // const fetchQuery = `SELECT report_id, user_id FROM emergency_report WHERE address = ? AND contact = ? AND date = ? AND email = ?`;
//   const fetchQuery = `SELECT report_id, user_id FROM emergency_report WHERE email = ?`;
  
  
//   db.query(fetchQuery, [address, contact, formattedDate, email], (fetchErr, results) => {
//     if (fetchErr || results.length === 0) {
//       console.error('Error fetching report:', fetchErr || 'No matching record found');
//       return res.status(404).json({ success: false, message: 'Emergency report not found' });
//     }
    
//     const { report_id, user_id } = results[0];
//     console.log('report_id:', report_id);
//     console.log('user_id:', user_id);
    
//     // Step 2: Get shelter_id from registration_shelter table using shelter_email
//     const fetchShelterIdQuery = `SELECT shelter_id FROM registration_shelter WHERE email = ?`;
    
//     db.query(fetchShelterIdQuery, [shelter_email], (shelterErr, shelterResults) => {
//       if (shelterErr || shelterResults.length === 0) {
//         console.error('Error fetching shelter ID:', shelterErr || 'Shelter not found');
//         return res.status(404).json({ success: false, message: 'Shelter not found' });
//       }
      
//       const { shelter_id } = shelterResults[0];
//       console.log('shelter_id:', shelter_id);

//       // Step 3: Insert into accepted_emergency
//       const acceptQuery = `
//         INSERT INTO accepted_emergency 
//         (report_id, user_id, shelter_id, address, contact, date, email, shelter_name, shelter_address, mobile_no) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      

//       db.query(acceptQuery, [
//         report_id, user_id, shelter_id, address, contact, formattedDate, email, shelter_name, shelter_address, mobile_no
//       ], (insertErr, insertResult) => {
//         if (insertErr) {
//           console.error('Error inserting accepted record:', insertErr);
//           return res.status(500).json({ success: false, message: 'Failed to insert accepted record' });
//         }

//         // Step 4: Delete from emergency_report
//         const deleteQuery = `DELETE FROM emergency_report WHERE report_id = ?`;

//         db.query(deleteQuery, [report_id], (deleteErr, deleteResult) => {
//           if (deleteErr) {
//             console.error('Error deleting emergency report:', deleteErr);
//             return res.status(500).json({ success: false, message: 'Accepted but failed to remove original report' });
//           }

//           res.json({ success: true, message: 'Emergency accepted and report removed successfully' });
//         });
//       });
//     });
//   });
// });



// to get accepted emergency record admin side

app.get('/om',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.accepted_emergency";

  db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});




// API route to get products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM product"; 
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    } else {
      // console.log("Fetched products:", results); // Debugging log
      res.json(results);
    }
  });
});

// API to place-order
// app.post("/place-order", (req, res) => {
//   const { email, address, card_number, expiry_date, cvv, payment_mode, products } = req.body;
  
//   console.log("Received body:", req.body);
//   if (!email || !address || !payment_mode || !products || products.length === 0) {
//     return res.status(400).json({ error: "Missing required order details" });
//   }

//   // Card details required only for card-based payments
//   if (payment_mode !== "Cash on Delivery") {
//     if (!card_number || !expiry_date || !cvv) {
//       return res.status(400).json({ error: "Card details are required for card payments" });
//     }
//   }

//   db.query("SELECT user_id FROM user_activity WHERE email = ?", [email], (err, userResult) => {
//     if (err) {
//       console.error("Error fetching user:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (!userResult || userResult.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const user_id = userResult[0].user_id;
//     const order_date = new Date().toISOString().split('T')[0];
//     const status = "Pending";
//     const orderId = `ORD${Date.now()}`;

//     let totalAmount = 0;
//     let totalProducts = 0;

//     products.forEach((item) => {
//       totalAmount += item.price * item.qty;
//       totalProducts += item.qty;
//     });

//     const orderQuery = `
//       INSERT INTO order_data 
//       (order_id, user_id, email, order_date, ship_address, status, order_items, total_amount, card_no, expiry_date, cvv, payment_mode)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(orderQuery, [
//       orderId, user_id, email, order_date, address, status,
//       totalProducts, totalAmount,
//       payment_mode !== "Cash on Delivery" ? card_number : null,
//       payment_mode !== "Cash on Delivery" ? expiry_date : null,
//       payment_mode !== "Cash on Delivery" ? cvv : null,
//       payment_mode
//     ], (err, result) => {
//       if (err) {
//         console.error("Error inserting order:", err);
//         return res.status(500).json({ error: "Failed to place order" });
//       }
//       console.log(result);
//       res.status(200).json({
//         success: true,
//         message: "Order placed successfully",
//         order_id: orderId,
//         total_products: totalProducts,
//       });
//     });
//   });
// });
app.post("/place-order", (req, res) => {
  const { email, address, card_number, expiry_date, cvv, payment_mode, products } = req.body;

  console.log("Received body:", req.body);
  if (!email || !address || !payment_mode || !products || products.length === 0) {
    return res.status(400).json({ error: "Missing required order details" });
  }

  if (payment_mode !== "Cash on Delivery") {
    if (!card_number || !expiry_date || !cvv) {
      return res.status(400).json({ error: "Card details are required for card payments" });
    }
  }

  db.query("SELECT user_id FROM user_activity WHERE email = ?", [email], (err, userResult) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!userResult || userResult.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_id = userResult[0].user_id;
    const order_date = new Date().toISOString().split('T')[0];
    const status = "Pending";
    const orderId = `ORD${Date.now()}`;

    let totalAmount = 0;
    let totalProducts = 0;

    // 1. Check stock availability for all products
    const checkStockQueries = products.map(item => {
      return new Promise((resolve, reject) => {
        db.query("SELECT qty FROM product WHERE product_id = ?", [item.product_id], (err, result) => {
          if (err) return reject(err);
          if (result.length === 0) return reject(new Error(`Product ID ${item.product_id} not found.`));
          const availableQty = result[0].qty;
          if (availableQty < item.qty) {
            return reject(new Error(`Only ${availableQty} items available for product ID ${item.product_id}`));
          }
          resolve();
        });
      });
    });

    Promise.all(checkStockQueries)
      .then(() => {
        // 2. Proceed with order calculation
        products.forEach(item => {
          totalAmount += item.price * item.qty;
          totalProducts += item.qty;
        });

        const orderQuery = `
          INSERT INTO order_data 
          (order_id, user_id, email, order_date, ship_address, status, order_items, total_amount, card_no, expiry_date, cvv, payment_mode)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(orderQuery, [
          orderId, user_id, email, order_date, address, status,
          totalProducts, totalAmount,
          payment_mode !== "Cash on Delivery" ? card_number : null,
          payment_mode !== "Cash on Delivery" ? expiry_date : null,
          payment_mode !== "Cash on Delivery" ? cvv : null,
          payment_mode
        ], (err, result) => {
          if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ error: "Failed to place order" });
          }

          // 3. Update product quantities
          const updateStockQueries = products.map(item => {
            return new Promise((resolve, reject) => {
              db.query("UPDATE product SET qty = qty - ? WHERE product_id = ?", [item.qty, item.product_id], (err) => {
                if (err) return reject(err);
                resolve();
              });
            });
          });

          Promise.all(updateStockQueries)
            .then(() => {
              res.status(200).json({
                success: true,
                message: "Order placed successfully",
                order_id: orderId,
                total_products: totalProducts,
              });
            })
            .catch((err) => {
              console.error("Error updating product stock:", err);
              res.status(500).json({ error: "Failed to update product stock" });
            });
        });
      })
      .catch((err) => {
        console.error("Stock check failed:", err.message);
        res.status(400).json({ error: err.message });
      });
  });
});






// get orders of the particular user
app.get("/orders/:email", (req, res) => {
  const email = req.params.email;

  db.query("SELECT * FROM order_data WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      console.log("No orders found");
      return res.status(200).json({ message: "You have not placed any orders yet" });
      // return res.status(404).json({ error: "No orders found for this user" });
    }

    res.status(200).json(results);
  });
});



// GET all orders for admin
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM order_data", (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// PATCH update order status
app.patch("/orders/:order_id", (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE order_data SET status = ? WHERE order_id = ?",
    [status, order_id],
    (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).json({ error: "Failed to update order status" });
      }
      res.status(200).json({ message: "Order status updated" });
    }
  );
});





// Chatbot API endpoint
app.post('/chatbot', async (req, res) => {
  const { message, user_id } = req.body;

  console.log("Received message:", message);
  console.log("Received user_id:", user_id);

  if (!message || !user_id) {
      return res.status(400).json({ response: "Invalid request. Message and user_id are required." });
  }

  db.query('SELECT response FROM chat WHERE message = ?', [message], (err, results) => {
      if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ response: "Sorry, there was an error processing your request." });
      }

      console.log("Query results:", results);

      if (results.length > 0) {
          const response = results[0].response;
          console.log("Chatbot response:", response);
          // const interactionDate = new Date().toISOString();
          const interactionDate = new Date().toISOString().split('T')[0];

          // Log the chat data to the chat_data table
          db.query(
              'INSERT INTO chat_data (user_id, interaction_date, message, response) VALUES (?, ?, ?, ?)',
              [user_id, interactionDate, message, response],
              (err) => {
                  if (err) {
                      console.error("Error logging interaction:", err);
                  }
              }
          );

          return res.json({ response });
      } else {
          console.log("No matching response found for:", message);
          return res.json({ response: "Sorry, I didn't understand that." });
      }
  });
});

// api to get the user data for updation
app.get('/user-details/:email', (req, res) => {
  const { email } = req.params;

  db.query('SELECT first_name AS name, mobile_no AS phone FROM registration_user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]); // { name: ..., phone: ... }
  });
});

// api to update user data by email
app.put('/update-user/:email', (req, res) => {
  const { email } = req.params;
  const { name, phone } = req.body;

  // Validation: Check for empty or null fields
  if (!name || !phone || name.trim() === '' || phone.trim() === '') {
    return res.status(400).json({ error: "Name and phone number are required and cannot be empty." });
  }

  db.query(
    'UPDATE registration_user SET first_name = ?, mobile_no = ? WHERE email = ?',
    [name.trim(), phone.trim(), email],
    (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Failed to update user" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "No user updated. Check email." });
      }

      res.json({ message: "User updated successfully" });
    }
  );
});


// API to fetch shelter details by email
app.get('/shelter-details/:email', (req, res) => {
  const { email } = req.params;

  db.query(
    'SELECT shelter_name AS name, mobile_no AS phone, shelter_address AS address FROM registration_shelter WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Shelter not found" });
      }

      res.json(results[0]); // { name: ..., phone: ... }
    }
  );
});

// API to update shelter data by email
app.put('/update-shelter/:email', (req, res) => {
  const { email } = req.params;
  const { name, phone, address } = req.body;

  // Basic validation
  if (!name || !phone || !address || name.trim() === '' || phone.trim() === '' || address.trim() === '') {
    return res.status(400).json({ error: "Name and phone number are required and cannot be empty." });
  }

  db.query(
    'UPDATE registration_shelter SET shelter_name = ?, mobile_no = ?, shelter_address = ? WHERE email = ?',
    [name.trim(), phone.trim(), address.trim(), email],
    (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Failed to update shelter" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "No shelter updated. Check email." });
      }

      res.json({ message: "Shelter updated successfully" });
    }
  );
});

// save image of new product
app.post('/products',uploadFile3.single('image'),(req,res) => {
  console.log(req);
  console.log(req.file.filename);
  //console.log(req.file);   
  const image = req.file.filename;
  return res.json(image);
})

// to add new product
app.post('/addProduct', uploadFile3.single('image'), (req, res) => {
  // const { id, name, category, description, price, qty } = req.body;
  const { name, category, description, price, qty } = req.body;
  const image = req.file?.filename;

  // if (!id || !name || !category || !description || !price || !qty || !image) {
  if ( !name || !category || !description || !price || !qty || !image) {
    return res.status(400).json({ message: 'All fields including image are required' });
  }

  const imgPath = imageBasePath3 + "/" + image;

  // const insertQuery = `
  //   INSERT INTO product (product_id, name, category, description, price, qty, imageUrl)
  //   VALUES (?, ?, ?, ?, ?, ?, ?)
  // `;

  const insertQuery = `
    INSERT INTO product (name, category, description, price, qty, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // db.query(insertQuery, [id, name, category, description, price, qty, imgPath], (err, result) => {
  db.query(insertQuery, [name, category, description, price, qty, imgPath], (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ message: "Something went wrong while adding product" });
    }

    res.status(200).json({ message: "Product added successfully", product_id: result.insertId });
  });
});

// update price or quantity
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { price, qty } = req.body;

  const fieldsToUpdate = [];
  const values = [];

  if (price !== undefined) {
    fieldsToUpdate.push('price = ?');
    values.push(price);
  }

  if (qty !== undefined) {
    fieldsToUpdate.push('qty = ?');
    values.push(qty);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update.' });
  }

  const updateQuery = `
    UPDATE product
    SET ${fieldsToUpdate.join(', ')}
    WHERE product_id = ?
  `;
  values.push(id);

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ message: 'Something went wrong while updating product' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  });
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM product WHERE product_id = ?`;

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Something went wrong while deleting the product' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  });
});







// API route to get a single product
app.get("/products/id", async (req, res) => {
  const { id } = req.params;
  const product = await db.query("SELECT * FROM product WHERE id = ?", [id]); // MySQL Example
  res.json(product[0]); 
});
app.get("/products/id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM product WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

