import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box, Button, Pagination } from '@mui/material';

// Import all product images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
};

// This will be replaced with actual API call in production
const getProductData = () => {
  const productImages = importAll(require.context('../assets/images', false, /p_img.*\.png$/));
  
  return Object.keys(productImages).map((key, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Beautiful product for rent. Perfect for special occasions.`,
    price: `₹${Math.floor(Math.random() * 500) + 100}/day`,
    image: productImages[key]
  }));
};

const ProductCollection = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // In a real app, this would be an API call
    const allProducts = getProductData();
    setProducts(allProducts);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Our Product Collection
      </Typography>
      
      <Grid container spacing={4}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {product.price}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" color="primary" fullWidth>
                  Rent Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductCollection; 