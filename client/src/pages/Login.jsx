import { Link,redirect,Form, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login',data)
    toast.success('Login successful');
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
const Login = () => {
  const navigate = useNavigate()
  const loginDemo = async()=>{
    const data={
    email: 'test@test.com',
    password: 'secret123',
  };
  try {
    await customFetch.post('/auth/login',data)
    toast.success('take a test drive');
    navigate('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  }

  return (
    <Wrapper>
      <Form method = 'post'className='form'>
      <Logo></Logo>
      <h4>Login</h4>
      <FormRow type='email' name='email' ></FormRow>
      <FormRow type='password' name='password' ></FormRow>

      <SubmitBtn></SubmitBtn>
      <button type='button' className="btn btn-block" onClick={loginDemo}>Explore the app</button>
      <p>Not a member yet? <Link to='/register' className='member-btn'>Register</Link></p>
      </Form>
    </Wrapper>
  )
}

export default Login