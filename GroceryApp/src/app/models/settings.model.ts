export interface SettingsModel {
  groups: {
    [id: string]: string
  } [];
  selectedGroup: string;
  categories: {
    [id: string]: string
  } [];
}
