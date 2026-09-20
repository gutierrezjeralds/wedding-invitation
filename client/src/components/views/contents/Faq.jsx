import { Container, Typography, Box } from '@mui/material';

export default function Attire() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          FAQ
        </Typography>

        <Typography variant="body1">
          This is FAQ page.
        </Typography>
      </Box>
    </Container>
  );
}