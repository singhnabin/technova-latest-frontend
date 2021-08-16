import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isauthenticated } from "../backend/Auth";

export const getOrderStatus = progress => {
    if (progress < 10) return "Order is getting ready";
    if (progress > 10 && progress <= 20) return "Order is Ready for shipping.";
    if (progress > 20 && progress <= 50) return "Order is on transit";
    if (progress > 50 && progress <= 80) return "Order is 1 day behind";
    if (progress > 80 && progress <= 95) return "Order is 5 block away";
    if (progress === 100) return "Delivered at you door.";

}

function TrackOrder({ match }) {
    const [progress, setProgress] = useState(10);
    const [orderStatus, setOrderStatus] = useState("");

    const user = isauthenticated();
    useEffect(() => {
        setProgress(match.params.progress);

    }, [match.params])


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Your Order Status</h1>
                    <Link to='/user/order'><Button variant="outline-info">Back</Button></Link>
                    <div style={{ marginTop: '10px' }}>
                        <ProgressBar >
                            <ProgressBar now={progress} style={{ margin: 'unset' }} />
                        </ProgressBar>

                        <div className="order-status">
                            <h2>Order status: {getOrderStatus(progress)}</h2>
                        </div>
                    </div>


                </Col>
            </Row>
        </Container>
    );
}

export default TrackOrder;
