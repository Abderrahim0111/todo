/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import "./signup.css";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";

const Signup = () => {
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        //Runs on every render
        { user && navigate("/")}
      })
    const [username, setusername] = useState("");
    const navigate = useNavigate()
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      console.log("Email verification sent!")
      // ...
    });
  };
  const updateprofile = () => {
    updateProfile(auth.currentUser, {
        displayName: username
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  }
  const signup = (eo) => {
    eo.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("signed up successfully");
        updateprofile()
        sendVerificationEmail()
        navigate("/")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
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
    <form className="signup">
      <input onChange={(eo) => {
        setusername(eo.target.value)
      }} type="text" placeholder="Username" />
      <input
        onChange={(eo) => {
          setemail(eo.target.value);
        }}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(eo) => {
          setPassword(eo.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <p>Already have an account? <Link to="/signin">signin</Link></p>
      <div className="signupBtn">
        <button
        style={{backgroundColor: "teal", color: "white"}}
          onClick={signup}
        >
          Signup
        </button>
      </div>
      {hasError && <h6 className="mtt">{firebaseError}</h6>}
    </form>
  );
};

export default Signup;
