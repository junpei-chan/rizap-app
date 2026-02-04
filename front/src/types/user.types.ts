export type HouseworkType = 
  | 'washingUp'
  | 'laundry' 
  | 'rubbishDisposal'
  | 'floorCleaning'
  | 'tidyingUp'
  | 'bathroomCleaning'
  | 'toiletCleaning';

export type HouseworkFrequencies = Partial<Record<HouseworkType, number>>;