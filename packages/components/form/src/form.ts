import type { RuleItem, ValidateFieldsError } from "async-validator"

export type IRule = RuleItem & { trigger?: string }
export type IRules = {
    [key: string]: IRule[]
}
export interface FormProvider {
    validate: () => Promise<boolean>,
    rules: IRules,
    model: Object,
    validateField: (name: string) => Promise<boolean>,
    errors: ValidateFieldsError,
}

