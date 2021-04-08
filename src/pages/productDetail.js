import axios from 'axios';
import React from 'react';
import { Button, Collapse, Input } from 'reactstrap';
import { URL_API } from '../helper';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        console.log(this.props.location)
        axios.get(URL_API + `/products${this.props.location.search}`)
            .then(res => {
                console.log("data detail product", res.data)
                this.setState({ detail: res.data[0] })
            }).catch(err => {
                console.log(err)
            })
    }

    onBtAddToCart=()=>{
        // qty, nama, type, price, total,image
        // mengambil data cart user dari reducer
        // data produk di push kedalam array.cart reducer
        // simpan lewat axios.patch
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }

    render() {
        return (
            <div className="row p-5">
                {
                    this.state.detail.id &&
                    <>
                        <div className="col-md-1">
                            {this.renderImages()}
                        </div>
                        <div className="col-md-7">
                            <img src={this.state.detail.images[this.state.thumbnail]} width="100%" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                <h6 className="text-mute">{this.state.detail.kategori}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <div
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ openType: !this.state.openType })}>
                                    Type:</div>
                                <Collapse isOpen={this.state.openType}>
                                    {
                                        this.state.detail.stock.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                    > {item.type} : {item.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center',border: '1px solid gray' }}>
                                    <span class="material-icons">
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" style={{ width: "50%", display: 'inline-block' }} />
                                    <span class="material-icons">
                                        add
                                    </span>
                                </span>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default ProductDetail;