import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateAuthStatus = async () => {
            await checkAuthStatus(); // проверка статуса
            setIsLoading(false); // завершаем загрузку после обновления статуса
        };

        updateAuthStatus();
    }, [checkAuthStatus]);

    if (isLoading) {
        // показать загрузку, пока статус проверяется
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        // если пользователь не авторизован, перенаправляем его на страницу входа
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    // если авторизован, рендерим защищённый компонент
    return children;
};

export default ProtectedRoute;
