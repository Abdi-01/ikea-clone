import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import { updateCartQty, deleteCart,getCart,getTransaction } from '../actions'
import { URL_API } from '../helper';
class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return <div className="row shadow p-1 mb-3 bg-white rounded" >
                <div className="col-md-2">
                    <img src={item.images[0].images} width="100%" />
                </div>
                <div className="col-md-3 d-flex justify-content-center flex-column">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.nama}</h5>
                    <h4 style={{ fontWeight: 'bolder' }}>Rp {item.harga.toLocaleString()}</h4>
                </div>
                <div className="col-md-1 d-flex align-items-center">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.type}</h5>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex" style={{ width: '50%' }}>
                            <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtDec(index)}>
                                    remove
                                    </span>
                                <Input placeholder="qty" value={item.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtInc(index)}>
                                    add
                            </span>
                            </span>
                        </div>
                        <h4>Rp {(item.harga * item.qty).toLocaleString()}</h4>
                    </div>
                    <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.props.deleteCart(item.idcart, this.props.iduser)}>Remove</Button>
                </div>
            </div>
        })
    }

    onBtInc = (index) => {
        console.log(index)
        let { iduser, cart, updateCartQty } = this.props
        cart[index].qty += 1
        updateCartQty({ iduser, qty: cart[index].qty, idcart: cart[index].idcart })
        // axios.patch
    }

    onBtDec = (index) => {
        console.log(index)
        let { iduser, cart, updateCartQty } = this.props
        cart[index].qty -= 1
        updateCartQty({ iduser, qty: cart[index].qty, idcart: cart[index].idcart })
        // axios.patch
    }

    onBtCheckOut = () => {
        //1. mengurangi qty productnya dulu, yg ada direducer
        //2. axios.patch data product krn qty stocknya berubah
        //3. idUser,username,date,totalPayment,status(paid),cart
        //4. axios.post => userTransactions
        //5. data userTransaction ditampilkan di historyPage user, transactionPage Admin
        axios.post(URL_API + `/transaction/checkout`, {
            invoice: `#INVOICE/${new Date().getTime()}`,
            iduser: this.props.iduser,
            ongkir: this.totalPayment().ongkir,
            total_payment: this.totalPayment().total,
            note: this.note.value,
            idstatus: 6,
            detail: this.props.cart
        }).then(res => {
            this.props.getCart(this.props.iduser)
            this.props.getTransaction(this.props.iduser)
            this.note.value = null
        }).catch(err => console.log(err))
    }

    totalPayment = () => {
        let total = 0
        this.props.cart.forEach(item => total += item.qty * item.harga)
        return { total:total+(total * 0.025), ongkir: total * 0.025 }
    }

    render() {
        console.log(this.props.cart)
        return (
            <div>
                <h1 className="text-center mt-5">Keranjang Belanja</h1>
                <div className="row m-1">
                    <div className="col-8">
                        {this.printCart()}
                    </div>
                    <div className="col-4">
                        <div className="shadow p-4 mb-3 bg-white rounded">
                            <h3 style={{}}>Total Payment</h3>
                            <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().total.toLocaleString()}</h2>
                            <FormGroup>
                                <Label for="ongkir">Biaya Pengiriman</Label>
                                <Input type="text" id="ongkir" defaultValue={'Rp. ' + this.totalPayment().ongkir.toLocaleString()} innerRef={elemen => this.ongkir = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Notes</Label>
                                <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ authReducer, productReducers }) => {
    return {
        ...authReducer, products: productReducers.products_list
    }
}

export default connect(mapToProps, { updateCartQty, deleteCart,getCart,getTransaction })(CartPage);