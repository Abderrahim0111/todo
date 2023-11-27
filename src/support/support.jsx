import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import ReactLoading from "react-loading";

const Support = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    //Runs on every render
    {
      (!user || (user && !user.emailVerified)) && !loading && navigate("/");
    }
  });
  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
    );
  }
  return (
    <div>
      <h1>Support page</h1>
    </div>
  );
};

export default Support;
