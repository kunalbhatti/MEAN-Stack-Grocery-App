export interface SettingsModel {
  locations: {
    name: string,
    id: string
  } [];
  selectedLocation: {
    name: string,
    id: number
  }
  categories: {
    name: string,
    id: string
  } [];
}
