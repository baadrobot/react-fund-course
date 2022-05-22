import axios from "axios";

export default class PostService {
    // функция которая будет возвращать список постов
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            // axios есть возможность передать GET запрос таким способом
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response;
    }

    static async getCommentsPostById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+id+'/comments')
        return response;
    }
}