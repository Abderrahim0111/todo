/* eslint-disable react/prop-types */
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const AllTasksPageContent = ({ setisOpen, user }) => {
  const [getData, setgetData] = useState(collection(db, user.uid));
  const [value, loading] = useCollection(getData);
  const [selectValue, setselectValue] = useState("aaa");
  const [isOpacity, setisOpacity] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  if (value) {
    return (
      <div>
        <div className="FilterBtns">
          <button
            style={{ opacity: isOpacity ? "0.4" : "1" }}
            onClick={() => {
              setisOpacity(false);
              setgetData(query(collection(db, user.uid), orderBy("id", "asc")));
            }}
          >
            Oldest first
          </button>
          <button
            style={{ opacity: isOpacity ? "1" : "0.4" }}
            onClick={() => {
              setisOpacity(true);
              setgetData(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );
            }}
          >
            Newest first
          </button>

          <select
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setselectValue("aaa");
                setgetData(collection(db, user.uid));
                setisOpacity(false);
              } else if (eo.target.value === "bbb") {
                setselectValue("bbb");
                setgetData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                  )
                );
                setisOpacity(false);
              } else if (eo.target.value === "ccc") {
                setselectValue("ccc");
                setgetData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
                setisOpacity(false);
              }
            }}
          >
            <option value="aaa">All tasks</option>
            <option value="bbb">Complited</option>
            <option value="ccc">Not complited</option>
          </select>
        </div>

        <div className="allTaks">
          {value.docs.map((item) => {
            const time = moment(item.data().id);

            return (
              <div
                onClick={() => {
                  navigate(`/edit-task/${item.data().id}`);
                }}
                key={item.data().id}
                className="task"
              >
                <h2>{item.data().title}</h2>
                <ul>
                  {item.data().subTasks.map((item, index) => {
                    if (index < 3) {
                      return <li key={item}>{item}</li>;
                    }
                  })}
                </ul>
                <p>{time.fromNow()}</p>
              </div>
            );
          })}
        </div>

        <div className="addNewTakBtn">
          <button
            onClick={() => {
              setisOpen(true);
            }}
          >
            <p>Add new task</p>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    );
  }
};

export default AllTasksPageContent;
