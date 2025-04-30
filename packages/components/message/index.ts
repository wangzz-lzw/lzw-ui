import type { App } from "vue";

import Message from "./src/message.vue";
Message.install = (app:App) => {
    app.component(Message.name!, Message);
};
export const TMessage = Message;

export default TMessage;

