import CommonForm from '@/components/common/Form'
import { registerFormControl } from '@/config'
import { useToast } from "@/hooks/use-toast"
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  userName:"",
  email:"",
  password:""
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        toast({
          title:data?.payload?.message
        })
        navigate('/auth/login')
      } else {
        console.log(data);
         
        toast({
          title:data?.payload?.message,
          variant:'destructive'
        })
      }
    })
    
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already Have an Account
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
        </p>
      </div>
      <CommonForm
      formControls={registerFormControl}
      formData={formData}
      setFormData={setFormData}
      buttonText="Sign Up"
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister;