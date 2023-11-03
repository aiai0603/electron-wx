import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./auth/auth";
import Layout from "./layout";
import routes from "./route/route";
import Header from "./header";
import SocketProvider from "./socket/socket";

export default function App() {
  return (
    <SocketProvider>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.auth ? (
                      <RequireAuth>{route.element}</RequireAuth>
                    ) : (
                      route.element
                    )
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </AuthProvider>
    </SocketProvider>
  );
}
