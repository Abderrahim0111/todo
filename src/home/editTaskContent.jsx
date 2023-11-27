/* eslint-disable react/prop-types */
import { useDocument } from "react-firebase-hooks/firestore";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { useRef, useState } from "react";
import moment from "moment";


const EditTaskContent = ({ user }) => {
  const [newSubTask, setnewSubTask] = useState("");
  const [showData, setshowData] = useState(false);
  const [showaddMoreData, setshowaddMoreData] = useState(false);
  let { stringId } = useParams();
  const navigate = useNavigate();
  const [value, loading] = useDocument(doc(db, user.uid, stringId));
  const inputElement = useRef(null);

  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  if (value) {
    return (
      <div className="editTask">
        {showData ? (
          <ReactLoading
            type={"spin"}
            color={"royalblue"}
            height={77}
            width={77}
          />
        ) : (
          <>
            <div className="title">
              <input
                ref={inputElement}
                onChange={async (eo) => {
                  await updateDoc(doc(db, user.uid, stringId), {
                    title: eo.target.value,
                  });
                }}
                type="text"
                defaultValue={`${value.data().title}`}
              />
              <i
                onClick={() => {
                  inputElement.current.focus();
                }}
                className="fa-solid fa-pen-to-square"
              />
            </div>

            <div style={{ display: "flex", width: "422px",  justifyContent: "space-between" }}>
              <div style={{color: "teal"}}>Created: {moment(value.data().id).fromNow()}</div>

              <div>
                <input
                  type="checkbox"
                  id="fff"
                  checked={value.data().completed}
                  onChange={ async (eo) => {
                    if (eo.target.checked) {
                      await updateDoc(doc(db, user.uid, stringId), {
                        completed: true,
                      });
                    } else {
                      await updateDoc(doc(db, user.uid, stringId), {
                        completed: false,
                      });
                    }
                    
                  }}
                />
                <label htmlFor="fff"> Complited</label>
              </div>
            </div>

            <ul>
              {value.data().subTasks.map((item) => {
                return (
                  <li key={item}>
                    <p>{item}</p>
                    <i
                      onClick={async () => {
                        
                        await updateDoc(doc(db, user.uid, stringId), {
                          subTasks: arrayRemove(item),
                        });
                      }}
                      className="fa-solid fa-trash"
                    />
                  </li>
                );
              })}
              {showaddMoreData && (
                <li className="addSubTask">
                  <input
                    onChange={(eo) => {
                      setnewSubTask(eo.target.value);
                    }}
                    type="text"
                    placeholder="Type here"
                    value={newSubTask}
                  />
                  <button
                    onClick={async (eo) => {
                      eo.preventDefault();
                      setnewSubTask("");
                      
                      await updateDoc(doc(db, user.uid, stringId), {
                        subTasks: arrayUnion(newSubTask),
                      });
                    }}
                  >
                    Add
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={async (eo) => {
                      eo.preventDefault();
                      setshowaddMoreData(false);
                    }}
                  >
                    Cancel
                  </button>
                </li>
              )}
            </ul>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  setshowaddMoreData(true);
                }}
                style={{ backgroundColor: "teal", color: "white" }}
              >
                Add more
              </button>
              <br />
              <button
                className="button"
                onClick={async (eo) => {
                  eo.preventDefault();
                  setshowData(true);
                  
                  await deleteDoc(doc(db, user.uid, stringId));
                  navigate("/", { replace: true });
                }}
              >
                Delete task
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default EditTaskContent;
