'use client';

import { Box } from '@mui/material';

export interface PhoneFrameProps { 
    children: React.ReactNode
    className?: string
}

export default function PhoneFrame(props: PhoneFrameProps) {
  return (
    <Box
      sx={{
        width: '300px',
        height: '600px',
        borderRadius: '36px',
        border: '8px solid #333',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      {/* Camera notch */}
      <Box
        sx={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '24px',
          backgroundColor: '#111',
          borderRadius: '12px',
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          borderRadius: '28px',
          padding: '16px',
          overflowY: 'auto',
          zIndex: 1,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
