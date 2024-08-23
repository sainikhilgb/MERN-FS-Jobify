import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft} from 'react-icons/fa'
import Logo from './Logo'
import { useDashboardContext } from "../pages/DashboardLayout"
import LogoutContainer from "./LogoutContainer"
import ThemeToggle from "./ThemeToggle"

const NavBar = () => {
const  {toggleSidebar} = useDashboardContext()

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <Logo></Logo>
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle></ThemeToggle>
          <LogoutContainer></LogoutContainer>
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar