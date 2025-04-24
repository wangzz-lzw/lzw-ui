import { defineComponent as p, inject as v, createElementBlock as o, openBlock as r, createElementVNode as F, createCommentVNode as a, normalizeClass as b, unref as n, renderSlot as h, toDisplayString as i } from "vue";
import { useFormValidation as y } from "../../../utils/useFormValidator.mjs";
const g = { key: 0 }, k = {
  key: 0,
  class: "error"
}, C = /* @__PURE__ */ p({
  name: "t-form-item",
  __name: "form-item",
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const m = e, l = v("form");
    if (!l)
      throw new Error("FormItem must be used within a Form component");
    const { rules: s, model: c } = l, { validateField: d, errors: t } = y(c, s), u = () => {
      d(m.prop);
    };
    return (f, S) => (r(), o("div", {
      onFocusout: u,
      class: "t-form-item"
    }, [
      F("div", {
        class: b([{ "validate-error": n(t)[e.prop] }, "t-form-item-content"])
      }, [
        e.label ? (r(), o("label", g, i(e.label) + ":", 1)) : a("", !0),
        h(f.$slots, "default", {}, void 0, !0)
      ], 2),
      n(t)[e.prop] ? (r(), o("div", k, i(n(t)[e.prop][0].message), 1)) : a("", !0)
    ], 32));
  }
});
export {
  C as default
};
