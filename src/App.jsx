import './App.css'

import {HashRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home.jsx";
import CountDownToNewYear from "./pages/CountDownToNewYear.jsx";
import CountDownToVikasBirthday from "./pages/CountDownToVikasBirthday.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import Auth from "./pages/Auth.jsx";
import {AuthProvider, useAuth} from "./components/utils/AuthProvider.jsx";
import Admin from "./pages/Admin.jsx";
import Forbidden from "./pages/Forbidden.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  return (
      <>
          <AuthProvider>
              <HashRouter>
                  <Routes>
                      <Route path="/" element={<Home pageTitle="Домашняя" />} />
                      <Route path="/forbidden" element={<Forbidden pageTitle="Доступ запрещен" />} />
                      <Route path="/auth" element={<Auth pageTitle="Войти" isSignedUp={true} />} />
                      <Route path="/admin" element={
                          <ProtectedRoute isAuthenticated={isAuthenticated} requiredRoles={["ADMIN"]}>
                              <Admin pageTitle="Панель управления" />
                          </ProtectedRoute>
                      } />
                      <Route path="/ny" element={<CountDownToNewYear pageTitle="Счётчик дней до Нового года" />} />
                      <Route path="/vbd" element={
                          <ProtectedRoute isAuthenticated={isAuthenticated} requiredRoles={["USER"]}>
                              <CountDownToVikasBirthday pageTitle="Счётчик дней до дня рождения Вики" />
                          </ProtectedRoute>
                      } />
                  </Routes>
              </HashRouter>
          </AuthProvider>



      </>
  )
}

export default App
