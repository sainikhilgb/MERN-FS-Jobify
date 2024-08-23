import Wrapper from '../assets/wrappers/StatItem'

const StatsItem = ({count,icon,title,color,bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
        <header>
            <span className='icon'>{icon}</span>
            <span className='count'>{count}</span>
        </header>
        <h4 className='title'>{title}</h4>
    </Wrapper>
  )
}

export default StatsItem