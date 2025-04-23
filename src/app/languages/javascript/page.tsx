import JavaScriptPage from '@/components/pageComponents/javaScript/JavaScriptPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JavaScriptPage />
    </Suspense>
  );
}
