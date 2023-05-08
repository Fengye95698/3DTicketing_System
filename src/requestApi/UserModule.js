import Fetch from "./Fetch";
let tag = "/apiTickets";

export const userLogin = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/auth/login`,
    data,
  });
};
export const userRegister = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/auth/register`,
    data,
  });
};
export const getUserInfo = (userId) => {
  return Fetch({
    method: "get",
    url: `${tag}/user/query_users/${userId}/1/20`,
  });
};

export const searchUserInfo = (username) => {
  return Fetch({
    method: "get",
    url: `${tag}/user/search/${username}`,
  });
};

export const deleteUser = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/user/delete`,
    data,
  });
};
