<template>
    <div class="t-form-item">
        <div class="t-form-item-content" @focusout="validateFieldOnBlur" :class="{ 'is-error': errors[prop] }">
            <label v-if="label">{{ label }}:</label>
            <slot></slot>
        </div>
        <div v-if="errors[prop]" class="error">{{ errors[prop][0].message }}</div>
    </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import type { FormProvider } from '../../form/src/form'
import { useFormValidation } from '@lzwui/utils'

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

const { validateField, errors } = useFormValidation(model, rules);

// const validateFieldOnBlur = () => {
//     console.log(rules[props.prop as keyof typeof model].trigger, 'rules[props.prop as keyof typeof model].trigger')
//     if (rules[props.prop as keyof typeof model].trigger) {
//         rules[props.prop as keyof typeof model].trigger.includes('blur') && validateField(props.prop as keyof typeof model);
//     } else {
//         validateField(props.prop as keyof typeof model);
//     }
// }
// watch(() => model[props.prop as keyof typeof model], () => {
//     if (rules[props.prop as keyof typeof model].trigger) {
//         rules[props.prop as keyof typeof model].trigger.includes('change') && validateField(props.prop as keyof typeof model);
//     } else {
//         validateField(props.prop as keyof typeof model);
//     }
// })
// 获取当前字段的校验规则
const getFieldRule = () => {
    const fieldKey = props.prop as keyof typeof model;
    return rules[fieldKey];
}

// 统一校验触发逻辑
const shouldValidate = (triggerType: 'blur' | 'change') => {
    const rule = getFieldRule();
    if (!rule) return false;

    // 处理未配置trigger的情况（默认都触发）
    if (!rule.trigger) return true;

    // 处理数组或字符串形式
    return Array.isArray(rule.trigger)
        ? rule.trigger.includes(triggerType)
        : rule.trigger === triggerType;
}

// 失焦校验
const validateFieldOnBlur = () => {
    if (shouldValidate('blur')) {
        validateField(props.prop as keyof typeof model);
    }
}

// 值变化校验
watch(() => model[props.prop as keyof typeof model], () => {
    if (shouldValidate('change')) {
        validateField(props.prop as keyof typeof model);
    }
})

</script>

<style scoped lang="scss"></style>
