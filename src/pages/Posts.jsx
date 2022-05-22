import React, {useEffect, useState, useRef} from 'react';
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/pagination/Pagination";
import PostItem from "../components/PostItem";
import Counter from "../components/Counter";
import ClassCounter from "../components/ClassCounter";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [value, setValue] = useState('Text from input, try to write something');

    // создаем состояние с массивом постов
    // как дефолтное значение передаем туда массив состоящий из объектов
    const [posts, setPosts] = useState([])

    // состояние для фильтрации и сортировки
    const [filter, setFilter] = useState({sort: '', query: ''})

    // состояние для видимости модального окна
    const [modal, setModal] = useState(false);
    // состояние для общего количества страниц
    const [totalPages, setTotalPages] = useState(0);
    // состояние для лимита постов на странице
    const [limit, setLimit] = useState(10);
    // состояние для количества страниц
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    // вешаем хук для получения последнего элемента страницы
    const lastElement = useRef();

    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        // переменная для хранения общего кол-ва постов, обращаемся к заголовкам и получаем количество постов от сервера
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit])

    // функция добавления/создания нового поста
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        // после создания поста скрыть модальное окно создания поста
        setModal(false)
    }

    // объявляем ф-ию удаления поста, её нужно делать с помощью функции обратного вызова,
    // потому что в компоненте кнопке удаления мы не имеем доступа к состоянию родительского компонента
    // получаем post из дочернего компонента
    const removePost = (post) => {
        // удалить из массива постов тот пост который мы передали аргументом
        // если id элемента из массива равен id который передали постом, тогда этот элемент из массива удаляем
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            {/*
            <h3 style={{textAlign: "center"}}>Передача пропсов</h3>
            <PostItem number={'1'} post={{id: 1, title: 'Javascript', body: 'Description'}}/>
            <PostItem number={'2'} post={{id: 2, title: 'Javascript', body: 'Description'}}/>
            */}


            <h3>Functional components</h3>
            <Counter/>
            <Counter/>
            <h3>Class components</h3>
            <ClassCounter/>
            <ClassCounter/>

            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <br/>

            {/*<button onClick={fetchPosts}>Fetch posts</button>*/}
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visilbe={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>

            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Posts on the page"
                options={[
                    {value: 5, name: 5},
                    {value: 10, name: 10},
                    {value: 25, name: 25},
                    {value: -1, name: "Show all"},
                ]}
            />

            {postError &&
                <h1>Error {postError}</h1>
            }
            {/*пропсом передаем функцию (как ссылка,без скобок) удаления поста removePost  в дочерние компоненты*/}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Array via props"}/>
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
            {/*Проверка работы мемоизации кол-ва страниц в пагинации GetPagesArray*/}
            {/*<button type={"button"} onClick={() => setTotalPages(myTotalPages-1)}>Change total pages</button>*/}

            
            <br/><br/>
            {/*Див для того чтобы повешать на него последний элемент чтоб добавлять новые посты*/}
            {/*передаем ему референс от useRef чтоб получить доступ к ДОМ элементу*/}
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
        </div>
    );
}

export default Posts;
