const API3 = "http://localhost:8080/api/product"

export const createproduct = (data, isloggedin) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log(formData)
  if (isloggedin) {

    return fetch(`${API3}/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${isloggedin}`,
        // Accept: "application/json",
        //"Content-Type":"application/json",
        // "Content-Type": "application/json",
      },
      body: formData
    }).then(resp => {
      return resp.json();
    })
      .catch(err => {
        console.log(err)
      })

  }
}


export const getAllProducts = (token) => {

  return fetch(`${API3}/getAllproducts`, {

    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      //"Content-Type":"application/json",
      "Content-Type": "application/json",


    },
  }).then(resp => {
    return resp.json();
  })
    .catch(err => {
      console.log(err)
    })


}

export const deleteProductbyID = (id, token) => {

  return fetch(`${API3}/deleteProduct/${id}`, {

    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      //"Content-Type":"application/json",
      "Content-Type": "application/json",


    },
  }).then(resp => {
    return resp.json();
  })
    .catch(err => {
      console.log(err)
    })


}

export const updateproductbyID = (token, id, data) => {

  return fetch(`${API3}/updateProduct/${id}`, {

    method: "PUT",

    headers: {
      Authorization: `Bearers ${token}`,
      Accept: "application/json",
      //"Content-Type":"application/json",
      "Content-Type": "application/json",


    },
    body: JSON.stringify(data)
  }).then(resp => {
    return resp.json();
  })
    .catch(err => {
      console.log(err)
    })


}


export const getAllOrderByUser = (user) => {

  return fetch(`http://localhost:8080/api/order/user/${user.username}`, {

    method: "GET",

    headers: {
      Authorization: `Bearer ${user.message}`,
      Accept: "application/json",
      //"Content-Type":"application/json",
      "Content-Type": "application/json",


    },
  }).then(resp => {
    return resp.json();
  })
    .catch(err => {
      console.log(err)
    })


}