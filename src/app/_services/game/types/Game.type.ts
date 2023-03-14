export interface Game {
  id: number;
  title: string;
  description: string;
  cover: string;
  price: number;
  releaseDate?: Date;
  isActive: boolean;
  stars: number;
  tags: string[];
  versions: string[];
  platforms: string[];
}
