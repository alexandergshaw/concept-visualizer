'use client';

import { Alert } from '@mui/material';
import Link from 'next/link';
import Sidebar, { SidebarItem } from './Sidebar';

export interface PageWrapperProps {
    pageTitle: string,
    children: React.ReactNode,
    navItems: SidebarItem[],
    defaultOpen: string[],
    handleSelect: (value: string) => void
}

export default function PageWrapper(props: PageWrapperProps) {
  return (
    <main className="js-layout">
      <Sidebar title={props.pageTitle} items={props.navItems} defaultOpen={props.defaultOpen} onSelect={props.handleSelect} />
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
          <div style={{ marginTop: '40px' }}>
            {props.children}
          </div>
        </section>
      </div>

    </main>
  );
}
