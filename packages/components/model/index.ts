import type { App } from "vue";

import Model from "./src/model.vue";


Model.install = (app:App) => {
    app.component(Model.name!, Model);
};


export const TModel = Model;

export default TModel;
