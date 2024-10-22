import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Loadable from "react-loadable";
import routes from "./routes";
import ProtectedRoute from "./pages/protectedRoutes/protectedRoute";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

//import "./App.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="m-2" style={{ color: "inherit" }}>
          Loading..
        </h2>
        <CircularProgress color="inherit" size={35} sx={{ marginTop: 10 }} />
      </div>
    </Backdrop>
  </div>
);

// Containers
const Home = Loadable({
  loader: () => import("./pages/home"),
  loading,
});
// Containers
const Page500 = Loadable({
  loader: () => import("./pages/500"),
  loading,
});

//Login page
const Login = Loadable({
  loader: () => import("./pages/login"),
  loading,
});
const SignUp = Loadable({
  loader: () => import("./pages/signup"),
  loading,
});
const GetAccount = Loadable({
  loader: () => import("./pages/forgotPassword/getAccount"),
  loading,
});

const GetSecurityCodeByEmail = Loadable({
  loader: () => import("./pages/forgotPassword/getCodeSent"),
  loading,
});
const GetSecurityCodeBySMS = Loadable({
  loader: () => import("./pages/forgotPassword/getCodeSent"),
  loading,
});

const ChangePassword = Loadable({
  loader: () => import("./pages/forgotPassword/changePassword"),
  loading,
});

const ContactAdmin = Loadable({
  loader: () => import("./pages/forgotPassword/contactAdmin"),
  loading,
});

const ZoomPage = Loadable({
  loader: () => import("./components/zoom/pageMeeting"),
  loading,
});

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/zoom" name="Zoom Page" element={<ZoomPage />} />
        <Route path="/500" name="500 Page" element={<Page500 />} />
        <Route
          path="/getAccount"
          name="getAccount Page"
          element={<GetAccount />}
        />
        <Route
          path="/getSecurityCodeByEmail"
          name="GetSecurityCodeByEmail Page"
          element={<GetSecurityCodeByEmail />}
        />
        <Route
          path="/getSecurityCodeBySMS"
          name="GetSecurityCodeBySMS Page"
          element={<GetSecurityCodeBySMS />}
        />
        <Route
          path="/changePassword"
          name="ChangePassword Page"
          element={<ChangePassword />}
        />
        <Route
          path="/contactAdmin"
          name="GetSecurityCode Page"
          element={<ContactAdmin />}
        />
        <Route path="/login" name="Login Page" element={<Login />} />
        <Route path="/signUp" name="SignUp Page" element={<SignUp />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" name="Home page" element={<Home />} />
          <Route path="/*" name="Home page" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
