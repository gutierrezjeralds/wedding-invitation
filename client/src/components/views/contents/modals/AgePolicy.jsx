import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { ChildCare } from '@mui/icons-material';
import { CONTENT, CONTENT_FAQ } from '../../utils/Constants';

export default function AgePolicyDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="age-policy-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1.5,
          border: '1px solid rgba(107, 29, 47, 0.15)',
          boxShadow: '0 12px 32px rgba(107, 29, 47, 0.15)',
        },
      }}
    >
      <DialogTitle id="age-policy-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'primary.main' }}>
        <ChildCare sx={{ fontSize: 32 }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: 700, fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem' }}>
          {CONTENT.AGEPOLICY_TITLE}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          component="div"
          sx={{ color: 'text.primary', fontSize: '0.975rem', lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: CONTENT_FAQ.DATA[4].ANSWER }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            px: 3,
            py: 0.8,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}