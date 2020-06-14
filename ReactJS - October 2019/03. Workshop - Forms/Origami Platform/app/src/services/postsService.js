const baseUrl = 'http://localhost:9999/api/';

const postsService = {
    getAll: function (limit) {
        const url = baseUrl + `origami${limit ? `?limit=${limit}` : ''}`;
        return fetch(url).then(res => res.json());
    },

    create: function (data) {
        const url = baseUrl + 'origami/';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(res => res.json());
    }
}

export default postsService;