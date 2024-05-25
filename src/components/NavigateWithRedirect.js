import { Navigate, redirect, useLocation } from "react-router-dom";

export default function NavigateWithRedirect(props) {
  const location = useLocation();

  return (
    <Navigate
      to={
        location.state && location.state.redirect
          ? location.state.redirect
          : props.to
      }
      state={{ redirect: location.pathname + location.search + location.hash }}
    />
  );
}
