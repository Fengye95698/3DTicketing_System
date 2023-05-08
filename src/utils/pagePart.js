import Gsap from "gsap";
export const choosePrice = (_this, name) => {
  switch (name) {
    case "A08":
      _this.chair.price = 388;
      break;
    case "O25":
      _this.chair.price = 168;
      break;
    case "AA018":
      _this.chair.price = 388;
      break;
    case "AA25":
      _this.chair.price = 358;
      break;
    case "N22":
      _this.chair.price = 288;
      break;
    case "F32":
      _this.chair.price = 258;
      break;
    case "V03":
      _this.chair.price = 88;
      break;
    case "V08":
      _this.chair.price = 88;
      break;
    default:
      break;
  }
};
export const renderPrice = (_this, name) => {
  _this.chairList.forEach((res) => {
    if (res.name == name) {
      _this.chair.id = res.id;
      _this.chair.name = res.name;
      _this.chair.price = res.price;
    }
  });
};
