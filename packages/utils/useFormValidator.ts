import { ref } from 'vue'
import Schema from 'async-validator'
import type { Rules, Values, ValidateFieldsError } from 'async-validator'
Schema.warning = () => {}
export function useFormValidation<T extends Values>(form: T, rules: Rules) {
    const errors = ref<ValidateFieldsError>({})

    const validateField: (name: keyof T) => Promise<boolean> =  (name: keyof T) => {
        const singleForm = {
            [name]: form[name]
        }
        const singleSchema = {
            [name]: rules[name as string]
        }
        const singleValidator = new Schema(singleSchema)
        // 构造 options 传递 trigger
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
