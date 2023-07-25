import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/authContext";

type PrivateRouteProps = RouteProps & {
    component: React.ComponentType<any>;
  };

 export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
          {...rest}
          element={user ? <Component /> : <Navigate to="/signin" replace />}
        />
      );
  };

