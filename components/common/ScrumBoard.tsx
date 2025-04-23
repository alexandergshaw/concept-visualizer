'use client';

import { Box, Typography, Paper, Stack, Grid, Chip } from '@mui/material';

interface UserStory {
  id: number;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  status: string;
}

interface ScrumBoardProps {
  userStories: UserStory[];
  visibleColumn?: 'To Do' | 'In Progress' | 'Done';
  showColumnHeaders?: boolean;
  scrumBoardLabel?: string;
  className?: string;
}

const allColumns: ('To Do' | 'In Progress' | 'Done')[] = ['To Do', 'In Progress', 'Done'];

export default function ScrumBoard(props: ScrumBoardProps) {
  const columns = props.visibleColumn ? [props.visibleColumn] : allColumns;

  return (
    <Box className={props.className} sx={{ p: 4, height: '100%' }}>
      {props.scrumBoardLabel && (
        <Typography variant="h5" gutterBottom>
          {props.scrumBoardLabel}
        </Typography>
      )}

      <Grid container spacing={2}>
        {columns.map((column) => (
          <Box
            key={column}
            sx={{
              width: '100%',
              flexBasis: props.visibleColumn ? '100%' : {
                xs: '100%',
                md: '33.333%',
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {props.showColumnHeaders && (
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {column}
                </Typography>
              )}

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {props.userStories
                  .filter((story) => story.status === column)
                  .map((story) => (
                    <Paper
                      key={story.id}
                      elevation={1}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        '&:hover': {
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {story.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '13px' }}>
                        As a <strong>{story.asA}</strong>, I want <strong>{story.iWant}</strong>, so that <strong>{story.soThat}</strong>.
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip size="small" label={`User Story #${story.id}`} color="default" />
                      </Box>
                    </Paper>
                  ))}
              </Stack>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
