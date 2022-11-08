import { useState } from "react";
import { login } from "../../features/auth/authSlice";
import "../../pages/Login/index.css";
import { useDispatch } from "react-redux";

const LoginForm = ({ isLoading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="title">Login</div>
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
      <button className="submitbutton">Submit</button>
      {isLoading ? <div className="loader"></div> : null}
    </form>
  );
};
export default LoginForm;
