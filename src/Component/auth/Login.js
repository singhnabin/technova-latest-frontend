//import { Button } from 'bootstrap';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { authenticate, userlogin } from '../backend/Auth';
import CustomAlert from '../reuse/CustomAlert';
import CustomSpinner from '../reuse/CustomSpinner';
import { AuthContext } from '../context/CartContext';


function Login() {
  const [info, setinfo] = useState({
    email: "",
    password: ""
  })
  const { setUser } = React.useContext(AuthContext);
  const [resp, setResp] = useState({
    error: "",
    message: "",
    loading: false,
    didRedirect: false

  })
  const { email, password } = info;
  const { error, message, loading, didRedirect } = resp;
  const handleEmail = e => {

    setinfo({ ...info, email: e.target.value })
  }
  const handlePassword = e => {
    setinfo({ ...info, password: e.target.value })
  }

  const userRedirect = () => {

    return <Redirect to="/user/dashboard"></Redirect>
  }

  const handleClick = () => {
    setResp({ ...resp, loading: true, message: "", error: "" })
    userlogin(info).then(res => {

      // setResp({...resp,loading:true})

      if (res.status === 200) {
        authenticate(res, setUser, () => {
          setResp({ ...resp, loading: false, didRedirect: true })
        })

        //setResp({...resp,message:res.message,loading:false})


      }
      else {
        setResp({ ...resp, loading: false, error: res.error })
      }

    }).catch(error => { console.log(error) });
    //console.log("logged in")
  }
  return (
    <div>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div style={{ textAlign: 'center' }}>
              {loading && <CustomSpinner />}
              {/* {message&&<CustomAlert variant="success" message={message}/>} */}
              {error && <CustomAlert variant="danger" error={error} />}
              {didRedirect && (userRedirect())}

            </div>
            <Form>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleEmail} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleClick} >
                Submit
  </Button>
            </Form>

          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Login
