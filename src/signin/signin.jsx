/* eslint-disable no-unused-vars */
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./signin.css";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../components/modal";

const Signin = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [showModal, setshowModal] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  useEffect(() => {
    //Runs on every render
    {
      user && navigate("/");
    }
  });
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const sendPassResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password reset email sent!");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // ..
      });
  };

  const closeModal = () => {
    setshowModal(false);
  };
  const signin = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signed in successfully");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        sethasError(true);

        switch (errorCode) {

          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/user-not-found":
            setfirebaseError("Wrong Email");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong Password");
            break;

          case "auth/too-many-requests":
            setfirebaseError("Too many requests, please try aganin later");
            break;

          default:
            setfirebaseError("Please check your email & password");
            break;
        }
      });
  };
  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  return (
    <form className="signin">
      <input
        placeholder="Email"
        onChange={(eo) => {
          setemail(eo.target.value);
        }}
        type="email"
      />
      <input
        placeholder="Password"
        onChange={(eo) => {
          setPassword(eo.target.value);
        }}
        type="password"
      />
      <p
        className="forgotPassrodBtn"
        onClick={() => {
          setshowModal(true);
        }}
      >
        Forgot password?
      </p>
      <p className="between">
        Dont have an account? <Link to="/signup">signup</Link>
      </p>

      <div className="signinBtn">
        <button
          style={{ backgroundColor: "teal", color: "white" }}
          onClick={signin}
        >
          Signin
        </button>
      </div>
      {hasError && <h6 className="mtt">{firebaseError}</h6>}

      {showModal && (
        <Modal {...{ closeModal }}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px"}}>
          <input
          style={{width: "250px"}}
            placeholder="Email"
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="email"
          />
          <button
          style={{backgroundColor: "teal", color: "white"}}
            onClick={(eo) => {
              eo.preventDefault()
              sendPassResetEmail();
            }}
          >
            Send email
          </button>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default Signin;
