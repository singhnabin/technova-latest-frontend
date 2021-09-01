import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AdminDashboard({ children }) {
  return (
    <Container fluid="lg">
      <Row>
        <Col>
          <div className="admin">
            <div className="admin__sidebar">
              <div className="admin-control">
                <Link to="/createCategory">Create Category</Link>

              </div>
              <div className="admin-control">
                <Link to="/manageCategory">Manage Category</Link>
              </div>
              <div className="admin-control">

                <Link to="/manageProduct">Manage Product</Link>
              </div>

              <div className="admin-control">
                <Link to="/createProduct">Create Product</Link>
              </div>
              <div className="admin-control">
                <Link to="/manageProduct">Manage Orders</Link>
              </div>
            </div>
            <div className="admin__main">{children}</div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
