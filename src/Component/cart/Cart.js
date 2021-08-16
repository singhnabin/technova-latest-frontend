import React, { Fragment } from "react";
import { Container, Row, Col, Card, Image, Form, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import StripeCheckout from 'react-stripe-checkout';
import { placeStripeOrder } from "../backend/Auth";

function Cart() {
    const { cartItems, setCartItems } = React.useContext(CartContext);


    const handleChange = id => e => {
        if (parseInt(e.target.value) === 0) {
            let newCart = cartItems.filter(items => items.id !== id);
            setCartItems([...newCart])
        } else {
            cartItems.map(item => {
                if (item.id === id) {
                    item.quantity = e.target.value
                }
            });
            setCartItems([...cartItems])
        }



    }
    const handlePayment = (paymentInfo) => {
        // placeStripeOrder(paymentInfo,cartItems,

    }

    const calculateTotal = () => {
        let total = 0.00;
        cartItems.map(items => {
            total += items.quantity * items.price
        })
        return Number.isInteger(total) ? total + '.00' : total;
    }
    return (<Container fluid="md" className="mt-2">
        <Row>
            <Col>
                <h2>Your Cart </h2>
                {cartItems.length > 0 ? (<Fragment>{

                    cartItems.map(item => (<Card key={item.id} className="mt-2">
                        <div className="card_desc">
                            <div className="card_details">
                                <Image src={`images/${item.imageURL}`} thumbnail height="171px" width="180px" />
                                <h4>{item.name}</h4>

                            </div>
                            <div className="card_price">

                                <h4>Price per unit</h4>
                                <h6>${item.price}</h6>
                            </div>
                            <div className="card_quantity">

                                <h4>Quantity</h4>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">

                                        <Col sm="6">
                                            <Form.Control type="Number" value={item.quantity} onChange={handleChange(item.id)} min={0} />
                                        </Col>

                                    </Form.Group>
                                </Form>
                                {/* <h6>{item.quantity}</h6> */}
                            </div>
                            <div className="card_total">

                                <h4>Total</h4>
                                <h6>${(item.quantity * item.price).toFixed(2)}</h6>
                            </div>


                        </div>
                    </Card>))}
                    <br />
                    <br />
                    <br />
                    <hr />
                    <div className="cart_total">
                        <h2>Your Order Total: ${calculateTotal()}</h2>
                        <StripeCheckout
                            name="TechNova Shopping Store"
                            description="Big Data Stuff" // the pop-in header subtitle
                            image="https://cdn.pixabay.com/photo/2016/02/19/11/19/computer-1209641_960_720.jpg" // the pop-in header image (default none)
                            // ComponentClass="div"
                            amount={calculateTotal()} // cents
                            currency="USD"
                            stripeKey="pk_test_51JNf6DC7Yvc0JX2KgUmx6ga53jJKKtDcjVazdvJ23db61W4fFtUH0QHJNoxOC4a5FeAjx5kLWRuEdRSYmYDRbJ0o00PzC2REft"
                            // locale="zh"
                            email="technova@gmail.com"
                            token={handlePayment}
                            allowRememberMe
                            // Note: Enabling either address option will give the user the ability to
                            // fill out both. Addresses are sent as a second parameter in the token callback.
                            shippingAddress={true}
                            billingAddress={true}>
                            <Button variant="info" >Checkout</Button>
                        </StripeCheckout>

                    </div>
                </Fragment>
                ) : (
                        <Card>
                            <Card.Body>
                                <h2>Your Cart is empty!!</h2>
                            </Card.Body>
                        </Card>
                    )}

            </Col>
        </Row>
    </Container>)

}
export default Cart;