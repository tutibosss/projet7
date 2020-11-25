const axios = require('axios')

if(localStorage.getItem('user') != null) {
    const user = JSON.parse(localStorage.getItem('user'))
    axios.defaults.headers.common['Authorization'] = JSON.stringify({Token: user.token, userId: user.userId})
}

axios.defaults.baseURL = 'http://localhost:3000/api'

module.exports = async (method, route, body) => {
    try {
        const rep = await axios({
            method: method,
            url: route,
            data: body
        })
        return  {ok: true, body: rep.data}
    } catch (err) {
        return {ok: false, body: err.response.data}
    }
}