import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;
function addCart(product) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(product),
  };
  return fetch(`${c.API_URL}/cart/item`, requestOptions)
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
function getCartInfo() {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/cart`, requestOptions)
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
function getPaymentMethods() {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/payment_method`, requestOptions)
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
function getShipmentMethods(idAddress) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/shipment_method`, requestOptions)
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
function applyDiscount(type, value) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify({ type, value }),
  };
  return fetch(`${c.API_URL}/cart/discount`, requestOptions)
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
function order(orderInfo) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(orderInfo),
  };
  return fetch(`${c.API_URL}/cart/order`, requestOptions)
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
function changeNumberInCart(id, quantity) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify({ id, quantity }),
  };
  return fetch(`${c.API_URL}/cart/item`, requestOptions)
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
function getOrdersList(query, isAdmin) {
  let url = `${c.API_URL}/order${query}`;
  if (isAdmin) url = `${c.API_URL}/admin/order${query}`;
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(url, requestOptions)
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
function getOrderInfo(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
  return fetch(`${c.API_URL}/order/${id}`, requestOptions)
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
function updateOrder(orderInfo) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
    body: JSON.stringify(orderInfo),
  };
  return fetch(`${c.API_URL}/order/${orderInfo._id}`, requestOptions)
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
function cancelOrder(info) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": token ? token : "",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/cancel`,
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
function changePaymentMethod(info) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": token ? token : "",
    },
    body: JSON.stringify({
      payment_method_id: info.paymentMethodId,
    }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/change_payment_method/${info.orderCode}`,
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
export const cartServices = {
  order,
  addCart,
  getCartInfo,
  updateOrder,
  getShipmentMethods,
  getPaymentMethods,
  changeNumberInCart,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
  changePaymentMethod,
};
