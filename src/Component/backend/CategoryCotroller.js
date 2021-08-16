const API2="http://localhost:8080/api/category"


//axiox
//fetch()

export const createcat=(data,isloggedin)=>{

  if(isloggedin){

  return fetch(`${API2}/create`,{

    method:"POST",

    headers:{
        Authorization:`Bearer ${isloggedin}`,
        Accept:"application/json",
        //"Content-Type":"application/json",
        "Content-Type": "application/json",
        
        
    },
    body:JSON.stringify(data)
  }).then(resp=>{
    return resp.json();
  })
  .catch(err=>{
      console.log(err)
  })

}}


export const  getAllCategories=(token)=>{

  return fetch(`${API2}/getallCategory`,{

    method:"GET",

    headers:{
        Authorization:`Bearers ${token}`,
        Accept:"application/json",
        //"Content-Type":"application/json",
        "Content-Type": "application/json",
        
        
    },
  }).then(resp=>{
    return resp.json();
  })
  .catch(err=>{
      console.log(err)
  })


}


export const  getCategorybyID=(id,token)=>{

  return fetch(`${API2}/getCategory/${id}`,{

    method:"GET",

    headers:{
        Authorization:`Bearers ${token}`,
        Accept:"application/json",
        //"Content-Type":"application/json",
        "Content-Type": "application/json",
        
        
    },
  }).then(resp=>{
    return resp.json();
  })
  .catch(err=>{
      console.log(err)
  })


}

export const  updateCategorybyID=(token,id,data)=>{

  return fetch(`${API2}/updateCategory/${id}`,{

    method:"PUT",

    headers:{
        Authorization:`Bearers ${token}`,
        Accept:"application/json",
        //"Content-Type":"application/json",
        "Content-Type": "application/json",
        
        
    },
    body:JSON.stringify(data)
  }).then(resp=>{
    return resp.json();
  })
  .catch(err=>{
      console.log(err)
  })


}

export const  deleteCategorybyID=(id,token)=>{

  return fetch(`${API2}/deleteCategory/${id}`,{

    method:"DELETE",

    headers:{
        Authorization:`Bearers ${token}`,
        Accept:"application/json",
        //"Content-Type":"application/json",
        //"Content-Type": "application/json", 
    },
  }).then(resp=>{
    return resp.json();
  })
  .catch(err=>{
      console.log(err)
  })


}

