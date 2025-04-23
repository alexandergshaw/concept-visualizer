'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

export interface UATTest {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  expectedResult: string;
  category: string;
}

interface Props {
  onTestsChange?: (tests: UATTest[]) => void;
}

const initialTest: UATTest = {
  id: crypto.randomUUID(),
  title: 'Add Task to List',
  goal: 'Verify that a user can add a new task to their to-do list.',
  steps: [
    'Open the app',
    'Click the "Add Task" button',
    'Enter task description: "Buy groceries"',
    'Click "Submit" or press Enter',
  ],
  expectedResult: 'The task "Buy groceries" appears in the list of tasks.',
  category: 'Core',
};

export default function UserAcceptanceTestCreator({ onTestsChange }: Props) {
  const [tests, setTests] = useState<UATTest[]>([initialTest]);
  const [stepsInput, setStepsInput] = useState('');
  const [form, setForm] = useState<Omit<UATTest, 'steps' | 'id'>>({
    title: '',
    goal: '',
    expectedResult: '',
    category: 'Core',
  });

  const [showError, setShowError] = useState(false);

  const handleFieldChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTest = () => {
    const parsedSteps = stepsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const isIncomplete =
      !form.title || !form.goal || !parsedSteps.length || !form.expectedResult;

    if (isIncomplete) {
      setShowError(true);
      return;
    }

    const newTest: UATTest = {
      ...form,
      steps: parsedSteps,
      id: crypto.randomUUID(),
    };

    const updated = [...tests, newTest];
    setTests(updated);
    onTestsChange?.(updated);

    setForm({
      title: '',
      goal: '',
      expectedResult: '',
      category: 'Core',
    });
    setStepsInput('');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', width: '50%' }}>
      <Typography variant="h5" gutterBottom>
        Create UAT Tests
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          fullWidth
        />
        <TextField
          label="Goal"
          value={form.goal}
          onChange={(e) => handleFieldChange('goal', e.target.value)}
          fullWidth
        />
        <TextField
          label="Steps (one per line)"
          value={stepsInput}
          onChange={(e) => setStepsInput(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Expected Result"
          value={form.expectedResult}
          onChange={(e) => handleFieldChange('expectedResult', e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddTest}>
          Add Test
        </Button>
      </Stack>

      {tests.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Test Cases
          </Typography>
          <Stack spacing={2}>
            {tests.map((test) => (
              <Paper key={test.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight="bold">{test.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Goal: {test.goal}
                </Typography>
                <Typography variant="body2">Steps:</Typography>
                <ul>
                  {test.steps.map((step, i) => (
                    <li key={i}>
                      <Typography variant="body2">{step}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="body2">Expected Result: {test.expectedResult}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {/* Error Toast */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="warning" sx={{ width: '100%' }}>
          Please complete all fields before adding a test.
        </Alert>
      </Snackbar>
    </Box>
  );
}
