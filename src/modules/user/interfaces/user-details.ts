import { User } from '../../entity/user.entity';

export interface UserDetails {
  isExistingCustomer: boolean;
  user: User;
}
