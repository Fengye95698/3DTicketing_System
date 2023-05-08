import Fetch from "./Fetch";
let tag = "/apiTickets";

export const generateOrder = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/order/add`,
    data,
  });
};
export const orderPay = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/order/pay`,
    data,
  });
};
export const orderList = (userId) => {
  return Fetch({
    method: "get",
    url: `${tag}/order/query/19/1/10`,
  });
};
export const deleteOrderList = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/order/delete`,
    data,
  });
};
export const orderEdit = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/order/edit`,
    data,
  });
};
