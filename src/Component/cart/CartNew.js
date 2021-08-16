import React, { useState, Fragment, useEffect } from "react";
import { Container, Row, Col, Card, Image, Form, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { Link, Redirect } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import { isauthenticated, placeStripeOrder } from "../backend/Auth";
import CustomAlert from "../reuse/CustomAlert";
import { getAllProducts } from "../backend/ProductController";

function CartNew() {
    const [info, setInfo] = useState({
        success: "",
        error: "",
        doRedirect: false
    })
    const [isDisabled, setIsDisabled] = useState(false);
    const [products, setProducts] = useState([]);


    const { cartItems, setCartItems } = React.useContext(CartContext);

    const user = isauthenticated();
    const { success, error, doRedirect } = info;

    const handleChange = id => e => {
        setIsDisabled(false);
        setInfo({ ...info, success: "", error: "" })
        const myProduct = products.filter(product => product.id === id);
        if (myProduct[0].quantity >= parseInt(e.target.value)) {
            if (parseInt(e.target.value) === 0) {
                let filteredCart = cartItems.filter(items => items.id !== id)
                setCartItems([...filteredCart])
            } else {
                cartItems.map(items => {
                    if (items.id === id) {
                        items.quantity = e.target.value
                    }
                })
                setCartItems([...cartItems])
            }
        } else {
            setIsDisabled(true);
            setInfo({ ...info, success: "", error: `Only ${myProduct[0].quantity} ${myProduct[0].name} are available in store.` })
        }
    }

    const calculateTotal = () => {
        let total = 0;
        cartItems.map(items => {
            total += items.quantity * items.price;
        })
        return Number.isInteger(total) ? total + ".00" : total.toFixed(2);
    }
    const placeOrder = (payinfo) => {
        setInfo({ ...info, success: "", error: "" })
        placeStripeOrder(payinfo, cartItems, user.message, user.username).then(res => {
            if (res.status === 200) {
                setInfo({ ...info, success: res.message, error: "", doRedirect: true })
                setCartItems([]);
            } else {
                setInfo({ ...info, error: res.error, message: "" })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const performRedirect = () => {
        if (doRedirect) {
            return <Redirect to="/user/order" />
        }
    }

    const preload = () => {
        getAllProducts(user.message).then(res => {
            setProducts(res)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        preload();
    }, [])

    const showCart = () => {
        return (<Fragment>
            {success && <CustomAlert variant="success" message={success} />}
            {error && <CustomAlert variant="danger" message={error} />}
            {performRedirect()}
            {cartItems.map(items => (
                <Card key={items.id + items.name} className="mt-4">
                    <Card.Body className="card_body">
                        <div className="cart_details">
                            <div className="cart_desc">
                                <Image src={`images/${items.imageURL}`} width="180" height="171" rounded />
                                <h3 className="mt-2 ml-2">{items.name}</h3>
                            </div>
                            <div className="cart_price">
                                <h2>Price Per Unit</h2>
                                <h3>${items.price}</h3>
                            </div>
                            <div className="cart_quantity">
                                <h2>Quantity</h2>
                                {/* <Form> */}

                                <Col sm="6">
                                    <Form.Control type="number" defaultValue={items.quantity} onChange={handleChange(items.id)} min="0" />
                                </Col>

                                {/* </Form> */}
                            </div>

                            <div className="cart_tot">
                                <h2>Total</h2>
                                <h3>${(items.price * items.quantity).toFixed(2)}</h3>
                            </div>

                        </div>

                    </Card.Body>
                </Card>
            ))}

            <br />
            <br />
            <br />

            <hr />
            <div class="order_total" >
                <h1>Your order Totals:${calculateTotal()}</h1>

                {!isDisabled && <StripeCheckout name="TechNova Shopping Store"
                    panelLabel="Give Money"
                    image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                    stripeKey=
                    {"pk_test_51JNf6DC7Yvc0JX2KgUmx6ga53jJKKtDcjVazdvJ23db61W4fFtUH0QHJNoxOC4a5FeAjx5kLWRuEdRSYmYDRbJ0o00PzC2REft"} shippingAddress={true} zipCode={true} billingAddress={true} ammount={calculateTotal() * 100} token={placeOrder} alipay={true} bitcoin={true}>
                    <Button variant='outline-info' >Checkout</Button>
                </StripeCheckout>}

            </div>


        </Fragment>
        )
    }

    return (<Container fluid="md" className="mt-4">
        <Row>
            <Col>
                <h1>Your Shopping Cart!!</h1>
                {cartItems.length > 0 ? (showCart()) : (
                    <div className="text-center">
                        <h1>Your Cart is Empty</h1>
                        <Link to="/product">Please shop here...</Link>
                    </div>
                )}
            </Col>
        </Row>
    </Container>)

}


export default CartNew;