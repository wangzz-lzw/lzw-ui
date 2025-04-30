import type { App } from "vue";

import TemplateCom from "./src/templateCom.vue";
TemplateCom.install = (app:App) => {
    app.component(TemplateCom.name!, TemplateCom);
};
export const TTemplateCom = TemplateCom;

export default TTemplateCom;

