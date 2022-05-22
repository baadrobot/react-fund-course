import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({children, visilbe, setVisible}) => {

    // определять нужно ли добавлять класс active для отображения модального окна или нет
    const rootClasses = [cl.myModal]
    if(visilbe) {
        rootClasses.push(cl.active)
    }

    return (
        // join тут нужен потому что может тут надо добавить больше одного класса через массив
        // и он этот массив преобразует в строку и соединит пробелом
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/*Вешаем слушатель события на внутреннее окно которое предотвратит событие в родительском элементе,
            т.е. не будет срабатывать закрытия окна как если бы мы нажали на пустом месте*/}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;