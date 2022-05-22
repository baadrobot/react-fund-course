import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    // изменять напрямую состояние нельзя поэтому мы развернем посты в новый массив
    // и отсортируем уже этот массив, т.е. мы изменяем копию массива и не изменяем состояние напрямую
    // и помещаем в sortedPosts
    const sortedPosts = useMemo(() => {
        // console.log('Sort function initiated')
        // selectedSort по умолчанию пустая строка, localecompare не сработает т.к. пытаемся вызвать функцию у undefind
        // поэтому надо проверять есть ли сортировка или нет
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        // в противном случае возвращать обычный массив постов
        return posts;
    }, [sort, posts])

    // возвращает отсортированные посты
    return sortedPosts;
}

// хук будет возвращать уже отсортированные и отфлитрованные посты
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        // console.log('search filter')
        // отфильтровать и вернуть только те посты в которых есть поисковый запрос
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.body.toLowerCase().includes(query.toLowerCase())
        )
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}