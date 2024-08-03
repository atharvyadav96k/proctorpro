var express = require('express');
var router = express.Router();
const StudentSchema = require('./users');
const presentSchema = require('./presnty');
const collegeDay = require('./collegeDays');
const loginSchema = require('./login');
var encryptor = require('simple-encryptor')("Hello Mother Father");
async function isLoggedIn(req, res, next) {
  if (!Object.keys(req.cookies).length) {
    return res.redirect('/login');
  }
  try {
    const userData = await loginSchema.findOne({ username: req.cookies.login.username });
    if (userData && userData.approved) {
      if (req.cookies.login.password == encryptor.decrypt(userData.password)) {
        return next();
      }
      else {
        res.render("login")
      }
    } else {
      res.render("error", { message: "Internal server error", code: "500" })
    }
    next();
  } catch (error) {
    console.log(error)
    res.send("<h1>Internal Server error!!");
  }
}
router.get('/', function (req, res) {
  res.render('index')
});
router.get('/register/student', function (req, res) {
  res.render('upload')
})
router.get('/fsdjghjksdghsdgsdgdf/g09sdg80dsg9g-dsgds/gd9-gd-sgsdg9df0g8ds0fgdsfg',  async function (req, res) {
  try {
    const data = await loginSchema.find();
    res.render('admin', {
      data: data.reverse()
    });
  } catch (error) {
    console.log(error)
    res.send("<h1>Internal server error<h1>")
  }

})
router.post('/approve',  async function (req, res) {
  try {
    const data = await loginSchema.findOneAndUpdate({ username: req.body.username }, { approved: true }, { new: true });
    res.status(200).send({ message: "approved successfully", success: true })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error}`, success: false })
  }
})
router.post('/unauthorize',  async function (req, res) {
  try {
    const data = await loginSchema.findOneAndUpdate({ username: req.body.username }, { approved: false }, { new: true });
    res.status(200).send({ message: "unauthorized successfully", success: true })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error}`, success: false })
  }
})
router.post('/setClass',  async function (req, res) {
  const { username, Class, div, dep } = req.body;
  try {
    const data = await loginSchema.findOneAndUpdate({ username }, { proctorClass: Class, proctorDep: dep, proctorDiv: div }, { new: true });
    res.status(200).send({ message: 'data updated successfully', success: true });
  } catch (error) {
    res.status(500).send({ message: `error: ${error}`, success: false })
  }
})
router.post('/deleteClass',  async function (req, res) {
  const { username } = req.body;
  try {
    const data = await loginSchema.findOneAndUpdate({ username }, { $unset: { proctorClass: "", proctorDep: "", proctorDiv: "" } }, { new: true });
    res.status(200).send({ message: 'data updated successfully', success: true });
  } catch (error) {
    res.status(500).send({ message: `error: ${error}`, success: false })
  }
})
router.get('/user/:username',  async function (req, res) {
  const data = await loginSchema.findOne({ username: req.params.username });
  let Class, dep, div;
  if (data) {
    if (data.proctorClass) {
      Class = data.proctorClass;
      dep = data.proctorDep;
      div = data.proctorDiv;
    }
    else {
      Class = 'No';
      dep = 'No';
      div = 'No';
    }
    res.render('user', { username: req.params.username, phoneNumber: data.mobileNumber, approveData: data.approved, Class, dep, div })
  }
  else {
    res.send('User Not found')
  }

})
router.get('/api/v1/connect', function (req, res) {
  res.status(200).send({
    message: 'Connected Successfully',
    success: true
  });
})
router.get("/login", async function (req, res) {  
  res.render("login")
})
router.post('/login', async function (req, res) {
  return res.redirect('/fsdjghjksdghsdgsdgdf/g09sdg80dsg9g-dsgds/gd9-gd-sgsdg9df0g8ds0fgdsfg')
})
router.post('/api/v1/login', async function (req, res) {
  const { username, password } = req.body;
  console.log(username, password)
  try {
    const userData = await loginSchema.findOne({ username });
    console.log(userData);
    if (userData && userData) {
      if (password == encryptor.decrypt(userData.password)) {
        console.log(password, password);
        res.send({ success: true, approved: true, Class: userData.proctorClass, dep: userData.proctorDep, div: userData.proctorDiv });
      }
      else {
        console.log(failed);
        res.send({ success: false, approved: false });
      }
    }
    else {
      res.status(201).send({ success: false, approved: false })
    }
    console.log(userData)

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `error:  ${error}`,
      success: false
    });
  }
});
router.post('/api/v1/register', async function (req, res) {
  const { username, password, mobileNumber } = req.body;
  if (username.length < 4) {
    res.status(500).send({ message: "length of username length >  6" })
  }
  else if (mobileNumber.length < 10) {
    res.status(500).send({ message: 'Invalid Number' });
  }
  else if (password.length < 6) {
    res.status(500).send({ message: "length of password length >  6" })
  }
  else {
    try {
      const userData = new loginSchema({
        username, password: encryptor.encrypt(password), mobileNumber
      });
      await userData.save();
      res.status(200).send({
        message: "Registration Successful",
        success: true
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: `Registration failed ${error}`,
        success: false
      })
    }
  }

})
router.post('/api/v1/addStudents', async function (req, res) {
  try {
    const { name, prlNumber, rollNumber, email, password, department, Class, div, phoneNumber } = req.body;
    console.log(name, prlNumber, rollNumber, email, password, department, Class, div, phoneNumber);
    const studentData = new StudentSchema({
      name,
      prlNumber,
      rollNumber,
      email,
      password: encryptor.encrypt(password),
      department,
      Class,
      div,
      phoneNumber
    });
    const studentSavedData = await studentData.save();
    console.log(studentSavedData);
    res.status(200).send({
      message: `${name} data saved successfully`,
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "error to save student details",
      success: false
    });
  }
});
router.post('/api/v1/getStudents', async function (req, res) {
  const { div, department, Class } = req.body;
  try {
    const students = await StudentSchema.find({
      div: div,
      department: department,
      Class: Class
    });
    console.log(students)
    res.status(200).send({
      students,
      message: "Students Details",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong while fetching data",
      success: false
    });
  }
});
router.post('/api/v1/presenty', async function (req, res) {
  const { studentId, lecture, status, Class, department, div } = req.body;
  const today = new Date();
  console.log(today.getFullYear(), today.getMonth(), today.getDate());
  try {
    const presentData = await presentSchema.find({
      studentId: studentId,
      date: today.getDate(),
      year: today.getFullYear(),
      month: today.getMonth(),
      lecture: lecture,
    });
    console.log("length", presentData.length);
    console.log(presentData)
    if (presentData.length == 0) {
      try {
        const setPresent = new presentSchema({
          studentId: studentId,
          date: today.getDate(),
          year: today.getFullYear(),
          month: today.getMonth(),
          lecture: lecture,
          status: status,
          Class: Class,
          department: department,
          div: div
        });
        const savedData = await setPresent.save();
        res.status(200).send({
          message: 'saved successfully',
          success: true
        });
      } catch (error) {
        res.status(500).send({
          message: "error",
          success: false
        })
      }
    }
    else {
      try {
        const data = await presentSchema.deleteOne({
          studentId: studentId,
          date: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear(),
          lecture: lecture
        });
        res.status(200).send({
          message: "presenty Updated Succefully",
          success: true
        })
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
router.post('/api/v1/getTodayPresent', async function (req, res) {
  const { Class, department, div } = req.body;
  console.log(Class, department, div)
  const date = new Date();
  try {
    const getData = await presentSchema.find({
      Class: Class,
      department: department,
      div: div,
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    }).populate('studentId');
    const studentData = [];
    getData.forEach((ele) => {
      let count = 0;
      console.log(ele.studentId._id)
      for (let i = 0; i < studentData.length; i++) {
        if (ele.studentId._id == studentData[i]._id) {
          count++;
        }
      }
      if (count == 0) {
        studentData.push(ele.studentId);
      }
    });
    const finalData = []
    studentData.forEach((ele) => {
      let count = 0;
      for (let i = 0; i < getData.length; i++) {
        if (ele._id == getData[i].studentId._id) {
          count++;
        }
      }
      if (count == 6) {
        finalData.push(ele);
      }
    })
    console.log(finalData)
    res.status(200).send({
      studentData: finalData,
      success: true,
      message: "Absent students"
    })
  } catch (error) {
    res.status(500).send({
      message: `error: ${error}`,
      success: false
    });
  }
});
router.post('/api/v1/getTodayBunk', async function (req, res) {
  const { Class, department, div } = req.body;
  console.log(Class, department, div)
  const date = new Date();
  try {
    const getData = await presentSchema.find({
      Class: Class,
      department: department,
      div: div,
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    }).populate('studentId');
    const studentData = [];
    getData.forEach((ele) => {
      let count = 0;
      console.log(ele.studentId._id)
      for (let i = 0; i < studentData.length; i++) {
        if (ele.studentId._id == studentData[i]._id) {
          count++;
        }
      }
      if (count == 0) {
        studentData.push(ele.studentId);
      }
    });
    const finalData = []
    studentData.forEach((ele) => {
      let count = 0;
      for (let i = 0; i < getData.length; i++) {
        if (ele._id == getData[i].studentId._id) {
          count++;
        }
      }
      const newOject = {
        _id: ele._id,
        name: ele.name,
        prlNumber: ele.prlNumber,
        rollNumber: ele.rollNumber,
        email: ele.email,
        password: ele.pass,
        department: ele.department,
        Class: ele.Class,
        div: ele.div,
        phoneNumber: ele.phoneNumber,
        absentLectures: count
      }
      if (count < 6) {
        finalData.push(newOject)
      }
    })
    console.log(finalData)
    res.status(200).send({
      studentData: finalData,
      success: true,
      message: "Absent students"
    })
  } catch (error) {
    res.status(500).send({
      message: `error: ${error}`,
      success: false
    });
  }
});
router.post('/api/v1/getTodayPresentStudent', async function (req, res) {
  const { studentId, lecture } = req.body;
  const today = new Date();
  try {
    const getData = await presentSchema.findOne({
      studentId: studentId,
      lecture: lecture,
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    });
    console.log(getData)
    if (getData) {
      res.status(200).send({ Data: true });
    }
    else {
      res.status(200).send({ Data: false });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error })
  }
})
router.post('/api/v1/collegeDays', async function (req, res) {
  const { day, month, year } = req.body;
  console.log(day, month, year);
  if (day == undefined && month == undefined && year == undefined) {
    res.status(500).send({
      message: "Invalid inputs",
      success: false
    })
  }
  else if (day == undefined && month == undefined && year != undefined) {
    try {
      const data = await collegeDay.find({ year: year });
      res.status(200).send({
        message: "college days data",
        data: data,
        success: true
      })
    } catch (error) {
      res.status(500).send({
        message: "please enter correct data",
        success: false
      })
    }
  }
  else if (day == undefined && month != undefined && year != undefined) {
    try {
      const data = await collegeDay.find({ year: year, month: month });
      res.status(200).send({
        message: "college days data",
        data: data,
        success: true
      })
    } catch (error) {
      res.status(500).send({
        message: "please enter correct data",
        success: false
      })
    }
  }
  else if (day != undefined && month != undefined && year != undefined) {
    try {
      const data = await collegeDay.find({ year: year, month: month, day: day });
      res.status(200).send({
        message: "college days data",
        data: data,
        success: true
      })
    } catch (error) {
      res.status(500).send({
        message: "please enter correct data",
        success: false
      })
    }
  }
  else {
    res.status(500).send({
      message: "Invalid inputs",
      success: false
    })
  }
});

module.exports = router;