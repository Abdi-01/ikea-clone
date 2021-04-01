import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownMenu
    , DropdownItem, DropdownToggle, InputGroup, Input, InputGroupAddon
} from 'reactstrap';
import { connect } from 'react-redux'
import { authLogout } from '../actions'

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buka: false
        }
        this.navColor = {
            backgroundColor: this.props.role == "user" ? '#FFFFFF' : "#ecf0f1",
        }
    }
    toggle = () => {
        this.setState({ buka: !this.state.buka })
    }
    render() {
        return (
            <div>
                <div>
                    <ul type="none" className="d-flex m-2" style={{ justifyContent: 'space-between', color: 'blue' }}>
                        <li>Indonesia</li>
                        <li><a href="#">Bahasa</a></li>
                        <li><a href="#">Informasi Toko</a></li>
                        <li><a href="#">Kebijakan Pengembalian</a></li>
                        <li><a href="#">IKEA Bisnis</a></li>
                        <li><a href="#">Lacak Pengiriman</a></li>
                        <li><a href="#">Katalog dan Brosur</a></li>
                        <li><a href="#">Program Perencanaan</a></li>
                        <li><Link to="/auth">Masuk atau Daftar</Link></li>
                    </ul>
                </div>
                <Navbar expand="md" style={this.navColor}>
                    <NavbarBrand>
                        <Link to="/">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
                                width="100px" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.buka} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/" style={{ color: 'gray', fontWeight: 'bold' }}>Products</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
                                    Category
                  </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <InputGroup size="sm" style={{ width: '20%' }}>
                            <Input placeholder="Cari..." />
                            <InputGroupAddon addonType="append">
                                <span className="btn btn-outline-secondary material-icons">
                                    search
                                </span>
                            </InputGroupAddon>
                        </InputGroup>
                        {
                            this.props.username &&
                            <UncontrolledDropdown>
                                <DropdownToggle nav caret style={{ color: 'gray' }}>
                                    Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {
                                        this.props.role == "user" ?
                                            <>
                                                <DropdownItem>
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Cart
                                                </DropdownItem>
                                                <DropdownItem>
                                                    History
                                                </DropdownItem>
                                            </> :
                                            <>
                                                <DropdownItem>
                                                    <Link to="/product-management" style={{ textDecoration: 'none', color: 'gray' }}>
                                                        Product Management
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    Transaction Management
                                                </DropdownItem>
                                            </>
                                    }
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.authLogout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        username: authReducer.username,
        role: authReducer.role
    }
}

export default connect(mapStateToProps, { authLogout })(NavbarComp)

// functional component
// const NavbarComp = (props) => {
//     // penulisan state pada functional component
//     let [buka, setBuka] = useState(false)

//     const toggle = () => {
//         setBuka(!buka)
//     }

//     return (
//         <div className="container-fluid">
//             <div>
//                 <ul type="none" className="d-flex m-2" style={{ justifyContent: 'space-between', color: 'blue' }}>
//                     <li>Indonesia</li>
//                     <li><a>Bahasa</a></li>
//                     <li><a>Informasi Toko</a></li>
//                     <li><a>Kebijakan Pengembalian</a></li>
//                     <li><a>IKEA Bisnis</a></li>
//                     <li><a>Lacak Pengiriman</a></li>
//                     <li><a>Katalog dan Brosur</a></li>
//                     <li><a>Program Perencanaan</a></li>
//                     <li><Link to="/auth">Masuk atau Daftar</Link></li>
//                 </ul>
//             </div>
//             <Navbar expand="md" style={{ backgroundColor: '#FFFFFF' }}>
//                 <NavbarBrand><img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
//                     width="100px" /></NavbarBrand>
//                 <NavbarToggler onClick={toggle} />
//                 <Collapse isOpen={buka} navbar>
//                     <Nav className="mr-auto" navbar>
//                         <NavItem>
//                             <NavLink href="/components/" style={{ color: 'gray', fontWeight: 'bold' }}>Products</NavLink>
//                         </NavItem>
//                         <UncontrolledDropdown nav inNavbar>
//                             <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
//                                 Category
//               </DropdownToggle>
//                             <DropdownMenu right>
//                                 <DropdownItem>
//                                     Option 1
//                 </DropdownItem>
//                                 <DropdownItem>
//                                     Option 2
//                 </DropdownItem>
//                                 <DropdownItem divider />
//                                 <DropdownItem>
//                                     Reset
//                 </DropdownItem>
//                             </DropdownMenu>
//                         </UncontrolledDropdown>
//                     </Nav>
//                     <InputGroup size="sm" style={{ width: '20%' }}>
//                         <Input placeholder="Cari..." />
//                         <InputGroupAddon addonType="append">
//                             <span className="btn btn-outline-secondary material-icons">
//                                 search
//                             </span>
//                         </InputGroupAddon>
//                     </InputGroup>
//                 </Collapse>
//             </Navbar>
//         </div>
//     )
// }

// export default NavbarComp