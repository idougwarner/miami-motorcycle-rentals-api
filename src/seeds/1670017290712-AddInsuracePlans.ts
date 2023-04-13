import { MigrationInterface, QueryRunner } from 'typeorm';
import { CoverageTypes } from '../shared/calculations';
import { BikeInsurancePlan } from '../modules/entity/bike-insurance-plan.entity';
import { Bike } from '../modules/entity/bike.entity';
import { InsuranceEnum } from '../shared/common';

export class AddInsuracePlans1670017290712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bikeRepo = await queryRunner.connection.getRepository(Bike);

    const insurances = {
      6266: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6268: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6281: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6282: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      8125: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      8289: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      8317: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      8269: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      6301: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      7767: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      6292: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      8302: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 42, deposit: 4200 },
          [CoverageTypes.STANDARD]: { coverage: 50, deposit: 3400 },
          [CoverageTypes.PREMIUM]: { coverage: 57, deposit: 2700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 39, deposit: 4000 },
          [CoverageTypes.STANDARD]: { coverage: 47, deposit: 3200 },
          [CoverageTypes.PREMIUM]: { coverage: 54, deposit: 2500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 37, deposit: 3800 },
          [CoverageTypes.STANDARD]: { coverage: 44, deposit: 3000 },
          [CoverageTypes.PREMIUM]: { coverage: 50, deposit: 2300 },
        },
      },
      6196: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 42, deposit: 4200 },
          [CoverageTypes.STANDARD]: { coverage: 50, deposit: 3400 },
          [CoverageTypes.PREMIUM]: { coverage: 57, deposit: 2700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 39, deposit: 4000 },
          [CoverageTypes.STANDARD]: { coverage: 47, deposit: 3200 },
          [CoverageTypes.PREMIUM]: { coverage: 54, deposit: 2500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 37, deposit: 3800 },
          [CoverageTypes.STANDARD]: { coverage: 44, deposit: 3000 },
          [CoverageTypes.PREMIUM]: { coverage: 50, deposit: 2300 },
        },
      },
      6206: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 42, deposit: 4200 },
          [CoverageTypes.STANDARD]: { coverage: 50, deposit: 3400 },
          [CoverageTypes.PREMIUM]: { coverage: 57, deposit: 2700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 39, deposit: 4000 },
          [CoverageTypes.STANDARD]: { coverage: 47, deposit: 3200 },
          [CoverageTypes.PREMIUM]: { coverage: 54, deposit: 2500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 37, deposit: 3800 },
          [CoverageTypes.STANDARD]: { coverage: 44, deposit: 3000 },
          [CoverageTypes.PREMIUM]: { coverage: 50, deposit: 2300 },
        },
      },
      6312: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 37, deposit: 4000 },
          [CoverageTypes.STANDARD]: { coverage: 45, deposit: 3200 },
          [CoverageTypes.PREMIUM]: { coverage: 52, deposit: 2500 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 34, deposit: 3800 },
          [CoverageTypes.STANDARD]: { coverage: 42, deposit: 3000 },
          [CoverageTypes.PREMIUM]: { coverage: 49, deposit: 2300 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3500 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2800 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 2000 },
        },
      },
      7980: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6195: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 32, deposit: 3200 },
          [CoverageTypes.STANDARD]: { coverage: 39, deposit: 2200 },
          [CoverageTypes.PREMIUM]: { coverage: 45, deposit: 1700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 3000 },
          [CoverageTypes.STANDARD]: { coverage: 35, deposit: 2000 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 25, deposit: 2800 },
          [CoverageTypes.STANDARD]: { coverage: 31, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      8226: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 31, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 38, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 44, deposit: 1500 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 2500 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 41, deposit: 1300 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 2000 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1500 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6322: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 31, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 38, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 44, deposit: 1500 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 2500 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 41, deposit: 1300 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 2000 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1500 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
      },
      6192: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 29, deposit: 2200 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 1800 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 1200 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 1900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1500 },
          [CoverageTypes.PREMIUM]: { coverage: 39, deposit: 1000 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 22, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 28, deposit: 1200 },
          [CoverageTypes.PREMIUM]: { coverage: 36, deposit: 800 },
        },
      },
      7775: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      6263: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      8257: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      8367: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      8342: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      8425: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 33, deposit: 3300 },
          [CoverageTypes.STANDARD]: { coverage: 40, deposit: 2300 },
          [CoverageTypes.PREMIUM]: { coverage: 46, deposit: 1800 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 30, deposit: 3100 },
          [CoverageTypes.STANDARD]: { coverage: 36, deposit: 2100 },
          [CoverageTypes.PREMIUM]: { coverage: 43, deposit: 1600 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 26, deposit: 2900 },
          [CoverageTypes.STANDARD]: { coverage: 32, deposit: 1900 },
          [CoverageTypes.PREMIUM]: { coverage: 40, deposit: 1100 },
        },
      },
      8448: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 28, deposit: 1600 },
          [CoverageTypes.STANDARD]: { coverage: 34, deposit: 1300 },
          [CoverageTypes.PREMIUM]: { coverage: 42, deposit: 900 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 24, deposit: 1400 },
          [CoverageTypes.STANDARD]: { coverage: 30, deposit: 1100 },
          [CoverageTypes.PREMIUM]: { coverage: 38, deposit: 800 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 20, deposit: 1200 },
          [CoverageTypes.STANDARD]: { coverage: 26, deposit: 900 },
          [CoverageTypes.PREMIUM]: { coverage: 34, deposit: 500 },
        },
      },
      8450: {
        25: {
          [CoverageTypes.MINIMUM]: { coverage: 42, deposit: 4200 },
          [CoverageTypes.STANDARD]: { coverage: 50, deposit: 3400 },
          [CoverageTypes.PREMIUM]: { coverage: 57, deposit: 2700 },
        },
        35: {
          [CoverageTypes.MINIMUM]: { coverage: 39, deposit: 4000 },
          [CoverageTypes.STANDARD]: { coverage: 47, deposit: 3200 },
          [CoverageTypes.PREMIUM]: { coverage: 54, deposit: 2500 },
        },
        135: {
          [CoverageTypes.MINIMUM]: { coverage: 37, deposit: 3800 },
          [CoverageTypes.STANDARD]: { coverage: 44, deposit: 3000 },
          [CoverageTypes.PREMIUM]: { coverage: 50, deposit: 2300 },
        },
      },
    };

    const promises: Promise<any>[] = [];
    Object.keys(insurances).forEach((id) => {
      const bike = new Bike();
      const bikeId = Number(id);
      bike.wpBikeId = bikeId;
      bike.seoTitle = '';
      bike.seoDescription = '';
      bike.name = '';
      bike.slug = '';
      bike.description = '';
      bike.model = '';
      bike.regularPrice = 0;
      bike.discountPrice = 0;
      bike.distanceIncluded = '';
      bike.highlights = '';
      bike.features = '';
      bike.extras = '';

      const insuranceList: BikeInsurancePlan[] = [];

      const insuranceAge25 = insurances[id]['25'];
      const insuranceAge35 = insurances[id]['35'];
      const insuranceAge135 = insurances[id]['135'];

      // Age 25
      const insurancePlan25Min = new BikeInsurancePlan();
      insurancePlan25Min.minAge = 21;
      insurancePlan25Min.maxAge = 25;
      insurancePlan25Min.type = InsuranceEnum.MINIMUM;
      insurancePlan25Min.dailyRate =
        insuranceAge25[CoverageTypes.MINIMUM].coverage;
      insurancePlan25Min.deposit =
        insuranceAge25[CoverageTypes.MINIMUM].deposit;
      insurancePlan25Min.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan25Min.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan25Min);

      const insurancePlan25Prem = new BikeInsurancePlan();
      insurancePlan25Prem.minAge = 21;
      insurancePlan25Prem.maxAge = 25;
      insurancePlan25Prem.type = InsuranceEnum.PREMIUM;
      insurancePlan25Prem.dailyRate =
        insuranceAge25[CoverageTypes.PREMIUM].coverage;
      insurancePlan25Prem.deposit =
        insuranceAge25[CoverageTypes.PREMIUM].deposit;
      insurancePlan25Prem.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan25Prem.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan25Prem);

      const insurancePlan25Standard = new BikeInsurancePlan();
      insurancePlan25Standard.minAge = 21;
      insurancePlan25Standard.maxAge = 25;
      insurancePlan25Standard.type = InsuranceEnum.STANDARD;
      insurancePlan25Standard.dailyRate =
        insuranceAge25[CoverageTypes.STANDARD].coverage;
      insurancePlan25Standard.deposit =
        insuranceAge25[CoverageTypes.STANDARD].deposit;
      insurancePlan25Standard.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan25Standard.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan25Standard);

      // Age 35
      const insurancePlan35Min = new BikeInsurancePlan();
      insurancePlan35Min.minAge = 26;
      insurancePlan35Min.maxAge = 35;
      insurancePlan35Min.type = InsuranceEnum.MINIMUM;
      insurancePlan35Min.dailyRate =
        insuranceAge35[CoverageTypes.MINIMUM].coverage;
      insurancePlan35Min.deposit =
        insuranceAge35[CoverageTypes.MINIMUM].deposit;
      insurancePlan35Min.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan35Min.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan35Min);

      const insurancePlan35Prem = new BikeInsurancePlan();
      insurancePlan35Prem.minAge = 26;
      insurancePlan35Prem.maxAge = 35;
      insurancePlan35Prem.type = InsuranceEnum.PREMIUM;
      insurancePlan35Prem.dailyRate =
        insuranceAge35[CoverageTypes.PREMIUM].coverage;
      insurancePlan35Prem.deposit =
        insuranceAge35[CoverageTypes.PREMIUM].deposit;
      insurancePlan35Prem.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan35Prem.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan35Prem);

      const insurancePlan35Standard = new BikeInsurancePlan();
      insurancePlan35Standard.minAge = 26;
      insurancePlan35Standard.maxAge = 35;
      insurancePlan35Standard.type = InsuranceEnum.STANDARD;
      insurancePlan35Standard.dailyRate =
        insuranceAge35[CoverageTypes.STANDARD].coverage;
      insurancePlan35Standard.deposit =
        insuranceAge35[CoverageTypes.STANDARD].deposit;
      insurancePlan35Standard.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan35Standard.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan35Standard);

      // Age 135
      const insurancePlan135Min = new BikeInsurancePlan();
      insurancePlan135Min.minAge = 36;
      insurancePlan135Min.maxAge = 999;
      insurancePlan135Min.type = InsuranceEnum.MINIMUM;
      insurancePlan135Min.dailyRate =
        insuranceAge135[CoverageTypes.MINIMUM].coverage;
      insurancePlan135Min.deposit =
        insuranceAge135[CoverageTypes.MINIMUM].deposit;
      insurancePlan135Min.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan135Min.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan135Min);

      const insurancePlan135Prem = new BikeInsurancePlan();
      insurancePlan135Prem.minAge = 36;
      insurancePlan135Prem.maxAge = 999;
      insurancePlan135Prem.type = InsuranceEnum.PREMIUM;
      insurancePlan135Prem.dailyRate =
        insuranceAge135[CoverageTypes.PREMIUM].coverage;
      insurancePlan135Prem.deposit =
        insuranceAge135[CoverageTypes.PREMIUM].deposit;
      insurancePlan135Prem.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan135Prem.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan135Prem);

      const insurancePlan135Standard = new BikeInsurancePlan();
      insurancePlan135Standard.minAge = 36;
      insurancePlan135Standard.maxAge = 999;
      insurancePlan135Standard.type = InsuranceEnum.STANDARD;
      insurancePlan135Standard.dailyRate =
        insuranceAge135[CoverageTypes.STANDARD].coverage;
      insurancePlan135Standard.deposit =
        insuranceAge135[CoverageTypes.STANDARD].deposit;
      insurancePlan135Standard.description =
        '${deposit} max out-of-pocket cost for motorcycle damages';
      insurancePlan135Standard.popUpDescription =
        'A temporary hold for ${deposit} will be placed on your card to confirm funds availability in case of damage (insurance deductible)';
      insuranceList.push(insurancePlan135Standard);

      bike.insurances = insuranceList;
      promises.push(bikeRepo.save(bike));
    });

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Delete from bike_insurance_plans`);
    await queryRunner.query(`Delete from bikes`);
  }
}
