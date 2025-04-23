'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  IconButton,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

type Priority = 'Low' | 'Medium' | 'High';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
  editing: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), done: false, priority, editing: false }
    ]);
    setInput('');
    setPriority('Medium');
  };

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleEditToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    );
  };

  const handleTextChange = (id: number, value: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: value } : todo
      )
    );
  };

  const handleFilterChange = (_: unknown, value: 'all' | 'active' | 'completed') => {
    if (value) setFilter(value);
  };

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.done));
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  return (
    <Paper elevation={3} sx={{ maxWidth: "100%", mx: 'auto', mt: 5, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>To-Do List</Typography>

      {/* Input Area */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Box sx={{ flex: 1, minWidth: "50%" }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task"
            fullWidth
            size="small"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
        </Box>
        <Box sx={{ minWidth: 140 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 100 }}>
          <Button fullWidth variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Grid>

      {/* Filter + Clear */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Button color="secondary" onClick={handleClearCompleted}>
            Clear Completed
          </Button>
        </Box>
      </Grid>

      <Divider sx={{ mb: 2 }} />

      {/* Todo List */}
      <Stack spacing={1}>
        {visibleTodos.map(todo => (
          <Paper
            key={todo.id}
            sx={{
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 2
            }}
          >
            <Checkbox
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
              sx={{ alignSelf: 'center' }}
            />
            <Box sx={{ flexGrow: 1, minWidth: '200px' }}>
              {todo.editing ? (
                <TextField
                  value={todo.text}
                  onChange={(e) => handleTextChange(todo.id, e.target.value)}
                  fullWidth
                  size="small"
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: todo.done ? 'line-through' : 'none',
                    color: todo.done ? 'text.disabled' : 'text.primary',
                    wordBreak: 'break-word'
                  }}
                >
                  {todo.text}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                Priority: {todo.priority}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => handleEditToggle(todo.id)}>
                {todo.editing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
              <IconButton onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
        {todos.filter(t => !t.done).length} task(s) remaining
      </Typography>
    </Paper>
  );
}
