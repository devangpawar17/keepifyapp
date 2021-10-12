const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "Devangopboltenoobde";

//create a user using : POST '/api/auth/createuser' regsistration
//ROUTE 1 CREATING USER
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password error 5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if their are errors return bad req and errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "user exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      
    success = true
      res.json({ success,authToken });
    } catch (e) {
      console.log(e);
      res.status(500).send("internal error occured");
    }
  }
);

//authenticate using :  POST '/api/auth/login'
//ROUTE 2 LOGIN USER

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please use correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);

      if (!passwordcompare) {
        success = false
        return res
          .status(400)
          .json({ success,error: "please use correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success,authToken });
    } catch (e) {
      console.log(e);
      res.status(500).send("internal server error occured");
    }
  }
);

//ROUTE 3 : get logged in user details .:post /getuser login required

router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (e) {
      console.log(e);
      res.status(500).send("internal server error occured");
    }
  }
);

module.exports = router;
