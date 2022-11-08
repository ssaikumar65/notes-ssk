import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../features/auth/authSlice";
import "../../pages/Login/index.css";

const RegisterForm = ({ isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { name, email, password, cpassword } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="title">Register</div>
      <input
        type="name"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="cpassword"
        value={cpassword}
        placeholder="Confirm password"
        onChange={onChange}
        required
      />
      <button className="submitbutton">Submit</button>
      {isLoading ? <div className="loader"></div> : null}
    </form>
  );
};
export default RegisterForm;
