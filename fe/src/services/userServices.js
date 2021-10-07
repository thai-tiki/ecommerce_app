import { constants as c } from "../constants";
import { appServices } from "./appServices";
import { DeviceUUID } from  "device-uuid";
const store_code = appServices.store_code;
const uuid = new DeviceUUID().get();
function accountCheck(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/login/check_exists`,
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
function accountLogin(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/login`, requestOptions)
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
function accountRegis(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/register`, requestOptions)
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
function getUserAddress() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/address`, requestOptions)
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
function addUserAddress(addressInfo) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(addressInfo),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/address`, requestOptions)
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
function updateUserAddress(addressInfo) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(addressInfo),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/address/${addressInfo.id}`,
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
function deleteUserAddress(id) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/address/${id}`,
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
function getUserProfile() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/profile`, requestOptions)
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
function updateUserProfile(profile) {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(profile),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/profile`, requestOptions)
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
function getUserReview() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/reviews`, requestOptions)
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
function getUserBadges() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": uuid
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/badges`, requestOptions)
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
function getuserNotify() {
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/notifications_history`,
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
function resetPassword(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/reset_password`,
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
export const userServices = {
  accountCheck,
  accountLogin,
  accountRegis,
  resetPassword,
  getUserProfile,
  getUserAddress,
  addUserAddress,
  updateUserProfile,
  updateUserAddress,
  deleteUserAddress,
  getUserReview,
  getUserBadges,
  getuserNotify,
};
