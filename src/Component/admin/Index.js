import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { Row, Card, Col } from 'react-bootstrap';
import { getAllProducts } from '../backend/ProductController';
import { isauthenticated } from '../backend/Auth';


function Index() {
    const [products, setProducts] = useState([]);
    const [info, setInfo] = useState({
        success: "",
        error: ""
    })

    // const { cartItems, setCartItems } = React.useContext(CartContext);

    const { success, error } = info;
    const user = isauthenticated();

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
    return (<AdminDashboard>
        <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col>
                    <Card bg="success">

                        <Card.Body>
                            <Card.Title>Total Products</Card.Title>
                            <Card.Text style={{ fontSize: "60" }}>
                                {products.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </AdminDashboard>)

}

export default Index;