export interface SettingsModel {
  groups: {
    [id: string]: string
  } [];
  currentGroup: string;
  categories: {
    [id: string]: string
  } [];
  expenses: {
    [id: string]: string
  } [];
  getProductsView: string;
}
