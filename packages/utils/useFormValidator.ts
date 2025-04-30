import { ref } from 'vue'
import Schema from 'async-validator'
import type { Rules, Values, ValidateFieldsError } from 'async-validator'
import { IRule } from '@/components/form/src/form'
Schema.warning = () => {}
export function useFormValidation<T extends Values>(form: T, rules: Rules) {
    const errors = ref<ValidateFieldsError>({})

    const validateField: (name: keyof T, triggerRules: IRule[]) => Promise<boolean> = (name: keyof T, triggerRules: IRule[]) => {
        const singleForm = {
            [name]: form[name]
        }
        const singleSchema = {
            [name]: triggerRules
        }
        const singleValidator = new Schema(singleSchema)

        return new Promise(resolve => {
            singleValidator.validate(singleForm, error => {
                errors.value[name as string] = error!
                resolve(!error)
            })
        })
    }

    const validate: () => Promise<boolean> = () => {
        const validator = new Schema(rules)
        return new Promise(resolve => {
            validator.validate(form, error => {
                const newErrors: ValidateFieldsError = {}
                if (error) {
                    error.forEach(item => {
                        newErrors[item.field!] = [item]
                    })
                    errors.value = newErrors
                    resolve(false)
                } else {
                    errors.value = newErrors
                }
                resolve(true)
            })
        })
    }

    return {
        errors,
        validateField,
        validate
    }
}
