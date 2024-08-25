export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: string;
  reviews: Review[];
  description: string;
  shippingInformation: string;
  images: string[];
};

export type Review = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};
