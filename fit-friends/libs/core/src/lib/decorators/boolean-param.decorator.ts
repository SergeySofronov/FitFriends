import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class BooleanParamConstraint implements ValidatorConstraintInterface {
  validate(value: string | boolean) {
    return (
      (value === 'true') ||
      (value === '1') ||
      (value === true) ||
      (value === false) ||
      (value === '0')
    );
  }
}

export function BooleanParamDecorator(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BooleanParamConstraint,
    });
  };
}
