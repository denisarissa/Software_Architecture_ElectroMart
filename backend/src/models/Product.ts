import { ProductType } from "./ProductType";
import { config } from "../config";

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number = config.taxRate;
  public discountRate: number = config.discountRate;
  public productType: ProductType; 
  
  // Exercise 1: since ProductType is the only different variable across product categories,
  // the duplicated code can be generalized by moving this variable to the constructor.

  constructor(title: string, imageUrl: string, basePrice: number, productType: ProductType) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.productType = productType;
  }

  public getPrice(): number {
    return (this.basePrice * (1 - this.discountRate)) * this.taxRate;
  }

  public getPriceWithoutTaxes(): number {
    return (this.basePrice * (1 - this.discountRate));
  }
}
