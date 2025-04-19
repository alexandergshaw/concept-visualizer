'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Link from 'next/link';
import ArrayConcept from './concepts/ArrayConcept';
import MapConcept from './concepts/MapConcept';
import SetConcept from './concepts/SetConcept';
import Sidebar from './Sidebar';

const navItems = [
  {
    label: 'Collections',
    value: 'collections',
    children: [
      { label: 'Arrays', value: 'arrays' },
      { label: 'Sets', value: 'sets' },
      { label: 'Maps', value: 'maps' },
    ],
  },
];

export default function JavaScriptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [codeSnippet, setCodeSnippet] = useState<string | null>(null);


  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    setCodeSnippet('')
  }, [selectedConcept])

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'arrays':
        return <ArrayConcept onCodeChange={setCodeSnippet} />;
      case 'maps':
        return <MapConcept onCodeChange={setCodeSnippet} />;
      case 'sets':
        return <SetConcept onCodeChange={setCodeSnippet} />;
      case 'conditionals':
        return <p className="concept-block">Use <code>if</code>, <code>else</code>, and <code>switch</code> to control flow based on logic.</p>;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/languages/javascript?concept=${value}`);
    setSelectedConcept(value);
  };

  const renderCodePreview = () => {
    return (
      <div className="js-code-preview">
        <div className="code-preview-header">
          <h3>JavaScript Code</h3>
        </div>
        <pre>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    )
  }

  return (
    <main className="js-layout">
      <Sidebar title="Topics" items={navItems} onSelect={handleSelect} />
      <div className="js-page-body">
        <Alert severity="info" className="feedback-banner" sx={{ mb: 3 }}>
          Have ideas to improve this page?{' '}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSf73dDuwy0mZUuApiG2kEGlcCp93pN-l1eOtFOTBA2BTf0Bqw/viewform?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Submit feedback here.
          </Link>
        </Alert>
        <section className="js-content">
          <h1 className="js-page-title">JavaScript Visualizer</h1>
          <div style={{ marginTop: '40px' }}>
            {renderContent(selectedConcept)}
            {codeSnippet && renderCodePreview()}
          </div>
        </section>
      </div>

    </main>
  );
}
