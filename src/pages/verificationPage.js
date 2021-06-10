import axios from 'axios';
import React, { useState } from 'react';
import { Jumbotron, Button, Input } from 'reactstrap';
import { URL_API } from '../helper';

const VerificationPage = (props) => {

    // cek token
    const [otp, setOTP] = useState('')
    const onBtVerification = async () => {
        try {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${props.location.pathname.split('/')[2]}`
                }
            }
            let res = await axios.patch(URL_API + `/users/verification`, {
                otp: otp.value
            }, headers)

            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-4 container text-center">
            <Jumbotron>
                <h1 className="display-3">Hello, Please Verification your Email Address</h1>
                <p className="lead">Type your OTP</p>
                <Input style={{ width: '20%', margin: 'auto' }} type="text" innerRef={(e) => setOTP(e)} />
                <hr className="my-2" />
                <p className="lead">
                    <Button color="primary" onClick={onBtVerification}>Verification Account</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default VerificationPage