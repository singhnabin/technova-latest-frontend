
const API = "http://localhost:8080/api/user"



export const createuser = (data) => {

  return fetch(`${API}/create`, {

    method: "POST",

    headers: {
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

export const userlogin = (data) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).then(resp => {
    return resp.json();

  }).catch(err => {
    console.log(err)
  })
}

export const authenticate = (data, setUser, next) => {
  if (typeof window !== "undefined") {
    setUser(data)
    localStorage.setItem("userInfo", JSON.stringify(data))
  }
  next()

}

export const isauthenticated = () => {
  if (typeof window === "undefined") return false
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"))
  }
  else {
    return false
  }

}

export const isLogout = (setUser, next) => {
  if (typeof window !== "undefined") {
    setUser();
    localStorage.removeItem("userInfo");
    next();
  }
}

export const placeStripeOrder = (paymentInfo, products, token, username) => {
  const jsonBody = {
    paymentInfo,
    productsList: products,
    orderBy: username
  }
  return fetch(`http://localhost:8080/api/technova/payment`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody)
  }).then(resp => {
    return resp.json();

  }).catch(err => {
    console.log(err)
  })

}

