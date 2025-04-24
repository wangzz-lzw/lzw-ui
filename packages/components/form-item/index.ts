import type { App } from "vue";

import FormItem from "./src/form-item.vue";


FormItem.install = (app:App) => {
    app.component(FormItem.name!, FormItem);
};


export const TFormItem = FormItem;

export default TFormItem;

