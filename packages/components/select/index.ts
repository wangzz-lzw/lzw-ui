import type { App } from "vue";

import Select from "./src/select.vue";
import SelectOption from "./src/option.vue";


Select.install = (app:App) => {
    app.component(Select.name!, Select);
};

SelectOption.install = (app:App) => {
    app.component(SelectOption.name!, SelectOption);
};

export const TOption = SelectOption;

export const TSelect = Select;

export default TSelect;
