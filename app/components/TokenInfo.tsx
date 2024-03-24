import { convertTicksToCandlesticks, Tick } from "@/app/lib/utils"
import { Candle } from "@/app/components/Candle";

export interface TokenInfoProps {
  swaps: Tick[],
  token: {
    name: string,
    symbol: string
    logo: {
      small: string
    }
  }
}

export function TokenInfo({ tokenInfo }: { tokenInfo: TokenInfoProps }) {
  const candles = convertTicksToCandlesticks(tokenInfo.swaps, 60).slice(-20);
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
  >

    <div style={{
      backgroundImage: `radial-gradient(#5e5e5e 0px, transparent 6%)`,
      backgroundSize: `40px 40px`,

      backgroundOrigin: `border-box`
    }}
      tw="flex text-left flex-col items-center w-full h-full p-6 pb-6 bg-white rounded-lg sm:p-8">
      <div tw="flex w-full flex-row items-center items-left text-left">
        <img src={tokenInfo.token.logo.small} width={32} height={32} />
        <h1 tw="text-2xl ml-2 text-left">{tokenInfo.token.name}
          <span tw="ml-4 text-slate-500">{tokenInfo.token.symbol}</span>
        </h1>
      </div>
      <div tw="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
        {candles.map((c, i) => <Candle key={i} {...c} floor={floor} ceil={ceil} />)}
      </div>
    </div>
  </div>
}