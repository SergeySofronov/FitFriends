import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

const enum BooleanValue {
  True = 1,
  False = 0,
}

@ValidatorConstraint({ async: false })
export class BooleanParamConstraint implements ValidatorConstraintInterface {
  validate(value: number | boolean) {
    return (
      (value === BooleanValue.True) ||
      (value === BooleanValue.False) ||
      (value === true) ||
      (value === false)
    );
  }
}

export function IsBooleanProp(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BooleanParamConstraint,
    });
  };
}
