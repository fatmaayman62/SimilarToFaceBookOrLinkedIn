import { Input } from "@heroui/react"; 
import { Button } from "@heroui/react";
import React,{useContext,useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInAuth } from "../Services/AuthServices";
import { UserContext } from "../Context/UserContextProvider";

let Schema=zod.object({
  email:zod.string().nonempty('this is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'invalid email'),
  password:zod.string().nonempty('this is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'must exist capital , small letter , special character , number and length string 8 '),
})

function Login() {
  const {signed, setSigned}= useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate=useNavigate();

  let {register,handleSubmit,formState:{errors,touchedFields}}=useForm({
    defaultValues:{
      email:'',
      password:''
    },
    resolver:zodResolver(Schema),
    mode:'onBlur',
    reValidateMode:'onBlur',
  })

  async function logInUser(values) {
    setIsLoading(true);
    let response=await LogInAuth(values);

    if(response.message === "success"){
      localStorage.setItem('userTokenizer',response.token);
      setSigned(true);
      navigate('/');
    }else{
      setErrorMessage(response.error);
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className='sm:w-[85%] md:w-[65%]  w-full shadow-md rounded-2xl p-5 border border-gray-100 dark:bg-slate-800/50 dark:border-0 dark:text-gray-200'>
        <h2 className='text-center text-2xl font-medium text-blue-500'>LogIn</h2>
        <form onSubmit={handleSubmit(logInUser)} className="my-4"> 
          <Input
            variant="bordered"
            className="my-4"
            label="Email"
            type="email"
            isInvalid={Boolean(errors?.email?.message)}
            errorMessage={errors?.email?.message}
            {...register('email')}
          />
          <Input
            variant="bordered"
            className="my-4"
            label="Password"
            type="password"
            isInvalid={Boolean(errors?.password?.message && touchedFields.password)}
            errorMessage={errors?.password?.message}
            {...register('password')}
          /> 
          <Button isLoading={isLoading} type="submit" variant="bordered" className="w-full">
            LogIn
          </Button>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-0.5 ms-1">{errorMessage}</p>
          )}
          <p className="text-small my-1.5 ms-1">
            if you don't have account, please{" "}
            <Link className="text-blue-600" to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
