import { Box, Typography, Link, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        p: 3,
        mt: 5,
        boxShadow: 1,
        bottom: 0,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" align="center" color="text.secondary">
          &copy; {new Date().getFullYear()} Meeshly
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Link href="#" sx={{ mx: 2 }}>
            About Us
          </Link>
          <Link href="#" sx={{ mx: 2 }}>
            Contact
          </Link>
          <Link href="#" sx={{ mx: 2 }}>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
