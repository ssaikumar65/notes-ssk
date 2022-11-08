import { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { ProtectedLoginRoute } from "../../components/ProtectedRoute";

const Login = () => {
  const [form, setForm] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast(message);
    }

    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <ProtectedLoginRoute user={user}>
      <div className="mainContent">
        <div className="leftContent">
          <div className="heroHolder">
            <span className="heroName">NOTES</span>
          </div>
          <div className="captionHolder">
            <span className="caption">
              A vault to store your <span className="fancy">thoughts</span>.
            </span>
          </div>
          <div className="buttons">
            <div onClick={() => setForm(true)} className="login">
              Login
            </div>
            <div onClick={() => setForm(false)} className="signup">
              Sign Up
            </div>
          </div>
        </div>
        <div className="rightContent">
          {form ? (
            <LoginForm isLoading={isLoading} />
          ) : (
            <RegisterForm isLoading={isLoading} />
          )}
        </div>
      </div>
    </ProtectedLoginRoute>
  );
};
export default Login;
