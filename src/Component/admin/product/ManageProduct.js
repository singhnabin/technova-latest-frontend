import React, { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isauthenticated } from "../../backend/Auth";
import { getAllProducts } from "../../backend/ProductController";
// import {getAllProducts } from "../../backend/ProductCotroller";
import AdminDashboard from "../AdminDashboard";

function ManageProduct() {
  const [product, setProduct] = useState([]);
  const user = isauthenticated();

  useEffect(() => {
    getAllProducts(user.message)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product]);


 

  const showData = () => {
    return product.map((pro) => {
      return (
        <tr key={pro.id}>
          <td>{pro.name}</td>
          <td>{pro.category}</td>
          <td>{pro.description}</td>
          <td>{pro.quantity}</td>
          <td>{pro.price}</td>
          <td>
            {" "}
            <Link to={`productUpdate/${pro.id}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`productDelete/${pro.id}`}>
            <Button variant="danger" style={{ marginLeft: "25px" }}>
              Delete
            </Button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <AdminDashboard>
      <row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           {showData()}
          </tbody>
        </Table>
      </row>

    </AdminDashboard>
  );
}


export default ManageProduct;
