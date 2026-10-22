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
  TableSortLabel,
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
  Stack,
  Button
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  People,
  CheckCircle,
  Cancel,
  AssignmentTurnedIn,
  BarChart as BarChartIcon,
  FileDownload,
  PictureAsPdf
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  // Sorting state
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');

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

  // Sort Handler
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Compute Sorted List for UI
  const sortedRsvpList = useMemo(() => {
    return [...rsvpList].sort((a, b) => {
      let valueA = a[orderBy] ?? '';
      let valueB = b[orderBy] ?? '';

      if (orderBy === 'name') {
        valueA = `${a.firstName || ''} ${a.lastName || ''}`.trim().toLowerCase();
        valueB = `${b.firstName || ''} ${b.lastName || ''}`.trim().toLowerCase();
      } else if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [rsvpList, order, orderBy]);

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

  // Compute Dynamic Chart Data
  const chartData = useMemo(() => {
    const counts = {};

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

  // Excel Export Handler
  const handleExportExcel = () => {
    const exportRows = [];

    sortedRsvpList.forEach((primary) => {
      exportRows.push({
        'Guest Type': 'Primary Guest',
        'Full Name': `${primary.title || ''} ${primary.firstName || ''} ${primary.middleName || ''} ${primary.lastName || ''}`.trim(),
        'Age': primary.age || '—',
        'Contact Number': primary.contactNumber || '—',
        'Role': primary.roleOnWedding || '—',
        'Connection': primary.connectedTo || '—',
        'Relationship': primary.relationship || '—',
        'Attending Status': primary.willAttend === 'Yes' ? 'Attending' : 'Declined',
        'Party Size': primary.willAttend === 'Yes' ? primary.partyCount : 0,
        'Message': primary.message || '—',
      });

      if (primary.willAttend === 'Yes' && Array.isArray(primary.additionalGuests)) {
        primary.additionalGuests.forEach((sub) => {
          exportRows.push({
            'Guest Type': '  └─ Accompanying',
            'Full Name': `${sub.title || ''} ${sub.firstName || ''} ${sub.middleName || ''} ${sub.lastName || ''}`.trim(),
            'Age': sub.age || '—',
            'Contact Number': '—',
            'Role': sub.roleOnWedding || '—',
            'Connection': sub.connectedTo || '—',
            'Relationship': sub.relationship || '—',
            'Attending Status': 'Attending',
            'Party Size': '—',
            'Message': '—',
          });
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    worksheet['!cols'] = [
      { wch: 20 },
      { wch: 28 },
      { wch: 8 },
      { wch: 16 },
      { wch: 22 },
      { wch: 14 },
      { wch: 16 },
      { wch: 16 },
      { wch: 12 },
      { wch: 30 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP Guests List');
    XLSX.writeFile(workbook, `Wedding_RSVP_Summary_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // PDF Export Handler (Attending Guests Reception Sheet)
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // 1. Collect ONLY attending guests (Primary + Sub-guests)
    const attendingList = [];

    rsvpList.forEach((primary) => {
      if (primary.willAttend === 'Yes') {
        const primaryFullName = `${primary.title || ''} ${primary.firstName || ''} ${primary.middleName || ''} ${primary.lastName || ''}`.trim();
        attendingList.push({
          fullName: primaryFullName,
          role: primary.roleOnWedding || '—',
          connection: primary.connectedTo || '—',
          relationship: primary.relationship || '—',
        });

        if (Array.isArray(primary.additionalGuests)) {
          primary.additionalGuests.forEach((sub) => {
            const subFullName = `${sub.title || ''} ${sub.firstName || ''} ${sub.middleName || ''} ${sub.lastName || ''}`.trim();
            attendingList.push({
              fullName: subFullName,
              role: sub.roleOnWedding || '—',
              connection: sub.connectedTo || '—',
              relationship: sub.relationship || '—',
            });
          });
        }
      }
    });

    // 2. Sort ALL attending guests alphabetically by Full Name (A-Z)
    attendingList.sort((a, b) => a.fullName.localeCompare(b.fullName));

    // 3. Document Title Header
    doc.setFontSize(18);
    doc.setTextColor(107, 29, 47); // Wine Red
    doc.text('Reception Guest Check-In List', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Total Attending Guests: ${attendingList.length} | Generated: ${new Date().toLocaleDateString()}`, 14, 27);

    // 4. PDF Table Setup
    const tableHeaders = [['No.', 'Full Name', 'Role', 'Connection', 'Relationship']];
    const tableData = attendingList.map((guest, index) => [
      index + 1,
      guest.fullName,
      guest.role,
      guest.connection,
      guest.relationship,
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableData,
      startY: 32,
      theme: 'grid',
      headStyles: {
        fillColor: [107, 29, 47],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'left',
      },
      alternateRowStyles: {
        fillColor: [250, 247, 242],
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: [44, 62, 53],
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' }, // No.
        1: { cellWidth: 60 },                  // Full Name
        2: { cellWidth: 45 },                  // Role
        3: { cellWidth: 32 },                  // Connection
        4: { cellWidth: 35 },                  // Relationship
      },
    });

    doc.save(`Reception_Guest_CheckIn_List_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

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
            {/* KPI STATS TILES (CENTERED & EQUAL WIDTH) */}
            <Grid 
              container 
              spacing={3} 
              justifyContent="center" 
              alignItems="stretch"
              sx={{ width: '100%', m: 0 }}
            >
              <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexGrow: 1 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    border: '1px solid rgba(107, 29, 47, 0.15)', 
                    borderRadius: 3, 
                    bgcolor: 'background.paper', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <CardContent sx={{ p: '16px !important', width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AssignmentTurnedIn sx={{ fontSize: 40, color: 'primary.main', flexShrink: 0 }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Submissions" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>{stats.totalSubmissions}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexGrow: 1 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    border: '1px solid rgba(107, 29, 47, 0.15)', 
                    borderRadius: 3, 
                    bgcolor: 'background.paper', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <CardContent sx={{ p: '16px !important', width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <People sx={{ fontSize: 40, color: 'primary.main', flexShrink: 0 }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Confirmed Guests" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>{stats.totalPartyCount}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexGrow: 1 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    border: '1px solid rgba(107, 29, 47, 0.15)', 
                    borderRadius: 3, 
                    bgcolor: 'background.paper', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <CardContent sx={{ p: '16px !important', width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CheckCircle sx={{ fontSize: 40, color: '#5E7A65', flexShrink: 0 }} />
                      <Box>
                        <Text variant="caption" sx={{ color: 'text.secondary', display: 'block' }} textKey="Attending Parties" />
                        <Text variant="h5" sx={{ fontWeight: 700, color: '#5E7A65' }}>{stats.attendingSubmissions}</Text>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexGrow: 1 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    border: '1px solid rgba(107, 29, 47, 0.15)', 
                    borderRadius: 3, 
                    bgcolor: 'background.paper', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <CardContent sx={{ p: '16px !important', width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Cancel sx={{ fontSize: 40, color: 'secondary.main', flexShrink: 0 }} />
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

            {/* TREE STRUCTURE GUEST TABLE WITH SORTING & EXPORT BUTTONS */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                border: '1px solid rgba(107, 29, 47, 0.15)',
                borderRadius: 3,
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 2, px: 1 }}>
                <Text
                  variant="h5"
                  sx={{ color: 'secondary.main', fontSize: '1.4rem', display: 'block' }}
                  textKey="All Submissions (Guest List)"
                />

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdf />}
                    onClick={handleExportPDF}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'uppercase',
                      fontSize: '0.825rem',
                      px: 2,
                      '&:hover': {
                        borderColor: 'secondary.main',
                        bgcolor: 'rgba(107, 29, 47, 0.04)',
                      },
                    }}
                  >
                    Export PDF
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<FileDownload />}
                    onClick={handleExportExcel}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'uppercase',
                      fontSize: '0.825rem',
                      px: 2.5,
                      '&:hover': {
                        bgcolor: 'secondary.main',
                      },
                    }}
                  >
                    Export Excel
                  </Button>
                </Stack>
              </Stack>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(107, 29, 47, 0.15)', borderRadius: 2 }}>
                <Table aria-label="collapsible rsvp tree table">
                  <TableHead sx={{ bgcolor: 'rgba(107, 29, 47, 0.05)' }}>
                    <TableRow>
                      <TableCell />
                      
                      {/* Sortable: Primary Guest Name */}
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'name'}
                          direction={orderBy === 'name' ? order : 'asc'}
                          onClick={() => handleRequestSort('name')}
                        >
                          Primary Guest
                        </TableSortLabel>
                      </TableCell>

                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Contact</TableCell>

                      {/* Sortable: Role */}
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'roleOnWedding'}
                          direction={orderBy === 'roleOnWedding' ? order : 'asc'}
                          onClick={() => handleRequestSort('roleOnWedding')}
                        >
                          Role
                        </TableSortLabel>
                      </TableCell>

                      {/* Sortable: Connection */}
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'connectedTo'}
                          direction={orderBy === 'connectedTo' ? order : 'asc'}
                          onClick={() => handleRequestSort('connectedTo')}
                        >
                          Connection
                        </TableSortLabel>
                      </TableCell>

                      {/* Sortable: Relationship */}
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'relationship'}
                          direction={orderBy === 'relationship' ? order : 'asc'}
                          onClick={() => handleRequestSort('relationship')}
                        >
                          Relationship
                        </TableSortLabel>
                      </TableCell>

                      {/* Sortable: Attendance Status */}
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'willAttend'}
                          direction={orderBy === 'willAttend' ? order : 'asc'}
                          onClick={() => handleRequestSort('willAttend')}
                        >
                          Status
                        </TableSortLabel>
                      </TableCell>

                      {/* Sortable: Party Size */}
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        <TableSortLabel
                          active={orderBy === 'partyCount'}
                          direction={orderBy === 'partyCount' ? order : 'asc'}
                          onClick={() => handleRequestSort('partyCount')}
                        >
                          Party Size
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRsvpList.length > 0 ? (
                      sortedRsvpList.map((row) => <GuestRow key={row._id} row={row} />)
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