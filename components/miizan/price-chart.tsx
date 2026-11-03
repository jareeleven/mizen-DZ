'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function PriceChart({ data, unit }: { data: { week: string; price: number }[]; unit: string }) {
  return (
    <div className="h-48 w-full md:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="miizanArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A84FF" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#0A84FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: '#8B98AD', fontSize: 11 }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={48}
            domain={['dataMin - 5', 'dataMax + 5']}
            tick={{ fill: '#8B98AD', fontSize: 11 }}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(10,132,255,0.5)', strokeDasharray: '4 4' }}
            contentStyle={{
              background: 'rgba(17,26,46,0.9)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              backdropFilter: 'blur(12px)',
              color: '#F0F4F8',
              fontSize: 12,
            }}
            formatter={(v) => [`${v} DA/${unit}`, 'Détail']}
          />
          <Area type="monotone" dataKey="price" stroke="#0A84FF" strokeWidth={2.5} fill="url(#miizanArea)" activeDot={{ r: 5, fill: '#0A84FF', stroke: '#F0F4F8', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
