import { Tick, convertTicksToCandlesticks } from "@/app/lib/utils";
import { Candle } from "@/app/components/Candle"

export function CandleChart({ data }: { data: Tick[] }) {
  const candles = convertTicksToCandlesticks(data, 60).slice(-20);
  const ceil = Math.max(...candles.map(c => c.high))
  const floor = Math.min(...candles.map(c => c.low))

  return <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    tw="p-8"
  >
    <div style={{
      inset: 0,
      backgroundImage: `radial-gradient(#5e5e5e 0px, transparent 6%)`,
    //   backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px),
    // linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
      backgroundSize: `80px 40px`,

      backgroundOrigin: `border-box`
    }}
      tw="flex flex-col items-center w-full h-full p-6 pb-6 bg-white rounded-lg sm:p-8">
      <div tw="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
        {candles.map((c, i) => <Candle key={i} {...c} floor={floor} ceil={ceil} />)}
      </div>
    </div>
  </div>
}