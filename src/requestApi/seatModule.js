import Fetch from "./Fetch";
let tag = "/apiTickets";

export const getSeatInfo = (etcid = 1) => {
  return Fetch({
    method: "get",
    url: `${tag}/seat/query_by_etc/${etcid}/1/8`,
  });
};
export const alterSeatInfo = (data) => {
  return Fetch({
    method: "post",
    url: `${tag}/seat/edit`,
    data,
  });
};
