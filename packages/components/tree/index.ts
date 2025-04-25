import type { App } from "vue";

import Tree from "./src/tree.vue";


Tree.install = (app:App) => {
    app.component(Tree.name!, Tree);
};


export const TTree = Tree;

export default Tree;
