import axios from 'axios';
import React from 'react';
import { Button, Table, Badge } from 'reactstrap';
import ModalProduct from '../components/modalProduct';
import ModalEditProduct from '../components/modalEditProduct';
import { URL_API } from '../helper'

let kursor = {
    cursor: "pointer",
    marginRight: '0.5vw'
}

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            modalEditOpen: false,
            data: [],
            detailProduk: {},
            thumbnail: 0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(URL_API + '/products')
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    printProduk = () => {
        return this.state.data.map((item, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    {
                        this.state.thumbnail[0] == index ?
                            <img src={item.images[this.state.thumbnail[1]]} width="80%" alt={item.nama + index} />
                            :
                            <img src={item.images[0]} width="80%" alt={item.nama + index} />
                    }
                    <div>
                        {
                            item.images.map((value, idx) => {
                                return <img src={value} style={kursor} width="20%" alt={item.nama + idx}
                                    onClick={() => this.setState({ thumbnail: [index, idx] })} />
                            })
                        }
                    </div>
                </td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.kategori}</td>
                <td>{
                    item.stock.map((item, index) => {
                        return <h5>{item.type} : <Badge color={item.qty >= 12 ? "success" : "warning"}>{item.qty}</Badge></h5>
                    })
                }</td>
                <td>Rp. {item.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                    <Button size="sm" color="danger">Delete</Button></td>
            </tr>
        })
    }

    render() {
        console.log(this.state.detailProduk)
        return (
            <div className="p-2">
                <h3 className="text-center">Produk Management</h3>
                <Button type="button" style={{ float: 'right' }} color="success" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                {/* Modal untuk detail product */}
                <ModalEditProduct modalOpen={this.state.modalEditOpen} detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })} />
                {/* Modal untuk add product */}
                <ModalProduct modalOpen={this.state.modalOpen}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })} getData={this.getData} />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Nama</th>
                            <th>Brand</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProduk()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductManagement;