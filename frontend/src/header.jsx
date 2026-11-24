import { Link } from "react-router-dom";
import "./header.css";
import { CgProfile } from "react-icons/cg";

function Header() {
  return (
    <div className="header-main">
      <div>SMART CHEF</div>
      <Link to="/profile">
        <div>
          <CgProfile />
        </div>
      </Link>
    </div>
  );
}

export default Header;
