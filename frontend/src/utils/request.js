import axios from "axios";
import { StatusCode } from '../constant/constant';
import { toast } from 'react-toastify';

const request = axios.create({
  baseURL: 'https://localhost:5000/', // url = base url + request url
  timeout: 12400000,
  responseType: 'json',
});

let requests= [];
let conflictRequest= "";

// Request interceptors Customize based on your need
request.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }

    if (config.headers["isDisableLoader"] !== true) {
      requests.push(config.url);
      showLoader();
    }

    return config;
  },
  (error) => {
    alert(error);
    Promise.reject(error);
  }
);

// Response interceptors Customize based on your need
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    removeRequest(response.config.url);
    if (data?.code && data?.code !== StatusCode.Success) {
      return Promise.reject(new Error(data.message || "Error"));
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    removeRequest(error.config.url);
    switch (error.response.status) {
      // Authorization Failed Response can add other status codes here to manage error Logging
      case StatusCode.Forbidden:
        break;
      case StatusCode.Unauthorized:
        toast.error(error.response.data.message)
        break;
      case StatusCode.Conflict: // conflicts with existing record.
        toast.error(error.response.data.message)
        break;
      case StatusCode.BadRequest:
        toast.error(error.response.data.message);
        break;
      case StatusCode.InternalServer:
        toast.error(error.response.data.message);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

function showLoader() {
  document.body.classList.add('loader-open');
}

function hideLoader() {
  document.body.classList.remove('loader-open');
}

// remove completed request
function removeRequest(req) {
  const i = requests.indexOf(req);
  if (i >= 0) {
    requests.splice(i, 1);
  }
  if (requests.length > 0) {
    showLoader();
  } else {
    hideLoader();
  }
  if (req === conflictRequest) {
    conflictRequest = "";
    requests = requests.filter(request => request !== req)
  }
}

export default request;
