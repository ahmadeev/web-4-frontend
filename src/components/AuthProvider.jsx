import React, { createContext, useState, useContext } from 'react';
import {UserDTO} from "../utils/user.model.js";

const AuthContext = createContext();

const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/auth";

// компонент AuthProvider оборачивает приложение и предоставляет доступ к AuthContext
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedAuthState = sessionStorage.getItem("isAuthenticated");
        return savedAuthState === "true";
    });

    // метод для входа в систему
    const signIn = (name, password) => {
        console.log("Sign in...");

        // было так:
        // crudCreate(`${BASE_URL}/sign-in`, new UserDTO(name, password));
        return fetch(`${BASE_URL}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new UserDTO(name, password)),
        })
            .then(response => {
                if (!response.ok) {
                    // если код ответа не в диапазоне 2xx, выбрасываем ошибку
                    throw new Error(`Ошибка сети: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData) => {
                setIsAuthenticated(true);
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("sessionToken", responseData.data.token)
                console.log("isAuthenticated after login: ", isAuthenticated, "\nexpected: true");
                return responseData;
            })
            .catch(error => {
                console.error('Error:', error)
                throw new Error();
            });
    };

    // метод для регистрации в системе
    const signUp = (name, password) => {
        console.log("Sign up...");

        // crudCreate(`${BASE_URL}/sign-up`, new UserDTO(name, password));
        return fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new UserDTO(name, password)),
        })
    };

    // Метод для выхода из системы
    const logout = () => {
        console.log("Logging out...");
        setIsAuthenticated(false);
        sessionStorage.setItem("isAuthenticated", "false");
        sessionStorage.setItem("sessionToken", null)
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
