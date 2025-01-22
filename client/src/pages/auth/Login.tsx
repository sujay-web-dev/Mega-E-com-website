import CommonForm from '@/components/common/Form'
import { loginFormControl } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState = {
  email:"",
  password:""
}

function AuthLogin() {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title:data?.payload.message
        })
      } else {
        toast({
          title:data?.payload.message,
          variant:"destructive"
        })
      }
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to Your Account</h1>
        <p className='mt-2'>Don't have an account 
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>Register</Link>
        </p>
      </div>
      <CommonForm
      formControls={loginFormControl}
      formData={formData}
      setFormData={setFormData}
      buttonText="Sign In"
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin;