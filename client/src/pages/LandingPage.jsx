import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import Logo from "../components/Logo";


const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            doloremque sint laboriosam veritatis. Ipsam, eveniet cupiditate quo
            modi animi dicta ducimus dolore consectetur quam dolor doloribus
            ipsa hic fugiat eos?
          </p>
          <Link to='/register' className="btn register-link">Register</Link>
          <Link to='/login' className="btn">login/Demo</Link>
        </div>
        <img src={main} alt='job hunt' className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
