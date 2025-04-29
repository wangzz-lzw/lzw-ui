import type { App } from "vue";

import Scrollbar from "./src/scrollbar.vue";


Scrollbar.install = (app:App) => {
    app.component(Scrollbar.name!, Scrollbar);
};




export const TScrollbar = Scrollbar;

export default TScrollbar;
