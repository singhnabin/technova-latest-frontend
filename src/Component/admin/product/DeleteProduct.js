import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { isauthenticated } from "../../backend/Auth";
import { deleteCategorybyID } from "../../backend/CategoryCotroller";
import { deleteProductbyID } from "../../backend/ProductController";
import CustomAlert from "../../reuse/CustomAlert";
import CustomSpinner from "../../reuse/CustomSpinner";
import AdminDashboard from "../AdminDashboard";

function DeleteProduct() {
  const { proId } = useParams();
  const user = isauthenticated();
  const [resp, setResp] = useState({
    error:"",
    message:"",
    loading:false,

  })

  
  const{error,message,loading}=resp;

  

  const handleClick=()=>{
    setResp({...resp,loading:true,message:"",error:""})

    deleteProductbyID(proId,user.message).then(res=>{

       // console.log(res);
        
        if(res.status===200){
            //<CustomAlert variant="success" message={res.message}/> 
            setResp({...resp,loading:false,message:res.message,error:""})
            
  
          }
          else{
            setResp({...resp,loading:false,message:"",error:res.error})
          }
          
    }).catch(err=>{console.log(err)});

    }



  return (
    <AdminDashboard>
      <div>
          <container>

          <h1>Press Delete to Delete</h1>
          <Button variant="primary" type="button" onClick={handleClick}>
   DELETE
  </Button>
  <div style={{textAlign:'center'}}>
       {loading&& <CustomSpinner/>}

      {message&& <CustomAlert variant="success" message={message}/>}
      {error&&<CustomAlert variant="danger" error={error}/>}
     
      {/* {didRedirect&& (userRedirect())} */}
      
      </div>
          </container>

      </div>
    </AdminDashboard>
  );
            }

export default DeleteProduct;
