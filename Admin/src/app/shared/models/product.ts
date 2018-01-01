import {Manufacture} from './manufacture';

export class Product {
  id: string;
  name: string;
  remain: number;
  price: number;
  manufacture: Manufacture = new Manufacture();
  manufacutreYear: number;
  productImageUrls: string[] = [];
  type: number;
  specificType: number;
  promotionRate: number;
  quantity?: number;
  isModify = false;
}
