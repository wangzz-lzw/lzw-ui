import type { Rule, ValidateFieldsError } from "async-validator"

type IRule = Rule & { trigger: string[] }
type IRules = {
    [key: string]: IRule 
}
export interface FormProvider {
    validate: () => Promise<boolean>,
    rules: IRules,
    model: Object,
    validateField: (name: string) => Promise<boolean>,
    errors: ValidateFieldsError,
}

