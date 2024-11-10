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

// Mobile Phones
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
  { id: "galaxynote20ultra", label: "Galaxy Note 20 Ultra" },
  { id: "galaxynote20", label: "Galaxy Note 20" },
  { id: "galaxynote10plus", label: "Galaxy Note 10 Plus" },
  { id: "galaxynote10", label: "Galaxy Note 10" },
  { id: "galaxynote9", label: "Galaxy Note 9" },
  { id: "galaxynote8", label: "Galaxy Note 8" },
  { id: "galaxynote7", label: "Galaxy Note 7" },
  { id: "galaxynote5", label: "Galaxy Note 5" },
  { id: "galaxynote4", label: "Galaxy Note 4" },
  { id: "galaxynote3", label: "Galaxy Note 3" },
  { id: "galaxynote2", label: "Galaxy Note 2" },
  { id: "galaxynote", label: "Galaxy Note" },
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

// Tablets
const ipadModels: DeviceModel[] = [
  { id: "ipadpro12M2", label: "iPad Pro 12.9 (6th generation, M2)" },  // 2022
  { id: "ipadpro11M2", label: "iPad Pro 11 (4th generation, M2)" },    // 2022
  { id: "ipadairM1", label: "iPad Air (5th generation, M1)" },         // 2022
  { id: "ipad10thGen", label: "iPad (10th generation)" },              // 2022
  { id: "ipadmini6", label: "iPad Mini (6th generation)" },            // 2021
  { id: "ipad9thGen", label: "iPad (9th generation)" },                // 2021
  { id: "ipadpro12M1", label: "iPad Pro 12.9 (5th generation, M1)" },  // 2021
  { id: "ipadpro11M1", label: "iPad Pro 11 (3rd generation, M1)" },    // 2021
  { id: "ipadair4", label: "iPad Air (4th generation)" },              // 2020
  { id: "ipad8thGen", label: "iPad (8th generation)" },                // 2020
  { id: "ipadmini5", label: "iPad Mini (5th generation)" },            // 2019
  { id: "ipadpro12", label: "iPad Pro 12.9 (4th generation)" },        // 2020
  { id: "ipadpro11", label: "iPad Pro 11 (2nd generation)" },          // 2020
  { id: "ipad7thGen", label: "iPad (7th generation)" },                // 2019
  { id: "ipadpro12_3rd", label: "iPad Pro 12.9 (3rd generation)" },    // 2018
  { id: "ipadpro11_1st", label: "iPad Pro 11 (1st generation)" },      // 2018
  { id: "ipadair3", label: "iPad Air (3rd generation)" },              // 2019
  { id: "ipad6thGen", label: "iPad (6th generation)" },                // 2018
  { id: "ipadpro12_2nd", label: "iPad Pro 12.9 (2nd generation)" },    // 2017
  { id: "ipadpro10_5", label: "iPad Pro 10.5" },                       // 2017
  { id: "ipad5thGen", label: "iPad (5th generation)" },                // 2017
  { id: "ipadmini4", label: "iPad Mini (4th generation)" },            // 2015
  { id: "ipadpro12_1st", label: "iPad Pro 12.9 (1st generation)" },    // 2015
  { id: "ipadair2", label: "iPad Air (2nd generation)" },              // 2014
  { id: "ipad4thGen", label: "iPad (4th generation)" },                // 2012
  { id: "ipadair1", label: "iPad Air (1st generation)" },              // 2013
  { id: "ipadmini3", label: "iPad Mini (3rd generation)" },            // 2014
  { id: "ipadmini2", label: "iPad Mini (2nd generation)" },            // 2013
  { id: "ipad3rdGen", label: "iPad (3rd generation)" },                // 2012
  { id: "ipadmini1", label: "iPad Mini (1st generation)" },            // 2012
  { id: "ipad2", label: "iPad 2" },                                    // 2011
  { id: "ipad1", label: "iPad (1st generation)" },                     // 2010
];

const samsungTabletModels: DeviceModel[] = [
  { id: "galaxyTabS9", label: "Galaxy Tab S9" },                 // 2023
  { id: "galaxyTabS8", label: "Galaxy Tab S8" },                 // 2022
  { id: "galaxyTabA8", label: "Galaxy Tab A8" },                 // 2021
  { id: "galaxyTabS7FE", label: "Galaxy Tab S7 FE" },            // 2021
  { id: "galaxyTabS7", label: "Galaxy Tab S7" },                 // 2020
  { id: "galaxyTabS6Lite", label: "Galaxy Tab S6 Lite" },        // 2020
  { id: "galaxyTabS6", label: "Galaxy Tab S6" },                 // 2019
  { id: "galaxyTabS5e", label: "Galaxy Tab S5e" },               // 2019
  { id: "galaxyTabA7", label: "Galaxy Tab A7" },                 // 2020
  { id: "galaxyTabA10_1", label: "Galaxy Tab A 10.1" },          // 2019
  { id: "galaxyTabA10_5", label: "Galaxy Tab A 10.5" },          // 2018
  { id: "galaxyTabS4", label: "Galaxy Tab S4" },                 // 2018
  { id: "galaxyTabS3", label: "Galaxy Tab S3" },                 // 2017
  { id: "galaxyTabA", label: "Galaxy Tab A" },                   // 2015–2020 (multiple variants)
  { id: "galaxyTabS2", label: "Galaxy Tab S2" },                 // 2015
  { id: "galaxyTabS", label: "Galaxy Tab S" },                   // 2014
  { id: "galaxyTabPro", label: "Galaxy Tab Pro" },               // 2014
  { id: "galaxyTab4", label: "Galaxy Tab 4" },                   // 2014
  { id: "galaxyNotePro", label: "Galaxy Note Pro" },             // 2014
  { id: "galaxyTab3", label: "Galaxy Tab 3" },                   // 2013
  { id: "galaxyNote10_1", label: "Galaxy Note 10.1" },           // 2012
  { id: "galaxyTab2", label: "Galaxy Tab 2" },                   // 2012
  { id: "galaxyTab10_1", label: "Galaxy Tab 10.1" },             // 2011
  { id: "galaxyTab", label: "Galaxy Tab" },                      // 2010 (Samsung’s first tablet)
];

const amazonTabletModels: DeviceModel[] = [
  { id: "fireHD10Plus", label: "Fire HD 10 Plus (2023)" },                 // 2023
  { id: "fireHD10", label: "Fire HD 10 (2023)" },                         // 2023
  { id: "fireHD8Plus", label: "Fire HD 8 Plus (2022)" },                  // 2022
  { id: "fireHD8", label: "Fire HD 8 (2022)" },                          // 2022
  { id: "fireHD10Plus2021", label: "Fire HD 10 Plus (2021)" },           // 2021
  { id: "fireHD10_2021", label: "Fire HD 10 (2021)" },                   // 2021
  { id: "fireHD8Plus2020", label: "Fire HD 8 Plus (2020)" },             // 2020
  { id: "fireHD8_2020", label: "Fire HD 8 (2020)" },                     // 2020
  { id: "fireHD10_2019", label: "Fire HD 10 (2019)" },                   // 2019
  { id: "fireHD8Plus2018", label: "Fire HD 8 Plus (2018)" },             // 2018
  { id: "fireHD8_2018", label: "Fire HD 8 (2018)" },                     // 2018
  { id: "fireHD10_2017", label: "Fire HD 10 (2017)" },                   // 2017
  { id: "fire7_2017", label: "Fire 7 (2017)" },                          // 2017
  { id: "fireHD8_2016", label: "Fire HD 8 (2016)" },                     // 2016
  { id: "fire7_2016", label: "Fire 7 (2016)" },                          // 2016
];

const asusTabletModels: DeviceModel[] = [
  { id: "zenpad10", label: "ASUS ZenPad 10 (2023)" },                     // 2023
  { id: "zenpad8", label: "ASUS ZenPad 8 (2022)" },                       // 2022
  { id: "zenpad3s10", label: "ASUS ZenPad 3S 10 (2021)" },                // 2021
  { id: "zenpad3", label: "ASUS ZenPad 3 (2020)" },                       // 2020
  { id: "zenpad10_2019", label: "ASUS ZenPad 10 (2019)" },                // 2019
  { id: "zenpad8_2018", label: "ASUS ZenPad 8 (2018)" },                  // 2018
  { id: "zenpad10_2017", label: "ASUS ZenPad 10 (2017)" },                // 2017
  { id: "zenpad8_2017", label: "ASUS ZenPad 8 (2017)" },                  // 2017
  { id: "zenpad3s10_2016", label: "ASUS ZenPad 3S 10 (2016)" },           // 2016
  { id: "zenpad10_2016", label: "ASUS ZenPad 10 (2016)" },                // 2016
  { id: "zenpad8_2016", label: "ASUS ZenPad 8 (2016)" },                  // 2016
  { id: "transormerBookT100", label: "ASUS Transformer Book T100" },     // 2014
];

const lenovoTabletModels: DeviceModel[] = [
  { id: "lenovoTabP12Pro", label: "Lenovo Tab P12 Pro (2023)" },             // 2023
  { id: "lenovoTabP11Plus", label: "Lenovo Tab P11 Plus (2022)" },           // 2022
  { id: "lenovoTabP11", label: "Lenovo Tab P11 (2021)" },                    // 2021
  { id: "lenovoTabM10Plus", label: "Lenovo Tab M10 Plus (2020)" },           // 2020
  { id: "lenovoTabM8", label: "Lenovo Tab M8 (2020)" },                      // 2020
  { id: "lenovoTabM10", label: "Lenovo Tab M10 (2019)" },                    // 2019
  { id: "lenovoTabP10", label: "Lenovo Tab P10 (2018)" },                    // 2018
  { id: "lenovoYogaTab3Pro", label: "Lenovo Yoga Tab 3 Pro (2016)" },       // 2016
  { id: "lenovoYogaTab3", label: "Lenovo Yoga Tab 3 (2016)" },              // 2016
  { id: "lenovoTab3A10", label: "Lenovo Tab 3 A10 (2016)" },                 // 2016
  { id: "lenovoTab2A10", label: "Lenovo Tab 2 A10 (2015)" },                 // 2015
  { id: "lenovoTabS8", label: "Lenovo Tab S8 (2014)" },                      // 2014
];

const lgTabletModels: DeviceModel[] = [
  { id: "lgGPad5", label: "LG G Pad 5 (2020)" },                         // 2020
  { id: "lgGPad4", label: "LG G Pad 4 (2017)" },                         // 2017
  { id: "lgGPadX2", label: "LG G Pad X2 (2017)" },                       // 2017
  { id: "lgGPad3", label: "LG G Pad 3 (2016)" },                         // 2016
  { id: "lgGPadII10", label: "LG G Pad II 10.1 (2015)" },                // 2015
  { id: "lgGPadII8", label: "LG G Pad II 8.0 (2015)" },                  // 2015
  { id: "lgGPad7", label: "LG G Pad 7.0 (2014)" },                       // 2014
  { id: "lgGPad8", label: "LG G Pad 8.3 (2013)" },                       // 2013
  { id: "lgOptimusPad", label: "LG Optimus Pad (2011)" },                // 2011
];

const dellTabletModels: DeviceModel[] = [
  { id: "dellLatitude7220", label: "Dell Latitude 7220 Rugged Tablet (2021)" }, // 2021
  { id: "dellLatitude7200", label: "Dell Latitude 7200 2-in-1 (2019)" },        // 2019
  { id: "dellVenue11Pro", label: "Dell Venue 11 Pro (2013)" },                 // 2013
  { id: "dellVenue8Pro", label: "Dell Venue 8 Pro (2013)" },                   // 2013
  { id: "dellXPS12", label: "Dell XPS 12 (2013)" },                           // 2013
];

const hpTabletModels: DeviceModel[] = [
  { id: "hpEliteX2", label: "HP Elite x2 (2019)" },                      // 2019
  { id: "hpProTablet608", label: "HP Pro Tablet 608 (2016)" },            // 2016
  { id: "hpStream7", label: "HP Stream 7 (2014)" },                      // 2014
  { id: "hpSlate8Pro", label: "HP Slate 8 Pro (2014)" },                 // 2014
  { id: "hpSlate10HD", label: "HP Slate 10 HD (2014)" },                 // 2014
  { id: "hpSlate7", label: "HP Slate 7 (2013)" },                        // 2013
  { id: "hpTouchPad", label: "HP TouchPad (2011)" },                     // 2011
];

const toshibaTabletModels: DeviceModel[] = [
  { id: "toshibaDynaPad", label: "Toshiba DynaPad (2015)" },                // 2015
  { id: "toshibaEncore2", label: "Toshiba Encore 2 (2014)" },              // 2014
  { id: "toshibaEncore", label: "Toshiba Encore (2013)" },                 // 2013
  { id: "toshibaAT200", label: "Toshiba AT200 (2011)" },                   // 2011
  { id: "toshibaThrive", label: "Toshiba Thrive (2011)" },                 // 2011
];

const microsoftTabletModels: DeviceModel[] = [
  { id: "surfacePro9", label: "Microsoft Surface Pro 9 (2022)" },              // 2022
  { id: "surfaceGo3", label: "Microsoft Surface Go 3 (2021)" },               // 2021
  { id: "surfacePro8", label: "Microsoft Surface Pro 8 (2021)" },              // 2021
  { id: "surfaceProX", label: "Microsoft Surface Pro X (2019)" },              // 2019
  { id: "surfaceGo2", label: "Microsoft Surface Go 2 (2020)" },               // 2020
  { id: "surfacePro7", label: "Microsoft Surface Pro 7 (2019)" },              // 2019
  { id: "surfaceBook3", label: "Microsoft Surface Book 3 (2020)" },           // 2020
  { id: "surfacePro6", label: "Microsoft Surface Pro 6 (2018)" },              // 2018
  { id: "surfaceGo", label: "Microsoft Surface Go (2018)" },                  // 2018
  { id: "surfacePro2017", label: "Microsoft Surface Pro (2017)" },            // 2017
];

// Laptops
const macbookModels: DeviceModel[] = [
  { id: "macbookairM2", label: "MacBook Air M2" },             // 2022
  { id: "macbookpro14", label: "MacBook Pro 14-inch" },         // 2021
  { id: "macbookpro16", label: "MacBook Pro 16-inch" },         // 2021
  { id: "macbookairM1", label: "MacBook Air M1" },              // 2020
  { id: "macbookpro13M1", label: "MacBook Pro 13-inch M1" },    // 2020
  { id: "macbookpro16Intel", label: "MacBook Pro 16-inch (Intel)" }, // 2019
  { id: "macbookpro13Intel", label: "MacBook Pro 13-inch (Intel)" }, // 2019
  { id: "macbookairIntel", label: "MacBook Air (Intel)" },       // 2019
  { id: "macbook12", label: "MacBook 12-inch" },                 // 2015–2019
  { id: "macbookpro15", label: "MacBook Pro 15-inch" },          // 2015–2019
  { id: "macbookpro13", label: "MacBook Pro 13-inch" },          // 2015–2019
  { id: "macbookairRetina", label: "MacBook Air Retina" },       // 2018
  { id: "macbookproTouchBar", label: "MacBook Pro (Touch Bar)" }, // 2016–2019
  { id: "macbookproUnibody", label: "MacBook Pro (Unibody)" },   // 2008–2015
  { id: "macbookair", label: "MacBook Air" },                    // 2008–2017
  { id: "macbookUnibody", label: "MacBook (Unibody)" },          // 2008–2012
  { id: "macbookProClassic", label: "MacBook Pro Classic" },     // 2006–2012
  { id: "macbookWhite", label: "MacBook (White)" },              // 2006–2011
];

const dellLaptopModels: DeviceModel[] = [
  { id: "dellXPS13_2023", label: "Dell XPS 13 (2023)" },             // 2023
  { id: "dellXPS15_2023", label: "Dell XPS 15 (2023)" },             // 2023
  { id: "dellXPS17_2023", label: "Dell XPS 17 (2023)" },             // 2023
  { id: "dellXPS13Plus", label: "Dell XPS 13 Plus" },                // 2022
  { id: "dellXPS13_2022", label: "Dell XPS 13 (2022)" },             // 2022
  { id: "dellXPS15_2022", label: "Dell XPS 15 (2022)" },             // 2022
  { id: "dellXPS17_2022", label: "Dell XPS 17 (2022)" },             // 2022
  { id: "dellInspiron16", label: "Dell Inspiron 16" },               // 2022
  { id: "dellInspiron14", label: "Dell Inspiron 14" },               // 2021–2022
  { id: "dellInspiron15", label: "Dell Inspiron 15" },               // 2021–2022
  { id: "dellLatitude9430", label: "Dell Latitude 9430" },           // 2022
  { id: "dellLatitude7430", label: "Dell Latitude 7430" },           // 2022
  { id: "dellLatitude5430", label: "Dell Latitude 5430" },           // 2022
  { id: "dellLatitude13", label: "Dell Latitude 13" },               // 2020–2022
  { id: "dellAlienwareX17", label: "Dell Alienware X17" },           // 2021
  { id: "dellAlienwareX15", label: "Dell Alienware X15" },           // 2021
  { id: "dellAlienwareM15R4", label: "Dell Alienware M15 R4" },      // 2021
  { id: "dellXPS13_2020", label: "Dell XPS 13 (2020)" },             // 2020
  { id: "dellXPS15_2020", label: "Dell XPS 15 (2020)" },             // 2020
  { id: "dellXPS17_2020", label: "Dell XPS 17 (2020)" },             // 2020
  { id: "dellInspiron7000", label: "Dell Inspiron 7000" },           // 2020
  { id: "dellLatitude7400", label: "Dell Latitude 7400" },           // 2019
  { id: "dellLatitude5000", label: "Dell Latitude 5000" },           // 2019
  { id: "dellAlienwareM17R2", label: "Dell Alienware M17 R2" },      // 2019
  { id: "dellXPS13_2in1", label: "Dell XPS 13 2-in-1" },             // 2019
  { id: "dellLatitudeE7470", label: "Dell Latitude E7470" },         // 2016
  { id: "dellInspiron5000", label: "Dell Inspiron 5000" },           // 2015–2020
  { id: "dellInspiron3000", label: "Dell Inspiron 3000" },           // 2015–2020
  { id: "dellXPS15_2015", label: "Dell XPS 15 (2015)" },             // 2015
  { id: "dellXPS13_2015", label: "Dell XPS 13 (2015)" },             // 2015
  { id: "dellLatitudeE7450", label: "Dell Latitude E7450" },         // 2015
  { id: "dellAlienware13", label: "Dell Alienware 13" },             // 2014–2016
  { id: "dellXPS13_2013", label: "Dell XPS 13 (2013)" },             // 2013
];

const hpLaptopModels: DeviceModel[] = [
  { id: "hpSpectreX360_2023", label: "HP Spectre x360 (2023)" },      // 2023
  { id: "hpSpectreX360_16", label: "HP Spectre x360 16" },            // 2022
  { id: "hpSpectreX360_14", label: "HP Spectre x360 14" },            // 2021
  { id: "hpEnvy16", label: "HP Envy 16" },                            // 2023
  { id: "hpEnvy15", label: "HP Envy 15" },                            // 2022
  { id: "hpEnvy14", label: "HP Envy 14" },                            // 2021
  { id: "hpEnvy13", label: "HP Envy 13" },                            // 2020
  { id: "hpPavilion15", label: "HP Pavilion 15" },                    // 2023
  { id: "hpPavilion14", label: "HP Pavilion 14" },                    // 2022
  { id: "hpPavilion13", label: "HP Pavilion 13" },                    // 2021
  { id: "hpPavilionAero13", label: "HP Pavilion Aero 13" },           // 2021
  { id: "hpOmen17", label: "HP Omen 17" },                            // 2023
  { id: "hpOmen16", label: "HP Omen 16" },                            // 2022
  { id: "hpOmen15", label: "HP Omen 15" },                            // 2021
  { id: "hpOmenX2S", label: "HP Omen X 2S" },                         // 2019
  { id: "hpSpectreX360_13", label: "HP Spectre x360 13" },            // 2020
  { id: "hpSpectreX360_15", label: "HP Spectre x360 15" },            // 2019
  { id: "hpEnvy17", label: "HP Envy 17" },                            // 2020
  { id: "hpEnvyX360_15", label: "HP Envy x360 15" },                  // 2020
  { id: "hpEnvyX360_13", label: "HP Envy x360 13" },                  // 2019
  { id: "hpPavilionX360", label: "HP Pavilion x360" },                // 2019
  { id: "hpPavilionGaming", label: "HP Pavilion Gaming" },            // 2020
  { id: "hpOmen15_2018", label: "HP Omen 15 (2018)" },                // 2018
  { id: "hpOmenX", label: "HP Omen X" },                              // 2017
  { id: "hpSpectre", label: "HP Spectre" },                           // 2017
  { id: "hpSpectreX2", label: "HP Spectre x2" },                      // 2017
  { id: "hpEliteDragonfly", label: "HP Elite Dragonfly" },            // 2019
  { id: "hpEliteBook", label: "HP EliteBook" },                       // 2017–2022 (various models)
  { id: "hpProBook", label: "HP ProBook" },                           // 2017–2022 (various models)
];

// Computers (Desktops)
const imacModels: DeviceModel[] = [
  { id: "imac24M1", label: "iMac 24-inch (M1, 2021)" },        // 2021
  { id: "macStudioM2", label: "Mac Studio (M2 Ultra, 2023)" }, // 2023
  { id: "macStudioM1", label: "Mac Studio (M1 Ultra, 2022)" }, // 2022
  { id: "macProM2", label: "Mac Pro (M2 Ultra, 2023)" },       // 2023
  { id: "imac27Intel", label: "iMac 27-inch (Intel, 2020)" },  // 2020
  { id: "imacPro", label: "iMac Pro (2017)" },                 // 2017
  { id: "imac27_5K", label: "iMac 27-inch Retina 5K (2019)" }, // 2019
  { id: "imac21_4K", label: "iMac 21.5-inch Retina 4K (2019)" },// 2019
  { id: "macPro2019", label: "Mac Pro (2019)" },               // 2019
  { id: "macMiniM2", label: "Mac Mini (M2, 2023)" },           // 2023
  { id: "macMiniM1", label: "Mac Mini (M1, 2020)" },           // 2020
  { id: "macMiniIntel", label: "Mac Mini (Intel, 2018)" },     // 2018
  { id: "imac27_2017", label: "iMac 27-inch (2017)" },         // 2017
  { id: "imac21_2017", label: "iMac 21.5-inch (2017)" },       // 2017
  { id: "macPro2013", label: "Mac Pro (2013)" },               // 2013
  { id: "imac27_2015", label: "iMac 27-inch (2015)" },         // 2015
  { id: "imac21_2015", label: "iMac 21.5-inch (2015)" },       // 2015
  { id: "macMini2014", label: "Mac Mini (2014)" },             // 2014
];

const dellDesktopModels: DeviceModel[] = [
  { id: "dellXPS8950", label: "Dell XPS Desktop (8950, 2022)" }, // 2022
  { id: "dellXPS8940", label: "Dell XPS Desktop (8940, 2021)" }, // 2021
  { id: "dellOptiPlex7000", label: "Dell OptiPlex 7000 (2022)" }, // 2022
  { id: "dellOptiPlex6000", label: "Dell OptiPlex 6000 (2021)" }, // 2021
  { id: "dellOptiPlex5000", label: "Dell OptiPlex 5000 (2022)" }, // 2022
  { id: "dellOptiPlex3000", label: "Dell OptiPlex 3000 (2020)" }, // 2020
  { id: "dellXPS8930", label: "Dell XPS Desktop (8930, 2020)" }, // 2020
  { id: "dellOptiPlex9020", label: "Dell OptiPlex 9020" },        // 2013
  { id: "dellPrecisionT3620", label: "Dell Precision T3620" },   // 2016
  { id: "dellAlienwareAurora", label: "Dell Alienware Aurora R11" }, // 2020
  { id: "dellInspiron3880", label: "Dell Inspiron 3880" },        // 2020
  { id: "dellXPS27", label: "Dell XPS 27 (2017)" },               // 2017
  { id: "dellOptiPlex3040", label: "Dell OptiPlex 3040" },        // 2016
  { id: "dellPrecisionT5810", label: "Dell Precision T5810" },   // 2014
];

const hpDesktopModels: DeviceModel[] = [
  { id: "hpPavilionGamingDesktop", label: "HP Pavilion Gaming Desktop (2023)" }, // 2023
  { id: "hpPavilionDesktop", label: "HP Pavilion Desktop (2022)" },               // 2022
  { id: "hpOmen30L", label: "HP Omen 30L Desktop (2022)" },                      // 2022
  { id: "hpOmen25L", label: "HP Omen 25L Desktop (2022)" },                      // 2022
  { id: "hpOmenDesktop", label: "HP Omen Desktop (2021)" },                      // 2021
  { id: "hpPavilionAllInOne", label: "HP Pavilion All-in-One (2021)" },          // 2021
  { id: "hpEnvyDesktop", label: "HP Envy Desktop (2021)" },                      // 2021
  { id: "hpPavilionDesktop2019", label: "HP Pavilion Desktop (2019)" },          // 2019
  { id: "hpOmenObelisk", label: "HP Omen Obelisk Desktop (2019)" },               // 2019
  { id: "hpAllInOne27", label: "HP All-in-One 27 (2019)" },                     // 2019
  { id: "hpEliteOne", label: "HP EliteOne 800 G5" },                             // 2019
  { id: "hpPavilionGamingDesktop2019", label: "HP Pavilion Gaming Desktop (2019)" }, // 2019
  { id: "hpProDesk", label: "HP ProDesk 600 G5" },                                // 2019
  { id: "hpEliteDesktop", label: "HP Elite Desktop (2018)" },                    // 2018
  { id: "hpPavilionAllInOne2018", label: "HP Pavilion All-in-One (2018)" },      // 2018
];

export const phoneBrands: DeviceBrand[] = [
  { id: "iphone", label: "iPhone", models: iphoneModels },
  { id: "samsung", label: "Samsung", models: samsungModels },
  { id: "google", label: "Google", models: googleModels },
  { id: "lg", label: "LG", models: lgModels },
  { id: "other", label: "Other Device", models: others },
];

export const tabletBrands: DeviceBrand[] = [
  { id: "ipad", label: "iPad", models: ipadModels },
  { id: "samsungTablet", label: "Samsung Tablet", models: samsungTabletModels },
  { id: "amazonTablet", label: "Amazon Tablet", models: amazonTabletModels },
  { id: "asusTablet", label: "Asus Tablet", models: asusTabletModels },
  { id: "lenovoTablet", label: "Lenovo Tablet", models: lenovoTabletModels },
  { id: "lgTablet", label: "LG Tablet", models: lgTabletModels },
  { id: "dellTablet", label: "Dell Tablet", models: dellTabletModels },
  { id: "hpTablet", label: "HP Tablet", models: hpTabletModels },
  { id: "toshibaTablet", label: "Toshiba Tablet", models: toshibaTabletModels },
  { id: "microsoftTablet", label: "Microsoft Tablet", models: microsoftTabletModels },
  { id: "other", label: "Other Device", models: others },
];

export const laptopBrands: DeviceBrand[] = [
  { id: "macbook", label: "MacBook", models: macbookModels },
  { id: "dellLaptop", label: "Dell", models: dellLaptopModels },
  { id: "hpLaptop", label: "HP", models: hpLaptopModels },
  { id: "other", label: "Other Device", models: others },
];

export const desktopBrands: DeviceBrand[] = [
  { id: "imac", label: "Apple Desktop", models: imacModels },
  { id: "dellDesktop", label: "Dell Desktop", models: dellDesktopModels },
  { id: "hpDesktop", label: "HP Desktop", models: hpLaptopModels },
  { id: "other", label: "Other Device", models: others },
];

export const models: DeviceBrands = {
  iphone: iphoneModels,
  samsung: samsungModels,
  google: googleModels,
  lg: lgModels,

  ipad: ipadModels,
  samsungTablet: samsungTabletModels,
  amazonTablet: amazonTabletModels,
  asusTablet: asusTabletModels,
  lenovoTablet: lenovoTabletModels,
  lgTablet: lgTabletModels,
  dellTablet: dellTabletModels,
  hpTablet: hpTabletModels,
  toshibaTablet: toshibaTabletModels, 
  microsoftTablet: microsoftTabletModels,

  macbook: macbookModels,
  dellLaptop: dellLaptopModels,
  hpLaptop: hpLaptopModels,

  imac: imacModels,
  dellDesktop: dellDesktopModels,
  hpDesktop: hpDesktopModels,

  other: others,
};