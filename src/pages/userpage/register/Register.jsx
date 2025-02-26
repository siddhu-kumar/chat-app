import React, { useContext, useState } from 'react'
import style from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../../services/user-service'
import { doLogin, getUserData, isLoggedIn } from '../../../auth'
import { UserContext } from '../../../context/userContext'
import { validation } from '../../../auth/validation'
import { emailValidate } from '../../../services/user-service'
const Register = () => {
  const {setAuth, setUserDetails, setReg} = useContext(UserContext)
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    name:"",
    email:"",
    contact:"",
    password:"",
  })

  const handleChange = async (e) => {
    const {name,value} = e.target;
    setUserInput({...userInput,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const isValidated = validation(userInput)

    if (isValidated.length === 0) {
      setUserDetails(userInput);
      emailValidate({email:userInput.email}).then(data => {
        console.log(data);
      })
      navigate('/otp-verify',{ state:{reg:true}})
    } else {
      isValidated.forEach(element => {
        alert(element)
      });
      return;
    }
    
  }

  return (
    <div className={style.Register}>
      <div className={style.RegisterHead}>
        <span>FriendyApp</span>
      </div>
      <div className={style.userInput}>
         <form onSubmit={handleSubmit}>
          <label htmlFor="text">User Name</label>
          <input type="text" 
            placeholder='Username must be atleast 4 letter.'
            name='name'
            value={userInput.username}
            onChange={handleChange}
          />
          <label htmlFor="email">User Email</label>
          <input type="text" 
            placeholder='Someone@example.com'
            name='email'
            value={userInput.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="contact">User Contact</label>
     
          <input type="text" 
            placeholder='+91 0123456789'
            name='contact'
            value={userInput.contact}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">User Password</label>
          <input type="password" 
            placeholder='Use strong passowrd.'
            name='password'
            value={userInput.password}
            onChange={handleChange}
            required
          />
          <button className={style.RegisterBtn} type='submit'>Register</button>
          <span>Already have an account? <Link to="/login">Log-In here</Link> !</span> 
         </form>
      </div>
    </div>
  )
}

export default Register