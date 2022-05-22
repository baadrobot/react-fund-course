import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            // нужно вызвать коллбэк ф-ию и т.к. чаще всего это будет асинхронная ф-ия указываем await
            await callback(...args)
        } catch (e) {
            // если в trу произошла ошибка то записать её в состояние
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return[fetching, isLoading, error]
}