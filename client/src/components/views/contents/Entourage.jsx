import { Container, Typography, Box } from '@mui/material';

export default function Entourage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Entourage
        </Typography>

        <Typography variant="body1">
          This is Entourage page.
        </Typography>
      </Box>
    </Container>
  );
}