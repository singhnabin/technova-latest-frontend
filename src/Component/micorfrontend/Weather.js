import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import * as zoid from 'zoid/dist/zoid.frameworks';
function Weather() {

    const prime = zoid.create({
        tag: "weather",
        url: 'http://localhost:3000',
        dimensions:
            { width: '100%', height: "100vh" }
    })
    const PrimeComponent = prime.driver("react", {
        React: React,
        ReactDOM: ReactDOM
    })

    const printMe = (name) => {
        alert(`hi there, calling form child ${name}`)
    }

    return (

        <Row >
            <Col style={{ height: "100vh" }}><PrimeComponent printMe={printMe} style={{ height: "100vh" }} /></Col>
        </Row>
    )
}

export default Weather;