import type { App } from "vue";

import Form from "./src/form.vue";


Form.install = (app:App) => {
    app.component(Form.name!, Form);
};


export const TForm = Form;

export default TForm;

