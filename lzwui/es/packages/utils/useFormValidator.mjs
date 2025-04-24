import { ref as d } from "vue";
import l from "../../node_modules/.pnpm/async-validator@4.2.5/node_modules/async-validator/dist-web/index.mjs";
l.warning = () => {
};
function g(r, s) {
  const a = d({});
  return {
    errors: a,
    validateField: (e) => {
      const i = {
        [e]: r[e]
      }, n = {
        [e]: s[e]
      }, t = new l(n);
      return new Promise((o) => {
        t.validate(i, (c) => {
          a.value[e] = c, o(!c);
        });
      });
    },
    validate: () => {
      const e = new l(s);
      return new Promise((i) => {
        e.validate(r, (n) => {
          const t = {};
          n ? (n.forEach((o) => {
            t[o.field] = [o];
          }), a.value = t, i(!1)) : a.value = t, i(!0);
        });
      });
    }
  };
}
export {
  g as useFormValidation
};
