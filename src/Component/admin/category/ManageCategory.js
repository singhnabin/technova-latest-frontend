import React, { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isauthenticated } from "../../backend/Auth";
import { getAllCategories } from "../../backend/CategoryCotroller";
import AdminDashboard from "../AdminDashboard";

function ManageCategory() {
  const [category, setcategory] = useState([]);
  const user = isauthenticated();

  useEffect(() => {
    getAllCategories(user.message)
      .then((res) => {
        setcategory(res.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);


  const showData = () => {
    return category.map((cate, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{cate.type}</td>
          <td>{cate.createdBy}</td>
          <td>
            {" "}
            <Link to={`cateUpdate/${cate.id}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`cateDelete/${cate.id}`}>
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
              <th>S.N</th>
              <th>Type</th>
              <th>Creator</th>
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

export default ManageCategory;
