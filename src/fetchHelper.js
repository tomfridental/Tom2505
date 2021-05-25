import { Notyf } from 'notyf';
import { USERS_PAGENATION } from './Consts';
import 'notyf/notyf.min.css';


export const fetchGet = async (url, queryString) => {

    try {
        let res = await fetch(`${window.location.protocol}//${url}?${queryString}`, { method: 'GET' })
        if (res) {
            res = await res.json();
        }
        return res;

    }
    catch (err) {
        return handleError(err, url);
    }
}

export const fetchPost = async (url, body) => {

    const innerBody = body || {};

    try {
        let res = await fetch(`${window.location.protocol}//${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(innerBody)
            });

        if (res) {
            res = await res.json();
        }
        return res;
    }
    catch (err) {
        return handleError(err, url)
    }
}

const handleError = (err, url) => {
    const error = `Error fetching ${url}. ${err}`;
    displayNotyf(error)
    return null;
}

export const displayNotyf = (msg, props = {}) => {

    if (msg) {
        if (!window.GlobalNotyf) {
            window.GlobalNotyf = new Notyf();
        }

        const msgType = props.type || 'error'
        const isDismissible = props.dismissible || true
        const msgDuration = props.duration || 4000

        window.GlobalNotyf.open({ type: msgType, message: msg, dismissible: isDismissible, duration: msgDuration, icon: false })
    }
}

export const getUsers = async (usersIndex) => {
    console.log('hello world')
    const url = 'localhost:3030/api/user/getusers';
    const res = await fetchGet(url, `index=${usersIndex}&limit=${USERS_PAGENATION}`);
    return res;
}

export const createUser = async (userInfo) => {
    const url = 'localhost:3030/api/user/create';
    const res = await fetchPost(url, userInfo);
    return res;
}