import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavGroup from "../sidebar/NavGroup/NavGroup";
import NavItem from "./NavItem";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Today",
    href: "/all-module",
  },
  {
    id: uniqueId(),
    title: "My Learning",
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Recently",
    href: "/recently",
  },
  {
    id: uniqueId(),
    title: "My Modules",
    href: "/my-modules",
  },
];
const HeaderItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: "25%" }}>
      <List
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        className="sidebarNav"
        component="div">
        {Menuitems.map((item: any) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default HeaderItems;
