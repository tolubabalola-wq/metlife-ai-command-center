// MetLife EMEA AI Command Center — Main Layout
// Design: Light premium canvas, MetLife blue primary, tab navigation, plain business English
import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import PortfolioTab from './PortfolioTab';
import ByMarketTab from './ByMarketTab';
import ProcessOwnersTab from './ProcessOwnersTab';
import InitiativeDetailTab from './InitiativeDetailTab';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    shortLabel: 'Overview',
    description: 'The full EMEA picture in one screen',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    shortLabel: 'Portfolio',
    description: 'Every AI tool in detail',
  },
  {
    id: 'by-market',
    label: 'By Market',
    shortLabel: 'By Market',
    description: 'AI presence across markets and functions',
  },
  {
    id: 'process-owners',
    label: 'Process Owners',
    shortLabel: 'Journeys',
    description: 'End-to-end journey ownership',
  },
  {
    id: 'initiative-detail',
    label: 'Initiative Detail',
    shortLabel: 'Tool Detail',
    description: 'Deep-dive into a single tool',
  },
];

// MetLife logo mark (simplified geometric M)
function MetLifeLogo({ size = 32 }: { size?: number }) {
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

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E1E8F1',
        boxShadow: '0 1px 4px rgba(22,39,61,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F3F6FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <MetLifeLogo size={34} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#16273D', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  MetLife EMEA
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0090DA', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  AI Command Center
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#8290A6' }}>Powered by</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0090DA' }}>MetIQ Platform</div>
              </div>
              <div style={{ width: 1, height: 32, background: '#E1E8F1' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#8290A6' }}>Data as of</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#16273D' }}>June 2025</div>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`ml-tab ${activeTab === tab.id ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Page title bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #E1E8F1', padding: '14px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontSize: 13, color: '#8290A6' }}>
            <span style={{ fontWeight: 600, color: '#0090DA' }}>{activeTabInfo.label}</span>
            <span style={{ margin: '0 6px' }}>·</span>
            <span>{activeTabInfo.description}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '28px 24px' }}>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'by-market' && <ByMarketTab />}
        {activeTab === 'process-owners' && <ProcessOwnersTab />}
        {activeTab === 'initiative-detail' && <InitiativeDetailTab />}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        borderTop: '1px solid #E1E8F1',
        padding: '16px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 11.5, color: '#8290A6', lineHeight: 1.5 }}>
            All figures shown in this dashboard are <strong>illustrative and for discussion purposes only</strong>. They do not represent actual MetLife financial data, operational metrics, or performance results.
            This dashboard is a prototype built to demonstrate the AI Command Center concept for MetLife EMEA.
          </p>
          <p style={{ fontSize: 11, color: '#C8D4E3', marginTop: 6 }}>
            MetLife EMEA AI Command Center · Reporting layer for the MetIQ Platform · June 2025
          </p>
        </div>
      </footer>

    </div>
  );
}
