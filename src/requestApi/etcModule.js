import Fetch from "./Fetch";
let tag = "/apiTickets";

export const getEtcInfo = (data) => {
  return Fetch({
    method: "get",
    url: `${tag}/etc/query_all/1/9`,
    params: data,
  });
};

export const addEtcInfo = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/etc/add`,
    data,
  });
};

export const updateEtcInfo = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/etc/edit`,
    data,
  });
};
export const deleteEtcInfo = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/etc/delete`,
    data,
  });
};
