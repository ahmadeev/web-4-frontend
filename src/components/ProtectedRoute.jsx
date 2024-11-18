import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateAuthStatus = async () => {
            await checkAuthStatus(); // Проверка статуса
            setIsLoading(false); // Завершаем загрузку после обновления статуса
        };

        updateAuthStatus();
    }, [checkAuthStatus]);

    if (isLoading) {
        // Показать загрузку, пока статус проверяется
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        // Если пользователь не авторизован, перенаправляем его на страницу входа
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    // Если авторизован, рендерим защищённый компонент
    return children;
};

export default ProtectedRoute;
