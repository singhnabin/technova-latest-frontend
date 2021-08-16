import React from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { isauthenticated } from '../backend/Auth';
import { getAllOrderByUser } from '../backend/ProductController';
import { Link } from 'react-router-dom';

function Userdashboard() {
    const [orders, setOrders] = React.useState([]);

    const userInfo = isauthenticated();
    const preload = () => {
        getAllOrderByUser(userInfo).then(res => {
            if (res.status === 200) {
                console.log(res)
                setOrders(res.orderList)
            }
        }).catch(err => {
            console.log(err)
        });
    }
    const showData = () => {
        return orders.map((order) => {
            return (
                <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>{order.category}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.deleveryStatus}    </td>
                    <td ><a href={order.orderReceipt} target='_blank'><Button variant="outline-info">View Reciept</Button>  </a> </td>
                    <td><Link to={`/order/${order.orderProgress}`}><Button variant="outline-info">Track your Package</Button>  </Link> </td>

                </tr >
            );
        });
    };

    React.useEffect(() => {
        preload();
    }, [])
    return (
        <div className='userdashboard'>
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Your Order History</h1>

                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Order Name</th>
                                    <th>Order Category</th>
                                    <th>Product Name</th>
                                    <th>Order Quantity</th>
                                    <th>Order Total</th>
                                    <th>Order Status</th>
                                    <th>View Order Receipt</th>
                                    <th>Track Your Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? showData() : (<div className="text-center">No Order to display</div>)}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Userdashboard
