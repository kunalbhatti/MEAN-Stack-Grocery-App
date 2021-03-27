export interface SettingsModel {
  groups: {
    [id: string]: string
  } [];
  currentGroup: string;
  categories: {
    [id: string]: string
  } [];
}
