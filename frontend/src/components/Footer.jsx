import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              RentOn
            </Typography>
            <Typography variant="body2" paragraph>
              Your one-stop shop for renting premium products at affordable prices.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense>
              <ListItem disableGutters component={Link} to="/about" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="About Us" />
              </ListItem>
              <ListItem disableGutters component={Link} to="/products" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem disableGutters component={Link} to="/membership" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Membership Plans" />
              </ListItem>
              <ListItem disableGutters component={Link} to="/faq" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="FAQs" />
              </ListItem>
              <ListItem disableGutters component={Link} to="/terms" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Terms & Conditions" />
              </ListItem>
              <ListItem disableGutters component={Link} to="/privacy" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
            </List>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <List dense>
              <ListItem disableGutters>
                <LocationIcon sx={{ mr: 1 }} />
                <ListItemText primary="123 Main Street, New Delhi, India" />
              </ListItem>
              <ListItem disableGutters>
                <PhoneIcon sx={{ mr: 1 }} />
                <ListItemText primary="+91 98765 43210" />
              </ListItem>
              <ListItem disableGutters>
                <EmailIcon sx={{ mr: 1 }} />
                <ListItemText primary="info@renton.com" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} RentOn. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Designed and Developed with ❤️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;