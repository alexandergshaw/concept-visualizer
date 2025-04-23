import { Suspense } from 'react';
import HtmlPage from '../../../../components/pageComponents/HtmlPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HtmlPage />
    </Suspense>
  );
}
