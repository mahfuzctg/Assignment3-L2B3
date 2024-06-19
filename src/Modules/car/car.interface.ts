export type TCar = {
  name: string; // The name of the car.
  description: string; // A brief description of what the car entails.
  color: string; // The color of the car.
  isElectric: boolean; // Boolean to indicate if the car is electric.
  status: string; // The availability of the car. By default, the status will be available.
  features: string[]; // An array listing the features of the car.
  pricePerHour: number; // The cost per hour of the booking in the local currency.
  isDeleted: boolean; // Indicates whether the car has been marked as deleted.
};
