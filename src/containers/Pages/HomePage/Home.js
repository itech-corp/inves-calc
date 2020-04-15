import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import AppBar from '../../../components/AppBar/AppBar'
import { Container, Row, Col, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Label, FormGroup } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import manMoney from '../../../assets/images/man-money.png';
import Footer from '../../../components/Footer/Footer';



export class Home extends Component {
    state = {
        form: {
            email: '',
            phone: ''
        }
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(e.target, true);
        console.log(this.props.isAuthenticated)
    }

    inputChangeHandler = (e, name) => {
        this.setState({ [name]: e.target.value });
    }
    render() {
        return (
            <div >
               <Container style={{fontFamily:'Poppins'}} fluid  className=" login-section  mb-5" >
                    <Row>
                        <Col className="home-page mb-5 mt-4" xs={{size:4 ,offset:1}}>
                            <h4 className="text-left text-light">Want to know what you wil gain while investing<br />in Liyeplimal ?</h4>
                            <div className="inderline">
                                <hr className="bg-secondary" />
                                <div className="dot-warning bg-warning rounded-circle position-relative"></div>
                            </div>
                        </Col>
                        <Col  xs={{size:10,offset:1}}>
                            <Row>
                                
                                <Col   xs={3}>
                                    <Col xs={12} className="mb-4  text-center">
                                        <div >
                                            <h4 className="text-light d-inline"><a style={{textDecoration:'none'}} className="text-light" href="/" >Get In </a></h4>
                                            <div style={{fontSize:"30px"}} className="d-inline border-1 text-warning h-100 w-100">| </div>
                                            <h4 className="text-secondary d-inline">Sign Up </h4>
                                            
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <Form onSubmit={this.submitHandler} >
                                            <FormGroup>
                                                <InputGroup size='lg outline-0'>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText style={{ border: '1' }} className="user-input bg-transparent" ><FontAwesomeIcon color="#f5a10e" icon={faUser} /></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={(e) => this.inputChangeHandler(e, "email")} name="email" required className="text-light bg-transparent border-1 " placeholder="Liyeplimal ID" />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="text-left" size="lg">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText style={{ border: '1' }} className="bg-transparent"><FontAwesomeIcon color="#f5a10e" icon={faLock} /></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={(e) => this.inputChangeHandler(e, "phone")} name="phone" required type="password" className="bg-transparent border-1 text-light" placeholder="Password" />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup className="ml-2 mb-5 mt-4">
                                                <p className="text-light">Forgot password ? <stong className="text-warning">reset here</stong></p>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button style={{ backgroundColor: "#f5a10e" }} className="float-left" size=" w-100 h-50">
                                                    <h5 >Sign In <FontAwesomeIcon icon={faSignInAlt} /></h5>
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    </Col>

                                </Col>

                                <Col xs={{size:5,offset:4}}>
                                    <img className="ml-5 float-right img-fluid" alt="mancompute" src={manMoney} />
                                </Col>
                            </Row>

                        </Col>
                    </Row>\
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
       token:state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/login')),
        getPaymentLink: (link) => dispatch(actions.getPaymentLink(link)),
        logout: ()=> dispatch(actions.logOut)
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);