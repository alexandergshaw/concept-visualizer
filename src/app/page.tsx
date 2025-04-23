'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
  Paper,
} from '@mui/material';

const languages = [
  { name: 'JavaScript', type: 'Frontend', skill: 'Intermediate' },
  { name: 'Python', type: 'Backend', skill: 'Beginner' },
  { name: 'TypeScript', type: 'Frontend', skill: 'Advanced' },
  { name: 'SQL', type: 'Database', skill: 'Intermediate' },
  { name: 'PHP', type: 'Backend', skill: 'Beginner' },
  { name: 'HTML', type: 'Frontend', skill: 'Beginner' },
];

const typeFilters = ['Frontend', 'Backend', 'Database'];

export default function LandingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleFilter = (filter: string, list: string[], setList: (val: string[]) => void) => {
    setList(list.includes(filter) ? list.filter((item) => item !== filter) : [...list, filter]);
  };

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(lang.type);
    const matchesSkill = selectedSkills.length === 0 || selectedSkills.includes(lang.skill);
    return matchesSearch && matchesType && matchesSkill;
  });

  const handleClick = (language: string) => {
    router.push(`/languages/${language.toLowerCase()}`);
  };

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: 1000, mx: 'auto', textAlign: 'center', backgroundColor: '#f7fafd' }}>
      <Typography variant="h4" fontWeight="medium" gutterBottom>
        Coding Languages Visualizer
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        A clean way to explore how different languages handle data structures.
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search languages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ maxWidth: 360, mb: 3, backgroundColor: 'white', borderRadius: 1 }}
      />

      <Box mb={2}>
        {typeFilters.map((type) => (
          <Chip
            key={type}
            label={type}
            onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
            variant={selectedTypes.includes(type) ? 'filled' : 'outlined'}
            color="primary"
            sx={{
              m: 0.5,
              bgcolor: selectedTypes.includes(type) ? '#0077b6' : 'transparent',
              color: selectedTypes.includes(type) ? 'white' : 'inherit',
              borderRadius: '999px',
              px: 1.5,
              fontSize: '0.8rem',
              borderColor: '#0077b6',
            }}
          />
        ))}
      </Box>

      <Grid container justifyContent="center">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
          }}
        >
          {filteredLanguages.map((lang) => (
            <Box
              key={lang.name}
              sx={{
                width: { xs: '100%', sm: '45%', md: '28%' },
              }}
            >
              <Paper
                onClick={() => handleClick(lang.name)}
                sx={{
                  p: 2,
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#ffffff',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  '&:hover': {
                    borderColor: '#0077b6',
                    backgroundColor: '#f1fbff',
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 0.5 }}>
                  {lang.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {lang.type} • {lang.skill}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Grid>
    </Box>
  );
}
