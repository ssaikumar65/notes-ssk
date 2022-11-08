import "./index.css";
import { MdDescription, MdAdd, MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotes,
  reset,
  createNotes,
  deleteNotes,
} from "../../features/notes/notesSlice";

const Dashboard = ({ view }) => {
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    } else {
      dispatch(getNotes());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  function addNote() {
    if (text.length > 0) {
      dispatch(createNotes({ notes: text }));
      document.getElementsByClassName("textarea")[0].innerHTML = "";
    }
    setText("");
  }
  function deleteNote(id) {
    dispatch(deleteNotes(id));
  }

  const Cards = ({ item }) => {
    return (
      <div className="cards">
        {item.notes}
        <div onClick={() => deleteNote(item._id)} className="cardIcons delete">
          <MdClose />
        </div>
      </div>
    );
  };

  return (
    <div className="dashboardContent">
      <div className="addNoteHolder">
        <div className="inputNote">
          <div
            id="text"
            className="textarea"
            role="textbox"
            contentEditable
            spellCheck
            data-ph="Add a note..."
            onInput={(e) => setText(e.currentTarget.textContent)}
          />
          <div className="addButton" onClick={addNote}>
            <MdAdd />
          </div>
        </div>
      </div>
      {notes.length > 0 ? (
        <div className="notesListHolder">
          <div className={`notesList ${view === "grid" ? "grid" : "list"}`}>
            {notes
              .slice()
              .reverse()
              .map((item) => (
                <Cards key={item._id} item={item} />
              ))}
          </div>
        </div>
      ) : (
        <div className="emptyNotesListHolder">
          <div className="emptyNotesList">
            <IconContext.Provider value={{ size: "4em" }}>
              <MdDescription />
            </IconContext.Provider>
            Notes you add appear here
          </div>
        </div>
      )}
      {isLoading && <div className="loader"></div>}
    </div>
  );
};
export default Dashboard;
