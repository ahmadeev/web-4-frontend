import './App.css'

import {HashRouter, Route, Routes} from "react-router-dom";

import Check from "./pages/Check.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import Auth from "./pages/Auth.jsx";
import {AuthProvider, useAuth} from "./components/utils/AuthProvider.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  return (
      <>
          <AuthProvider>
              <HashRouter>
                  <Routes>
                      <Route path="/" element={<Home pageTitle="Домашняя" />} />
                      <Route path="/auth" element={<Auth pageTitle="Войти" isSignedUp={true} />} />
                      <Route path="/check" element={
                          <ProtectedRoute isAuthenticated={isAuthenticated} requiredRoles={["USER"]}>
                              <Check pageTitle="Проверка" />
                          </ProtectedRoute>
                      } />
                  </Routes>
              </HashRouter>
          </AuthProvider>
      </>
  )
}

export default App
