export interface ExpenseModel {
  _id ? : string;
  pid ? : string;
  cid ? : string;
  gid: string;
  name: string;
  brand?: string;
  units: number;
  cost: number;
  date ? : {
    date: number;
    month: number;
    year: number;
  };
}
