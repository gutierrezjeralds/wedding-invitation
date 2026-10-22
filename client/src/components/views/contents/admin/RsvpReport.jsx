import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  People,
  CheckCircle,
  Cancel,
  AssignmentTurnedIn,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Text, PageTitle } from '../../utils/CustomComponents';

const CHART_METRICS = [
  { id: 'attendance', label: 'Attendance Status' },
  { id: 'role', label: 'Role Breakdown (All Guests)' },
  { id: 'connection', label: 'Connection (Groom vs Bride)' },
  { id: 'relationship', label: 'Relationship Type' },
];

const COLORS = ['#6B1D2F', '#8F3948', '#3B2F2F', '#D4AF37', '#5E7A65', '#8C857B'];

// ============================================================
// Collapsible Row Sub-Component
// ============================================================
function GuestRow({ row }) {
  const [open, setOpen] = useState(false);
  const hasSubGuests = row.additionalGuests && row.additionalGuests.length > 0;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          bgcolor: open ? 'rgba(107, 29, 47, 0.03)' : 'inherit',
          transition: 'background-color 0.2s ease',
        }}
      >
        <TableCell width="50px">
          {hasSubGuests && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={{ color: 'primary.main' }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
          {row.title} {row.firstName} {row.middleName} {row.lastName}
        </TableCell>
        <TableCell>{row.contactNumber || '—'}</TableCell>
        <TableCell>{row.roleOnWedding || '—'}</TableCell>
        <TableCell>{row.connectedTo || '—'}</TableCell>
        <TableCell>{row.relationship || '—'}</TableCell>
        <TableCell align="center">
          <Chip
            label={row.willAttend === 'Yes' ? 'Attending' : 'Declined'}
            size="small"
            sx={{
              bgcolor: row.willAttend === 'Yes' ? 'rgba(107, 29, 47, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              color: row.willAttend === 'Yes' ? 'primary.main' : 'text.secondary',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          />
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: 700 }}>
          {row.willAttend === 'Yes' ? row.partyCount : 0}
        </TableCell>
      </TableRow>

      {/* Sub-Guests Tree Collapse */}
      {hasSubGuests && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2, ml: 6 }}>
                <Text
                  variant="h6"
                  sx={{ color: 'secondary.main', mb: 1.5, fontSize: '1rem', display: 'block' }}
                  textKey={`Accompanying Guests (${row.additionalGuests.length})`}
                />
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 2 }}>
                  <Table size="small" aria-label="additional guests">
                    <TableHead sx={{ bgcolor: 'rgba(107, 29, 47, 0.05)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Connection</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Relationship</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.additionalGuests.map((subGuest) => (
                        <TableRow key={subGuest._id || subGuest.firstName}>
                          <TableCell>
                            {subGuest.title} {subGuest.firstName} {subGuest.middleName} {subGuest.lastName}
                          </TableCell>
                          <TableCell>{subGuest.age}</TableCell>
                          <TableCell>{subGuest.roleOnWedding || '—'}</TableCell>
                          <TableCell>{subGuest.connectedTo || '—'}</TableCell>
                          <TableCell>{subGuest.relationship || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

// ============================================================
// Main RSVP Report Component
// ============================================================
export default function RsvpReport() {
  const [rsvpList, setRsvpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChartMetric, setSelectedChartMetric] = useState('attendance');

  useEffect(() => {
    fetch('/api/rsvp')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRsvpList(data.data);
        }
      })
      .catch((err) => console.error('Error fetching RSVP records:', err))
      .finally(() => setLoading(false));
  }, []);

  // Compute Metrics & Aggregations
  const stats = useMemo(() => {
    let totalSubmissions = rsvpList.length;
    let totalPartyCount = 0;
    let attendingSubmissions = 0;
    let declinedSubmissions = 0;

    rsvpList.forEach((item) => {
      if (item.willAttend === 'Yes') {
        attendingSubmissions += 1;
        totalPartyCount += item.partyCount || 1;
      } else {
        declinedSubmissions += 1;
      }
    });

    return { totalSubmissions, totalPartyCount, attendingSubmissions, declinedSubmissions };
  }, [rsvpList]);

  // Compute Dynamic Chart Data Based on Selected Category Dropdown
  const chartData = useMemo(() => {
    const counts = {};

    // Gather all individual guests (Primary + Sub-guests)
    const allGuests = [];
    rsvpList.forEach((primary) => {
      allGuests.push({ ...primary, isPrimary: true });
      if (primary.willAttend === 'Yes' && Array.isArray(primary.additionalGuests)) {
        primary.additionalGuests.forEach((sub) => {
          allGuests.push({ ...sub, willAttend: 'Yes', isPrimary: false });
        });
      }
    });

    if (selectedChartMetric === 'attendance') {
      counts['Attending Party'] = stats.totalPartyCount;
      counts['Declined Submissions'] = stats.declinedSubmissions;
    } else if (selectedChartMetric === 'role') {
      allGuests.forEach((g) => {
        const key = g.roleOnWedding || 'Unspecified';
        counts[key] = (counts[key] || 0) + 1;
      });
    } else if (selectedChartMetric === 'connection') {
      allGuests.forEach((g) => {
        const key = g.connectedTo || 'Unspecified';
        counts[key] = (counts[key] || 0) + 1;
      });
    } else if (selectedChartMetric === 'relationship') {
      allGuests.forEach((g) => {
        const key = g.relationship || 'Unspecified';
        counts[key] = (counts[key] || 0) + 1;
      });
    }

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [rsvpList, selectedChartMetric, stats]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg" className="py-5">
        <PageTitle
          title="RSVP Summary Report"
          subtitle="Real-time attendance metrics, guest list tree structure, and analytics breakdowns."
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        ) : (
          <Stack spacing={4}>
            {/* KPI STATS TILES */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 3, bgcolor: 'background.paper' }}>
                  <CardContent sx={{ p: '16px !important' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AssignmentTurnedIn sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Submissions" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>{stats.totalSubmissions}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 3, bgcolor: 'background.paper' }}>
                  <CardContent sx={{ p: '16px !important' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <People sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Confirmed Guests" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>{stats.totalPartyCount}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 3, bgcolor: 'background.paper' }}>
                  <CardContent sx={{ p: '16px !important' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CheckCircle sx={{ fontSize: 40, color: '#5E7A65' }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Attending Parties" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: '#5E7A65' }}>{stats.attendingSubmissions}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 3, bgcolor: 'background.paper' }}>
                  <CardContent sx={{ p: '16px !important' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Cancel sx={{ fontSize: 40, color: 'secondary.main' }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Declined Parties" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>{stats.declinedSubmissions}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* DYNAMIC METRIC ANALYTICS GRAPH */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                bgcolor: 'background.paper',
                border: '1px solid rgba(107, 29, 47, 0.15)',
                borderRadius: 3,
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <BarChartIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                  <Text variant="h5" sx={{ color: 'secondary.main', fontSize: '1.4rem' }} textKey="Visual Analytics" />
                </Stack>

                {/* Dropdown Category Filter */}
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="chart-metric-label">Select Metric</InputLabel>
                  <Select
                    labelId="chart-metric-label"
                    value={selectedChartMetric}
                    label="Select Metric"
                    onChange={(e) => setSelectedChartMetric(e.target.value)}
                  >
                    {CHART_METRICS.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Chart Visualization Container */}
              <Box sx={{ width: '100%', height: 320, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <XAxis dataKey="name" stroke="#3B2F2F" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} stroke="#3B2F2F" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(107, 29, 47, 0.2)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* TREE STRUCTURE GUEST TABLE */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                border: '1px solid rgba(107, 29, 47, 0.15)',
                borderRadius: 3,
              }}
            >
              <Text
                variant="h5"
                sx={{ color: 'secondary.main', mb: 2, fontSize: '1.4rem', px: 1, display: 'block' }}
                textKey="All Submissions (Guest Tree List)"
              />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 2 }}>
                <Table aria-label="collapsible rsvp tree table">
                  <TableHead sx={{ bgcolor: 'rgba(107, 29, 47, 0.05)' }}>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Primary Guest</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Contact</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Connection</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Relationship</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>Party Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rsvpList.length > 0 ? (
                      rsvpList.map((row) => <GuestRow key={row._id} row={row} />)
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                          No RSVP submissions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        )}
      </Container>
    </Box>
  );
}