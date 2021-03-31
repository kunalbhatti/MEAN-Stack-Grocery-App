export interface ProductModel {
  name: string;
  price: string;
  quantity ? : string;
  size ? : string;
  brand ? : string;
  stockCount ? : {
    [gid: string]: number;
  };
  stockStatus ? : {
    [gid: string]: string;
  };
  cart ? : {
    [gid: string]: number;
  }
  uid ? : string; // user id
  cid ? : string; // category id
  _id ? : string;
}
