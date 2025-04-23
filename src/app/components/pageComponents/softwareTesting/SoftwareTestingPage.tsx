'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../../../components/common/PageWrapper';
import UserAcceptanceTestingConcept from './userAcceptanceTesting/UserAcceptanceTestingConcept';
import OperationTestingConcept from './operationTesting/OperationTestingConcept';

const navItems = [
  {
    label: 'Types of Testing',
    value: 'types of testing',
    children: [
      { label: 'User Acceptance Testing', value: 'user-acceptance-testing' },
      { label: 'Operation Testing', value: 'operation-testing' },
    ],
  },
];

export default function SoftwareTestingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);


  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'user-acceptance-testing':
        return <UserAcceptanceTestingConcept/>;
      case 'operation-testing':
        return <OperationTestingConcept/>;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/software-testing?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper pageTitle={"Software Testing Topics"} navItems={navItems} defaultOpen={["types of testing"]} handleSelect={handleSelect}>
      {selectedConcept ? (
        <>
          {renderContent(selectedConcept)}
        </>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}
