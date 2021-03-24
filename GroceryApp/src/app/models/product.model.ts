export interface ProductModel {
  name: string;
  price: string;
  quantity ? : string;
  size ? : string;
  brand ? : string;
  stockCount ? : number;
  stockStatus ? : string;
  uid ? : string; // user id
  cid ? : string; // category id
  _id ? : string;
}
