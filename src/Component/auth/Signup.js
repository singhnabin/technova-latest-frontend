import { Button, Col, Container, Row } from 'react-bootstrap'
import React,{useState} from 'react'
import { Form } from 'react-bootstrap'
import { createuser } from '../backend/Auth';
import CustomAlert from '../reuse/CustomAlert';
import CustomSpinner from '../reuse/CustomSpinner';


function Signup() {
    const [info, setinfo] = useState({

        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const [resp, setResp] = useState({
      error:"",
      message:"",
      loading:false,

    })

    const {firstname,lastname,email,password}=info;
    const{error,message,loading}=resp;

    // const handleName=e=>{
    //     console.log(e.target.value)
    // }
    const handleFirstName=e=>{
        setinfo({...info,firstname:e.target.value})
    }
    const handleLastName=e=>{
        setinfo({...info,lastname:e.target.value})
        
    }
    const handleEmail=e=>{
        
        setinfo({...info,email:e.target.value})
    }
    const handlePassword=e=>{
        setinfo({...info,password:e.target.value})
    }

    //instead of writing 4 func above,we can do the followinf function

    const handleChange=(name)=>e=>{

        setinfo({...info,[name]:e.target.value})

    }

    const handleClick=()=>{
      setResp({...resp,loading:true,message:"",error:""})
       createuser(info).then(res=>{

        if(res.status===200){
          setResp({...resp,message:res.message,loading:false,error:""})

        }
        else{
          setResp({...resp,loading:false,error:res.error,message:""})
        }

       }).catch(err=>{console.log(err)});
       //console.log("logged in")
    }



    return (
        <div>
<Container>

<Row>
  
    <Col md={{ span: 6, offset: 3 }}>
      <div style={{textAlign:'center'}}>
      {loading&& <CustomSpinner/>}
      {message&&<CustomAlert variant="success" message={message}/>}
      {error&&<CustomAlert variant="danger" message={error}/>}
      
      </div>
    
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter first name" onChange={handleFirstName} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter last name" onChange={handleLastName} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"onChange={handleEmail} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
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

export default Signup
