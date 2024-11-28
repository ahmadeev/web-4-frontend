import React, { createContext, useState, useContext } from 'react';
import {crudCreate, crudRead, crudUpdate, crudDelete} from "../utils/crud.js";
import {UserDTO} from "../utils/user.model.js";

// Создаём сам контекст
const AuthContext = createContext();

const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/auth";

// Компонент AuthProvider оборачивает приложение и предоставляет доступ к AuthContext
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Читаем состояние из localStorage при инициализации
        const savedAuthState = sessionStorage.getItem("isAuthenticated");
        return savedAuthState === "true";
    });

    // Метод для входа в систему
    const signIn = (name, password) => {
        // Здесь можно добавить логику аутентификации (например, запрос к API)
        console.log("Sign in...");

        crudCreate(`${BASE_URL}/sign-in`, new UserDTO(name, password));

        setIsAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", "true");
        console.log("isAuthenticated after login: ", isAuthenticated, "\nexpected: true");
    };

    // Метод для входа в систему
    const signUp = (name, password) => {
        // Здесь можно добавить логику аутентификации (например, запрос к API)
        console.log("Sign up...");

        crudCreate(`${BASE_URL}/sign-up`, new UserDTO(name, password));

        setIsAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", "true");
        console.log("isAuthenticated after login: ", isAuthenticated, "\nexpected: true");
    };

    // Метод для выхода из системы
    const logout = () => {
        console.log("Logging out...");
        setIsAuthenticated(false);
        sessionStorage.setItem("isAuthenticated", "false");
        console.log("isAuthenticated after logout: ", isAuthenticated, "\nexpected: false");
    };

    const checkAuthStatus = async () => {
        // Здесь запрос к API для проверки состояния аутентификации
        // Например, проверка валидности токена
        const status = await fetchAuthStatus();
        setIsAuthenticated(status);
    }

    const fetchAuthStatus = async () => {
        // Здесь логика для обращения к API или проверка localStorage
        const savedAuthState = sessionStorage.getItem("isAuthenticated");
        return savedAuthState === "true";
    };

    // Значения, которые будут доступны всем компонентам, использующим AuthContext
    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для удобного доступа к AuthContext
export const useAuth = () => useContext(AuthContext);
