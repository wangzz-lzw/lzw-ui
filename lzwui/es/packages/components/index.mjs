import "../theme-chalk/index.scss.mjs";
import * as n from "./components.mjs";
const s = {
  install(o) {
    Object.entries(n).forEach(([t, e]) => {
      o.component(t, e);
    });
  }
};
export {
  s as default
};
