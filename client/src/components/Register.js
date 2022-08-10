import React, {Fragment, useState} from 'react'
import AuthenticationProcess from '../apis/AuthenticationProcess';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"


const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const { email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        
        try {
         
            const response = await AuthenticationProcess.post("/auth/register", {
              name,
              email,
              password
            })
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("Registered Successfully!")
            }else{
                setAuth(false)

                toast.error("Something is Missing")
            }
            
           

            

           // console.log(response.data.token)
            
        } catch (error) {
            console.error(error.message)
            
        }


    }
  return (
      <Fragment>
        <h1 className='text-center my-5'>Register</h1>
        <form onSubmit={onSubmitForm}>
         <input value={email} onChange={e => onChange(e)} type="email" name="email" placeholder="email" className='form-control my-3'/>
         <input value={password} onChange={e => onChange(e)} type="password" name="password" placeholder="password" className='form-control my-3'/>
         <input value={name} onChange={e => onChange(e)} type="text" name="name" placeholder="name" className='form-control my-3'/>
        <button className='btn btn-success btn-block'>Submit</button>
        <Link className='btn btn-primary mt-5' to="/login">Login</Link>
        </form>
        </Fragment>
  )
}

export default Register