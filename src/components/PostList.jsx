import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

// мы знаем что в пропсы придёт объект то можно сразу сделать деструктуризацию явно вписав в пропсы объект {posts}
const PostList = ({posts, title, remove}) => {

    {/*если в массиве есть посты то вывести их в противном случае показать надпись*/}
    if(!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No posts found!
            </h1>
        )
    }

    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                {title}
            </h3>
            <TransitionGroup>
                {/*массив обычных объектов мы должны преобразовать в массив Реакт элементов*/}
                {/*простой пример работы функции map*/}
                {/*callbackArrayElement - это каждый объект массива который передается через пропсы*/}
                {posts.map((callbackArrayElement, index) =>
                    <CSSTransition key={callbackArrayElement.id} timeout={500} classNames="post">
                        {/*remove это функция которую передаем с выше в низжий компонент удаления, просто как ссылка без скобок*/}
                        <PostItem remove={remove} number={index + 1} post={callbackArrayElement}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;