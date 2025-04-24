<template>
    <div @focusout="validateFieldOnBlur" class="t-form-item">
        <div :class="{'validate-error': errors[prop]}" class="t-form-item-content">
            <label  v-if="label">{{ label }}:</label>
            <slot></slot>
        </div>
        <div v-if="errors[prop]" class="error">{{ errors[prop][0].message }}</div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { FormProvider } from '../../form/src/form'
import {useFormValidation} from '@lzwui/utils'

defineOptions({
    name: 't-form-item'
})

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    prop: {
        type: String,
        default: ""
    }
})

const formProvider = inject<FormProvider>('form');
if (!formProvider) {
    throw new Error('FormItem must be used within a Form component');
}
const { rules, model } = formProvider;

const {  validateField, errors } = useFormValidation(model, rules);

const validateFieldOnBlur = () => {
    validateField(props.prop as keyof typeof model);
};


</script>

<style scoped lang="scss">
@use "../../../theme-chalk/common/base.scss" as *;
.error{
    color: $t-danger;
    font-size: 12px;
    margin-top: 5px;
    margin-left:40px
}
.t-form-item{
    margin-bottom: 16px;
}
.t-form-item-content{
    width: 100%;
    display: flex;
    align-items: center;
    & label{
        width: 40px;
        margin-right: 5px;
    }
}
.validate-error{
    & * {
        border-color:$t-danger!important;
        &:focus-within {
            border-color:$t-danger!important;
            box-shadow: 0 0 0 1px $t-danger-lighten!important;
        }
        &:hover {
            border-color:$t-danger!important;
            box-shadow: 0 0 0 1px $t-danger-lighten!important;
        }
    }
}
</style>
