import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const authToken = sessionStorage.getItem("access_token");
  let auth = { token: authToken ? true : true };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
