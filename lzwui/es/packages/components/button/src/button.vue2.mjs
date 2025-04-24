import { defineComponent as a, createElementBlock as n, openBlock as o, normalizeClass as s, createElementVNode as d, createCommentVNode as l, renderSlot as u } from "vue";
const i = ["disabled"], r = { class: "t-button__inner" }, c = { key: 0 }, b = /* @__PURE__ */ a({
  name: "t-button",
  __name: "button",
  props: {
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: ""
    },
    round: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, f) => (o(), n("button", {
      class: s(["t-button", [
        `t-button__${e.type}`,
        `${e.size && "t-button--" + e.size}`,
        { "is-round": e.round }
      ]]),
      disabled: e.disabled
    }, [
      d("div", r, [
        t.$slots.default ? (o(), n("span", c, [
          u(t.$slots, "default", {}, void 0, !0)
        ])) : l("", !0)
      ])
    ], 10, i));
  }
});
export {
  b as default
};
