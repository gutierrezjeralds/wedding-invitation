import { Container, Typography, Box } from '@mui/material';

export default function Story() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Story
        </Typography>

        <Typography variant="body1">
          This is Our Story page.
        </Typography>
      </Box>
    </Container>
  );
}