import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/users/login`, {
                email, password
            })
            console.log(res.data)
            if (res.data.idstatus == 11) {
                localStorage.setItem("tkn_id", res.data.token)
                // Jika ingin menjalankan fungsi action lain
                await dispatch(getCart(res.data.iduser))
                await dispatch(getTransaction(res.data.iduser))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { ...res.data }
                })
            } else {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { idstatus: res.data.idstatus }
                })
            }
            // // menyimpan data ke reducer
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
            localStorage.setItem("tkn_id", data.token)
            await dispatch(getCart(data.iduser))
            await dispatch(getTransaction(data.iduser))
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
            await dispatch(getCart(iduser))

        } catch (error) {
            console.log(error)
        }
    }
}

// Transaksi
export const getTransaction = (id) => {
    return async (dispatch) => {
        try {
            id = id > 1 ? id : 0
            let res = await axios.get(URL_API + `/transaction/data/${id}`)
            console.log("transaction user", res.data)
            dispatch({
                type: "GET_TRANSACTION",
                payload: res.data.results
            })
            // return res.data
        } catch (error) {
            console.log(error)
        }
    }
}