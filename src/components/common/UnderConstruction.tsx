'use client';

import React from 'react';
import { Alert, Typography, Box } from '@mui/material';

export default function UnderConstruction() {
  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: '80px auto',
        textAlign: 'center',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Page Under Construction
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This section is still being developed. I (Alex) maintain this visualizer on my own
        to support student learning across multiple programming courses.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        This is not a commercial product — it is a teaching tool that I am expanding gradually, focusing
        on 1 to 2 classes at a time and improving it based on student feedback.
      </Typography>
      <Alert severity="info">
        If you are a student and want to help improve this project,{' '}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSf73dDuwy0mZUuApiG2kEGlcCp93pN-l1eOtFOTBA2BTf0Bqw/viewform?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          submit feedback here
        </a>
        .
      </Alert>
    </Box>
  );
}
