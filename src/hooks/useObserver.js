import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    // сделаем обсервер для слежки константой с хуком юзРеф
    // который также исп-ся для хранения данных и не треять их от рендера к рендеру
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        // если уже есть слежка за объектом то её надо убрать, чтобы потом новую повесить
        // это нужно чтоб не накоплялось слежек на объекте при каждом вызове ф-ии
        if(observer.current) observer.current.disconnect();
        // когда оъект будет в зоне видимости то будет србатывать эта функция
        var cb = function(entries, observer) {
            // т.к. функция срабатывает и на входе и на выходе с зоны видимости объекта надо сделать условие
            // чтобы срабатывала только на входе в зону видимости
            if(entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        // установить слежку за объектом для зоны видимости
        observer.current.observe(ref.current)
    }, [isLoading])
}