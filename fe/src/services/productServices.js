import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;
function getProductInfo(id) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products/${id}`,
    requestOptions
  )
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
function getSimilarProducts(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products/${id}/similar_products`,
    requestOptions
  )
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
function getAllProducts(queryString) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products${queryString}`,
    requestOptions
  )
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
function getFavoriteProducts() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/favorites`, requestOptions)
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
function toggleWishList(id, isLiked) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify({
      is_favorite: !isLiked,
    }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products/${id}/favorites`,
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
function reviewProduct(id, reviewInfo) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(reviewInfo),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products/${id}/reviews`,
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
function getPurchasedProducts() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
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
function getProductReview(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/products/${id}/reviews`,
    requestOptions
  )
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
export const productServices = {
  getProductInfo,
  getSimilarProducts,
  getAllProducts,
  toggleWishList,
  reviewProduct,
  getFavoriteProducts,
  getPurchasedProducts,
  getProductReview,
};
