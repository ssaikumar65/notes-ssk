import "./index.css";
import {
  MdViewHeadline,
  MdGridView,
  MdLightMode,
  MdDarkMode,
  MdRefresh,
  MdDescription,
} from "react-icons/md";
import { IconContext } from "react-icons";
import HeaderIcon from "../HeaderIcon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { getNotes } from "../../features/notes/notesSlice";

const Header = ({ view, setView }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light") {
      document.documentElement.style.setProperty("--primary", "white");
      document.documentElement.style.setProperty("--secondary", "#202124");
    } else if (localTheme === "dark") {
      document.documentElement.style.setProperty("--primary", "#202124");
      document.documentElement.style.setProperty("--secondary", "white");
    } else {
      document.documentElement.style.setProperty("--primary", "#202124");
      document.documentElement.style.setProperty("--secondary", "white");
    }
  }, [theme]);

  const themeHandler = () => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--primary", "white");
      document.documentElement.style.setProperty("--secondary", "#202124");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    if (theme === "light") {
      document.documentElement.style.setProperty("--primary", "#202124");
      document.documentElement.style.setProperty("--secondary", "white");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logoHolder">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <MdDescription />
        </IconContext.Provider>
        &nbsp; Notes
      </div>
      <div className="headerIcons">
        <div onClick={() => dispatch(getNotes())} className="icons">
          <HeaderIcon content={<MdRefresh />} />
        </div>
        {view === "grid" ? (
          <div className="icons gridview" onClick={() => setView("list")}>
            <HeaderIcon content={<MdViewHeadline />} />
          </div>
        ) : (
          <div className="icons gridview" onClick={() => setView("grid")}>
            <HeaderIcon content={<MdGridView />} />
          </div>
        )}
        {theme === "dark" ? (
          <div className="icons" onClick={themeHandler}>
            <HeaderIcon content={<MdLightMode />} />
          </div>
        ) : (
          <div className="icons" onClick={themeHandler}>
            <HeaderIcon content={<MdDarkMode />} />
          </div>
        )}
        <div className="profileName">
          {user && (
            <div onClick={onLogout} className="button">
              <span className="name">{user.name}</span>
              <span className="logout">Logout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
