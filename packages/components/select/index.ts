import type { App } from "vue";

import Select from "./src/select.vue";


Select.install = (app:App) => {
    app.component(Select.name!, Select);
};


export const TSelect = Select;

export default TSelect;
