import type { FC } from "react";
import { Box, Toolbar, AppBar } from "@mui/material";

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};

export default Navigation;
