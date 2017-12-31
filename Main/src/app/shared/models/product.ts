import {Manufacture} from './manufacture';

export class Product {
  id: string;
  name: string;
  price: number;
  manufacture: Manufacture;
  manufacutreYear: number;
  productImageUrls: string[];
  type: number;
  specificType: number;
  promotionRate: number;
  quantity?: number;
}
