import Jobs from './Job'
import {useAllJobsContext} from '../pages/AllJobs'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const JobContainer = () => {

    const {data} = useAllJobsContext()
    const {jobs,totalJobs,numOfPages} = data
    if(jobs.length === 0){
        return <Wrapper>
            <h2>No Jobs available...</h2>
        </Wrapper>
    }
  return (
    <Wrapper>
        <h5>{totalJobs}Job{jobs.length >1 && 's'}</h5>
        <div className="jobs">
            {jobs.map((job)=>{
                return <Jobs key={job._id} {...job}>
                </Jobs>
            })}
        </div>
        {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobContainer