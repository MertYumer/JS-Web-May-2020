const baseUrl = 'http://localhost:9999/api/user';

const usersService = {
    register: function (data) {
        const url = baseUrl + '/register';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json());
    },

    login: function (data) {
        const url = baseUrl + '/login';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(resp => resp.text());
    },

    logout: function () {
        const url = baseUrl + '/logout';

        return fetch(url, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.text());
    }
}
export default usersService;