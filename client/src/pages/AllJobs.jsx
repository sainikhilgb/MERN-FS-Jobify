import { toast } from 'react-toastify';
import { JobContainer, SearchContainer } from '../components';
import {customFetch} from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
const AllJobsContext = createContext()
export const loader = async({request})=>{
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    
    const {data} = await customFetch.get('/jobs',{params})
    return {data,searchValues: { ...params }}
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}


const AllJobs = () => {
  const {data,searchValues} = useLoaderData()

  return (
    <AllJobsContext.Provider value={{data,searchValues}}>
    <SearchContainer></SearchContainer>
    <JobContainer></JobContainer>    
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = ()=>useContext(AllJobsContext)
export default AllJobs