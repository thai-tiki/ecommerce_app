import { constants as c } from "../constants";
function formatPrice(p) {
  if (!p) return "0";
  p = Math.round(p);
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  return rs;
}
function showNextElement(e, height) {
  let currentElement = e.currentTarget;
  let nextElement = currentElement.nextElementSibling;
  let parentElement = currentElement.parentElement;
  if (nextElement.style.maxHeight) {
    nextElement.style.maxHeight = null;
    parentElement.style.zIndex = 2;
  } else {
    if (!height)
      nextElement.style.maxHeight = nextElement.scrollHeight + 16 + "px";
    else {
      nextElement.style.overflowY = "scroll";
      nextElement.style.maxHeight = height + 16 + "px";
    }

    parentElement.style.zIndex = 4;
  }
}
function hideParentElement(e) {
  let currentElement = e.currentTarget;
  let parentElement = currentElement.parentElement;
  parentElement.style.maxHeight = null;
  parentElement.parentElement.style.zIndex = 2;
}
async function uploadImage(formData) {
  console.log("upload");
  const API_KEY = "92bd8c2c76657d6c7d7dd0eb1e7dc4d0";
  const requestOptions = {
    method: "POST",
    header: {
      "mime-type": "multipart/form-data",
      "content-type": false,
    },
    body: formData,
  };
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY}`,
    requestOptions
  );
  if (!response.ok) {
    console.log("Error ! Fail to upload image");
    return "";
  }
  const json = await response.json();
  console.log(json.data.url);
  return json.data.url;
}
function handleImgErr(e) {
  e.target.src = c.DEFAULT_PRODUCT_IMG;
}
function isHexColor(color) {
  var re = /^#[0-9A-F]{6}$/i;
  return re.test(color);
}
function isImageUrl(url) {
  if (!url) return false;
  let str = url.replace('"', "");
  let imgFormat = ["jpg", "png", "jpeg", "svg"];
  let arr = str.split(".");
  let fileExtension = arr[arr.length - 1];
  return imgFormat.includes(fileExtension);
}
function isNullText(text) {
  return !text || text === "null";
}
async function requestOtp(phone_number) {
  const path = `${c.API_URL}/send_otp`;
  let formData = new FormData();
  formData.append("phone_number", phone_number);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(path, requestOptions);
  if (!response.ok) {
    console.log("otp fail");
    return "";
  }
  const json = await response.json();
  console.log(json);
  return json.data;
}
function formatDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  var hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : "0" + hour;
  var minute = date.getMinutes().toString();
  minute = minute.length > 1 ? minute : "0" + minute;
  var second = date.getSeconds().toString();
  second = second.length > 1 ? second : "0" + second;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
function standardProductLink(str) {
  str = removeAccents(str);
  str = str.replace(/\s/g, "-");
  str = replaceAll(str, "/", "-");
  str = replaceAll(str, "--", "-");
  return str;
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
function getAddressString(location, province, district, ward, detail) {
  return (
    detail +
    ", " +
    location[province].sub[district].sub[ward].name +
    ", " +
    location[province].sub[district].name +
    ", " +
    location[province].name
  );
}
function convertMoney(m) {
  return m / 1000 + "K";
}
function getDate() {
  let date = new Date();
  let dateStr = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let monthStr =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth()}`;
  return `${dateStr}-${monthStr}-${date.getFullYear()}`;
}
export {
  validURL,
  formatPrice,
  convertMoney,
  showNextElement,
  hideParentElement,
  uploadImage,
  handleImgErr,
  isImageUrl,
  isHexColor,
  isNullText,
  formatDate,
  requestOtp,
  getDate,
  isJson,
  standardProductLink,
  getAddressString,
};
