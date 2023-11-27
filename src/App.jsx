import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./root";
import Home from "./home/hone"
import Signup from "./signup/signup";
import Signin from "./signin/signin";
import Profile from "./profile/profile";
import Support from "./support/support";
import EditTask from "./home/editTask";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="profile" element={<Profile />} />
      <Route path="support" element={<Support />} />
      <Route path="edit-task/:stringId" element={<EditTask />} />
      {/* <Route path="home" element={<Home />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {

  return <RouterProvider router={router} />
}

export default App
