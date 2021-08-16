import React,{useState}  from 'react'
import { Card, CardGroup, Button } from 'react-bootstrap'


function Category() {
    // const [resp, setResp] = useState({
    //     error:"",
    //     message:"",
  
    //   })
  
    //   const{error,message,loading}=resp;

    // const handleClick=()=>{
    //   setResp({...resp,message:"",error:""})
    //    getCategory().then(res=>{

    //     if(res.status===200){
    //       setResp({...resp,message:res.message,error:""})

    //     }
    //     else{
    //       setResp({...resp,error:res.error,message:""})
    //     }

    //    }).catch(err=>{console.log(err)});
    //    //console.log("logged in")
    // }


    return (
        <div>
            <CardGroup>
  <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Electronics</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Button variant="primary" type="button"  >
    Shop
  </Button>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Clothing</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Button variant="primary" type="button"  >
    Shop
  </Button>
     
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/7005702/pexels-photo-7005702.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
    <Card.Body>
      <Card.Title>Home and Appliances</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Button variant="primary" type="button"  >
    Shop
  </Button>
     
    </Card.Footer>
  </Card>
</CardGroup>
            
        </div>
    )
}

export default Category
