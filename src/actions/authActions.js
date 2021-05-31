import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (email, password) => {
    return (dispatch) => {
        // fungsi untuk get data ke API
        axios.post(URL_API + `/users/login`, {
            email, password
        })
            .then(res => {
                console.log(res.data)
                localStorage.setItem("tkn_id", res.data[0].iduser)
                // Jika ingin menjalankan fungsi action lain
                dispatch(getCart(res.data[0].iduser))
                // // menyimpan data ke reducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
            }).catch(err => {
                console.log(err)
            })
    }
}

export const getCart = (id) => {
    axios.get(URL_API + `/transaction/get-cart/${id}`)
        .then(res => {
            console.log("cart user", res.data)
        }).catch(err => {
            console.log(err)
        })
}

export const authLogout = () => {
    localStorage.removeItem('tkn_id')
    return {
        type: "LOGOUT"
    }
}

export const keepLogin = (data) => {
    return dispatch => {
        dispatch(getCart(data.iduser))
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data
        })
    }
}

export const updateCart = (data) => {
    console.log("cart qty", data)
    return {
        type: "UPDATE_CART",
        payload: data
    }
}