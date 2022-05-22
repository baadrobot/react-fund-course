import React, {useEffect, useState} from 'react';
import "./styles/App.css";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar.jsx"
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // при первой загрузке приложения проеверяем авторизован ли пользователь
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        // в противном случае по умолчанию и так стоит false

        setIsLoading(false)
    }, [])

    return (
        //оборачиваем весь компонент в наш контекст и используя провайдер передаем нужные параметры для хранения
        <AuthContext.Provider value={{
            isAuth,
            // setIsAuth: setIsAuth
            // т.к. верхний параметр содержит одинаковый ключ и значение то запись можно сократить
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
