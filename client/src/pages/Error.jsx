import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper  from '../assets/wrappers/ErrorPage'

const Error = () => {
  const error = useRouteError()
  if(error.status === 404){
    return(
      <Wrapper>
        <div> 
          <img src={img} alt='page not found'></img>
          <h1>Oh Page is not found</h1>
          <Link to='/dashboard'>Back to Home</Link>
        </div>
      </Wrapper>
    )
  }
  return(
    <Wrapper>
      <div>
        <h1>Something went wrong</h1>
      </div>
    </Wrapper>
  )
}

export default Error