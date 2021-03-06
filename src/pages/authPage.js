import React from 'react';
import axios from 'axios';
import { Container, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { URL_API } from '../helper';
import { connect } from 'react-redux'
import { authLogin } from '../actions'
import { Redirect } from 'react-router-dom';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: 'password',
            alert: false,
            message: '',
            alertType: '',
        }
    }

    onBtRegis = () => {
        let username = this.inUsername.value
        let email = this.inRegisEmail.value
        let password = this.inRegisPassword.value
        let confPassword = this.inConfPassword.value
        let role = 'user'
        if (username == '' || email == '' || password == '' || confPassword == '') {
            // setState untuk membuka alert, dengan mengatur message serta type alert
            this.setState({ alert: !this.state.alert, message: "Isi semua form !", alertType: 'danger' })
            // melakukan reset terhadap alert menggunakan setTimeout
            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
        } else {
            if (email.includes('@')) {
                axios.get(URL_API + `/users/get-all?email=${email}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({ alert: !this.state.alert, message: "Email sudah terdaftar", alertType: 'warning' })
                            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                        } else {
                            axios.post(URL_API + `/users/regis`, {
                                username,
                                email,
                                password
                            })
                                .then(res => {
                                    this.setState({ alert: !this.state.alert, message: "Registrasi akun sukses ???", alertType: 'success' })
                                    setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                                    this.inUsername.value = null
                                    this.inRegisEmail.value = null
                                    this.inRegisPassword.value = null
                                    this.inConfPassword.value = null
                                })
                                .catch(err => {
                                    console.log("Error Register", err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.setState({ alert: !this.state.alert, message: "Email anda salah ???", alertType: 'warning' })
                setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
            }
        }
    }

    onBtLogin = () => {
        this.props.authLogin(this.inEmail.value, this.inPassword.value)
    }

    handlePassword = () => {
        console.log(this.inRegisPassword.value)

        let huruf = /[a-zA-Z]/
        let numb = /[0-9]/

        if (huruf.test(this.inRegisPassword.value) || numb.test(this.inRegisPassword.value)) {
            if (huruf.test(this.inRegisPassword.value) && numb.test(this.inRegisPassword.value)) {
                console.log("Huruf dan Angka")
            } else if (huruf.test(this.inRegisPassword.value)) {
                console.log("Hanya huruf")
            } else if (numb.test(this.inRegisPassword.value)) {
                console.log("Hanya angka")
            }
        }
    }

    onBtReverification = async () => {
        try {
            let res = await axios.patch(URL_API + `/users/reverification`, {
                email: this.inEmail.value,
                password: this.inPassword.value
            })
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.props.id && this.props.idstatus == 11) {
            return <Redirect to="/" />
        }
        return (
            <Container className="p-5">
                <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Pilihan Masuk</h2>
                <p style={{ textAlign: 'center' }}>Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3>Silakan masuk ke akun Anda</h3>
                        <p>Silakan masuk ke akun Anda untuk menyelesaikan pembayaran dengan data pribadi Anda.</p>
                        <Alert isOpen={this.props.idstatus && this.props.idstatus == 12 ? true : false} color="warning">
                            Your account not verified <a className="alert-link" onClick={this.onBtReverification}>Request Verification</a>
                        </Alert>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="email" id="textEmail" innerRef={elemen => this.inEmail = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <Input type={this.state.passType} id="textPassword" innerRef={elemen => this.inPassword = elemen} />
                        </FormGroup>
                        <Button size="lg" style={{ width: '100%', backgroundColor: '#0058AB' }} onClick={this.onBtLogin}>Masuk</Button>
                    </div>
                    <div className="col-6 p-5">
                        <h3>Silakan buat akun Anda</h3>
                        <Alert isOpen={this.state.alert} color={this.state.alertType}>
                            {this.state.message}
                        </Alert>
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" innerRef={elemen => this.inUsername = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="email" id="textEmail" innerRef={elemen => this.inRegisEmail = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <Input type={this.state.passType} onChange={this.handlePassword} id="textPassword" innerRef={elemen => this.inRegisPassword = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textConfPassword"> Confirmation Password</Label>
                            <Input type={this.state.passType} id="textConfPassword" innerRef={elemen => this.inConfPassword = elemen} />
                        </FormGroup>
                        <Button size="lg" type="button" onClick={this.onBtRegis} style={{ width: '100%', backgroundColor: '#0058AB' }}>Daftar</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        id: authReducer.iduser,
        idstatus: authReducer.idstatus
    }
}

export default connect(mapToProps, { authLogin })(AuthPage);