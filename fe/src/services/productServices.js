import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;
function getAllProducts(queryString) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/product${queryString}`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getProductInfo(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/product/${id}`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function updateProduct(product) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(product),
  };
  return fetch(`${c.API_URL}/product/${product._id}`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function addProduct(product) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(product),
  };
  return fetch(`${c.API_URL}/product`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getProductReview(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/product/rating/${id}`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function reviewProduct(reviewInfo) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(reviewInfo),
  };
  return fetch(
    `${c.API_URL}/product/rating/${reviewInfo.product}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getSimilarProducts(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/product/similar/${id}`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function toggleWishList(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/product/like/${id}`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getFavoriteProducts() {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/product/favorite`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
//OK
function getPurchasedProducts() {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": token ? token.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/purchased_products`,
    requestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
export const productServices = {
  addProduct,
  updateProduct,
  getAllProducts,
  getProductInfo,
  getSimilarProducts,
  toggleWishList,
  reviewProduct,
  getFavoriteProducts,
  getPurchasedProducts,
  getProductReview,
};
