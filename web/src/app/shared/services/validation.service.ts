export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
        required: 'Campo obrigatório.',
        maxlength: `A quantidade máxima de caracteres é ${validatorValue.requiredLength}`,
        min: `O valor mínimo é de ${validatorValue.requiredLength}`,
        max: `O valor máximo é de ${validatorValue.requiredLength}`,
        fieldError: `${validatorValue}`
      };
  
      return config[validatorName];
    }

    static errorMessage(control) {
        for (let propertyName in control.errors) {
          if (control.errors.hasOwnProperty(propertyName) && control.touched) {
            return this.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
          }
        }
    
        return null;
      }
}