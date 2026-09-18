import { Container, Typography, Box } from '@mui/material';

export default function DressCode() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dress Code
        </Typography>

        <Typography variant="body1">
          This is Dress Code page.
        </Typography>
      </Box>
    </Container>
  );
}