import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Entourage() {
  return (
    <React.Fragment>
        <Box className="bg-light">
              <Container maxWidth="lg" className="py-5">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                      Gift
                    </Typography>

                    <Typography variant="body1">
                      This is Gift page.
                    </Typography>
                  </Box>
              </Container>
        </Box>
    </React.Fragment>
  );
}