import Wrapper from "../assets/wrappers/BigSidebar"
import { useDashboardContext } from "../pages/DashboardLayout"
import Logo from "./Logo"
import Navlinks from "./Navlinks"

const BigSidebar = () => {
  const {showSidebar} = useDashboardContext()
  return (
    <Wrapper>
      <div className={showSidebar?"sidebar-container":"sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo></Logo>
          </header>
          <Navlinks isBigSidebar></Navlinks>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar