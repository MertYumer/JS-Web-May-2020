const baseUrl = 'http://localhost:9999/api/';

const postsService = {
    getAll: function () {
        const url = baseUrl + 'origami/';
        return fetch(url).then(resp => resp.json());
    }
}

export default postsService;