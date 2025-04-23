'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import "../../../styles/object.css"
import Section from '../../common/Section'
import CodePreview from '../../common/CodePreview';

// Shared utility to generate formatted preview lines
export function generateObjectPreviewLines(
  obj: Record<string, unknown>,
  mode: 'preview' | 'access' | 'destructure'
): string[] {
  const keys = Object.keys(obj);
  if (keys.length === 0) return ['// No object defined.'];

  const lines: string[] = [];

  if (mode === 'preview') {
    lines.push('{');
    lines.push(
      ...keys.map((k) => {
        const val = typeof obj[k] === 'function' ? '[Function]' : JSON.stringify(obj[k]);
        return `  ${k}: ${val},`;
      })
    );
    lines.push('}');
  } else if (mode === 'access') {
    lines.push('// Create an object using key-value pairs');
    lines.push('const obj = {');
    lines.push(
      ...keys.map((k) => {
        const val = typeof obj[k] === 'function' ? '[Function]' : JSON.stringify(obj[k]);
        return `  ${k}: ${val}, // the key is ${k}, the value is ${val}`;
      })
    );
    lines.push('};');
    lines.push('');
    lines.push('// Access and use the properties of the object using dot notation');
    lines.push(
      ...keys.map((k) => {
        const isFunc = typeof obj[k] === 'function';
        const call = isFunc ? `${k}()` : `${k}`;
        const comment = isFunc
          ? `// calls the ${k} method and prints its return value`
          : `// prints the value of '${k}', which is ${JSON.stringify(obj[k])}`;
        return `console.log(obj.${call}); ${comment}`;
      })
    );
  } else if (mode === 'destructure') {
    lines.push('// Declare an object with the following properties');
    lines.push('const obj = {');
    lines.push(
      ...keys.map((k) => {
        const val = typeof obj[k] === 'function' ? '[Function]' : JSON.stringify(obj[k]);
        return `  ${k}: ${val}, // the key is ${k}, the value is ${val}`;
      })
    );
    lines.push('};');
    lines.push('');
    lines.push('// Destructure values from the object');
    lines.push(`const { ${keys.join(', ')} } = obj;`);
    lines.push('');
    lines.push('// Log each destructured variable');
    lines.push(
      ...keys.map((k) => {
        const val = typeof obj[k] === 'function' ? '[Function]' : JSON.stringify(obj[k]);
        return `console.log(${k}); // ${val}`;
      })
    );
  }

  return lines;
}

export default function ObjectConcept() {
  const [playgroundObject, setPlaygroundObject] = useState<Record<string, unknown>>({});
  const [accessLines, setAccessLines] = useState<string[]>([]);
  const [destructuredLines, setDestructuredLines] = useState<string[]>([]);
  const [previewLines, setPreviewLines] = useState<string[]>([]);

  useEffect(() => {
    setPreviewLines(generateObjectPreviewLines(playgroundObject, 'preview'));
    setAccessLines(generateObjectPreviewLines(playgroundObject, 'access'));
    setDestructuredLines(generateObjectPreviewLines(playgroundObject, 'destructure'));
  }, [playgroundObject]);

  return (
    <ConceptWrapper title="Object" description="An object is a key-value pair structure that stores data. Keys are called properties.">
      <Typography className="map-description" sx={{ mb: 2 }}>
        Try adding keys and values below. The examples on this page will update as you go.
      </Typography>

      <ObjectPlayground onObjectChange={setPlaygroundObject} />

      <CodePreview code={previewLines} />
      <Section title="Using Object Properties" subtitle="We can access the values corresponding to keys with dot notation. An example of this is below."><CodePreview code={accessLines} /></Section>
      <Section
        title="Object Destructuring"
        subtitle="Destructuring is a JavaScript feature that lets us extract values from an object (or array) and assign them to variables."
      >
        <CodePreview code={destructuredLines} />
      </Section>
    </ConceptWrapper>
  );
}

function ObjectPlayground({
  onObjectChange,
}: {
  onObjectChange?: (obj: Record<string, unknown>) => void;
}) {
  const [entries, setEntries] = useState([{ key: 'name', value: '"Alex"' }]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result: Record<string, unknown> = {};
    try {
      for (const { key, value } of entries) {
        if (!key.trim()) continue;
        const val = eval(`(${value})`);
        result[key] = val;
      }
      setError(null);
      onObjectChange?.(result);
    } catch {
      setError('Live object update failed — check your syntax.');
      onObjectChange?.({});
    }
  }, [entries, onObjectChange]);

  const updateEntry = (index: number, field: 'key' | 'value', newValue: string) => {
    const updated = [...entries];
    updated[index][field] = newValue;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { key: '', value: '' }]);
  };

  return (
    <Box>
      {entries.map((entry, idx) => (
        <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField
            label="Key"
            value={entry.key}
            onChange={(e) => updateEntry(idx, 'key', e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Value (JS Expression)"
            value={entry.value}
            onChange={(e) => updateEntry(idx, 'value', e.target.value)}
            size="small"
            sx={{ flex: 2 }}
          />
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button variant="outlined" onClick={addEntry}>
          Add Property
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
