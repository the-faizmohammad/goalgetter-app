import PropTypes from "prop-types";
import "../styles/Button.css";

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button className={`btn ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
