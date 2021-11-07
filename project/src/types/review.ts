export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type Reviews = Review[];
