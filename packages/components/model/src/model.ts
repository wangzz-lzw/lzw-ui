import { PropType } from 'vue';

export interface ModelProps { 
    modelValue: boolean;
    title: string;
}


export const propsDefinition = {
    modelValue: {
        type: Boolean as PropType<ModelProps['modelValue']>,
        default: false,
    },
    title: {
        type: String as PropType<ModelProps['title']>,
        default: "标题",
    },
}