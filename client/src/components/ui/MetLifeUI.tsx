// MetLife EMEA AI Command Center — Shared UI Primitives
import React, { useState } from 'react';
import { Info } from 'lucide-react';

export type StatusColor = 'green' | 'amber' | 'red' | 'blue' | 'gray';

export const STATUS_COLORS: Record<StatusColor, string> = {
  green: '#5DA831',
  amber: '#E0992E',
  red: '#D9483B',
  blue: '#0090DA',
  gray: '#8290A6',
};

export const STATUS_BG: Record<StatusColor, string> = {
  green: '#F0F9E8',
  amber: '#FEF6E7',
  red: '#FEF0EF',
  blue: '#E8F4FD',
  gray: '#F3F6FB',
};

export const STATUS_TEXT: Record<StatusColor, string> = {
  green: '#3A7A1A',
  amber: '#9A6010',
  red: '#A02020',
  blue: '#005A8A',
  gray: '#54657E',
};

export function StatusDot({ color, size = 8 }: { color: StatusColor; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: STATUS_COLORS[color],
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
}

export function StatusBadge({ color, label }: { color: StatusColor; label: string }) {
  return (
    <span
      style={{
        background: STATUS_BG[color],
        color: STATUS_TEXT[color],
        border: `1px solid ${STATUS_COLORS[color]}33`,
        borderRadius: 20,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        whiteSpace: 'nowrap',
      }}
    >
      <StatusDot color={color} size={6} />
      {label}
    </span>
  );
}

export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(v => !v)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#8290A6' }}
        aria-label="More information"
      >
        <Info size={13} />
      </button>
      {open && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 6,
            background: '#16273D',
            color: '#fff',
            fontSize: 11.5,
            lineHeight: 1.5,
            padding: '7px 11px',
            borderRadius: 7,
            width: 220,
            zIndex: 100,
            boxShadow: '0 4px 16px rgba(22,39,61,0.18)',
            pointerEvents: 'none',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
      <div>
        <div className="section-heading">{title}</div>
        {subtitle && <div className="section-subtext">{subtitle}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Card({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`ml-card ${className || ''}`} style={{ padding: '20px 24px', ...style }}>
      {children}
    </div>
  );
}

export function MetricTile({
  label,
  value,
  unit,
  sub,
  color,
  tooltip,
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  color?: StatusColor;
  tooltip?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="ml-card" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {icon && <span style={{ color: '#0090DA', display: 'flex' }}>{icon}</span>}
          <span style={{ fontSize: 12, fontWeight: 600, color: '#54657E', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        </div>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span
          className="mono"
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: color ? STATUS_COLORS[color] : '#16273D',
            lineHeight: 1.1,
          }}
        >
          {value}
        </span>
        {unit && <span style={{ fontSize: 13, color: '#54657E', fontWeight: 500 }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#8290A6', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export function ProgressBar({
  value,
  target,
  color = 'blue',
  height = 6,
}: {
  value: number;
  target?: number;
  color?: StatusColor;
  height?: number;
}) {
  const pct = Math.min(100, Math.max(0, value));
  const targetPct = target ? Math.min(100, Math.max(0, target)) : undefined;
  return (
    <div style={{ position: 'relative', background: '#E1E8F1', borderRadius: height, height, overflow: 'visible' }}>
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: STATUS_COLORS[color],
          borderRadius: height,
          transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      {targetPct !== undefined && (
        <div
          style={{
            position: 'absolute',
            top: -3,
            left: `${targetPct}%`,
            width: 2,
            height: height + 6,
            background: '#16273D',
            borderRadius: 1,
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </div>
  );
}

export function ScoreGauge({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = Math.PI * radius; // half circle
  const dashOffset = circumference * (1 - score / 100);
  const color = score < 45 ? '#5DA831' : score <= 60 ? '#E0992E' : '#D9483B';

  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      {/* Track */}
      <path
        d={`M 5 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 5} ${size / 2}`}
        fill="none"
        stroke="#E1E8F1"
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* Value */}
      <path
        d={`M 5 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 5} ${size / 2}`}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.23,1,0.32,1)' }}
      />
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize={18} fontWeight={700} fill={color} fontFamily="JetBrains Mono, monospace">
        {score}
      </text>
    </svg>
  );
}

export function FunnelChart({ stages }: { stages: { label: string; count: number; color: string }[] }) {
  const max = Math.max(...stages.map(s => s.count));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {stages.map((stage, i) => {
        const widthPct = 40 + (stage.count / max) * 60;
        return (
          <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 80, fontSize: 12, color: '#54657E', textAlign: 'right', flexShrink: 0 }}>{stage.label}</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: `${widthPct}%`,
                  height: 28,
                  background: stage.color,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 10,
                  transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
                  opacity: 1 - i * 0.08,
                }}
              >
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{stage.count}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
