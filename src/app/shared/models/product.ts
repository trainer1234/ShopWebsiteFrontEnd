export class Product {
  id: string;
  name: string;
  price: number;
  manufacture: {
    id: string
  };
  manufacutreYear: number;
  productImageUrls: string[];
  type: number;
  specificType: number;
  promotionRate: number;
  quantity?: number;
}
