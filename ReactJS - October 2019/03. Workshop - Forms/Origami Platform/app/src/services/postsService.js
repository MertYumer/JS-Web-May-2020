const baseUrl = 'http://localhost:9999/api/';

const postsService = {
    getAll: function (id, limit) {
        const url = baseUrl + `origami${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}`;
        return fetch(url).then(res => res.json());
    }
}

export default postsService;