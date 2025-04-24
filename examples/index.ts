import { createApp } from "vue";
import App from "./app.vue";
import lzwUi from "@lzwui/components"


const app = createApp(App);

app.use(lzwUi)
    
app.mount("#app");
