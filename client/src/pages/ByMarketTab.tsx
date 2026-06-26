// MetLife EMEA AI Command Center — By Market Tab
// Design: Light premium canvas, MetLife blue primary, heatmap cross-tab, plain business English
import React, { useState } from 'react';
import { AI_TOOLS, MARKETS, FUNCTIONS, getHeatmapData, getRiskStatus, getStatusColor } from '../lib/data';
import { SectionHeader, Card, StatusDot, StatusBadge } from '../components/ui/MetLifeUI';

type HeatMetric = 'tools' | 'usage' | 'value' | 'quality' | 'risk';

const METRIC_OPTIONS: { key: HeatMetric; label: string; description: string }[] = [
  { key: 'tools', label: 'Number of Tools', description: 'How many AI tools are active in this market and function' },
  { key: 'usage', label: 'Average Usage', description: 'Average usage rate across tools in this cell (%)' },
  { key: 'value', label: 'Yearly Value', description: 'Total yearly value realized from tools in this cell ($M)' },
  { key: 'quality', label: 'Answer Quality', description: 'Average answer quality score across tools in this cell' },
  { key: 'risk', label: 'Risk Score', description: 'Average risk score across tools in this cell (lower is better)' },
];

function getCellValue(tools: typeof AI_TOOLS, metric: HeatMetric): number | null {
  if (!tools.length) return null;
  switch (metric) {
    case 'tools': return tools.length;
    case 'usage': return Math.round(tools.reduce((s: number, t) => s + t.usagePercent, 0) / tools.length);
    case 'value': return Math.round(tools.reduce((s: number, t) => s + t.yearlyValue * t.usagePercent / 100, 0) * 10) / 10;
    case 'quality': return Math.round(tools.reduce((s: number, t) => s + t.testing.overallQuality, 0) / tools.length);
    case 'risk': return Math.round(tools.reduce((s: number, t) => s + t.riskScore, 0) / tools.length);
  }
}

function getCellColor(value: number | null, metric: HeatMetric): { bg: string; text: string } {
  if (value === null) return { bg: 'white', text: '#8290A6' };
  switch (metric) {
    case 'tools':
      if (value >= 4) return { bg: '#C8E6A0', text: '#2A5A0A' };
      if (value >= 2) return { bg: '#E8F4FD', text: '#005A8A' };
      return { bg: '#EDF2F8', text: '#54657E' };
    case 'usage':
      if (value >= 85) return { bg: '#C8E6A0', text: '#2A5A0A' };
      if (value >= 65) return { bg: '#FEF6E7', text: '#9A6010' };
      return { bg: '#FEF0EF', text: '#A02020' };
    case 'value':
      if (value >= 10) return { bg: '#C8E6A0', text: '#2A5A0A' };
      if (value >= 3) return { bg: '#E8F4FD', text: '#005A8A' };
      return { bg: '#EDF2F8', text: '#54657E' };
    case 'quality':
      if (value >= 88) return { bg: '#C8E6A0', text: '#2A5A0A' };
      if (value >= 80) return { bg: '#FEF6E7', text: '#9A6010' };
      return { bg: '#FEF0EF', text: '#A02020' };
    case 'risk':
      if (value < 35) return { bg: '#C8E6A0', text: '#2A5A0A' };
      if (value <= 55) return { bg: '#FEF6E7', text: '#9A6010' };
      return { bg: '#FEF0EF', text: '#A02020' };
  }
}

function formatCellValue(value: number | null, metric: HeatMetric): string {
  if (value === null) return '';
  switch (metric) {
    case 'tools': return String(value);
    case 'usage': return `${value}%`;
    case 'value': return `$${value}M`;
    case 'quality': return String(value);
    case 'risk': return String(value);
  }
}

export default function ByMarketTab() {
  const [metric, setMetric] = useState<HeatMetric>('tools');
  const [selectedCell, setSelectedCell] = useState<{ market: string; fn: string } | null>(null);
  const heatmapData = getHeatmapData();

  const selectedTools = selectedCell ? heatmapData[selectedCell.market]?.[selectedCell.fn] || [] : [];
  const currentMetricInfo = METRIC_OPTIONS.find(m => m.key === metric)!;

  // Summary stats
  const totalCells = MARKETS.length * FUNCTIONS.length;
  const activeCells = MARKETS.reduce((sum, m) => sum + FUNCTIONS.filter(f => heatmapData[m]?.[f]?.length > 0).length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div>
        <SectionHeader
          title="AI Presence Across Markets and Functions"
          subtitle="Each cell shows where AI tools are active. Empty cells are white space — opportunities to expand. Click any cell to see the tools inside."
        />
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: '#54657E' }}>
            <span className="mono" style={{ fontWeight: 700, color: '#0090DA', fontSize: 16 }}>{activeCells}</span>
            <span style={{ marginLeft: 5 }}>active market-function combinations</span>
          </div>
          <div style={{ fontSize: 13, color: '#54657E' }}>
            <span className="mono" style={{ fontWeight: 700, color: '#8290A6', fontSize: 16 }}>{totalCells - activeCells}</span>
            <span style={{ marginLeft: 5 }}>opportunities to expand</span>
          </div>
        </div>
      </div>

      {/* Metric Switcher */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#54657E', fontWeight: 600 }}>Show cells as:</span>
        {METRIC_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => setMetric(opt.key)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer',
              border: `1px solid ${metric === opt.key ? '#0090DA' : '#E1E8F1'}`,
              background: metric === opt.key ? '#E8F4FD' : 'white',
              color: metric === opt.key ? '#0090DA' : '#54657E',
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#8290A6' }}>Colour key for "{currentMetricInfo.label}":</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {metric === 'risk' ? (
            <>
              <span style={{ fontSize: 11, background: '#C8E6A0', color: '#2A5A0A', padding: '2px 8px', borderRadius: 4 }}>Low risk</span>
              <span style={{ fontSize: 11, background: '#FEF6E7', color: '#9A6010', padding: '2px 8px', borderRadius: 4 }}>Watch</span>
              <span style={{ fontSize: 11, background: '#FEF0EF', color: '#A02020', padding: '2px 8px', borderRadius: 4 }}>High risk</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 11, background: '#C8E6A0', color: '#2A5A0A', padding: '2px 8px', borderRadius: 4 }}>Strong</span>
              <span style={{ fontSize: 11, background: '#E8F4FD', color: '#005A8A', padding: '2px 8px', borderRadius: 4 }}>Moderate</span>
              <span style={{ fontSize: 11, background: '#FEF0EF', color: '#A02020', padding: '2px 8px', borderRadius: 4 }}>Low</span>
              <span style={{ fontSize: 11, background: 'white', color: '#8290A6', padding: '2px 8px', borderRadius: 4, border: '1px solid #E1E8F1' }}>No tools</span>
            </>
          )}
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 3, minWidth: 900 }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#8290A6', textAlign: 'left', minWidth: 160 }}>Function ↓ / Market →</th>
              {MARKETS.map(market => (
                <th key={market} style={{ padding: '8px 8px', fontSize: 10, fontWeight: 700, color: '#16273D', textAlign: 'center', minWidth: 80, whiteSpace: 'nowrap' }}>
                  {market}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FUNCTIONS.map(fn => (
              <tr key={fn}>
                <td style={{ padding: '6px 12px', fontSize: 11.5, fontWeight: 600, color: '#16273D', whiteSpace: 'nowrap', background: '#F8FAFD', borderRadius: 4 }}>
                  {fn}
                </td>
                {MARKETS.map(market => {
                  const tools = heatmapData[market]?.[fn] || [];
                  const value = getCellValue(tools, metric);
                  const colors = getCellColor(value, metric);
                  const isSelected = selectedCell?.market === market && selectedCell?.fn === fn;
                  return (
                    <td
                      key={market}
                      onClick={() => tools.length > 0 ? setSelectedCell(isSelected ? null : { market, fn }) : null}
                      style={{
                        padding: '6px 4px',
                        textAlign: 'center',
                        background: isSelected ? '#0090DA' : colors.bg,
                        color: isSelected ? 'white' : colors.text,
                        borderRadius: 6,
                        cursor: tools.length > 0 ? 'pointer' : 'default',
                        border: isSelected ? '2px solid #0090DA' : '1px solid transparent',
                        transition: 'all 0.15s ease',
                        minWidth: 60,
                        minHeight: 36,
                      }}
                      className={tools.length > 0 ? 'heatmap-cell' : ''}
                    >
                      {value !== null ? (
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{formatCellValue(value, metric)}</span>
                      ) : (
                        <span style={{ fontSize: 10, color: '#C8D4E3' }}>—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cell Detail */}
      {selectedCell && selectedTools.length > 0 && (
        <Card style={{ borderLeft: '4px solid #0090DA' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#16273D' }}>{selectedCell.fn} in {selectedCell.market}</div>
              <div style={{ fontSize: 12.5, color: '#54657E', marginTop: 2 }}>{selectedTools.length} AI tool{selectedTools.length > 1 ? 's' : ''} active in this combination</div>
            </div>
            <button onClick={() => setSelectedCell(null)} style={{ background: 'none', border: 'none', color: '#8290A6', cursor: 'pointer', fontSize: 20 }}>×</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {selectedTools.map(tool => (
              <div key={tool.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 14px', background: '#F8FAFD', borderRadius: 8, border: '1px solid #E1E8F1' }}>
                <StatusDot color={getRiskStatus(tool.riskScore)} size={8} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#16273D' }}>{tool.name}</div>
                  <div style={{ fontSize: 12, color: '#54657E', marginTop: 2, lineHeight: 1.4 }}>{tool.description}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
                  <StatusBadge color={tool.stage === 'Production' ? 'green' : tool.stage === 'Scaling' ? 'blue' : 'amber'} label={tool.stage} />
                  <span className="mono" style={{ fontSize: 12, color: '#0090DA', fontWeight: 700 }}>${tool.yearlyValue}M/yr</span>
                  <span style={{ fontSize: 11, color: '#8290A6' }}>Quality: {tool.testing.overallQuality}/100</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Market Summary */}
      <Card>
        <SectionHeader
          title="Market Summary"
          subtitle="How many production tools and total realized value each market has today."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          {MARKETS.map(market => {
            const marketTools = AI_TOOLS.filter(t => t.markets.includes(market) && t.stage === 'Production');
            const value = marketTools.reduce((s, t) => s + t.yearlyValue * t.usagePercent / 100, 0);
            return (
              <div key={market} style={{ background: '#F8FAFD', borderRadius: 10, padding: '12px 14px', border: '1px solid #E1E8F1', textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#16273D', marginBottom: 4 }}>{market}</div>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#0090DA' }}>{marketTools.length}</div>
                <div style={{ fontSize: 11, color: '#8290A6' }}>tools live</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#5DA831', marginTop: 4 }}>${value.toFixed(1)}M</div>
                <div style={{ fontSize: 11, color: '#8290A6' }}>value realized</div>
              </div>
            );
          })}
        </div>
      </Card>

    </div>
  );
}
