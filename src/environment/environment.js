const test_env = {
    baseUrl: 'http://localhost:8000'
}

const prod_env = {
    baseUrl: 'https://mainurl'
}

let env = test_env

if(window) {
    if(window.location.hostname === 'chattynatty.netlify.app') {
        env = prod_env
    }
}

export {env}



