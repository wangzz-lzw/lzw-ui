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
import { inject, watch, computed, ComputedRef } from 'vue';
import type { FormProvider, IRule } from '../../form/src/form'
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


const itemRlues: ComputedRef<IRule[]> = computed(() => {
    if (rules && props.prop && rules[props.prop]) {
        return rules[props.prop]
    } else {
        return []
    }
})
const getTriggeredRules = (trigger?: string) => {
    const rules = itemRlues.value
    if (rules) {
        return rules.filter(rule => {
            if (!rule.trigger || !trigger) return true
            return rule.trigger && rule.trigger === trigger
        })
    } else {
        return []
    }
}

// 失焦校验
const validateFieldOnBlur = () => {
    const triggerRules = getTriggeredRules('blur')
    if (triggerRules.length === 0) return
    else validateField(props.prop as keyof typeof model, triggerRules);
}

// 值变化校验
watch(() => model[props.prop as keyof typeof model], () => {
    const triggerRules = getTriggeredRules('change')
    if (triggerRules.length === 0) return
    else validateField(props.prop as keyof typeof model, triggerRules);
})

</script>

<style scoped lang="scss"></style>
