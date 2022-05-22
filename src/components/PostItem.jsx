import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate } from "react-router-dom";

const PostItem = (props) => {
    const navigate = useNavigate();
    // console.log(navigate('success'));
    // navigate('success')
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate('/posts/'+props.post.id)}>Открыть</MyButton>
                {/*вызываем функцию удаления поста которую передали от родительских компонентов*/}
                {/*Передаем в неё как параметр текущий пост, у него есть id по которому пост будет удалён из массива*/}
                <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;