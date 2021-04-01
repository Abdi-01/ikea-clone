import React from 'react';
import { Container } from 'reactstrap';
import CarousleComp from '../components/carousle';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container fluid>
                <CarousleComp />
            </Container>
        );
    }
}

export default LandingPage;