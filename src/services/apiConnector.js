import axios from "axios"

const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("API Connector =", method, url, bodyData, headers, params);

  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null, // Use 'data' instead of 'body'
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
