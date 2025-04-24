import { defineComponent as a, createElementBlock as p, openBlock as u, createElementVNode as r } from "vue";
const s = { class: "lzw-input" }, d = /* @__PURE__ */ a({
  __name: "input",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(c, { emit: n }) {
    const l = n, o = (e) => {
      const t = e.target;
      l("update:modelValue", t.value);
    };
    return (e, t) => (u(), p("div", s, [
      r("input", {
        class: "lzw-input__inner",
        onInput: o
      }, null, 32)
    ]));
  }
});
export {
  d as default
};
