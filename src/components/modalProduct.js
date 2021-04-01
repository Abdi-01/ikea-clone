import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class ModalProduct extends React.Component {
    constructor(props) {
        console.log("props", props)
        super(props);
        this.state = {
            stock: [{
                type: '',
                stock: ''
            }]
        }
    }

    onBtAdd = () => {
        let stock = [
            {
                type: this.inType1.value,
                stock: this.inStock1.value
            },
            {
                type: this.inType2.value,
                stock: this.inStock2.value
            },
            {
                type: this.inType2.value,
                stock: this.inStock2.value
            },
        ]
    }

    printStock = () => {
        return this.state.stock.map((item, index) => {
            return (
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="textNama">Type 1</Label>
                            <Input type="text" id="textNama" innerRef={elemen => this.inType1 = elemen} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="textNama">Stock 1</Label>
                            <Input type="text" id="textNama" innerRef={elemen => this.inStock1 = elemen} />
                        </FormGroup>
                    </Col>
                </Row>
            )
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.toggle}>Add Product</ModalHeader>
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
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Type 1</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inType1 = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Stock 1</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inStock1 = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Type 2</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inType1 = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Stock 2</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inStock1 = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Type 3</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inType1 = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textNama">Stock 3</Label>
                                <Input type="text" id="textNama" innerRef={elemen => this.inStock1 = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalProduct;