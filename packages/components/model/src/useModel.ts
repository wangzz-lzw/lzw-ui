import { createApp } from 'vue';
import Model from './model.vue'
import { ModelProps } from './model';


export function useModel(options:ModelProps) {
     createApp(Model, { ...options })
}
