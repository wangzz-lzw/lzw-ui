import { defineComponent as r, provide as l, createElementBlock as n, openBlock as m, renderSlot as p } from "vue";
const u = /* @__PURE__ */ r({
  name: "t-form",
  __name: "form",
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  setup(o) {
    const e = o;
    return l("form", { rules: e.rules, model: e.model }), (t, s) => (m(), n("div", null, [
      p(t.$slots, "default")
    ]));
  }
});
export {
  u as default
};
