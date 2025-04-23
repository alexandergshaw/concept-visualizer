'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function CodePreview({ title, code }: { title?: string; code: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box
      sx={{
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        p: 2,
        position: 'relative',
        overflowX: 'auto',
        mt: 3,
      }}
      className="js-code-preview"
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
          <IconButton onClick={handleCopy} size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {code.map((line, idx) =>
        line.includes('//') ? (
          <Box key={idx}>
            <Box component="span"><code>{line.split('//')[0]}</code></Box>
            <Box component="span" sx={{ color: '#999' }}>
              <code>{'//' + line.split('//')[1]}</code>
            </Box>
          </Box>
        ) : (
          <Box key={idx}><code>{line}</code></Box>
        )
      )}
    </Box>
  );
}
