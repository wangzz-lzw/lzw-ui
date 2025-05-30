import type { App } from "vue";

import Input from "./src/input.vue";


Input.install = (app:App) => {
    app.component(Input.name!, Input);
};


export const TInput = Input;

export default TInput;

