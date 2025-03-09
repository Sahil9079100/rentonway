import React from 'react';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import ProductCollection from '../components/ProductCollection';

const Home = () => {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Designer Dress',
      description: 'Perfect for weddings and formal events',
      image: 'https://via.placeholder.com/300x200',
      price: '₹500/day'
    },
    {
      id: 2,
      name: 'Luxury Watch',
      description: 'Elegant timepiece for special occasions',
      image: 'https://via.placeholder.com/300x200',
      price: '₹300/day'
    },
    {
      id: 3,
      name: 'Premium Sunglasses',
      description: 'Stylish protection for sunny days',
      image: 'https://via.placeholder.com/300x200',
      price: '₹150/day'
    },
    {
      id: 4,
      name: 'Formal Suit',
      description: 'Look your best for business meetings',
      image: 'https://via.placeholder.com/300x200',
      price: '₹600/day'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div style={{ 
        backgroundColor: '#3f51b5', 
        color: 'white', 
        padding: '60px 0',
        marginBottom: '40px'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Rent Premium Products at Affordable Prices
          </Typography>
          <Typography variant="h5" paragraph>
            Why buy when you can rent? Access high-quality products for a fraction of the cost.
          </Typography>
          <Button variant="contained" color="secondary" size="large" style={{ marginTop: '20px' }}>
            Browse Products
          </Button>
        </Container>
      </div>

      {/* Product Collection */}
      <ProductCollection />

      {/* How It Works */}
      <Container maxWidth="lg" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          How It Works
        </Typography>
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <Typography variant="h3" color="primary">1</Typography>
              <Typography variant="h5" gutterBottom>Browse & Select</Typography>
              <Typography variant="body1" align="center">
                Browse our collection and select the products you want to rent.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <Typography variant="h3" color="primary">2</Typography>
              <Typography variant="h5" gutterBottom>Rent & Receive</Typography>
              <Typography variant="body1" align="center">
                Complete the rental process and receive your items at your doorstep.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <Typography variant="h3" color="primary">3</Typography>
              <Typography variant="h5" gutterBottom>Use & Return</Typography>
              <Typography variant="body1" align="center">
                Use the products and return them when your rental period ends.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Membership Banner */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '40px 0',
        marginBottom: '40px'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Become a Member
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Join our membership program and enjoy exclusive benefits like discounted rates, free delivery, and priority support.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" size="large">
              View Membership Plans
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home; 