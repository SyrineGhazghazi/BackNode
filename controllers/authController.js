const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const User= require('../models/user.model')
const router = express.Router()
const secretKey = "nodejsexpress";



//register
router.post('/register',async(req,res)=>{
    try{
    
const{username, password}=req.body;
const user= new User({username,password});
//console.log(user);
await user.save()
res.status(201).send('user registred successfully')
res.status(201).render('home', { title: 'Registration Successful', message: 'User registered successfully' });
    }catch(error){
res.status(400).send(error.message)
    }
})


//login
router.post('/login',async (req,res)=>{
  try{
    const {username,password}=req.body;
    
    const user= await User.findOne({username: username});
    if(!user){
       res.status(404).send('user not found')
    }

    const isPasswordMatch= await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(404).send('verification failed user not found')
        }
    const token = jwt.sign({id:user._id},secretKey)
    res.send({token:token})
  }catch(error) {
    res.status(400).send(error.message)
  }
})






// logout
router.post('/logout', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(400).json({ msg: 'No token, authorization denied' });
  }

  try {
    jwt.verify(token, secretKey);
   
    res.json({ msg: 'User logged out' });
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
});


module.exports=router