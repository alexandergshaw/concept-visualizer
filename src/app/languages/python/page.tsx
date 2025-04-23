import { Suspense } from 'react';
import PythonPage from '../../../../components/pageComponents/PythonPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PythonPage />
    </Suspense>
  );
}
