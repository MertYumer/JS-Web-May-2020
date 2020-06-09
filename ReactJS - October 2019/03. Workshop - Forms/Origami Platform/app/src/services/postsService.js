const baseUrl = 'http://localhost:9999/api/';

const postsService = {
    getAll: function (limit) {
        const url = baseUrl + `origami${limit ? `?limit=${limit}` : ''}`;
        return fetch(url).then(res => res.json());
    }
}

export default postsService;