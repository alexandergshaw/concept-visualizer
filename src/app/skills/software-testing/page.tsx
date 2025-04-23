import { Suspense } from 'react';
import SoftwareTestingPage from '../../../../components/pageComponents/softwareTesting/SoftwareTestingPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SoftwareTestingPage/>
    </Suspense>
  );
}
