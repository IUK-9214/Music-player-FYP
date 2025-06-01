const router = require("express").Router();

const user = require("../models/user");

const admin = require("../config/firebase.config");
const { Router } = require("express");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "invalid Token" });
  }

  const Token = req.headers.authorization.split(" ")[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(Token);
    if (!decodeValue) {
      return res.status(505).json({ message: "Un Athuorized " });
    } else {
      //checking if user is exist or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id });

      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});
//user data storing ;
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

//checking the user is exist if yes sp  update the in data base  the timing in which he entered
const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    //this line will update the database and send the data to data base
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};
router.get("/getUsers", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  try {
    const cursor = await user.find({}, null, options); 
    if (cursor.length > 0) {
      res.status(200).send({ success: true, data: cursor });
    } else {
      res.status(404).send({ success: false, msg: "No users found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server error" });
  }
});

router.put("/updateRole/:userId",async(req,res)=>{
  const filter={_id : req.params.userId}
  const role=req.body.data.role;

  
try {
  const result= await user.findOneAndUpdate(filter,{role : role});
  res.status(200).send({user:result})
} catch (error) {
   res.status(400).send({ success: false, msg: error });
}

})

router.delete("/deleteUser/:userId",async (req,res)=>{
  const filter={_id : req.params.userId}
const result= await user.deleteOne(filter);  

if (result.deletedCount===1){
  res.status(200).send({success:true ,msg: "User Removed"})
}else{
  res.status(500).send({success:false ,msg: "Data Not found"})
}


})


module.exports = router;
