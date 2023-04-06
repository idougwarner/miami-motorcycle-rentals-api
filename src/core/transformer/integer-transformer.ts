import { ValueTransformer } from 'typeorm';

export class IntegerTransformer implements ValueTransformer {
  /**
   * Transform value to split whole number and decimal values
   * and saves as a whole number before saving to database
   */
  to(value?: number): number {
    if (value) {
      const values = value.toFixed(2).split('.');

      if (values.length === 2) {
        const concatenatedValue = `${values[0]}${values[1]}`;
        return Number(concatenatedValue);
      }

      return Number(values[0]);
    }
    return 0;
  }

  /**
   * Transform value to extract whole number and decimal values
   * and return whole number and it's decimal values
   */
  from(value?: number): number | null {
    if (value) {
      const strVal = value.toString();
      const decimalValue = strVal.substring(strVal.length - 2, strVal.length);

      const wholeNumber = strVal.substring(0, strVal.length - 2);
      const finalValue = `${wholeNumber}.${decimalValue}`;

      return Number(finalValue);
    }

    return value;
  }
}
