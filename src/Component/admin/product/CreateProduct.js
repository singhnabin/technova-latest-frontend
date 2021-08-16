
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { createcat, getAllCategories } from '../../backend/CategoryCotroller'
import AdminDashboard from '../AdminDashboard'
import CustomAlert from '../../reuse/CustomAlert';
import CustomSpinner from '../../reuse/CustomSpinner';
import { isauthenticated } from '../../backend/Auth';
import { createproduct } from '../../backend/ProductController';


function CreateProduct() {

  const [info, setinfo] = useState({

    name: "",
    price: 0.00,
    description: "",
    quantity: "",
    created_by: "",
    category: "",
    image: "",




  })


  const [resp, setResp] = useState({
    error: "",
    message: "",
    loading: false,

  })
  const [cat, setCat] = useState([])
  const token = isauthenticated()

  const preload = () => {

    getAllCategories(token.message).then(res => {
      console.log(res)
      setCat(res.list)
      setinfo({ ...info, data: new FormData() })
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    preload();


  }, [])

  const handleChange = (name) => e => {

    let value = name === "image" ? e.target.files[0] : e.target.value

    setinfo({ ...info, [name]: value })

  }




  const { error, message, loading } = resp;
  const isLoggedIn = isauthenticated();




  const handleClick = () => {
    setResp({ ...resp, loading: true, message: "", error: "" })
    createproduct(info, isLoggedIn.message).then(res => {

      console.log(res)
      debugger;
      if (res.status === 200) {
        setResp({ ...resp, message: res.message, loading: false, error: "" })

      }
      else {
        setResp({ ...resp, loading: false, error: res.error, message: "" })
      }

    }).catch(err => { console.log(err) });
    //console.log("logged in")
  }
  console.log(info)

  return (
    <AdminDashboard>
      <div>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div style={{ textAlign: 'center' }}>
                {loading && <CustomSpinner />}
                {message && <CustomAlert variant="success" message={message} />}
                {error && <CustomAlert variant="danger" error={error} />}
                {/* {didRedirect&& (userRedirect())} */}

              </div>
              <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter the Product name" onChange={handleChange("name")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="text" placeholder="Enter the Product Price" onChange={handleChange("price")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Prodcut Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter the Prodcut Description" onChange={handleChange("description")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control type="text" placeholder="Enter Product Quantity" onChange={handleChange("quantity")} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select file</Form.Label>
                  <Form.Control type="file" onChange={handleChange("image")} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={handleChange("category")}>
                    <option>Category</option>
                    {
                      cat.map((cate) => (
                        <option key={cate.id} value={cate.type}>{cate.type}</option>
                      )

                      )
                    }

                  </Form.Select>
                  {/* <Form.Control type="text" placeholder="Enter Product Category" onChange={handleChange("category")} /> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleClick}>
                  Submit
  </Button>
              </Form>

            </Col>
          </Row>
        </Container>
      </div>
    </AdminDashboard>
  )
}

export default CreateProduct
