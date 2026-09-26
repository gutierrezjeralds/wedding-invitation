import { Container, Typography, Box } from '@mui/material';

export default function Gift() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Gifts
        </Typography>

        <Typography variant="body1">
          This is Gift page.
        </Typography>
      </Box>
    </Container>
  );
}