import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function RSVP() {
  return (
    <React.Fragment>
        <Box>
              <Container maxWidth="lg" className="py-5">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                      RSVP
                    </Typography>

                    <Typography variant="body1">
                      This is RSVP page.
                    </Typography>
                  </Box>
              </Container>
        </Box>
    </React.Fragment>
  );
}