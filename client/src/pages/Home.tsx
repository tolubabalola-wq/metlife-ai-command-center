// EMEA AI Command Center — Main Layout
// Design: Light premium canvas, blue primary, tab navigation, plain business English
// Mobile-first: header stacks on small screens, tabs scroll horizontally, content padding tightens
import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import PortfolioTab from './PortfolioTab';
import ByMarketTab from './ByMarketTab';
import ProcessOwnersTab from './ProcessOwnersTab';
import InitiativeDetailTab from './InitiativeDetailTab';

const TABS = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', description: 'The full EMEA picture in one screen' },
  { id: 'portfolio', label: 'Portfolio', shortLabel: 'Portfolio', description: 'Every AI tool in detail' },
  { id: 'by-market', label: 'By Market', shortLabel: 'Market', description: 'AI presence across markets and functions' },
  { id: 'process-owners', label: 'Process Owners', shortLabel: 'Journeys', description: 'End-to-end journey ownership' },
  { id: 'initiative-detail', label: 'Initiative Detail', shortLabel: 'Tool', description: 'Deep-dive into a single tool' },
];

function CompanyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0090DA" />
      <path d="M6 24V8L12 18L16 12L20 18L26 8V24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const activeTabInfo = TABS.find(t => t.id === activeTab)!;

  return (
    <div style={{ minHeight: '100vh', background: '#F3F6FB', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E1E8F1',
        boxShadow: '0 1px 4px rgba(22,39,61,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 14px' }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0 8px', borderBottom: '1px solid #F3F6FB', gap: 8,
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
              <CompanyLogo size={30} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#16273D', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  EMEA
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#0090DA', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  AI Command Center
                </div>
              </div>
            </div>

            {/* Meta — stacks to right on all screens, hides label on very small */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <div className="meta-label">Powered by</div>
                <div className="meta-value" style={{ color: '#0090DA' }}>AI Platform</div>
              </div>
              <div style={{ width: 1, height: 24, background: '#E1E8F1', flexShrink: 0 }} />
              <div style={{ textAlign: 'right' }}>
                <div className="meta-label">Data as of</div>
                <div className="meta-value" style={{ color: '#16273D' }}>June 2025</div>
              </div>
            </div>
          </div>

          {/* Tab navigation — horizontally scrollable, no visible scrollbar */}
          <div style={{
            display: 'flex', gap: 0, overflowX: 'auto',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          } as React.CSSProperties}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`ml-tab ${activeTab === tab.id ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
              >
                <span className="tab-label-full">{tab.label}</span>
                <span className="tab-label-short">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Page breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #E1E8F1', padding: '8px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 14px' }}>
          <div style={{ fontSize: 12, color: '#8290A6' }}>
            <span style={{ fontWeight: 600, color: '#0090DA' }}>{activeTabInfo.label}</span>
            <span style={{ margin: '0 5px' }}>·</span>
            <span>{activeTabInfo.description}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="main-content" style={{ flex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '16px 14px 32px' }}>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'by-market' && <ByMarketTab />}
        {activeTab === 'process-owners' && <ProcessOwnersTab />}
        {activeTab === 'initiative-detail' && <InitiativeDetailTab />}
      </main>

      {/* Footer */}
      <footer style={{ background: 'white', borderTop: '1px solid #E1E8F1', padding: '12px 14px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 11, color: '#8290A6', lineHeight: 1.5 }}>
            All figures shown are <strong>illustrative and for discussion purposes only</strong>. They do not represent actual EMEA financial data, operational metrics, or performance results.
            This dashboard is a prototype built to demonstrate the AI Command Center concept for EMEA.
          </p>
          <p style={{ fontSize: 10, color: '#C8D4E3', marginTop: 4 }}>
            EMEA AI Command Center · AI Platform · June 2025
          </p>
        </div>
      </footer>

    </div>
  );
}
