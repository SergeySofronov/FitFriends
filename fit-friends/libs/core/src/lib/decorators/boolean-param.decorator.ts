import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class BooleanParamConstraint implements ValidatorConstraintInterface {
  validate(value: number | boolean) {
    return (
      (value === 1) ||
      (value === 0) ||
      (value === true) ||
      (value === false)
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
