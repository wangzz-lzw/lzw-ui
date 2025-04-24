import type { Rules,ValidateFieldsError } from "async-validator"
export interface FormProvider {
    validate: () => Promise<boolean>,
    rules: Rules,
    model: Object,
    validateField: (name: string) => Promise<boolean>,
    errors: ValidateFieldsError,
}

