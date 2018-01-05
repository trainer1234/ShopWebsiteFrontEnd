import {Manufacture} from './manufacture';
import {Property} from './property';

export class Product {
  id: string;
  name: string;
  remain: number;
  price: number;
  manufacture: Manufacture = new Manufacture();
  manufactureYear: number;
  productImageUrls: string[] = [];
  type: number;
  specificType: number;
  promotionRate: number;
  quantity?: number;
  detail: string;
  properties: Property[] = [];
  isModifyProduct = false;
}
