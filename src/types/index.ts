export type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type Booking = {
  id: string;
  createdAt: string;
  ownerName: string;
  email: string;
  dogName: string;
  breed: string;
  packageId: string;
  eventDate: string;
  notes: string;
};

export type Lead = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  source: string;
};
