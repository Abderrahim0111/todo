import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import AllTasksPage from "./allTasksPage";

const Hone = () => {
  const [user, loading] = useAuthState(auth);

  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      console.log("Email verification sent!");
      // ...
    });
  };

  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  if (!user) {
    return (
      <h1>
        Please{" "}
        <Link
          to="/signin"
          style={{ color: "teal", borderBottom: "2px solid teal" }}
        >
          signin
        </Link>{" "}
        to continue!
      </h1>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <h1 style={{ marginBottom: "15px", textAlign: "center" }}>Welcome {user.displayName}</h1>
          <h3>Please verify your email to continue!</h3>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              style={{ backgroundColor: "teal", color: "white" }}
              onClick={() => {
                sendVerificationEmail();
              }}
            >
              Send Email again
            </button>
          </div>
        </div>
      );
    }
    if (user.emailVerified) {
      return <AllTasksPage />;
    }
  }
};

export default Hone;
