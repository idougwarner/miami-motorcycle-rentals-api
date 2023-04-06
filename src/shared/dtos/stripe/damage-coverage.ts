export interface DamageCoverage {
  type: DamageCoverageType;
  description: string;
  deductable: number;
  price: number;
  recommended?: boolean;
}

export enum DamageCoverageType {
  None = 'None',
  Minimum = 'Minimum Coverage',
  Standard = 'Standard Coverage',
  Premium = 'Premium Coverage',
}
