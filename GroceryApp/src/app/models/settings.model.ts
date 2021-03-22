export interface SettingsModel {
  groups: {
    [id: string]: string
  } [];
  selectedGroup: {
    name: string,
    id: number
  }
  categories: {
    [id: string]: string
  } [];
}
