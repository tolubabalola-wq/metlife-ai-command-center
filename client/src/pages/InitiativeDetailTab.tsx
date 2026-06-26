// MetLife EMEA AI Command Center — Initiative Detail Tab
// Design: Light premium canvas, MetLife blue primary, four panels per tool, plain business English
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell,
} from 'recharts';
import { AI_TOOLS, FUNCTIONS, getStatusColor, getRiskStatus } from '../lib/data';
import { SectionHeader, Card, StatusDot, StatusBadge, ProgressBar, MetricTile } from '../components/ui/MetLifeUI';

const WATERFALL_STEPS = [
  { step: 'Safety Check', ms: 45, color: '#0F97A6' },
  { step: 'Find Information', ms: 180, color: '#0090DA' },
  { step: 'Plan the Answer', ms: 95, color: '#5DA831' },
  { step: 'Look Up Record', ms: 220, color: '#0090DA' },
  { step: 'Write the Answer', ms: 310, color: '#5DA831' },
  { step: 'Final Check', ms: 70, color: '#0F97A6' },
];

function MetricRow({ label, value, target, unit, status }: {
  label: string; value: string | number; target?: string | number; unit?: string; status?: 'green' | 'amber' | 'red';
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F3F6FB' }}>
      {status && <StatusDot color={status} />}
      <span style={{ flex: 1, fontSize: 13, color: '#54657E' }}>{label}</span>
      <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: '#16273D' }}>{value}{unit}</span>
      {target !== undefined && (
        <span style={{ fontSize: 12, color: '#8290A6' }}>target: <span className="mono" style={{ fontWeight: 600 }}>{target}{unit}</span></span>
      )}
    </div>
  );
}

function WaterfallChart({ tool }: { tool: typeof AI_TOOLS[0] }) {
  const scale = tool.speed.typicalResponseMs / WATERFALL_STEPS.reduce((s, w) => s + w.ms, 0);
  const steps = WATERFALL_STEPS.map(w => ({ ...w, actualMs: Math.round(w.ms * scale) }));
  const total = steps.reduce((s, w) => s + w.actualMs, 0);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map((step, i) => {
          const pct = (step.actualMs / total) * 100;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 120, fontSize: 12, color: '#54657E', textAlign: 'right', flexShrink: 0 }}>{step.step}</span>
              <div style={{ flex: 1, background: '#E1E8F1', borderRadius: 4, height: 22, overflow: 'hidden' }}>
                <div style={{
                  width: `${pct}%`, height: '100%', background: step.color, borderRadius: 4,
                  display: 'flex', alignItems: 'center', paddingLeft: 8,
                  transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
                }}>
                  <span className="mono" style={{ fontSize: 10, color: 'white', fontWeight: 600, whiteSpace: 'nowrap' }}>{step.actualMs}ms</span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, borderTop: '2px solid #E1E8F1', paddingTop: 8 }}>
          <span style={{ width: 120, fontSize: 12, fontWeight: 700, color: '#16273D', textAlign: 'right', flexShrink: 0 }}>Total</span>
          <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: '#0090DA' }}>{total}ms end-to-end</span>
        </div>
      </div>
    </div>
  );
}

export default function InitiativeDetailTab() {
  const [selectedFunction, setSelectedFunction] = useState<string>('Claims');
  const [selectedToolId, setSelectedToolId] = useState<string>('claims-triage');

  const functionsWithTools = FUNCTIONS.filter(f => AI_TOOLS.some(t => t.function === f && t.stage === 'Production'));
  const toolsForFunction = AI_TOOLS.filter(t => t.function === selectedFunction && t.stage === 'Production');
  const tool = AI_TOOLS.find(t => t.id === selectedToolId) || AI_TOOLS[0];

  const qualityStatus = getStatusColor(tool.testing.overallQuality, { green: 88, amber: 80 });
  const costStatus = tool.costPerUse <= 5 ? 'green' as const : tool.costPerUse <= 8 ? 'amber' as const : 'red' as const;

  const weeklyData = tool.weeklyQualityTrend.map((v, i) => ({ week: `W${i + 1}`, quality: v }));

  const humanOversightLevel = tool.riskLevel === 'High' ? 85 : tool.riskLevel === 'Medium' ? 45 : 18;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Selectors */}
      <div>
        <SectionHeader
          title="Look Inside a Single Tool"
          subtitle="Choose a function and then a tool to see its full cost, quality, results, and how a single request runs."
        />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4 }}>Function</label>
            <select
              value={selectedFunction}
              onChange={e => {
                setSelectedFunction(e.target.value);
                const firstTool = AI_TOOLS.find(t => t.function === e.target.value && t.stage === 'Production');
                if (firstTool) setSelectedToolId(firstTool.id);
              }}
              style={{ fontSize: 13, padding: '8px 14px', border: '1px solid #E1E8F1', borderRadius: 8, background: 'white', color: '#16273D', minWidth: 200 }}
            >
              {functionsWithTools.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4 }}>Tool</label>
            <select
              value={selectedToolId}
              onChange={e => setSelectedToolId(e.target.value)}
              style={{ fontSize: 13, padding: '8px 14px', border: '1px solid #E1E8F1', borderRadius: 8, background: 'white', color: '#16273D', minWidth: 260 }}
            >
              {toolsForFunction.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tool header */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E1E8F1', padding: '20px 24px', boxShadow: '0 1px 4px rgba(22,39,61,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#16273D', marginBottom: 4 }}>{tool.name}</div>
            <div style={{ fontSize: 13, color: '#54657E', lineHeight: 1.5, marginBottom: 10 }}>{tool.description}</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <StatusBadge color={tool.stage === 'Production' ? 'green' : 'blue'} label={tool.stage} />
              <StatusBadge color={getRiskStatus(tool.riskScore)} label={`${tool.riskLevel} Risk`} />
              <span style={{ fontSize: 12, color: '#54657E', display: 'flex', alignItems: 'center', gap: 4 }}>
                Runs on <strong style={{ color: '#0090DA' }}>{tool.model}</strong>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#0090DA' }}>${tool.yearlyValue}M</div>
              <div style={{ fontSize: 11, color: '#8290A6' }}>Yearly Value</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#5DA831' }}>{tool.usagePercent}%</div>
              <div style={{ fontSize: 11, color: '#8290A6' }}>Usage Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#16273D' }}>{tool.testing.overallQuality}</div>
              <div style={{ fontSize: 11, color: '#8290A6' }}>Quality Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Four panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Panel 1: Cost to Run */}
        <Card>
          <SectionHeader title="Cost to Run" subtitle="What it costs to operate this tool — per use, per month, and at full capacity." />
          <MetricRow label="Cost per use" value={`${tool.costPerUse}¢`} target="5¢" status={costStatus} />
          <MetricRow label="Uses per month" value={tool.usesPerMonth.toLocaleString()} />
          <MetricRow label="Monthly running cost" value={`$${tool.monthlyRunCost}K`} />
          <MetricRow label="Cost at full usage" value={`$${Math.round(tool.monthlyRunCost / (tool.usagePercent / 100))}K`} unit="/month" />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: '#54657E', marginBottom: 8 }}>Cost per use vs target (5¢)</div>
            <ProgressBar value={(tool.costPerUse / 10) * 100} target={50} color={costStatus} height={8} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: '#8290A6' }}>0¢</span>
              <span style={{ fontSize: 10, color: '#8290A6' }}>10¢</span>
            </div>
          </div>
        </Card>

        {/* Panel 2: Quality and Testing */}
        <Card>
          <SectionHeader title="Quality and Testing" subtitle="How well the tool performs against known-good test cases and customer expectations." />
          <MetricRow label="Test cases covered" value={tool.testing.casesCovered.toLocaleString()} />
          <MetricRow label="Test pass rate" value={`${tool.testing.testPassRate}%`} target="90%" status={getStatusColor(tool.testing.testPassRate, { green: 90, amber: 82 })} />
          <MetricRow label="Answers backed by a source" value={`${tool.testing.sourceBackedAnswers}%`} target="90%" status={getStatusColor(tool.testing.sourceBackedAnswers, { green: 90, amber: 80 })} />
          <MetricRow label="Incorrect answer rate" value={`${tool.testing.incorrectAnswerRate}%`} target="3%" status={tool.testing.incorrectAnswerRate <= 3 ? 'green' : tool.testing.incorrectAnswerRate <= 5 ? 'amber' : 'red'} />
          <MetricRow label="Overall quality score" value={tool.testing.overallQuality} unit="/100" target="88" status={qualityStatus} />
          <MetricRow label="Customer satisfaction" value={tool.testing.customerSatisfaction} unit="/100" target="85" status={getStatusColor(tool.testing.customerSatisfaction, { green: 85, amber: 75 })} />
        </Card>

        {/* Panel 3: Results and Speed */}
        <Card>
          <SectionHeader title="Results and Speed" subtitle="The value this tool delivers and how fast it responds to each request." />
          <MetricRow label="Yearly value realized" value={`$${(tool.yearlyValue * tool.usagePercent / 100).toFixed(1)}M`} />
          <MetricRow label="Usage rate" value={`${tool.usagePercent}%`} target="85%" status={getStatusColor(tool.usagePercent, { green: 85, amber: 65 })} />
          <MetricRow label="Resolved without a person" value={`${Math.round(tool.usagePercent * 0.82)}%`} target="75%" status={getStatusColor(Math.round(tool.usagePercent * 0.82), { green: 75, amber: 60 })} />
          <MetricRow label="Typical response time" value={tool.speed.typicalResponseMs > 1000 ? `${(tool.speed.typicalResponseMs / 1000).toFixed(1)}s` : `${tool.speed.typicalResponseMs}ms`} />
          <MetricRow label="Slowest 5% of requests" value={tool.speed.slowest5pctMs > 1000 ? `${(tool.speed.slowest5pctMs / 1000).toFixed(1)}s` : `${tool.speed.slowest5pctMs}ms`} />

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: '#54657E', marginBottom: 8 }}>Quality trend over 8 weeks</div>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#8290A6' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 9, fill: '#8290A6' }} axisLine={false} tickLine={false} />
                <ReferenceLine y={88} stroke="#E0992E" strokeDasharray="3 3" />
                <Bar dataKey="quality" radius={[2, 2, 0, 0]}>
                  {weeklyData.map((d, i) => (
                    <Cell key={i} fill={d.quality >= 88 ? '#5DA831' : d.quality >= 80 ? '#E0992E' : '#D9483B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Panel 4: How a Single Request Runs */}
        <Card>
          <SectionHeader title="How a Single Request Runs" subtitle="A step-by-step breakdown of what happens inside the tool from the moment a request arrives to when the answer is returned." />
          <WaterfallChart tool={tool} />
        </Card>

      </div>

      {/* Human oversight */}
      <Card>
        <SectionHeader
          title="When People Step In"
          subtitle="The top reasons a human agent takes over from the AI, and the current level of human oversight on this tool."
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#54657E', marginBottom: 10 }}>Top reasons for human takeover</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tool.humanStepInReasons.map((reason, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#F8FAFD', borderRadius: 8, border: '1px solid #E1E8F1' }}>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#8290A6', width: 20 }}>#{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#16273D' }}>{reason}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#54657E', marginBottom: 10 }}>Human oversight level</div>
            <div style={{ background: '#F8FAFD', borderRadius: 10, padding: '16px 18px', border: '1px solid #E1E8F1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <StatusDot color={tool.riskLevel === 'High' ? 'red' : tool.riskLevel === 'Medium' ? 'amber' : 'green'} size={10} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#16273D' }}>
                  {tool.riskLevel === 'High' ? 'Full review on every output' : tool.riskLevel === 'Medium' ? 'Sampled review with escalation triggers' : 'Exception-based review only'}
                </span>
              </div>
              <div style={{ fontSize: 12.5, color: '#54657E', lineHeight: 1.5, marginBottom: 12 }}>
                {tool.riskLevel === 'High'
                  ? 'Every answer this tool produces is reviewed by a qualified human before it reaches the customer or is acted upon. This is required because the risk score is above 60.'
                  : tool.riskLevel === 'Medium'
                  ? 'A sample of answers is reviewed each week, and any output that triggers a risk flag is escalated for immediate human review before action is taken.'
                  : 'The tool operates autonomously. Outputs are reviewed only when an exception is flagged by the system or reported by a user.'}
              </div>
              <div style={{ fontSize: 12, color: '#54657E', marginBottom: 6 }}>Estimated share of outputs reviewed by a human</div>
              <ProgressBar
                value={humanOversightLevel}
                color={tool.riskLevel === 'High' ? 'red' : tool.riskLevel === 'Medium' ? 'amber' : 'green'}
                height={8}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: '#8290A6' }}>0%</span>
                <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#16273D' }}>{humanOversightLevel}%</span>
                <span style={{ fontSize: 10, color: '#8290A6' }}>100%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
}
