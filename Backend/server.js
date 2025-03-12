const path = require('path');
const multer = require('multer');
const express = require('express')
const mysql = require('mysql')
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



// Create a connection pool
// const db = mysql.createPool({
//   connectionLimit: 100, // Adjust based on your application's needs
//   host: 'localhost',
//   user: 'root',
//   password: 'OmSomani@789',
//   database: 'animal',
// });

const db = mysql.createPool({
  connectionLimit: 100, // Adjust based on your application's needs
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'animal',
});


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

const uploadFile2 = multer({
  storage: storage2,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType  = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType  = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});


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
      text: 'Thank you for Joining with Animal_ResQ! Your account is now active,you can login now.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

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
  //console.log(req.file);   
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

  const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ?';
  db.query(getUserInfoSql, [email], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const lastLoginTime = new Date();
    const img = imageBasePath + "/" +image;
    const logLastLoginSql = 'INSERT INTO emergency_report (`unique_id`, `address`, `contact`, `photo_url`, `date`, `email`) VALUES (?, ?, ?, ?, ?,?)';
    db.query(logLastLoginSql, [user.unique_id, address, contact, img, lastLoginTime, email ], (logErr) => {
      if (logErr) {
        console.error('Error logging last login', logErr);
      }
      res.json("reported successfully");
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ? AND password = ?';
  db.query(getUserInfoSql, [email,password], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const lastLoginTime = new Date().toISOString();
    const logLastLoginSql = 'INSERT INTO user_activity (unique_id, email, login_time) VALUES (?, ?, ?)';
    db.query(logLastLoginSql, [user.unique_id, email, lastLoginTime], (logErr) => {
      if (logErr) {
        console.error('Error logging last login', logErr);
      }
      res.json("login successfully");
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

  const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ?';
  db.query(getUserInfoSql,[email], (err,results) => {
    if(err) return res.json(err);
    if(results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const img =  imageBasePath2 +"/" +image;
    const logLastLoginSql = "INSERT INTO animal_for_adoption (`unique_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(logLastLoginSql,[user.unique_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
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

  const getUserInfoSql = 'SELECT unique_id FROM registration_shelter WHERE email = ?';
  db.query(getUserInfoSql,[email], (err,results) => {
    if(err) return res.json(err);
    if(results.length === 0) {
      return res.json('no record');
    }
    const user = results[0];
    const img =  imageBasePath2 +"/" +image;
    const logLastLoginSql = "INSERT INTO animal_for_adoption (`unique_id`,`animal_name`, `species`, `age` , `description` , `image_url`,  `mobile_no`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(logLastLoginSql,[user.unique_id, animal_name, species, age, description, img, mobile_no, email], (logErr) => {
      if (logErr) {
        console.error("error logging last login",logErr);
      }
      res.json("post successfully");
    });
  });
});



app.post('/loginn', (req, res) => {
  const { email, password } = req.body;
  const getUserInfoSql = 'SELECT unique_id, mobile_no,shelter_name,shelter_address FROM registration_shelter WHERE email = ? AND password = ?';

  db.query(getUserInfoSql, [email, password], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('no record');
    }

    const user = results[0];
    const lastLoginTime = new Date().toISOString(); // Local time of the server

    const logLastLoginSql = 'INSERT INTO shelter_activity (unique_id, mobile_no, email, login_time, shelter_name, shelter_address) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(logLastLoginSql, [user.unique_id, user.mobile_no, email, lastLoginTime, user.shelter_name, user.shelter_address], (logErr) => {
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
  const { unique_id, newName, newEmail, newContact } = req.body;
  const sql = 'UPDATE registration_user SET first_name = ? , email = ? , mobile_no = ? WHERE unique_id = ?';
  db.query(sql, [newName, newEmail, newContact, unique_id], (err, result) => {
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
  const { unique_id, newName, newEmail, newContact, newAddress } = req.body;
  const sql = 'UPDATE registration_shelter SET shelter_name = ? , email = ? , mobile_no = ? , shelter_address = ? WHERE unique_id = ?';
  db.query(sql, [newName, newEmail, newContact, newAddress, unique_id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data updated successfully');
      res.status(200).send('Data updated successfully');
    }
  });
});

app.delete('/deleteUser/:unique_id', (req, res) => {
  const unique_id = req.params.unique_id;

  const deleteQuery = 'DELETE FROM registration_user WHERE unique_id = ?';

  db.query(deleteQuery, [unique_id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});

app.delete('/deleteshelter/:unique_id', (req, res) => {
  const unique_id = req.params.unique_id;

  const deleteQuery = 'DELETE FROM registration_shelter WHERE unique_id = ?';

  db.query(deleteQuery, [unique_id], (err, result) => {
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

  const om = 'SELECT email,mobile_no FROM shelter_activity ORDER BY activity_id DESC LIMIT 1; ';

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


app.post('/ratings', (req, res) => {
  const { email,feedback } = req.body;
  const getUserInfoSql = 'SELECT unique_id FROM registration_user WHERE email = ? ';
  db.query(getUserInfoSql, [email], (err, results) => {
    if (err) return res.json(err);
    if (results.length === 0) {
      return res.json('submitted successfully');
    }
    const user = results[0];
    const logLastLoginSql = 'INSERT INTO ratings (unique_id, email, feedback) VALUES (?, ?, ?)';
    db.query(logLastLoginSql, [user.unique_id, email,feedback], (logErr) => {
      if (logErr) {
        console.error('Error logging last login', logErr);
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
  const query = 'SELECT unique_id FROM registration_user ORDER BY unique_id DESC LIMIT 1';

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
  const query = 'SELECT unique_id FROM registration_shelter ORDER BY unique_id DESC LIMIT 1';

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
 (SELECT mobile_no,shelter_name,shelter_address FROM shelter_activity ORDER BY activity_id DESC LIMIT 1) sa;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result[0]);
    }
  });
});

app.post('/api/acceptRecord', (req, res) => {
  const acceptQuery = 'INSERT INTO accepted_emergency (address, contact, date, email, shelter_name, shelter_address, mobile_no) VALUES (?, ?, ?, ?, ?, ?, ?)';

  // Assuming req.body contains the data received from /api/accepted
  const { address, contact, date, email, shelter_name, shelter_address, mobile_no } = req.body;

  // Adjust the date format to 'YYYY-MM-DD HH:MM:SS'
  const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

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

app.get('/om',(req,res) =>{
  console.log(req.query.id);
  const sql = "SELECT * FROM animal.accepted_emergency";

db.query(sql, (err, data) => {
    console.log(err);
    if(err) return res.json(err);
    return res.json(data);
  })
});



app.listen(PORT, () => {
    console.log('Server is running on port');
  });


// this is chatbot 
app.post("/chatbot", (req, res) => {  
    res.json({ response: "Hello! How can I help?" });
});
