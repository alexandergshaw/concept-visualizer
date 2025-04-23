'use client';

import { useState, useMemo } from 'react';
import workflowsData from './data/UserAcceptanceWorkflows.json';
import {
  Box,
  Typography,
  Checkbox,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UATTest } from './UserAcceptanceTestCreator';

interface Props {
  workflows?: UATTest[];
}

export default function UserAcceptanceTestingCheckList({ workflows }: Props) {
  const activeWorkflows = useMemo(() => workflows ?? workflowsData.uatWorkflows, [workflows]);

  const [checked, setChecked] = useState<boolean[]>(Array(activeWorkflows.length).fill(false));
  const [notes, setNotes] = useState<string[]>(Array(activeWorkflows.length).fill(''));

  const handleToggle = (index: number) => {
    setChecked((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleNoteChange = (index: number, value: string) => {
    setNotes((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleExport = () => {
    const result = activeWorkflows.map((wf, index) => ({
      title: wf.title,
      category: wf.category,
      completed: checked[index] ? 'Yes' : 'No',
      note: notes[index]?.replace(/\n/g, ' '), // flatten multiline
    }));

    const headers = ['Title', 'Category', 'Completed', 'Notes'];
    const rows = result.map((row) =>
      [row.title, row.category, row.completed, `"${row.note?.replace(/"/g, '""')}"`].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'uat_results.csv';
    link.click();
  };

  return (
    <Stack spacing={2} sx={{ mt: 3, maxWidth: 900, mx: 'auto', width: '50%' }}>
      <Button variant="outlined" onClick={handleExport}>
        Export Results
      </Button>

      {activeWorkflows.map((wf, index) => (
        <Accordion key={wf.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox
                checked={checked[index]}
                onChange={() => handleToggle(index)}
              />
              <Typography fontWeight={600}>{wf.title}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" gutterBottom color="text.primary">
              Goal:
            </Typography>
            <Typography gutterBottom>{wf.goal}</Typography>

            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ mt: 2 }}>
              Steps:
            </Typography>
            <ol>
              {wf.steps.map((step, i) => (
                <li key={i}>
                  <Typography>{`${i + 1}. ${step}`}</Typography>
                </li>
              ))}
            </ol>

            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ mt: 2 }}>
              Expected Result:
            </Typography>
            <Typography gutterBottom>{wf.expectedResult}</Typography>

            <Typography variant="subtitle2" gutterBottom color="text.primary" sx={{ mt: 2 }}>
              Notes:
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={notes[index]}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder="Enter observations or feedback here..."
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
