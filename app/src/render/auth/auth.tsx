import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSocket } from "../socket/socket";

interface AuthContextType {
  user: any;
  signin: (user: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);
  let socket = useSocket();

  let signin = (newUser: any, callback: VoidFunction) => {
    socket.connectSocket(newUser.user.userId);
    setUser(newUser);
    return callback();
  };

  let signout = (callback: VoidFunction) => {
    socket.disconnectSocket();
    setUser(null);
    return callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  if (auth.user) {
    return true;
  }
  return false;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
