import axios from "axios";

const HOST = process.env.REACT_APP_HOST;

export const getAllUsers = () => {
  const URL = `${HOST}/users/`;
  return axios.get(URL);
};

export const createTransaction = (body) => {
  const URL = `${HOST}/transaction/create-transaction/`;
  return axios.post(URL, body);
};

export const getAllTransactions = () => {
  const URL = `${HOST}/transaction/`;
  return axios.get(URL);
};

export const getTransactionByUser = (userid) => {
  const URL = `${HOST}/transaction/transaction-by-user/${userid}`;
  return axios.get(URL);
};
