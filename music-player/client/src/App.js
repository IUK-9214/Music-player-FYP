import React, { useEffect, useState } from 'react'
import "./index.css";
import { data, Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboard, Home,Login } from './components';
import { app } from './config/firebase.config';

import { getAuth } from 'firebase/auth';

import {AnimatePresence} from 'framer-motion'
import { validateUser } from './api';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const App = () => {

const firebaseAuth= getAuth(app);
const navigate=useNavigate();

const [{user},dispatch]= useStateValue();
  
const[auth,setAuth]=useState(false || window.localStorage.getItem("auth")==="true");

useEffect(()=>{

  firebaseAuth.onAuthStateChanged((userCred)=>{

  if (userCred){
userCred.getIdToken().then((token)=>{
 // console.log(token); and import the validate user  
validateUser(token).then((data)=>{
  
  dispatch({
type :actionType.SET_USER,
user : data
  })


});
});
}
else{
  setAuth(false);
  window.localStorage.setItem("auth",false);
  dispatch({
    type :actionType.SET_USER,
    user : null
  })
  navigate("/login")
}

})
},[])

  return (
    //this is for the when on load firt complete the animation
    //the /* is use in the home when ever use the / path it will navigate to the home page
    <AnimatePresence exitBeforeEnter>

   
    <div className=' h-auto min-w-[680px] bg-primary flex justify-center items-center'>
<Routes>
  <Route path='/login' element={<Login setAuth={setAuth}/>} />
  <Route path='/*' element={<Home/>} /> 
  <Route path='/dashboard/*' element={<Dashboard/>}/>
</Routes>
  </div>
  </AnimatePresence>
  )
}

export default App