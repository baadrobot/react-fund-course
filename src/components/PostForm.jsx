import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    // состояние для инпута best practise
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        // у евента онклик предотвращать обновление страницы т.к. там кнопка по умолчанию типа submit,
        // а она по умолчанию обновляет страницу
        e.preventDefault()

        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)

        //очищаем инпуты после нажатия добавления постов
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;