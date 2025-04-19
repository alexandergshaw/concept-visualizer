'use client';

import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/array.css';

const OPERATIONS = [
  'push',
  'pop',
  'unshift',
  'splice',
  'slice',
  'indexOf',
  'lastIndexOf',
  'includes',
  'update',
];

export default function ArrayConcept({
  onCodeChange,
}: {
  onCodeChange?: (code: string) => void;
}) {
  const [rawInput, setRawInput] = useState('1, 2, 3');
  const [arr, setArr] = useState<number[]>([1, 2, 3]);
  const [operation, setOperation] = useState('push');
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  // Live-parse and apply array from raw input
  useEffect(() => {
    const parsed = rawInput
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    setArr(parsed);
    onCodeChange?.(`let array = [${parsed.join(', ')}];`);
  }, [rawInput]);

  const resetOutput = () => setOutput(null);

  const runOperation = () => {
    resetOutput();

    const numInput = parseInt(inputValue);
    const numIndex = parseInt(indexValue);
    const original = [...arr];
    let copy = [...arr];

    switch (operation) {
      case 'push':
        if (!isNaN(numInput)) {
          copy.push(numInput);
          setArr(copy);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.push(${numInput});`);
        }
        break;

      case 'pop':
        copy.pop();
        setArr(copy);
        onCodeChange?.(`let array = [${original.join(', ')}];\narray.pop();`);
        break;

      case 'unshift':
        if (!isNaN(numInput)) {
          copy = [numInput, ...copy];
          setArr(copy);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.unshift(${numInput});`);
        }
        break;

      case 'splice':
        if (!isNaN(numIndex) && !isNaN(numInput)) {
          copy.splice(numIndex, 0, numInput);
          setArr(copy);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.splice(${numIndex}, 0, ${numInput});`);
        }
        break;

      case 'slice':
        if (!isNaN(numIndex)) {
          const sliced = copy.slice(0, numIndex);
          setOutput(`Sliced: [${sliced.join(', ')}]`);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.slice(0, ${numIndex});`);
        }
        break;

      case 'indexOf':
        if (!isNaN(numInput)) {
          const idx = copy.indexOf(numInput);
          setOutput(`indexOf(${numInput}) → ${idx}`);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.indexOf(${numInput});`);
        }
        break;

      case 'lastIndexOf':
        if (!isNaN(numInput)) {
          const idx = copy.lastIndexOf(numInput);
          setOutput(`lastIndexOf(${numInput}) → ${idx}`);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.lastIndexOf(${numInput});`);
        }
        break;

      case 'includes':
        if (!isNaN(numInput)) {
          const exists = copy.includes(numInput);
          setOutput(`includes(${numInput}) → ${exists}`);
          onCodeChange?.(`let array = [${original.join(', ')}];\narray.includes(${numInput});`);
        }
        break;

      case 'update':
        if (!isNaN(numIndex) && !isNaN(numInput)) {
          if (numIndex >= 0 && numIndex < copy.length) {
            copy[numIndex] = numInput;
            setArr(copy);
            setOutput(`Updated index ${numIndex} to ${numInput}`);
            onCodeChange?.(`let array = [${original.join(', ')}];\narray[${numIndex}] = ${numInput};`);
          } else {
            setOutput(`Index ${numIndex} is out of bounds`);
          }
        }
        break;
    }
  };

  const getDescription = (op: string): string => {
    switch (op) {
      case 'push': return 'Adds a value to the end of the array.';
      case 'pop': return 'Removes the last item from the array.';
      case 'unshift': return 'Adds a value to the beginning of the array.';
      case 'splice': return 'Inserts a value at a specific index.';
      case 'slice': return 'Copies part of the array (non-destructive).';
      case 'indexOf': return 'Finds the first index of a value.';
      case 'lastIndexOf': return 'Finds the last index of a value.';
      case 'includes': return 'Checks if a value exists in the array.';
      case 'update': return 'Changes the value at a specific index.';
      default: return '';
    }
  };

  return (
    <div className="array-container">
      <h2 className="array-title">Array</h2>
      <p className="map-description">
        An <code>array</code> is an ordered lists that store values in a numbered sequence.
      </p>

      <TextField
        label="Define your array (comma-separated)"
        variant="outlined"
        size="small"
        fullWidth
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <div className="array-controls">
        <Autocomplete
          options={OPERATIONS}
          value={operation}
          onChange={(e, newVal) => {
            setOperation(newVal ?? 'push');
            resetOutput();
          }}
          renderInput={(params) => <TextField {...params} label="Choose operation" size="small" />}
          sx={{ minWidth: 200 }}
        />

        {['splice', 'slice', 'update'].includes(operation) && (
          <TextField
            label="Index"
            type="number"
            size="small"
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
          />
        )}

        {['push', 'unshift', 'indexOf', 'lastIndexOf', 'includes', 'splice', 'update'].includes(operation) && (
          <TextField
            label="Value"
            type="number"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}

        <TextField
          label="Operation Description"
          value={getDescription(operation)}
          size="small"
          fullWidth
          disabled
          sx={{ marginTop: 1, marginBottom: 2 }}
        />



        <Button variant="contained" onClick={runOperation}>Run</Button>
      </div>

      <div className="array-box">
        {arr.map((val, idx) => (
          <div className="array-cell" key={idx}>
            <span className="array-index">Index {idx}</span>
            <span className="array-value">{val}</span>
          </div>
        ))}
      </div>

      {output && <p className="array-output">{output}</p>}
    </div>
  );
}
