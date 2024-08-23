import { FaSuitcaseRolling, FaCalendarCheck, FaBug,FaClipboardCheck } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatsItem from './StatsItem';
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
        title: 'accepted applications',
        count: defaultStats?.accepted || 0,
        icon: <FaClipboardCheck />,
        color: '#0cf54e',
        bcg: '#f3ffee',
      },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatsItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;