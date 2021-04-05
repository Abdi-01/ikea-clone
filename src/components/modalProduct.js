import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: []
        }
    }

    onBtAdd = () => {
        console.log(this.state.stock)
    }

    onBtAddStock = () => {
        let tempStock = [...this.state.stock]
        tempStock.push({ id: null, type: null, qty: null })
        this.setState({ stock: tempStock })
    }

    printStock = () => {
        if (this.state.stock.length > 0) {
            return this.state.stock.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <span class="material-icons-round">
                            delete_outline
                        </span>
                    </Col>
                </Row>
            })
        }
    }

    onBtDeleteStock = (index) => {
        this.state.stock.splice(index, 1)
    }

    handleType = (e, index) => {
        this.state.stock[index].type = e.target.value
    }

    handleStock = (e, index) => {
        this.state.stock[index].qty = parseInt(e.target.value)
    }

    onBtCancel = () => {
        this.setState({ stock: [] })
        this.props.btClose()
    }

    render() {
        console.log('ModalOpen', this.props.modalOpen)
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Add Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textNama">Deskripsi</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textNama">Brand</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textNama">Kategori</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={this.onBtAddStock}>Add Stock</Button>
                        {this.printStock()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.onBtAdd}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.onBtCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalProduct;