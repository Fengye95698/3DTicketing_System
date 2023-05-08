import Fetch from "./Fetch";
let tag = "/apiTickets";

export const getUserCartInfo = (userId) => {
  return Fetch({
    method: "get",
    url: `${tag}/cart/query/${userId}`,
  });
};
export const addCartInfo = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/cart/add`,
    data,
  });
};
export const updateCartSelectedStatus = (data, userId) => {
  return Fetch({
    method: "post",
    url: `${tag}/cart/edit/${userId}`,
    data,
  });
};
export const deleteCartInfo = (data, userId) => {
  return Fetch({
    method: "post",
    url: `${tag}/cart/delete/${userId}`,
    data,
  });
};
export const cartSelectedAll = (userId, option) => {
  // option 0不选
  return Fetch({
    method: "post",
    url: `${tag}/cart/select_all/${userId}/${option}`,
  });
};
