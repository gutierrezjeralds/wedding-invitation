import { Container, Typography, Box } from '@mui/material';

export default function TheWedding() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          The Wedding
        </Typography>

        <Typography variant="body1">
          This is The Wedding page.
        </Typography>
      </Box>
    </Container>
  );
}