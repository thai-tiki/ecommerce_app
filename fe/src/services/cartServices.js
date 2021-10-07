import { constants as c } from "../constants";
import { appServices } from "./appServices";
import { DeviceUUID } from "device-uuid";
const uuid = new DeviceUUID().get();
const store_code = appServices.store_code;
function addCart(product) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(product),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/items`,
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
function changeNumberInCart(product) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
    body: JSON.stringify(product),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/items`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(product);
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getCartInfo() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": `${store_code}-${uuid}`,
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/carts`, requestOptions)
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
function getShipmentFee(idAddress) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify({
      id_address_customer: idAddress,
    }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/shipment/fee`,
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
function getPaymentMethods() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/payment_methods`,
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
function order(orderInfo) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(orderInfo),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders`,
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
function getOrdersList(query) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders${query}`,
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
function getOrderInfo(orderCode) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/carts/orders/${orderCode}`,
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
function cancelOrder(info) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
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
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
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
function applyDiscount(info) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/carts`, requestOptions)
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
  getShipmentFee,
  getPaymentMethods,
  changeNumberInCart,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
  changePaymentMethod,
};
