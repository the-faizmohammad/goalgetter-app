import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@slices/authSlice";
import "../styles/SignoutButton.css";

const SignoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button className="signout-btn" onClick={handleLogout} aria-label="Sign Out">
      Sign Out
    </button>
  );
};

export default SignoutButton;
