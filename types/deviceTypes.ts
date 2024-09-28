export type DeviceModel = {
  id: string;
  label: string;
};

export type DeviceBrand = {
  id: string;
  label: string;
  models: DeviceModel[];
};

export type DeviceBrands = {
  [key: string]: DeviceModel[];
};

const iphoneModels: DeviceModel[] = [
  { id: "iphone16promax", label: "iPhone 16 Pro Max" },
  { id: "iphone16pro", label: "iPhone 16 Pro" },
  { id: "iphone16plus", label: "iPhone 16 Plus" },
  { id: "iphone16", label: "iPhone 16" },
  { id: "iphone15promax", label: "iPhone 15 Pro Max" },
  { id: "iphone15pro", label: "iPhone 15 Pro" },
  { id: "iphone15plus", label: "iPhone 15 Plus" },
  { id: "iphone15", label: "iPhone 15" },
  { id: "iphone14promax", label: "iPhone 14 Pro Max" },
  { id: "iphone14pro", label: "iPhone 14 Pro" },
  { id: "iphone14plus", label: "iPhone 14 Plus" },
  { id: "iphone14", label: "iPhone 14" },
  { id: "iphoneSE3", label: "iPhone SE (3rd gen)" },
  { id: "iphone13promax", label: "iPhone 13 Pro Max" },
  { id: "iphone13pro", label: "iPhone 13 Pro" },
  { id: "iphone13", label: "iPhone 13" },
  { id: "iphone13mini", label: "iPhone 13 mini" },
  { id: "iphone12promax", label: "iPhone 12 Pro Max" },
  { id: "iphone12pro", label: "iPhone 12 Pro" },
  { id: "iphone12", label: "iPhone 12" },
  { id: "iphone12mini", label: "iPhone 12 mini" },
  { id: "iphoneSE2", label: "iPhone SE (2nd gen)" },
  { id: "iphone11promax", label: "iPhone 11 Pro Max" },
  { id: "iphone11pro", label: "iPhone 11 Pro" },
  { id: "iphone11", label: "iPhone 11" },
  { id: "iphonexr", label: "iPhone XR" },
  { id: "iphonexsmax", label: "iPhone XS Max" },
  { id: "iphonexs", label: "iPhone XS" },
  { id: "iphonex", label: "iPhone X" },
  { id: "iphone8plus", label: "iPhone 8 Plus" },
  { id: "iphone8", label: "iPhone 8" },
  { id: "iphone7plus", label: "iPhone 7 Plus" },
  { id: "iphone7", label: "iPhone 7" },
  { id: "iphoneSE1", label: "iPhone SE (1st gen)" },
  { id: "iphone6splus", label: "iPhone 6s Plus" },
  { id: "iphone6s", label: "iPhone 6s" },
  { id: "iphone6plus", label: "iPhone 6 Plus" },
  { id: "iphone6", label: "iPhone 6" },
  { id: "iphone5s", label: "iPhone 5s" },
  { id: "iphone5c", label: "iPhone 5c" },
  { id: "iphone5", label: "iPhone 5" },
  { id: "other", label: "Other Device" },
];

const samsungModels: DeviceModel[] = [
  { id: "galaxys23ultra", label: "Galaxy S23 Ultra" },
  { id: "galaxys23", label: "Galaxy S23" },
  { id: "galaxyzfold4", label: "Galaxy Z Fold 4" },
  { id: "galaxyzflip4", label: "Galaxy Z Flip 4" },
  { id: "galaxys22ultra", label: "Galaxy S22 Ultra" },
  { id: "galaxys22", label: "Galaxy S22" },
  { id: "galaxyzfold3", label: "Galaxy Z Fold 3" },
  { id: "galaxyzflip3", label: "Galaxy Z Flip 3" },
  { id: "galaxys21ultra", label: "Galaxy S21 Ultra" },
  { id: "galaxys21", label: "Galaxy S21" },
  { id: "galaxyzfold2", label: "Galaxy Z Fold 2" },
  { id: "galaxyzflip", label: "Galaxy Z Flip" },
  { id: "galaxys20ultra", label: "Galaxy S20 Ultra" },
  { id: "galaxys20", label: "Galaxy S20" },
  { id: "galaxyfold", label: "Galaxy Fold" },
  { id: "galaxys10", label: "Galaxy S10" },
  { id: "galaxys10plus", label: "Galaxy S10 Plus" },
  { id: "galaxys9", label: "Galaxy S9" },
  { id: "galaxys9plus", label: "Galaxy S9 Plus" },
  { id: "galaxys8", label: "Galaxy S8" },
  { id: "galaxys8plus", label: "Galaxy S8 Plus" },
];

const googleModels: DeviceModel[] = [
  { id: "pixel7pro", label: "Pixel 7 Pro" },
  { id: "pixel7", label: "Pixel 7" },
  { id: "pixel6pro", label: "Pixel 6 Pro" },
  { id: "pixel6", label: "Pixel 6" },
  { id: "pixel5", label: "Pixel 5" },
  { id: "pixel4a5g", label: "Pixel 4a (5G)" },
  { id: "pixel4", label: "Pixel 4" },
  { id: "pixel4xl", label: "Pixel 4 XL" },
  { id: "pixel3a", label: "Pixel 3a" },
  { id: "pixel3", label: "Pixel 3" },
  { id: "pixel3xl", label: "Pixel 3 XL" },
  { id: "pixel2", label: "Pixel 2" },
  { id: "pixel2xl", label: "Pixel 2 XL" },
  { id: "pixel", label: "Pixel" },
  { id: "pixelxl", label: "Pixel XL" },
];

const lgModels: DeviceModel[] = [
  { id: "lgwing", label: "LG Wing" },
  { id: "lgvelvet", label: "LG Velvet" },
  { id: "lgv60", label: "LG V60 ThinQ" },
  { id: "lgv50", label: "LG V50 ThinQ" },
  { id: "lgg8", label: "LG G8 ThinQ" },
  { id: "lgv40", label: "LG V40 ThinQ" },
  { id: "lgg7", label: "LG G7 ThinQ" },
  { id: "lgv30", label: "LG V30" },
  { id: "lgg6", label: "LG G6" },
  { id: "lgg5", label: "LG G5" },
  { id: "lgv20", label: "LG V20" },
  { id: "lgg4", label: "LG G4" },
  { id: "lgg3", label: "LG G3" },
];

const others: DeviceModel[] = [{ id: "other", label: "Other Device" }];

export const brandTypes: DeviceBrand[] = [
  { id: "iphone", label: "iPhone", models: iphoneModels },
  { id: "samsung", label: "Samsung", models: samsungModels },
  { id: "google", label: "Google", models: googleModels },
  { id: "lg", label: "LG", models: lgModels },
  { id: "other", label: "Other Device", models: [] },
];

export const models: DeviceBrands = {
  iphone: iphoneModels,
  samsung: samsungModels,
  google: googleModels,
  lg: lgModels,
  other: others,
};