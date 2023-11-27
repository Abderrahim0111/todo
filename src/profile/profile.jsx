import { useAuthState } from "react-firebase-hooks/auth";
import "./profile.css";
import { auth } from "../firebase/config";
import ReactLoading from "react-loading";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const Profile = () => {

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    //Runs on every render
    { ((!user || (user && !user.emailVerified)) && !loading ) && navigate("/")}
  })
  const deleteAccount = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("User deleted.");
        navigate("/")
      })
      .catch((error) => {
        // An error ocurred
        console.log(error.code);
        // ...
      });
  };

  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  if (user) {
    return (
      <div className="profile">
        <div className="profileDivs">
          <h2>Username :</h2>
          <h3>{user.displayName}</h3>
        </div>

        <div className="profileDivs">
          <h2>Email :</h2>
          <h3>{user.email}</h3>
        </div>

        <div className="profileDivs">
          <h2>Last signin :</h2>
          <h3>{moment(user.metadata.lastSignInTime).fromNow()}</h3>
        </div>

        <div className="profileDivs">
          <h2>Account created :</h2>
          <h3>{moment(user.metadata.creationTime).fromNow()}</h3>
        </div>

        <div><button
          className="deleteAccountBtn"
          onClick={() => {
            deleteAccount();
          }}
        >
          Delete account
        </button></div>
      </div>
    );
  }
};

export default Profile;
