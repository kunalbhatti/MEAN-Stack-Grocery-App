export interface ExpensesModel {
  _id ? : string;
  pid ? : string;
  cid ? : string;
  gid: string;
  name: string;
  units: number;
  cost: number;
  date ? : {
    date: number;
    month: number;
    year: number;
  };
}
