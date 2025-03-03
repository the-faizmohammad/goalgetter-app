import PropTypes from "prop-types";
import "../styles/InputField.css";

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
