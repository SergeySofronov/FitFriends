export enum ValidityMessage {
  IsEmailMessage = 'Field \u00AB$property\u00BB must be a valid email address',
  IsStringMessage = 'Field \u00AB$property\u00BB must be a string',
  IsArrayMessage = 'Field \u00AB$property\u00BB must be an array',
  IsEnumMessage = 'Field \u00AB$property\u00BB must be one of these values:',
  IsNotEmptyMessage = 'Field \u00AB$property\u00BB must not be empty',
  MinValueMessage = 'Field \u00AB$property\u00BB value/length must be equal or greater than $constraint1',
  MaxValueMessage = 'Field \u00AB$property\u00BB value/length must be equal or less than $constraint1',
}
