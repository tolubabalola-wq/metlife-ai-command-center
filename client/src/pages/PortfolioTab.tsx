// MetLife EMEA AI Command Center — Portfolio Tab
// Design: Light premium canvas, MetLife blue primary, charts-forward, plain business English
import React, { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell,
} from 'recharts';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { AI_TOOLS, IDEAS_BACKLOG, FUNCTIONS, MARKETS, getStatusColor, getRiskStatus } from '../lib/data';
import { StatusDot, StatusBadge, SectionHeader, Card, InfoTooltip, ProgressBar } from '../components/ui/MetLifeUI';

const STAGE_COLORS: Record<string, string> = {
  Production: '#5DA831',
  Scaling: '#0090DA',
  Pilot: '#E0992E',
  Idea: '#8290A6',
};

const RAI_PRINCIPLES = ['fairness', 'transparency', 'privacy', 'accountability', 'performance', 'dataGovernance', 'resiliency'] as const;
const RAI_LABELS: Record<string, string> = {
  fairness: 'Fairness', transparency: 'Transparency', privacy: 'Privacy',
  accountability: 'Accountability', performance: 'Performance', dataGovernance: 'Data Gov.', resiliency: 'Resiliency',
};

function raiColor(score: number) {
  if (score >= 85) return { bg: '#E8F5E0', text: '#3A7A1A' };
  if (score >= 75) return { bg: '#FEF6E7', text: '#9A6010' };
  return { bg: '#FEF0EF', text: '#A02020' };
}

const ISSUES = [
  { id: 1, tool: 'Medical Underwriting Summarizer', severity: 'red' as const, owner: 'Chief Risk Officer', issue: 'Risk score exceeds 60 threshold — enhanced oversight framework required before further scaling' },
  { id: 2, tool: 'Bancassurance Onboarding', severity: 'red' as const, owner: 'Chief Technology Officer', issue: 'Identity verification failure rate at 6.8% against a 3% target — model retraining needed' },
  { id: 3, tool: 'Fraud Detection Engine', severity: 'amber' as const, owner: 'Chief Compliance Officer', issue: 'Transparency score at 72 — explainability investment required to meet regulatory expectations' },
  { id: 4, tool: 'Retention Next-Best-Action', severity: 'amber' as const, owner: 'EMEA President', issue: 'Incorrect answer rate at 5.8% — quality improvement needed before 6-market expansion' },
  { id: 5, tool: 'Actuarial Research Assistant', severity: 'amber' as const, owner: 'Chief Actuary', issue: 'Resiliency score at 79 — disaster recovery plan needs updating before Production promotion' },
];

export default function PortfolioTab() {
  const [marketFilter, setMarketFilter] = useState('All');
  const [functionFilter, setFunctionFilter] = useState('All');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [raiOpen, setRaiOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(t => {
      const mOk = marketFilter === 'All' || t.markets.includes(marketFilter);
      const fOk = functionFilter === 'All' || t.function === functionFilter;
      return mOk && fOk;
    });
  }, [marketFilter, functionFilter]);

  const productionTools = filteredTools.filter(t => t.stage === 'Production');
  const scatterData = filteredTools.map(t => ({
    x: t.yearlyValue,
    y: t.riskScore,
    z: Math.sqrt(t.monthlyRunCost) * 3,
    name: t.name,
    stage: t.stage,
    id: t.id,
  }));

  const selectedToolData = selectedTool ? AI_TOOLS.find(t => t.id === selectedTool) : null;

  const adoptionData = productionTools.slice(0, 10).map(t => ({
    name: t.name.split(' ').slice(0, 2).join(' '),
    usage: t.usagePercent,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <Filter size={14} style={{ color: '#8290A6' }} />
        <span style={{ fontSize: 12, color: '#54657E', fontWeight: 500 }}>Filter by:</span>
        <select
          value={marketFilter}
          onChange={e => setMarketFilter(e.target.value)}
          style={{ fontSize: 12, padding: '6px 12px', border: '1px solid #E1E8F1', borderRadius: 6, background: 'white', color: '#16273D' }}
        >
          <option value="All">All Markets</option>
          {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={functionFilter}
          onChange={e => setFunctionFilter(e.target.value)}
          style={{ fontSize: 12, padding: '6px 12px', border: '1px solid #E1E8F1', borderRadius: 6, background: 'white', color: '#16273D' }}
        >
          <option value="All">All Functions</option>
          {FUNCTIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <span style={{ fontSize: 12, color: '#8290A6' }}>{filteredTools.length} tools shown</span>
      </div>

      {/* Scatter Chart */}
      <Card>
        <SectionHeader
          title="Value vs Risk: The Full Portfolio Map"
          subtitle="Each bubble is one AI tool. Left is lower value, right is higher value. Up is higher risk, down is lower risk. Bubble size shows monthly running cost. Click a bubble to see the tool's detail."
        />
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          {Object.entries(STAGE_COLORS).map(([stage, color]) => (
            <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#54657E' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block' }} />
              {stage}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#E0992E' }}>
            <span style={{ width: 24, height: 1, background: '#E0992E', display: 'inline-block', borderTop: '2px dashed #E0992E' }} />
            High-risk threshold (60)
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F1" />
            <XAxis
              type="number" dataKey="x" name="Yearly Value"
              tick={{ fontSize: 10, fill: '#8290A6' }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${v}M`} label={{ value: 'Yearly Value', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#8290A6' }}
            />
            <YAxis
              type="number" dataKey="y" name="Risk Score"
              tick={{ fontSize: 10, fill: '#8290A6' }} axisLine={false} tickLine={false}
              label={{ value: 'Risk Score', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#8290A6' }}
            />
            <ReferenceLine y={60} stroke="#E0992E" strokeDasharray="5 5" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0]?.payload;
                if (!d) return null;
                const tool = AI_TOOLS.find(t => t.id === d.id);
                if (!tool) return null;
                return (
                  <div style={{ background: '#fff', border: '1px solid #E1E8F1', borderRadius: 10, padding: '12px 16px', fontSize: 12, maxWidth: 220, boxShadow: '0 4px 16px rgba(22,39,61,0.1)' }}>
                    <div style={{ fontWeight: 700, color: '#16273D', marginBottom: 6 }}>{tool.name}</div>
                    <div style={{ color: '#54657E' }}>Value: <strong>${tool.yearlyValue}M/yr</strong></div>
                    <div style={{ color: '#54657E' }}>Risk Score: <strong>{tool.riskScore}</strong></div>
                    <div style={{ color: '#54657E' }}>Monthly Cost: <strong>${tool.monthlyRunCost}K</strong></div>
                    <div style={{ color: '#54657E' }}>Stage: <strong>{tool.stage}</strong></div>
                  </div>
                );
              }}
            />
            <Scatter
              data={scatterData}
              onClick={d => setSelectedTool(d.id)}
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                const color = STAGE_COLORS[payload.stage] || '#8290A6';
                const r = Math.max(8, Math.min(28, payload.z));
                return (
                  <circle
                    cx={cx} cy={cy} r={r}
                    fill={color} fillOpacity={0.75}
                    stroke={selectedTool === payload.id ? '#16273D' : color}
                    strokeWidth={selectedTool === payload.id ? 2.5 : 1}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
        {selectedToolData && (
          <div style={{ marginTop: 16, padding: '14px 18px', background: '#E8F4FD', borderRadius: 10, border: '1px solid #0090DA33' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, color: '#0090DA', fontSize: 14 }}>{selectedToolData.name}</div>
              <button onClick={() => setSelectedTool(null)} style={{ background: 'none', border: 'none', color: '#8290A6', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ fontSize: 12.5, color: '#54657E', marginTop: 4, lineHeight: 1.5 }}>{selectedToolData.description}</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#54657E' }}>Function: <strong>{selectedToolData.function}</strong></span>
              <span style={{ fontSize: 12, color: '#54657E' }}>Markets: <strong>{selectedToolData.markets.join(', ')}</strong></span>
              <span style={{ fontSize: 12, color: '#54657E' }}>Stage: <strong>{selectedToolData.stage}</strong></span>
              <span style={{ fontSize: 12, color: '#54657E' }}>Quality: <strong>{selectedToolData.testing.overallQuality}/100</strong></span>
            </div>
          </div>
        )}
      </Card>

      {/* Top Tools + Adoption */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <SectionHeader
            title="Biggest Tools by Value"
            subtitle="Production tools ranked by yearly value realized. Risk and stage shown for each."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {productionTools
              .sort((a, b) => b.yearlyValue - a.yearlyValue)
              .slice(0, 8)
              .map((tool, i) => (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                    borderRadius: 8, cursor: 'pointer', border: '1px solid #E1E8F1',
                    background: selectedTool === tool.id ? '#E8F4FD' : 'white',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span className="mono" style={{ width: 20, fontSize: 11, color: '#8290A6', textAlign: 'center' }}>#{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#16273D' }}>{tool.name}</div>
                    <div style={{ fontSize: 11, color: '#8290A6' }}>{tool.function}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: '#0090DA' }}>${tool.yearlyValue}M</span>
                  <StatusBadge color={getRiskStatus(tool.riskScore)} label={tool.riskLevel} />
                </div>
              ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Usage Rate by Tool"
            subtitle="What share of eligible transactions each production tool is handling. Target is 85%."
          />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={adoptionData} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F1" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#8290A6' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#54657E' }} axisLine={false} tickLine={false} width={90} />
              <ReferenceLine x={85} stroke="#E0992E" strokeDasharray="4 4" />
              <Tooltip formatter={(v: number) => [`${v}%`, 'Usage Rate']} contentStyle={{ background: '#fff', border: '1px solid #E1E8F1', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="usage" radius={[0, 4, 4, 0]}>
                {adoptionData.map((d, i) => (
                  <Cell key={i} fill={d.usage >= 85 ? '#5DA831' : d.usage >= 65 ? '#0090DA' : '#E0992E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Issues Table */}
      <Card>
        <SectionHeader
          title="Top Issues to Act On"
          subtitle="The most important problems across the portfolio that need a leadership decision or owner action."
        />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E1E8F1' }}>
                {['Severity', 'Tool', 'Issue', 'Owner'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ISSUES.map(issue => (
                <tr key={issue.id} style={{ borderBottom: '1px solid #F3F6FB' }}>
                  <td style={{ padding: '12px 12px' }}>
                    <StatusDot color={issue.severity} />
                  </td>
                  <td style={{ padding: '12px 12px', fontWeight: 600, color: '#16273D', whiteSpace: 'nowrap' }}>{issue.tool}</td>
                  <td style={{ padding: '12px 12px', color: '#54657E', lineHeight: 1.4 }}>{issue.issue}</td>
                  <td style={{ padding: '12px 12px', color: '#54657E', whiteSpace: 'nowrap' }}>{issue.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ideas and Gate */}
      <Card>
        <SectionHeader
          title="Ideas Waiting in the Pipeline"
          subtitle="AI concepts that have not yet reached production. Each is at a gate step that defines what needs to happen next."
        />
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {['Concept', 'Feasibility', 'Business Case'].map(step => {
            const count = IDEAS_BACKLOG.filter(i => i.gateStep === step).length;
            return (
              <div key={step} style={{ background: '#F3F6FB', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#54657E', border: '1px solid #E1E8F1' }}>
                <span className="mono" style={{ fontWeight: 700, color: '#16273D', fontSize: 16 }}>{count}</span>
                <span style={{ marginLeft: 6 }}>{step}</span>
              </div>
            );
          })}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E1E8F1' }}>
                {['Idea Name', 'Function', 'Market', 'Gate Step', 'Recommended Next Action'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IDEAS_BACKLOG.slice(0, 10).map(idea => (
                <tr key={idea.id} style={{ borderBottom: '1px solid #F3F6FB' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#16273D' }}>{idea.name}</td>
                  <td style={{ padding: '10px 12px', color: '#54657E' }}>{idea.function}</td>
                  <td style={{ padding: '10px 12px', color: '#54657E' }}>{idea.market}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      background: idea.gateStep === 'Business Case' ? '#E8F4FD' : idea.gateStep === 'Feasibility' ? '#FEF6E7' : '#F3F6FB',
                      color: idea.gateStep === 'Business Case' ? '#005A8A' : idea.gateStep === 'Feasibility' ? '#9A6010' : '#54657E',
                      padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                    }}>{idea.gateStep}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#54657E', lineHeight: 1.4 }}>{idea.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* RAI Heat Grid — collapsible */}
      <div>
        <button
          onClick={() => setRaiOpen(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid #E1E8F1', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', color: '#54657E', fontSize: 13, fontWeight: 500 }}
        >
          {raiOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Responsible AI Scores Per Tool — heat grid showing how each tool scores on each principle
        </button>
        {raiOpen && (
          <Card style={{ marginTop: 10, overflowX: 'auto' }}>
            <SectionHeader title="Responsible AI Scores by Tool" subtitle="Each cell shows the score for that principle. Green is 85+, amber is 75–84, red is below 75." />
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr>
                  <th style={{ padding: '6px 10px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8290A6', minWidth: 160 }}>Tool</th>
                  {RAI_PRINCIPLES.map(p => (
                    <th key={p} style={{ padding: '6px 8px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#8290A6', whiteSpace: 'nowrap' }}>{RAI_LABELS[p]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AI_TOOLS.filter(t => t.stage === 'Production' || t.stage === 'Scaling').map(tool => (
                  <tr key={tool.id} style={{ borderBottom: '1px solid #F3F6FB' }}>
                    <td style={{ padding: '6px 10px', fontSize: 12, fontWeight: 500, color: '#16273D', whiteSpace: 'nowrap' }}>{tool.name}</td>
                    {RAI_PRINCIPLES.map(p => {
                      const score = tool.responsibleAI[p];
                      const c = raiColor(score);
                      return (
                        <td key={p} style={{ padding: '5px 6px', textAlign: 'center' }}>
                          <span className="mono" style={{ background: c.bg, color: c.text, padding: '2px 6px', borderRadius: 4, fontSize: 11, fontWeight: 700, display: 'inline-block', minWidth: 30 }}>{score}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>

      {/* Models and Oversight — collapsible */}
      <div>
        <button
          onClick={() => setModelsOpen(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid #E1E8F1', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', color: '#54657E', fontSize: 13, fontWeight: 500 }}
        >
          {modelsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Models and Oversight — which MetIQ model powers each tool and the level of human review
        </button>
        {modelsOpen && (
          <Card style={{ marginTop: 10, overflowX: 'auto' }}>
            <SectionHeader title="Models and Oversight" subtitle="Every tool runs on MetIQ. This table shows which model variant and the human oversight level in production." />
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E1E8F1' }}>
                  {['Tool', 'Function', 'Model', 'Human Oversight', 'Quality'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AI_TOOLS.filter(t => t.stage === 'Production').map(tool => (
                  <tr key={tool.id} style={{ borderBottom: '1px solid #F3F6FB' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#16273D' }}>{tool.name}</td>
                    <td style={{ padding: '10px 12px', color: '#54657E' }}>{tool.function}</td>
                    <td style={{ padding: '10px 12px', color: '#0090DA', fontWeight: 500 }}>{tool.model}</td>
                    <td style={{ padding: '10px 12px', color: '#54657E' }}>
                      {tool.riskLevel === 'High' ? 'Full review on every output' : tool.riskLevel === 'Medium' ? 'Sampled review, escalation triggers' : 'Exception-based review only'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ProgressBar value={tool.testing.overallQuality} color={getStatusColor(tool.testing.overallQuality, { green: 88, amber: 80 })} height={5} />
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#16273D', width: 28 }}>{tool.testing.overallQuality}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>

    </div>
  );
}
