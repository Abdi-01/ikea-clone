import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/users/login`, {
                email, password
            })
            console.log(res.data)
            localStorage.setItem("tkn_id", res.data[0].iduser)
            // Jika ingin menjalankan fungsi action lain
            let cart = await dispatch(getCart(res.data[0].iduser))
            console.log("cart1", cart)
            // // menyimpan data ke reducer
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...res.data[0], cart }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCart = (id) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(URL_API + `/transaction/get-cart/${id}`)
            console.log("cart user", res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem('tkn_id')
    return {
        type: "LOGOUT"
    }
}

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            let cart = await dispatch(getCart(data.iduser))
            console.log("cart2", cart)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data, cart }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartQty = ({ iduser, qty, idcart }) => {
    return async dispatch => {
        try {
            // api update qty cart
            let updateQty = await axios.patch(URL_API + `/transaction/update-qty`, {
                qty, idcart
            })
            // api get ulang data cart
            let cart = await dispatch(getCart(iduser))
            dispatch({
                type: "UPDATE_CART",
                payload: cart
            })
        } catch (error) {
            console.log(error)
        }
    }
}