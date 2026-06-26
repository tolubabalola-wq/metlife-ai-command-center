// MetLife EMEA AI Command Center — Process Owners Tab
// Design: Light premium canvas, MetLife blue primary, journey hand-off chains, plain business English
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown, ChevronRight, ArrowRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { JOURNEYS, type Journey, type HandoffStatus } from '../lib/data';
import { SectionHeader, Card, StatusDot, StatusBadge, MetricTile, ProgressBar } from '../components/ui/MetLifeUI';

const HANDOFF_COLORS: Record<HandoffStatus, { color: string; label: string; bg: string }> = {
  'automated': { color: '#5DA831', label: 'Automated', bg: '#F0F9E8' },
  'human-review': { color: '#E0992E', label: 'Human Review', bg: '#FEF6E7' },
  'manual-gap': { color: '#D9483B', label: 'Manual Gap', bg: '#FEF0EF' },
};

function HandoffArrow({ status }: { status: HandoffStatus }) {
  const c = HANDOFF_COLORS[status];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, flexShrink: 0 }}>
      <ArrowRight size={16} color={c.color} />
      <span style={{ fontSize: 9, fontWeight: 600, color: c.color, whiteSpace: 'nowrap' }}>{c.label}</span>
    </div>
  );
}

function JourneyStepBox({ team, tool, isGap }: { team: string; tool: string | null; isGap?: boolean }) {
  return (
    <div style={{
      background: isGap ? '#FEF0EF' : 'white',
      border: `1.5px solid ${isGap ? '#D9483B' : '#E1E8F1'}`,
      borderRadius: 8,
      padding: '10px 12px',
      minWidth: 120,
      maxWidth: 150,
      textAlign: 'center',
      flexShrink: 0,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{team}</div>
      {tool ? (
        <div style={{ fontSize: 11, fontWeight: 600, color: isGap ? '#D9483B' : '#0090DA', lineHeight: 1.3 }}>{tool}</div>
      ) : (
        <div style={{ fontSize: 11, color: '#D9483B', fontStyle: 'italic', lineHeight: 1.3 }}>No AI tool yet — idea only</div>
      )}
    </div>
  );
}

function JourneyCard({ journey }: { journey: Journey }) {
  const [open, setOpen] = useState(false);

  const integrationColor = journey.integrationStatus === 'green' ? 'green' : journey.integrationStatus === 'amber' ? 'amber' : 'red';
  const integrationLabel = journey.integrationStatus === 'green' ? 'Fully Connected' : journey.integrationStatus === 'amber' ? 'Partial Gaps' : 'Critical Gaps';

  return (
    <div className="ml-card" style={{ overflow: 'hidden' }}>
      {/* Collapsed header */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer' }}
      >
        {/* Avatar */}
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#E8F4FD',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#0090DA', flexShrink: 0,
        }}>
          {journey.ownerInitials}
        </div>

        {/* Name and owner */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#16273D' }}>{journey.name}</div>
          <div style={{ fontSize: 12, color: '#54657E' }}>{journey.ownerTitle}</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#16273D' }}>{journey.touchlessRate}%</div>
            <div style={{ fontSize: 10, color: '#8290A6' }}>Touchless</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: journey.openExceptions > 5 ? '#D9483B' : journey.openExceptions > 2 ? '#E0992E' : '#5DA831' }}>{journey.openExceptions}</div>
            <div style={{ fontSize: 10, color: '#8290A6' }}>Open Exceptions</div>
          </div>
          <StatusBadge color={integrationColor} label={integrationLabel} />
          <div style={{ color: '#8290A6' }}>
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: '1px solid #E1E8F1', padding: '20px 24px', background: '#FAFCFF' }}>
          {/* Hand-off chain */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#54657E', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Hand-off Chain</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
              {journey.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <JourneyStepBox
                    team={step.team}
                    tool={step.tool}
                    isGap={!step.tool}
                  />
                  {i < journey.steps.length - 1 && step.handoffStatus && (
                    <HandoffArrow status={step.handoffStatus} />
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
              {Object.entries(HANDOFF_COLORS).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#54657E' }}>
                  <ArrowRight size={11} color={val.color} />
                  {val.label}
                </div>
              ))}
            </div>
          </div>

          {/* Metrics row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid #E1E8F1' }}>
              <div style={{ fontSize: 11, color: '#8290A6', marginBottom: 4 }}>Touchless Rate</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: journey.touchlessRate >= 65 ? '#5DA831' : journey.touchlessRate >= 45 ? '#E0992E' : '#D9483B' }}>{journey.touchlessRate}%</div>
              <ProgressBar value={journey.touchlessRate} target={75} color={journey.touchlessRate >= 65 ? 'green' : journey.touchlessRate >= 45 ? 'amber' : 'red'} height={4} />
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid #E1E8F1' }}>
              <div style={{ fontSize: 11, color: '#8290A6', marginBottom: 4 }}>Time Before AI</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#16273D' }}>{journey.timeBefore}</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid #E1E8F1' }}>
              <div style={{ fontSize: 11, color: '#8290A6', marginBottom: 4 }}>Time With AI</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#5DA831' }}>{journey.timeAfter}</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid #E1E8F1' }}>
              <div style={{ fontSize: 11, color: '#8290A6', marginBottom: 4 }}>Yearly Value</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#0090DA' }}>${journey.yearlyValue}M</div>
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid #E1E8F1' }}>
              <div style={{ fontSize: 11, color: '#8290A6', marginBottom: 4 }}>Open Exceptions</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: journey.openExceptions > 5 ? '#D9483B' : '#E0992E' }}>{journey.openExceptions}</div>
            </div>
          </div>

          {/* Exception detail */}
          <div style={{ background: '#FEF6E7', borderRadius: 8, padding: '12px 16px', border: '1px solid #E0992E33' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <AlertCircle size={14} style={{ color: '#E0992E', marginTop: 1, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9A6010', marginBottom: 3 }}>Exception Detail</div>
                <div style={{ fontSize: 12.5, color: '#54657E', lineHeight: 1.5 }}>{journey.exceptionDetails}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProcessOwnersTab() {
  const totalJourneys = JOURNEYS.length;
  const avgTouchless = Math.round(JOURNEYS.reduce((s, j) => s + j.touchlessRate, 0) / JOURNEYS.length);
  const totalExceptions = JOURNEYS.reduce((s, j) => s + j.openExceptions, 0);
  const totalValue = JOURNEYS.reduce((s, j) => s + j.yearlyValue, 0);

  const exceptionsChartData = JOURNEYS.map(j => ({
    name: j.name.split(':')[0].trim(),
    exceptions: j.openExceptions,
    color: j.openExceptions > 8 ? '#D9483B' : j.openExceptions > 4 ? '#E0992E' : '#5DA831',
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Summary tiles */}
      <div>
        <SectionHeader
          title="End-to-End Journey Ownership"
          subtitle="Each journey is owned by one named Global Process Owner who is accountable for the full flow across all teams and markets, including every hand-off and exception."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          <MetricTile label="Journeys Owned" value={totalJourneys} sub="End-to-end customer journeys" color="blue" />
          <MetricTile label="Average Touchless Rate" value={`${avgTouchless}%`} sub="Journeys completed with no human step" color={avgTouchless >= 65 ? 'green' : 'amber'} tooltip="Share of journeys completed end-to-end with no human intervention. This is different from resolved-without-a-person, which measures single interactions." />
          <MetricTile label="Open Exceptions" value={totalExceptions} sub="Hand-offs awaiting resolution" color={totalExceptions > 20 ? 'red' : 'amber'} tooltip="Exceptions are cases where a hand-off between teams has stalled or failed and needs the process owner to intervene." />
          <MetricTile label="Total Journey Value" value={`$${totalValue.toFixed(0)}M`} sub="Combined yearly value across all journeys" color="blue" />
        </div>
      </div>

      {/* Exceptions table + chart */}
      <div className="grid-2col">
        <Card>
          <SectionHeader
            title="Exceptions Between Teams"
            subtitle="Where hand-offs are stalling. Each row is a live exception that the process owner needs to resolve."
          />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E1E8F1' }}>
                  {['Journey', 'Teams Involved', 'Owner', 'Open', 'Issue'].map(h => (
                    <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#8290A6', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {JOURNEYS.filter(j => j.openExceptions > 0).sort((a, b) => b.openExceptions - a.openExceptions).map(j => (
                  <tr key={j.id} style={{ borderBottom: '1px solid #F3F6FB' }}>
                    <td style={{ padding: '10px 10px', fontWeight: 600, color: '#16273D', whiteSpace: 'nowrap', fontSize: 12 }}>{j.name.split(':')[0]}</td>
                    <td style={{ padding: '10px 10px', color: '#54657E', fontSize: 11 }}>
                      {j.steps.filter(s => s.handoffStatus === 'manual-gap').map(s => s.team).join(' / ') || j.steps[0].team + ' / ' + j.steps[1]?.team}
                    </td>
                    <td style={{ padding: '10px 10px', color: '#54657E', whiteSpace: 'nowrap', fontSize: 11 }}>{j.owner}</td>
                    <td style={{ padding: '10px 10px' }}>
                      <span className="mono" style={{ fontWeight: 700, color: j.openExceptions > 8 ? '#D9483B' : j.openExceptions > 4 ? '#E0992E' : '#5DA831', fontSize: 14 }}>{j.openExceptions}</span>
                    </td>
                    <td style={{ padding: '10px 10px', color: '#54657E', fontSize: 11, lineHeight: 1.4 }}>{j.exceptionDetails.split(' — ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Open Exceptions by Journey"
            subtitle="How many unresolved hand-off exceptions each journey is carrying right now."
          />
          <ResponsiveContainer width="100%" height={Math.max(160, exceptionsChartData.length * 36 + 60)}>
            <BarChart data={exceptionsChartData} margin={{ top: 4, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F1" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8290A6' }} angle={-25} textAnchor="end" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#8290A6' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [v, 'Open Exceptions']} contentStyle={{ background: '#fff', border: '1px solid #E1E8F1', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="exceptions" radius={[4, 4, 0, 0]}>
                {exceptionsChartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Touchless rate chart */}
      <Card>
        <SectionHeader
          title="Touchless Rate by Journey"
          subtitle="What share of each journey completes end-to-end with no human step. Target is 75%."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {JOURNEYS.map(j => (
            <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ minWidth: 120, maxWidth: 200, width: '30%', fontSize: 12.5, fontWeight: 500, color: '#16273D', flexShrink: 0 }}>{j.name.split(':')[0]}</div>
              <div style={{ flex: 1 }}>
                <ProgressBar
                  value={j.touchlessRate}
                  target={75}
                  color={j.touchlessRate >= 65 ? 'green' : j.touchlessRate >= 45 ? 'amber' : 'red'}
                  height={10}
                />
              </div>
              <span className="mono" style={{ width: 40, fontSize: 13, fontWeight: 700, color: '#16273D', textAlign: 'right' }}>{j.touchlessRate}%</span>
            </div>
          ))}
          <div style={{ fontSize: 11, color: '#8290A6', marginTop: 4 }}>The vertical line marks the 75% target.</div>
        </div>
      </Card>

      {/* Journey cards */}
      <div>
        <SectionHeader
          title="Journey Detail"
          subtitle="Click any journey to expand the full hand-off chain and performance metrics."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {JOURNEYS.map(journey => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
      </div>

    </div>
  );
}
