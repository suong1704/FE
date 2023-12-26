import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "My Learning",
  },

  {
    id: uniqueId(),
    title: "Today",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Recently",
    icon: IconLayoutDashboard,
    href: "/recently",
  },
  {
    navlabel: true,
    subheader: "My Modules",
  },
  {
    id: uniqueId(),
    title: "All Modules",
    icon: IconAperture,
    href: "/all-module",
  },
  {
    id: uniqueId(),
    title: "My Modules",
    icon: IconLayoutDashboard,
    href: "/my-modules",
  },

];

export default Menuitems;
