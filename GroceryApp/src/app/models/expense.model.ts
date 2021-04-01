export interface ExpensesModel {
  pid ? : string;
  cid ? : string;
  gid : string;
  name: string;
  units: number;
  cost: number;
  date ? : Date;
}
