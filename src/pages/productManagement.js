import React from 'react';
import { Button, Table } from 'reactstrap';
import ModalProduct from '../components/modalProduct';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }
    render() {
        return (
            <div className="p-2">
                <h3 className="text-center">Produk Management</h3>
                <Button type="button" style={{ float: 'right' }} color="success" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                <ModalProduct modalOpen={this.state.modalOpen} 
                btClose={() => this.setState({ modalOpen: !this.state.modalOpen })} />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Nama</th>
                            <th>Deskripsi</th>
                            <th>Brand</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductManagement;