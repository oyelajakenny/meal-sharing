"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

const pages = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/" },
  { name: "Reserve A Meal", path: "/" },
  { name: "Contact", path: "/" },
  { name: "All Meals", path: "/allmeals" },
];

const ResponsiveNavbar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Open menu on small screens
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Close menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Navigate to page on click
  const handleNavigate = (path) => {
    handleCloseNavMenu();
    router.push(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Brand/Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex" } }}
        >
          <Link href="/" passHref>
            Meeshly
          </Link>
        </Typography>
       
        {/* Menu icon for small screens */}
        <Box sx={{ flexGrow: -5, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => handleNavigate(page.path)}
              >
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Navbar links for larger screens */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              color="inherit"
              onClick={() => handleNavigate(page.path)}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveNavbar;
