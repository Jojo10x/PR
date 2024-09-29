export interface Product {
    _id: string;
    productName: string;
    productImage: File | null;
    productDetails: string[];
    modelsSizes: string[];
  }
  