import "./editTask.css"
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";
import EditTaskContent from "./editTaskContent";
import { auth } from "../firebase/config";



const EditTask = () => {
    
    const [user, loading] = useAuthState(auth);
    
    if (loading) {
        return (
          <ReactLoading type={"spin"} color={"royalblue"} height={77} width={77} />
        );
      }
     
    return(
        <EditTaskContent {...{
            user,
        }} />
    )
}

export default EditTask;
