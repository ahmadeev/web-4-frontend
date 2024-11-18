import React, { createContext, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";

// Создаём сам контекст
const AuthContext = createContext();

// Компонент AuthProvider оборачивает приложение и предоставляет доступ к AuthContext
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Читаем состояние из localStorage при инициализации
        const savedAuthState = sessionStorage.getItem("isAuthenticated");
        return savedAuthState === "true";
    });

    // Метод для входа в систему
    const login = () => {
        // Здесь можно добавить логику аутентификации (например, запрос к API)
        console.log("Logging in...");
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для удобного доступа к AuthContext
export const useAuth = () => useContext(AuthContext);
