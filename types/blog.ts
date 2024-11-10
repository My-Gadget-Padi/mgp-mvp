type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  tags: string[];
};

export type Landing = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  tag: boolean;
};