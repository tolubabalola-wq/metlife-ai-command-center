// MetLife EMEA AI Command Center — Overview Tab
// Design: Light premium canvas, MetLife blue primary, charts-forward, plain business English
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell,
} from 'recharts';
import {
  ChevronDown, ChevronRight, DollarSign, Cpu, ShieldCheck, Star, Layers,
  AlertTriangle, Calendar, BookOpen,
} from 'lucide-react';
import {
  AI_TOOLS, getPortfolioStats, getValueByPriority, getValueByOutcome, MONTHLY_VALUE_TREND,
  getPortfolioRAIScores, ESCALATED_DECISIONS, QUARTERLY_MILESTONES,
  NEW_FRONTIER_PRIORITIES, IDEAS_BACKLOG, GLOSSARY, getRiskStatus, getStatusColor,
} from '../lib/data';
import {
  MetricTile, SectionHeader, Card, StatusDot, StatusBadge, InfoTooltip,
  FunnelChart, ScoreGauge, ProgressBar,
} from '../components/ui/MetLifeUI';

const COLORS = {
  blue: '#0090DA',
  green: '#5DA831',
  amber: '#E0992E',
  red: '#D9483B',
  teal: '#0F97A6',
  navy: '#16273D',
};

const PRIORITY_COLORS: Record<string, string> = {
  'Extend leadership in Group Benefits': '#0090DA',
  'Capitalize on the retirement platform': '#0F97A6',
  'Accelerate asset management': '#8290A6',
  'Expand in high-growth international markets': '#5DA831',
  'Technology and efficiency enabler': '#8CC63F',
};

function OnTrackCard({ label, current, target, unit, status, tooltip }: {
  label: string; current: string | number; target: string | number; unit?: string; status: 'green' | 'amber' | 'red'; tooltip?: string;
}) {
  const pct = typeof current === 'number' && typeof target === 'number'
    ? Math.min(100, Math.round((current / target) * 100)) : null;
  return (
    <div className="ml-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#54657E', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StatusDot color={status} />
          {tooltip && <InfoTooltip text={tooltip} />}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#16273D' }}>{current}{unit}</span>
        <span style={{ fontSize: 12, color: '#8290A6' }}>of</span>
        <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: '#54657E' }}>{target}{unit}</span>
        <span style={{ fontSize: 12, color: '#8290A6' }}>target</span>
      </div>
      {pct !== null && (
        <ProgressBar value={pct} target={100} color={status} height={5} />
      )}
    </div>
  );
}

function RAIScoreRow({ principle, score }: { principle: string; score: number }) {
  const status = getStatusColor(score, { green: 85, amber: 75 });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F3F6FB' }}>
      <StatusDot color={status} />
      <span style={{ width: 140, fontSize: 13, fontWeight: 500, color: '#16273D', flexShrink: 0 }}>{principle}</span>
      <div style={{ flex: 1 }}>
        <ProgressBar value={score} color={status} height={6} />
      </div>
      <span className="mono" style={{ width: 36, fontSize: 13, fontWeight: 700, color: status === 'green' ? COLORS.green : status === 'amber' ? COLORS.amber : COLORS.red, textAlign: 'right' }}>{score}</span>
    </div>
  );
}

function ExpandablePriorityBar({ priority, value, tools }: {
  priority: string; value: number; tools: typeof AI_TOOLS; maxValue: number;
}) {
  const [open, setOpen] = useState(false);
  const color = PRIORITY_COLORS[priority] || COLORS.blue;
  const isEnabler = priority === 'Technology and efficiency enabler';
  return (
    <div>
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
          cursor: 'pointer', borderBottom: open ? 'none' : '1px solid #F3F6FB',
        }}
      >
        <div style={{ width: 14, color: '#8290A6', display: 'flex', flexShrink: 0 }}>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <span style={{
          width: 260, fontSize: 13, fontWeight: isEnabler ? 500 : 600,
          color: isEnabler ? '#54657E' : '#16273D', flexShrink: 0,
          fontStyle: isEnabler ? 'italic' : 'normal',
        }}>{priority}</span>
        <div style={{ flex: 1, background: '#E1E8F1', borderRadius: 4, height: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.max(2, (value / 30) * 100)}%`,
            height: '100%', background: color, borderRadius: 4,
            transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
          }} />
        </div>
        <span className="mono" style={{ width: 60, fontSize: 13, fontWeight: 700, color, textAlign: 'right' }}>${value.toFixed(1)}M</span>
      </div>
      {open && (
        <div style={{ marginLeft: 26, marginBottom: 8, background: '#F8FAFD', borderRadius: 8, padding: '10px 14px', border: '1px solid #E1E8F1' }}>
          {tools.length === 0 ? (
            <span style={{ fontSize: 12, color: '#8290A6' }}>No tools in production for this priority.</span>
          ) : (
            tools.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: '1px solid #EDF2F8' }}>
                <StatusDot color={getStatusColor(t.testing.overallQuality)} />
                <span style={{ flex: 1, fontSize: 12, color: '#16273D', fontWeight: 500 }}>{t.name}</span>
                <span className="mono" style={{ fontSize: 12, color: '#54657E' }}>${(t.yearlyValue * t.usagePercent / 100).toFixed(1)}M realized</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function OverviewTab() {
  const stats = getPortfolioStats();
  const valueByPriority = getValueByPriority();
  const valueByOutcome = getValueByOutcome();
  const raiScores = getPortfolioRAIScores();
  const [outcomeExpanded, setOutcomeExpanded] = useState<'revenue' | 'expense' | null>(null);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const productionTools = AI_TOOLS.filter(t => t.stage === 'Production');
  const scalingTools = AI_TOOLS.filter(t => t.stage === 'Scaling');
  const pilotTools = AI_TOOLS.filter(t => t.stage === 'Pilot');

  const funnelStages = [
    { label: 'Ideas', count: IDEAS_BACKLOG.length, color: COLORS.teal },
    { label: 'Pilot', count: pilotTools.length + 2, color: COLORS.amber },
    { label: 'Scaling', count: scalingTools.length, color: COLORS.blue },
    { label: 'Production', count: productionTools.length, color: COLORS.green },
  ];

  const ideaGateBreakdown = [
    { step: 'Concept', count: IDEAS_BACKLOG.filter(i => i.gateStep === 'Concept').length },
    { step: 'Feasibility', count: IDEAS_BACKLOG.filter(i => i.gateStep === 'Feasibility').length },
    { step: 'Business Case', count: IDEAS_BACKLOG.filter(i => i.gateStep === 'Business Case').length },
  ];

  const riskStatus = getRiskStatus(stats.riskScore);
  const qualityStatus = getStatusColor(stats.answerQuality, { green: 88, amber: 80 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Headline Tiles */}
      <div>
        <SectionHeader
          title="At a Glance"
          subtitle="The five numbers that define where the EMEA AI portfolio stands today."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <MetricTile
            label="Value Realized"
            value={`$${stats.valueRealized}M`}
            sub="Yearly benefit being banked now"
            color="blue"
            icon={<DollarSign size={15} />}
            tooltip="The yearly financial benefit actually being banked today from AI tools in production, calculated as each tool's full value multiplied by how widely it is being used."
          />
          <MetricTile
            label="Running Cost"
            value={stats.monthlyRunCost >= 1000 ? `$${(stats.monthlyRunCost / 1000).toFixed(1)}M` : `$${stats.monthlyRunCost.toFixed(0)}K`}
            sub="Monthly cost to operate live AI"
            color="blue"
            icon={<Cpu size={15} />}
            tooltip="The monthly cost to operate all live AI tools across EMEA, driven by usage volume and the cost per use of each tool."
          />
          <MetricTile
            label="Risk Level"
            value={stats.riskScore}
            sub="Portfolio score 0–100, lower is better"
            color={riskStatus}
            icon={<ShieldCheck size={15} />}
            tooltip="A single portfolio risk score weighted by the size of each tool. Below 45 is low risk, 45–60 is watch, above 60 is high risk."
          />
          <MetricTile
            label="Answer Quality"
            value={`${stats.answerQuality}`}
            unit="/100"
            sub="Target: 88 or above"
            color={qualityStatus}
            icon={<Star size={15} />}
            tooltip="How accurate and reliable the AI answers are, checked against known-good examples. Combines test pass rate, source-backed answers, and human review findings."
          />
          <MetricTile
            label="AI Tools Live"
            value={stats.toolsLive}
            sub={`${stats.toolsScaling} scaling · ${stats.ideasBacklog} ideas in backlog`}
            color="blue"
            icon={<Layers size={15} />}
            tooltip="The number of AI tools currently in production across EMEA markets, plus those scaling up and ideas waiting for approval."
          />
        </div>
      </div>

      {/* Value Trend + Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <SectionHeader
            title="Value Realized Over Time"
            subtitle="Cumulative yearly value being banked each month as more tools reach full usage."
          />
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={MONTHLY_VALUE_TREND} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F1" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8290A6' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8290A6' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}M`} />
              <Tooltip
                formatter={(v: number) => [`$${v}M`, 'Value Realized']}
                contentStyle={{ background: '#fff', border: '1px solid #E1E8F1', borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="value" stroke={COLORS.blue} strokeWidth={2.5} dot={{ fill: COLORS.blue, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader
            title="Value by Strategic Priority"
            subtitle="How realized AI value flows into MetLife's two New Frontier outcomes: growing revenue and reducing expenses."
          />
          {/* Two-bucket outcome view */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Revenue bucket */}
            {(['revenue', 'expense'] as const).map(bucket => {
              const isRevenue = bucket === 'revenue';
              const data = valueByOutcome[bucket];
              const color = isRevenue ? COLORS.blue : COLORS.green;
              const bgColor = isRevenue ? '#EBF6FD' : '#EEF8E6';
              const borderColor = isRevenue ? '#B3DDF5' : '#B8E4A0';
              const label = isRevenue ? 'Revenue' : 'Expense';
              const outcome = isRevenue
                ? 'EPS Growth · 15% ROE'
                : 'Expense Ratio –100 BPS · $25B Free Cash Flow';
              const how = isRevenue
                ? 'These tools grow top-line income by accelerating sales, improving retention, and enabling faster underwriting decisions — all of which lift premiums and earnings per share.'
                : 'These tools cut operating cost by automating claims, service, and back-office steps — reducing the expense ratio and releasing cash that flows into free cash flow.';
              const isOpen = outcomeExpanded === bucket;
              const totalValue = valueByOutcome.revenue.value + valueByOutcome.expense.value;
              const pct = Math.round((data.value / totalValue) * 100);

              return (
                <div key={bucket} style={{ border: `1.5px solid ${borderColor}`, borderRadius: 10, overflow: 'hidden', background: bgColor }}>
                  {/* Header row */}
                  <div
                    onClick={() => setOutcomeExpanded(isOpen ? null : bucket)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' }}
                  >
                    {/* Bucket label + outcome targets */}
                    <div style={{ flexShrink: 0, width: 200 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      <div style={{ fontSize: 10, color: '#54657E', lineHeight: 1.35, marginTop: 2 }}>{outcome}</div>
                    </div>
                    {/* Bar track */}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: 6, height: 26, overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        width: `${pct}%`, height: '100%', background: color,
                        borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10,
                        transition: 'width 0.7s cubic-bezier(0.23,1,0.32,1)',
                        minWidth: 100,
                      }}>
                        <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>{pct}% of total</span>
                      </div>
                    </div>
                    {/* Value */}
                    <span className="mono" style={{ fontSize: 17, fontWeight: 800, color, flexShrink: 0, width: 68, textAlign: 'right' }}>${data.value.toFixed(1)}M</span>
                    {/* Tool count + chevron */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, width: 110 }}>
                      <span style={{ fontSize: 11, color: '#54657E', whiteSpace: 'nowrap' }}>
                        {data.tools.filter(t => t.stage === 'Production').length} live
                        {data.tools.filter(t => t.stage !== 'Production').length > 0 && ` + ${data.tools.filter(t => t.stage !== 'Production').length} scaling`}
                      </span>
                      {isOpen ? <ChevronDown size={13} color="#8290A6" /> : <ChevronRight size={13} color="#8290A6" />}
                    </div>
                  </div>

                  {/* Expanded: how it works + tool list */}
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px 16px', borderTop: `1px solid ${borderColor}` }}>
                      <p style={{ fontSize: 12, color: '#54657E', lineHeight: 1.5, margin: '10px 0 10px 0' }}>{how}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {data.tools.sort((a, b) => (b.stage === 'Production' ? 1 : 0) - (a.stage === 'Production' ? 1 : 0)).map(t => {
                          const isProduction = t.stage === 'Production';
                          return (
                            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', background: isProduction ? 'white' : '#FAFCFF', borderRadius: 7, border: `1px solid ${isProduction ? 'rgba(0,0,0,0.06)' : '#E1E8F1'}` }}>
                              <StatusDot color={getStatusColor(t.testing.overallQuality)} />
                              <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#16273D' }}>{t.name}</span>
                              <span style={{ fontSize: 11, color: '#8290A6' }}>{t.function}</span>
                              {!isProduction && (
                                <span style={{ fontSize: 10, fontWeight: 600, color: '#0090DA', background: '#EBF6FD', borderRadius: 4, padding: '2px 6px' }}>Scaling</span>
                              )}
                              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: isProduction ? color : '#8290A6', width: 58, textAlign: 'right' }}>
                                {isProduction ? `$${(t.yearlyValue * t.usagePercent / 100).toFixed(1)}M` : 'pending'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ fontSize: 11, color: '#8290A6', lineHeight: 1.4, marginTop: 2 }}>
              <strong>Revenue</strong> = tools that grow premiums, sales, or retention. <strong>Expense</strong> = tools that cut operating cost or automate manual steps. Click either row to see the contributing tools.
            </div>
          </div>
        </Card>
      </div>

      {/* Are We On Track */}
      <div>
        <SectionHeader
          title="Are We On Track?"
          subtitle="Five targets that tell leadership whether the AI programme is delivering as planned."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <OnTrackCard
            label="Value Realized"
            current={stats.valueRealized}
            target={90}
            unit="M"
            status={getStatusColor(stats.valueRealized, { green: 75, amber: 60 })}
            tooltip="Yearly value being banked from production tools. Target is $90M for the full year."
          />
          <OnTrackCard
            label="Tools in Production"
            current={stats.toolsLive}
            target={20}
            status={getStatusColor(stats.toolsLive, { green: 15, amber: 10 })}
            tooltip="Number of AI tools running in production. Target is 20 tools by year end."
          />
          <OnTrackCard
            label="Cost Per Use"
            current="3.8¢"
            target="5¢"
            status="green"
            tooltip="Average cost of one AI interaction across all tools. Target is to stay below 5 cents per use."
          />
          <OnTrackCard
            label="Usage in Production"
            current={`${Math.round(productionTools.reduce((s, t) => s + t.usagePercent, 0) / productionTools.length)}%`}
            target="85%"
            status={getStatusColor(Math.round(productionTools.reduce((s, t) => s + t.usagePercent, 0) / productionTools.length), { green: 80, amber: 65 })}
            tooltip="Average usage rate across all production tools. Target is 85% of eligible transactions using AI."
          />
          <OnTrackCard
            label="Quality Checks Passed"
            current={`${stats.answerQuality}`}
            target="88"
            status={qualityStatus}
            tooltip="Overall answer quality score across all production tools. Target is 88 or above."
          />
        </div>
      </div>

      {/* Is It Safe — RAI */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <SectionHeader
            title="Is It Safe? Responsible AI Scores"
            subtitle="MetLife's seven AI governance principles, scored across all production tools. Target is 85 or above for each."
          />
          <div>
            {raiScores.map(r => (
              <RAIScoreRow key={r.principle} principle={r.label} score={r.score} />
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Risk Level and Quality at a Glance"
            subtitle="Portfolio risk score and answer quality shown as gauges. Risk: lower is better. Quality: higher is better."
          />
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', padding: '16px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <ScoreGauge score={stats.riskScore} size={120} />
              <div style={{ fontSize: 12, fontWeight: 600, color: '#54657E', marginTop: 4 }}>Portfolio Risk</div>
              <div style={{ fontSize: 11, color: '#8290A6' }}>Target: below 45</div>
              <StatusBadge color={riskStatus} label={riskStatus === 'green' ? 'Low Risk' : riskStatus === 'amber' ? 'Watch' : 'High Risk'} />
            </div>
            <div style={{ width: 1, background: '#E1E8F1' }} />
            <div style={{ textAlign: 'center' }}>
              <ScoreGauge score={stats.answerQuality} size={120} />
              <div style={{ fontSize: 12, fontWeight: 600, color: '#54657E', marginTop: 4 }}>Answer Quality</div>
              <div style={{ fontSize: 11, color: '#8290A6' }}>Target: 88 or above</div>
              <StatusBadge color={qualityStatus} label={qualityStatus === 'green' ? 'On Target' : qualityStatus === 'amber' ? 'Watch' : 'Below Target'} />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#54657E', marginBottom: 10 }}>Tools by Risk Level</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['Low', 'Medium', 'High'] as const).map(level => {
                const count = productionTools.filter(t => t.riskLevel === level).length;
                const color = level === 'Low' ? 'green' : level === 'Medium' ? 'amber' : 'red';
                return (
                  <div key={level} className="ml-card" style={{ flex: 1, padding: '10px 14px', textAlign: 'center', background: level === 'High' ? '#FEF0EF' : level === 'Medium' ? '#FEF6E7' : '#F0F9E8' }}>
                    <StatusDot color={color} size={8} />
                    <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: color === 'green' ? '#5DA831' : color === 'amber' ? '#E0992E' : '#D9483B', marginTop: 4 }}>{count}</div>
                    <div style={{ fontSize: 11, color: '#54657E' }}>{level} Risk</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Strategy Alignment */}
      <Card>
        <SectionHeader
          title="How AI Supports Our Strategy"
          subtitle="Realized value mapped to MetLife's New Frontier priorities. Click any bar to see which tools contribute."
        />
        <div>
          {NEW_FRONTIER_PRIORITIES.map(priority => {
            const entry = valueByPriority.find(v => v.priority === priority);
            const value = entry?.value || 0;
            const tools = productionTools.filter(t => t.newFrontierPriority === priority);
            return (
              <ExpandablePriorityBar
                key={priority}
                priority={priority}
                value={value}
                tools={tools}
                maxValue={30}
              />
            );
          })}
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#F8FAFD', borderRadius: 8, border: '1px solid #E1E8F1' }}>
          <span style={{ fontSize: 11.5, color: '#54657E' }}>
            <strong>Note:</strong> EMEA sits inside the international markets priority, so value concentrates there and in Group Benefits. Asset management is led globally; EMEA front-line AI is intentionally light there.
          </span>
        </div>
      </Card>

      {/* Funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <SectionHeader
            title="From Idea to Production"
            subtitle="How many AI tools are at each stage of the journey from concept to live deployment."
          />
          <FunnelChart stages={funnelStages} />
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ideaGateBreakdown.map(g => (
              <div key={g.step} style={{ background: '#F3F6FB', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#54657E' }}>
                <span style={{ fontWeight: 600, color: '#16273D' }}>{g.count}</span> ideas at {g.step}
              </div>
            ))}
          </div>
        </Card>

        {/* Cost Per Use Bar Chart */}
        <Card>
          <SectionHeader
            title="Cost Per Use by Tool"
            subtitle="What each AI interaction costs, in cents. The line shows the portfolio target of 5 cents."
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={productionTools.slice(0, 8).map(t => ({ name: t.name.split(' ').slice(0, 2).join(' '), cost: t.costPerUse }))}
              margin={{ top: 4, right: 16, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F1" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#8290A6' }} angle={-35} textAnchor="end" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#8290A6' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}¢`} />
              <Tooltip
                formatter={(v: number) => [`${v}¢`, 'Cost Per Use']}
                contentStyle={{ background: '#fff', border: '1px solid #E1E8F1', borderRadius: 8, fontSize: 12 }}
              />
              <ReferenceLine y={5} stroke={COLORS.amber} strokeDasharray="4 4" label={{ value: 'Target 5¢', position: 'right', fontSize: 10, fill: COLORS.amber }} />
              <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                {productionTools.slice(0, 8).map(t => (
                  <Cell key={t.id} fill={t.costPerUse <= 5 ? COLORS.green : COLORS.amber} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Needs Your Decision */}
      <Card>
        <SectionHeader
          title="Needs Your Decision"
          subtitle="Items escalated to leadership that require a decision or direction to move forward."
          action={<span style={{ fontSize: 12, color: '#8290A6' }}>{ESCALATED_DECISIONS.length} open items</span>}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ESCALATED_DECISIONS.map(d => (
            <div key={d.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px',
              background: d.urgency === 'red' ? '#FEF0EF' : d.urgency === 'amber' ? '#FEF6E7' : '#F0F9E8',
              borderRadius: 8, border: `1px solid ${d.urgency === 'red' ? '#D9483B33' : d.urgency === 'amber' ? '#E0992E33' : '#5DA83133'}`,
            }}>
              <AlertTriangle size={15} style={{ color: d.urgency === 'red' ? COLORS.red : d.urgency === 'amber' ? COLORS.amber : COLORS.green, marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#16273D', lineHeight: 1.4 }}>{d.item}</div>
                <div style={{ fontSize: 12, color: '#54657E', marginTop: 4 }}>Owner: <strong>{d.owner}</strong> · Due: {d.dueWindow}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* What Is Next */}
      <Card>
        <SectionHeader
          title="What Is Next"
          subtitle="Key milestones planned for this quarter across the EMEA AI portfolio."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QUARTERLY_MILESTONES.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid #F3F6FB' }}>
              <Calendar size={14} style={{ color: '#8290A6', flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13, color: '#16273D' }}>{m.milestone}</div>
              <span className="mono" style={{ fontSize: 12, color: '#54657E', flexShrink: 0 }}>{m.date}</span>
              <StatusDot color={m.status === 'on-track' ? 'green' : m.status === 'watch' ? 'amber' : 'red'} />
            </div>
          ))}
        </div>
      </Card>

      {/* Glossary */}
      <div>
        <button
          onClick={() => setGlossaryOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid #E1E8F1',
            borderRadius: 8, padding: '10px 16px', cursor: 'pointer', color: '#54657E', fontSize: 13, fontWeight: 500,
          }}
        >
          <BookOpen size={14} />
          {glossaryOpen ? 'Hide' : 'Show'} Glossary — plain definitions of every term used in this dashboard
          {glossaryOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {glossaryOpen && (
          <div className="ml-card" style={{ marginTop: 10, padding: '20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {GLOSSARY.map(g => (
                <div key={g.term} style={{ padding: '10px 0', borderBottom: '1px solid #F3F6FB' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0090DA', marginBottom: 3 }}>{g.term}</div>
                  <div style={{ fontSize: 12.5, color: '#54657E', lineHeight: 1.5 }}>{g.definition}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
