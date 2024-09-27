
import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Repair",
    path: "/repair/form",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    newTab: false,
  },
  {
    id:3,
    title: "FAQ",
    newTab: false,
  },
  {
    id: 4,
    title: "Join Community",
    path: "/auth/signup",
    newTab: false,
  },
  // {
  //   id: 5,
  //   title: "Repair",
  //   newTab: false,
    //submenu: [
      // {
      //   id: 41,
      //   title: "Swapdevice",
      //   path: "/device",
      //   newTab: false,
      // },
   // ],
  //},
];
export default menuData;
