export enum CoverageTypes {
  MINIMUM = "minimum",
  STANDARD = "standard",
  PREMIUM = "premium",
}

export enum GearTypes {
  DRIVER_HELMET,
  PASSENGER_HELMET,
  DRIVER_JACKET,
  PASSENGER_JACKET,
  DRIVER_VEST,
  PASSENGER_VEST,
  DRIVER_GLOVES,
  PASSENGER_GLOVES,
  PHONE_MOUNT,
  PASSENGER_SEAT,
}

export interface InitialCalculationResult {
  data: { days: number; price: number };
  rentalCost: { rate: number; discount: number; total: number };
}

export interface InitialCalculationResult {
  data: { days: number; price: number };
  rentalCost: { rate: number; discount: number; total: number };
}

export interface SalesTaxConfig {
  label: string;
  value: number;
}

export const SALES_TAX_CONFIG: SalesTaxConfig = {
  label: "Sales Tax 7%",
  value: 0.07,
};

export interface CalculationResult {
  data: {
    days: number;
    price: number;
  };
  rentalCost: {
    rate: number;
    discount: number;
    total: number;
  };
  coverageCost: {
    rate: number;
    deposit: number;
    total: number;
  };
  gearCost: {
    gearCost: {
      type: GearTypes;
      title: string;
      unitPrice: number;
      subtotal: number;
    }[];
    gearTotal: number;
  };
  assistance: boolean;
  salesTax: number;
  subTotal: number;
  total: number;
}

export const gearPrices = {
  [GearTypes.DRIVER_HELMET]: {
    name: "Driver Helmet",
    price: 15,
  },
  [GearTypes.PASSENGER_HELMET]: {
    name: "Passenger Helmet",
    price: 15,
  },
  [GearTypes.DRIVER_JACKET]: {
    name: "Driver Jacket",
    price: 25,
  },
  [GearTypes.PASSENGER_JACKET]: {
    name: "Passenger Jacket",
    price: 25,
  },
  [GearTypes.DRIVER_VEST]: {
    name: "Driver Vest",
    price: 20,
  },
  [GearTypes.PASSENGER_VEST]: {
    name: "Passenger Vest",
    price: 20,
  },
  [GearTypes.DRIVER_GLOVES]: {
    name: "Driver Gloves",
    price: 5,
  },
  [GearTypes.PASSENGER_GLOVES]: {
    name: "Passenger Gloves",
    price: 5,
  },
  [GearTypes.PHONE_MOUNT]: {
    name: "Phone Mount",
    price: 5,
  },
  [GearTypes.PASSENGER_SEAT]: {
    name: "Passenger Seat",
    price: 10,
  },
};
class BikePriceCalculation {
  public dayDiscounts = {
    1: 0,
    2: 0.05,
    3: 0.08,
    4: 0.12,
    5: 0.2,
  };

  assistanceCost = 12;

  public calculate(
    price: number,
    days: number,
    age?: number,
    insuranceCoverage?: number,
    insuranceDeposit?: number,
    gear?: Set<GearTypes>,
    bikeId?: number,
    assistance?: boolean
  ): CalculationResult | InitialCalculationResult {
    const data = { days, price };
    const discount = days >= 5 ? this.dayDiscounts[5] : this.dayDiscounts[days];
    const rentalCost = {
      rate: Number((price * (1 - discount)).toFixed(2)),
      discount,
      total: Number((price * (1 - discount) * days).toFixed(2)),
    };
    if (!age || !insuranceCoverage || !insuranceDeposit || !gear || !bikeId) {
      return { data, rentalCost };
    }

    const coverageCost = {
      rate: insuranceCoverage,
      deposit: insuranceDeposit,
      total: insuranceCoverage * days,
    };

    const gearCost = this.getGearCost(gear, days);

    let assistanceCost;
    if (assistance) {
      assistanceCost = {
        price: this.assistanceCost,
        subtotal: this.assistanceCost * days,
      };
    }

    const subTotal = Number(
      (
        rentalCost.total +
        coverageCost.total +
        gearCost.gearTotal +
        (assistanceCost?.subtotal || 0)
      ).toFixed(2)
    );
    const salesTax = Number((subTotal * SALES_TAX_CONFIG.value).toFixed(2));
    const total = Number((subTotal + salesTax).toFixed(2));
    return {
      data,
      rentalCost,
      coverageCost,
      gearCost,
      assistance,
      salesTax,
      subTotal,
      total: total,
    };
  }

  getGearCost(gear: Set<GearTypes>, days: number) {
    const gearArr = Array.from(gear);
    const gearCost = gearArr.map((gearType) => ({
      type: gearType,
      title: gearPrices[gearType].name,
      unitPrice: gearPrices[gearType].price,
      subtotal: gearPrices[gearType].price * days,
    }));
    const gearTotal = gearCost.reduce((acc, c) => acc + c.subtotal, 0);
    return { gearCost, gearTotal };
  }
}

export const BikePricing = new BikePriceCalculation();
