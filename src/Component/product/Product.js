import React, { useState, useEffect, Fragment } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { getAllProducts } from '../backend/ProductController';
import { isauthenticated } from '../backend/Auth';
import { CartContext } from '../context/CartContext';
import CustomAlert from '../reuse/CustomAlert';


function Product() {
    const [products, setProducts] = useState([]);
    const [info, setInfo] = useState({
        success: "",
        error: ""
    })

    const { cartItems, setCartItems } = React.useContext(CartContext);

    const { success, error } = info;
    const user = isauthenticated();

    const preload = () => {
        getAllProducts(user.message).then(res => {
            setProducts(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const addToCart = (id) => {
        setInfo({ ...info, error: "", success: "" })
        const cartProduct = products.filter(product => product.id === id);
        cartProduct[0].quantity = 1;

        const checkDuplicate = cartItems.filter(item => item.id === id)
        if (checkDuplicate.length === 0) {
            // console.log('hello')
            setCartItems(prevValue => [...prevValue, cartProduct[0]])
            setInfo({ ...info, error: "", success: "Successfully added to the cart" })

        } else {
            setInfo({ ...info, error: "Already in the cart", success: "" })

        }

    }
    const showProduct = () => {
        return (<Fragment>
            {products.map((product) => (
                <Col key={product.id + product.name}>
                    <Card className="product__card" >
                        <Card.Img variant="top" src={`images/${product.imageURL}`} />

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <div className="product__price">
                            <h3>${product.price}</h3>
                            {/* <Button variant="outline-info" onClick={() => addToCart(product)}>Add to Cart</Button> */}
                            {product.quantity === 0 ? (
                                <Button variant="outline-danger" disabled>Out of Stock</Button>) : <Button variant="outline-info" onClick={() => addToCart(product.id)}>Add to Cart</Button>}


                        </div>


                    </Card>
                </Col>
            ))
            }
        </Fragment >)
    }


    useEffect(() => {
        preload();
    }, [])
    return (
        <Container fluid="md" style={{ overflow: 'scroll' }}>

            {success && <CustomAlert variant="success" message={success} />}
            {error && <CustomAlert variant="danger" message={error} />}
            <Row xs={1} md={2} className="g-4">

                {products ? showProduct() : <h1 className="text-center mt-4">No product to display</h1>}


            </Row>
        </Container >
    )
}

export default Product
