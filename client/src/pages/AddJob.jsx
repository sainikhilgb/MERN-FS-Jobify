import { FormRow, FormRowSelect,SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {customFetch} from '../utils/customFetch';


export const action = async({request})=>{

  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  try {
    await customFetch.post('/jobs',data)
    toast.success('Job added successful');
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
const AddJob = () => {

  const {user} = useOutletContext()
  
  
  return (
    <Wrapper>

    <Form method='post' className='form'>
      <h4 className='form-title'>Add Job</h4>
      <div className='form-center'>
      <FormRow type='text' name='position'></FormRow>
      <FormRow type='text' name='company'></FormRow>
      <FormRow type='text' name='jobLocation' labelText='job Location' defaultValue={user.location}></FormRow>
      <FormRowSelect labelText='job Status'
       name='jobStatus' 
       defaultValue={JOB_STATUS.PENDING} 
       list={Object.values(JOB_STATUS)}></FormRowSelect>

<FormRowSelect labelText='job Type'
       name='jobType' 
       defaultValue={JOB_TYPE.FULL_TIME} 
       list={Object.values(JOB_TYPE)}></FormRowSelect>
      <SubmitBtn form_btn></SubmitBtn>
      </div>
    </Form>
    </Wrapper>
  )
}

export default AddJob