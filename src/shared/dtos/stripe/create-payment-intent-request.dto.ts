import { GearTypes } from '../../../shared/calculations';

export interface CreatePaymentIntentRequest {
  bikeId: number;
  personName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  dateOfBirthString: string;
  address: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  duration: number;
  bikeInsuranceId: number;
  roadAssistance: boolean;
  addOns: GearTypes[];
  total: number;
  deposit: number;
  rentalTitle: string;
  bikePrice: number;
  bikePricePerDayAfterDiscount: number;
  bikeRentTotalPrice: number;
  bikeRentTotalPriceBeforeDiscount: number;
}
