import Header from "../../components/Header";
import Dashboard from "../../components/Dashboard";
import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/notes/notesSlice";
import ProtectedRoute from "../../components/ProtectedRoute";
import { toast } from "react-toastify";

const Home = () => {
  const [view, setView] = useState("grid");
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast(message);
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <ProtectedRoute user={user}>
      <Header view={view} setView={setView} />
      <Dashboard view={view} />
    </ProtectedRoute>
  );
};
export default Home;
