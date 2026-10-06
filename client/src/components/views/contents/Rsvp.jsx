import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  IconButton,
  Alert,
  Stack,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Add, Delete, Favorite } from '@mui/icons-material';
import { Text, PageTitle } from '../utils/CustomComponents';
import { supabase } from '../../../lib/supabase';

// ============================================================
// Constants & Theme Tokens
// ============================================================

const PALETTE = {
  ivoryBg: '#FAF7F2',
  paperBg: '#FFFFFF',
  sageGreen: '#72866E',
  sageHover: '#5C6E59',
  champagneGold: '#C5A059',
  champagneLight: 'rgba(197, 160, 89, 0.15)',
  burgundy: '#6B2D3E',
  textPrimary: '#2C3E35',
  textSecondary: '#6B7A70',
  borderGold: 'rgba(197, 160, 89, 0.3)',
};

const ROLE_OPTIONS = [
  'Principal Sponsors',
  'Secondary Sponsors',
  'Entourage',
  'Parents of Bride or Groom',
  'Guest',
];

const TITLE_OPTIONS = [
  'Mr.',
  'Mrs.',
  'Ms.',
  'Dr.',
];

const CONNECTED_TO_OPTIONS = [
  'Groom',
  'Bride',
  'Both',
];

const RELATIONSHIP_OPTIONS = [
  'Family',
  'Friend',
  'Colleague',
];

// ============================================================
// Empty Guest
// ============================================================

const emptyGuest = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  age: '',
  contactNumber: '',
  roleOnWedding: '',
  connectedTo: '',
  relationship: '',
};

// ============================================================
// RSVP Component
// ============================================================

export default function RSVP() {
  // Primary guest state
  const [parentGuest, setParentGuest] = useState({
    ...emptyGuest,
    willAttend: '',
    message: '',
  });

  // Additional guests state
  const [additionalGuests, setAdditionalGuests] = useState([]);

  // UI state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================================
  // Change Handlers
  // ==========================================================

  const handleParentChange = (event) => {
    const { name, value } = event.target;

    setParentGuest((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setSubmitted(false);
    setSubmitError('');

    if (name === 'willAttend' && value === 'No') {
      setAdditionalGuests([]);
    }
  };

  const handleAdditionalGuestChange = (index, event) => {
    const { name, value } = event.target;

    setAdditionalGuests((prev) =>
      prev.map((guest, guestIndex) =>
        guestIndex === index
          ? {
              ...guest,
              [name]: value,
            }
          : guest
      )
    );

    setErrors((prev) => ({
      ...prev,
      [`guest_${index}_${name}`]: '',
    }));

    setSubmitted(false);
    setSubmitError('');
  };

  const addAdditionalGuest = () => {
    setAdditionalGuests((prev) => [
      ...prev,
      {
        ...emptyGuest,
      },
    ]);
  };

  const removeAdditionalGuest = (index) => {
    setAdditionalGuests((prev) =>
      prev.filter((_, guestIndex) => guestIndex !== index)
    );
    setErrors({});
  };

  // ==========================================================
  // Validation
  // ==========================================================

  const validate = () => {
    const newErrors = {};

    if (!parentGuest.title) newErrors.title = 'Please select a title.';
    if (!parentGuest.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!parentGuest.lastName.trim()) newErrors.lastName = 'Last name is required.';

    if (!parentGuest.age) {
      newErrors.age = 'Age is required.';
    } else if (Number(parentGuest.age) < 1 || Number(parentGuest.age) > 120) {
      newErrors.age = 'Please enter a valid age.';
    }

    if (!parentGuest.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (
      !/^(\+63|0)9\d{9}$/.test(parentGuest.contactNumber.replace(/[\s-]/g, ''))
    ) {
      newErrors.contactNumber = 'Please enter a valid Philippine mobile number.';
    }

    if (!parentGuest.roleOnWedding) newErrors.roleOnWedding = 'Please select your role.';
    if (!parentGuest.connectedTo) newErrors.connectedTo = 'Please select connection.';
    if (!parentGuest.relationship) newErrors.relationship = 'Please select relationship.';
    if (!parentGuest.willAttend) newErrors.willAttend = 'Please select attendance.';

    if (parentGuest.willAttend === 'Yes') {
      additionalGuests.forEach((guest, index) => {
        if (!guest.title) newErrors[`guest_${index}_title`] = 'Required.';
        if (!guest.firstName.trim()) newErrors[`guest_${index}_firstName`] = 'Required.';
        if (!guest.lastName.trim()) newErrors[`guest_${index}_lastName`] = 'Required.';
        if (!guest.age) {
          newErrors[`guest_${index}_age`] = 'Required.';
        } else if (Number(guest.age) < 1 || Number(guest.age) > 120) {
          newErrors[`guest_${index}_age`] = 'Invalid.';
        }
        if (!guest.roleOnWedding) newErrors[`guest_${index}_roleOnWedding`] = 'Required.';
        if (!guest.connectedTo) newErrors[`guest_${index}_connectedTo`] = 'Required.';
        if (!guest.relationship) newErrors[`guest_${index}_relationship`] = 'Required.';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================================
  // Submit Handler
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError('');

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const rsvpId = crypto.randomUUID();

      const { error: rsvpError } = await supabase
        .from('rsvps')
        .insert({
          id: rsvpId,
          title: parentGuest.title,
          first_name: parentGuest.firstName,
          middle_name: parentGuest.middleName || null,
          last_name: parentGuest.lastName,
          age: Number(parentGuest.age),
          contact_number: parentGuest.contactNumber,
          role_on_wedding: parentGuest.roleOnWedding,
          connected_to: parentGuest.connectedTo,
          relationship: parentGuest.relationship,
          will_attend: parentGuest.willAttend === 'Yes',
          message: parentGuest.message || null,
        });

      if (rsvpError) throw rsvpError;

      if (parentGuest.willAttend === 'Yes' && additionalGuests.length > 0) {
        const guestsToInsert = additionalGuests.map((guest) => ({
          rsvp_id: rsvpId,
          title: guest.title,
          first_name: guest.firstName,
          middle_name: guest.middleName || null,
          last_name: guest.lastName,
          age: Number(guest.age),
          role_on_wedding: guest.roleOnWedding,
          connected_to: guest.connectedTo,
          relationship: guest.relationship,
        }));

        const { error: guestsError } = await supabase
          .from('additional_guests')
          .insert(guestsToInsert);

        if (guestsError) throw guestsError;
      }

      setSubmitted(true);
      setParentGuest({
        ...emptyGuest,
        willAttend: '',
        message: '',
      });
      setAdditionalGuests([]);
      setErrors({});

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmitError('We were unable to submit your RSVP. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom styling rules for inputs
  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: '#FAFAF8',
      '& fieldset': {
        borderColor: PALETTE.borderGold,
      },
      '&:hover fieldset': {
        borderColor: PALETTE.champagneGold,
      },
      '&.Mui-focused fieldset': {
        borderColor: PALETTE.sageGreen,
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: PALETTE.sageGreen,
    },
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: PALETTE.ivoryBg
        }}
      >
        <Container maxWidth="lg" className="py-5">
          {/* Page Title */}
          <PageTitle title="RSVP" subtitle="We would be delighted to celebrate this special day with you. Kindly let us know if you will be joining us." />

          {/* Alert Feedback */}
          {submitted && (
            <Alert
              severity="success"
              sx={{
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(114, 134, 110, 0.12)',
                color: PALETTE.textPrimary,
                border: `1px solid ${PALETTE.sageGreen}`,
              }}
            >
              <strong>Thank you!</strong> Your RSVP response has been recorded successfully.
            </Alert>
          )}

          {submitError && (
            <Alert
              severity="error"
              sx={{
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(107, 45, 62, 0.1)',
                color: PALETTE.burgundy,
                border: `1px solid ${PALETTE.burgundy}`,
              }}
            >
              {submitError}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* ==================================================
                PRIMARY GUEST DETAILS
            ================================================== */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                backgroundColor: PALETTE.paperBg,
                border: `1px solid ${PALETTE.borderGold}`,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                  color: PALETTE.textPrimary,
                  mb: 0.5,
                  fontSize: '1.6rem',
                }}
              >
                Guest Information
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: PALETTE.textSecondary,
                  mb: 3.5,
                  lineHeight: 1.6,
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Please enter the information of the guest named on the invitation.
              </Typography>

              <Stack spacing={2.5}>
                {/* Title */}
                <FormControl fullWidth error={Boolean(errors.title)} sx={fieldSx}>
                  <InputLabel>Title</InputLabel>
                  <Select
                    name="title"
                    value={parentGuest.title}
                    label="Title"
                    onChange={handleParentChange}
                  >
                    {TITLE_OPTIONS.map((title) => (
                      <MenuItem key={title} value={title}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.title && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.title}
                    </Typography>
                  )}
                </FormControl>

                {/* First Name */}
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={parentGuest.firstName}
                  onChange={handleParentChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  required
                  sx={fieldSx}
                />

                {/* Middle Name */}
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={parentGuest.middleName}
                  onChange={handleParentChange}
                  helperText="Optional"
                  sx={fieldSx}
                />

                {/* Last Name */}
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={parentGuest.lastName}
                  onChange={handleParentChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  required
                  sx={fieldSx}
                />

                {/* Age */}
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={parentGuest.age}
                  onChange={handleParentChange}
                  error={Boolean(errors.age)}
                  helperText={errors.age}
                  inputProps={{ min: 15, max: 100 }}
                  required
                  sx={fieldSx}
                />

                {/* Contact Number */}
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={parentGuest.contactNumber}
                  onChange={handleParentChange}
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber || 'Example: 09171234567'}
                  placeholder="09XXXXXXXXX"
                  inputProps={{ inputMode: 'tel' }}
                  required
                  sx={fieldSx}
                />

                {/* Role on Wedding */}
                <FormControl fullWidth error={Boolean(errors.roleOnWedding)} sx={fieldSx}>
                  <InputLabel>Role on the Wedding</InputLabel>
                  <Select
                    name="roleOnWedding"
                    value={parentGuest.roleOnWedding}
                    label="Role on the Wedding"
                    onChange={handleParentChange}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roleOnWedding && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.roleOnWedding}
                    </Typography>
                  )}
                </FormControl>

                {/* Connected To */}
                <FormControl fullWidth error={Boolean(errors.connectedTo)} sx={fieldSx}>
                  <InputLabel>Who are you connected to?</InputLabel>
                  <Select
                    name="connectedTo"
                    value={parentGuest.connectedTo}
                    label="Who are you connected to?"
                    onChange={handleParentChange}
                  >
                    {CONNECTED_TO_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.connectedTo && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.connectedTo}
                    </Typography>
                  )}
                </FormControl>

                {/* Relationship */}
                <FormControl fullWidth error={Boolean(errors.relationship)} sx={fieldSx}>
                  <InputLabel>What is your relationship to the Bride or Groom?</InputLabel>
                  <Select
                    name="relationship"
                    value={parentGuest.relationship}
                    label="What is your relationship to the Bride or Groom?"
                    onChange={handleParentChange}
                  >
                    {RELATIONSHIP_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.relationship && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                      {errors.relationship}
                    </Typography>
                  )}
                </FormControl>

                {/* Will Attend Radio */}
                <FormControl error={Boolean(errors.willAttend)} sx={{ mt: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: PALETTE.textPrimary,
                      fontFamily: '"Montserrat", sans-serif',
                    }}
                  >
                    Will you attend?
                  </Typography>

                  <RadioGroup
                    name="willAttend"
                    value={parentGuest.willAttend}
                    onChange={handleParentChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={
                        <Radio
                          sx={{
                            color: PALETTE.champagneGold,
                            '&.Mui-checked': { color: PALETTE.sageGreen },
                          }}
                        />
                      }
                      label="Yes, I will attend"
                      sx={{ color: PALETTE.textPrimary }}
                    />
                    <FormControlLabel
                      value="No"
                      control={
                        <Radio
                          sx={{
                            color: PALETTE.champagneGold,
                            '&.Mui-checked': { color: PALETTE.sageGreen },
                          }}
                        />
                      }
                      label="No, I won't be able to attend"
                      sx={{ color: PALETTE.textPrimary }}
                    />
                  </RadioGroup>

                  {errors.willAttend && (
                    <Typography variant="caption" color="error">
                      {errors.willAttend}
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </Paper>

            {/* ==================================================
                ADDITIONAL GUESTS
            ================================================== */}
            {parentGuest.willAttend === 'Yes' && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3.5,
                  p: { xs: 3, sm: 4 },
                  backgroundColor: PALETTE.paperBg,
                  border: `1px solid ${PALETTE.borderGold}`,
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: PALETTE.textPrimary,
                    mb: 0.5,
                    fontSize: '1.6rem',
                  }}
                >
                  Additional Guest(s)
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: PALETTE.textSecondary,
                    mb: 3,
                    lineHeight: 1.6,
                    fontFamily: '"Montserrat", sans-serif',
                  }}
                >
                  If your invitation includes additional guests, please add their information below.
                </Typography>

                {additionalGuests.length === 0 && (
                  <Box
                    sx={{
                      py: 3.5,
                      px: 2,
                      mb: 2,
                      textAlign: 'center',
                      border: `1px dashed ${PALETTE.champagneGold}`,
                      borderRadius: 2,
                      backgroundColor: PALETTE.champagneLight,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: PALETTE.textSecondary, fontStyle: 'italic' }}
                    >
                      No additional guests added yet.
                    </Typography>
                  </Box>
                )}

                {/* Guest Cards */}
                <Stack spacing={2.5}>
                  {additionalGuests.map((guest, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: { xs: 2.5, sm: 3 },
                        border: `1px solid ${PALETTE.borderGold}`,
                        borderRadius: 2,
                        backgroundColor: '#FCFCFB',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontWeight: 700,
                            color: PALETTE.textPrimary,
                            fontSize: '1.25rem',
                          }}
                        >
                          Guest {index + 1}
                        </Typography>

                        <IconButton
                          onClick={() => removeAdditionalGuest(index)}
                          aria-label={`Remove guest ${index + 1}`}
                          sx={{
                            color: PALETTE.burgundy,
                            '&:hover': {
                              backgroundColor: 'rgba(107, 45, 62, 0.08)',
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>

                      <Stack spacing={2}>
                        {/* Title */}
                        <FormControl
                          fullWidth
                          error={Boolean(errors[`guest_${index}_title`])}
                          sx={fieldSx}
                        >
                          <InputLabel>Title</InputLabel>
                          <Select
                            name="title"
                            value={guest.title}
                            label="Title"
                            onChange={(event) => handleAdditionalGuestChange(index, event)}
                          >
                            {TITLE_OPTIONS.map((title) => (
                              <MenuItem key={title} value={title}>
                                {title}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`guest_${index}_title`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                              {errors[`guest_${index}_title`]}
                            </Typography>
                          )}
                        </FormControl>

                        {/* First Name */}
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={guest.firstName}
                          onChange={(event) => handleAdditionalGuestChange(index, event)}
                          error={Boolean(errors[`guest_${index}_firstName`])}
                          helperText={errors[`guest_${index}_firstName`]}
                          required
                          sx={fieldSx}
                        />

                        {/* Middle Name */}
                        <TextField
                          fullWidth
                          label="Middle Name"
                          name="middleName"
                          value={guest.middleName}
                          onChange={(event) => handleAdditionalGuestChange(index, event)}
                          helperText="Optional"
                          sx={fieldSx}
                        />

                        {/* Last Name */}
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={guest.lastName}
                          onChange={(event) => handleAdditionalGuestChange(index, event)}
                          error={Boolean(errors[`guest_${index}_lastName`])}
                          helperText={errors[`guest_${index}_lastName`]}
                          required
                          sx={fieldSx}
                        />

                        {/* Age */}
                        <TextField
                          fullWidth
                          label="Age"
                          name="age"
                          type="number"
                          value={guest.age}
                          onChange={(event) => handleAdditionalGuestChange(index, event)}
                          error={Boolean(errors[`guest_${index}_age`])}
                          helperText={errors[`guest_${index}_age`]}
                          inputProps={{ min: 15, max: 100 }}
                          required
                          sx={fieldSx}
                        />

                        {/* Role */}
                        <FormControl
                          fullWidth
                          error={Boolean(errors[`guest_${index}_roleOnWedding`])}
                          sx={fieldSx}
                        >
                          <InputLabel>Role on the Wedding</InputLabel>
                          <Select
                            name="roleOnWedding"
                            value={guest.roleOnWedding}
                            label="Role on the Wedding"
                            onChange={(event) => handleAdditionalGuestChange(index, event)}
                          >
                            {ROLE_OPTIONS.map((role) => (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`guest_${index}_roleOnWedding`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                              {errors[`guest_${index}_roleOnWedding`]}
                            </Typography>
                          )}
                        </FormControl>

                        {/* Connected To */}
                        <FormControl
                          fullWidth
                          error={Boolean(errors[`guest_${index}_connectedTo`])}
                          sx={fieldSx}
                        >
                          <InputLabel>Who are you connected to?</InputLabel>
                          <Select
                            name="connectedTo"
                            value={guest.connectedTo}
                            label="Who are you connected to?"
                            onChange={(event) => handleAdditionalGuestChange(index, event)}
                          >
                            {CONNECTED_TO_OPTIONS.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`guest_${index}_connectedTo`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                              {errors[`guest_${index}_connectedTo`]}
                            </Typography>
                          )}
                        </FormControl>

                        {/* Relationship */}
                        <FormControl
                          fullWidth
                          error={Boolean(errors[`guest_${index}_relationship`])}
                          sx={fieldSx}
                        >
                          <InputLabel>Relationship</InputLabel>
                          <Select
                            name="relationship"
                            value={guest.relationship}
                            label="Relationship"
                            onChange={(event) => handleAdditionalGuestChange(index, event)}
                          >
                            {RELATIONSHIP_OPTIONS.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`guest_${index}_relationship`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                              {errors[`guest_${index}_relationship`]}
                            </Typography>
                          )}
                        </FormControl>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>

                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={addAdditionalGuest}
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    color: PALETTE.sageGreen,
                    borderColor: PALETTE.sageGreen,
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.825rem',
                    '&:hover': {
                      borderColor: PALETTE.sageHover,
                      backgroundColor: 'rgba(114, 134, 110, 0.08)',
                    },
                  }}
                >
                  Add Guest
                </Button>
              </Paper>
            )}

            {/* ==================================================
                MESSAGE
            ================================================== */}
            <Paper
              elevation={0}
              sx={{
                mt: 3.5,
                p: { xs: 3, sm: 4 },
                backgroundColor: PALETTE.paperBg,
                border: `1px solid ${PALETTE.borderGold}`,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                  color: PALETTE.textPrimary,
                  mb: 0.5,
                  fontSize: '1.6rem',
                }}
              >
                Message for the Bride & Groom
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: PALETTE.textSecondary,
                  mb: 2.5,
                  lineHeight: 1.6,
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Leave us a message, greeting, or well wishes.
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={4}
                name="message"
                value={parentGuest.message}
                onChange={handleParentChange}
                placeholder="Write your message here..."
                sx={fieldSx}
              />
            </Paper>

            {/* ==================================================
                SUBMIT
            ================================================== */}
            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: { sm: 260 },
                  py: 1.6,
                  px: 5,
                  backgroundColor: PALETTE.sageGreen,
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(114, 134, 110, 0.35)',
                  '&:hover': {
                    backgroundColor: PALETTE.sageHover,
                    boxShadow: '0 6px 18px rgba(114, 134, 110, 0.45)',
                  },
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={22} color="inherit" sx={{ mr: 1.5 }} />
                    Submitting...
                  </>
                ) : (
                  'Submit RSVP'
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}