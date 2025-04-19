import { Suspense } from 'react';
import JavaScriptPage from '../../../../components/JavaScript';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JavaScriptPage  />
    </Suspense>
  );
}
