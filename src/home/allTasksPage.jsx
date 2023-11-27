import { useState } from "react";
import Modal from "../components/modal";
import "./allTasksPage.css";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import AllTasksPageContent from "./allTasksPageContent";

const AllTasksPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isOpen, setisOpen] = useState(false);
  const [title, settitle] = useState("");
  const [subTasks, setsubTasks] = useState("");
  const [array, setarray] = useState([]);
  const closeModal = () => {
    setisOpen(false);
  };
  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }

  return (
    <div>
      <AllTasksPageContent {...{
        setisOpen,
        user,
      }} />
      {isOpen && (
        <Modal closeModal={closeModal}>
          <div className="allTasksPageModal">
            <input
              onChange={(eo) => {
                settitle(eo.target.value);
              }}
              type="text"
              placeholder="Title"
              value={title}
            />
            <div className="flex">
              <input
                className="noMb"
                onChange={(eo) => {
                  setsubTasks(eo.target.value);
                }}
                type="text"
                value={subTasks}
                placeholder="Subtasks"
              />
              <button
                onClick={(eo) => {
                  eo.preventDefault();
                  if (!array.includes(subTasks)) {
                    array.push(subTasks);
                  }
                  console.log(array);
                  setsubTasks("");
                }}
              >
                Add
              </button>
            </div>
            <ul>
              {array.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
            <button
              className="mb"
              onClick={async (eo) => {
                eo.preventDefault();
                setisOpen(false)
                settitle("")
                setarray([])
                let taskId = new Date().getTime()
                await setDoc(doc(db, user.uid, `${taskId}`), {
                  title: title,
                  subTasks: array,
                  completed: false,
                  id: taskId,
                });
              }}
            >
              Add task
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllTasksPage;
