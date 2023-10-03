import { User } from './user.entity';
import { BikeAccessoryOrder } from './bike-accessory-order.entity';
import { BikeRentalOrder } from './bike-rental-order.entity';
import { BikeInsurancePlan } from './bike-insurance-plan.entity';
import { Bike } from './bike.entity';
import { BikeType } from './bike-type.entity';
import { BikeBrand } from './bike-brands.entity';
import { BikeMediaItem } from './bike-media-item.entity';
import { MediaItem } from './media-item.entity';
import { TransformedMediaItem } from './transformed-media-item.entity';
import { BikeOffDay } from './bike-off-day.entity';
import { BikeBasePrice } from './bike-base-price.entity';
import { RelatedBike } from './related-bike.entity';

const entities = [
  User,
  BikeAccessoryOrder,
  BikeRentalOrder,
  Bike,
  BikeInsurancePlan,
  BikeType,
  BikeBrand,
  BikeMediaItem,
  MediaItem,
  TransformedMediaItem,
  BikeOffDay,
  BikeBasePrice,
  RelatedBike,
];

export default entities;
