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
            await dispatch(getCart(res.data[0].iduser))
            // // menyimpan data ke reducer
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...res.data[0] }
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
            dispatch({
                type: "UPDATE_CART",
                payload: res.data
            })
            // return res.data
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
            await dispatch(getCart(data.iduser))
            // console.log("cart2", cart)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
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
            await dispatch(getCart(iduser))
            // dispatch({
            //     type: "UPDATE_CART",
            //     payload: cart
            // })
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (idcart, iduser) => {
    console.log(idcart, iduser)
    return async dispatch => {
        try {
            // api delete qty cart
            await axios.delete(URL_API + `/transaction/delete-cart/${idcart}`)
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