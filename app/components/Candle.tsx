export function Candle({ open, close, high, low, floor, ceil }: { open: number, close: number, high: number, low: number, floor: number, ceil: number }) {
  const yStart = open < close ? open : close;
  const yEnd = open < close ? close : open;
  const isBullish = close > open;
  const color = isBullish ? 'green' : 'red';
  const height = Math.abs(ceil - floor);

  const topHeight = Math.floor(((high - yEnd) / height) * 9600) / 100;
  const bodyHeight = Math.floor(((Math.abs(open - close)) / height) * 9600) / 100;
  const lowHeight = Math.floor(((yStart - low) / height) * 9600) / 100;
  const lowPad = Math.floor(((Math.min(yStart, low) - floor) / height) * 9600) / 100;

  return <div tw="ml-2 relative flex flex-col items-center flex-grow pb-5 group">
    <div tw={`relative flex h-${topHeight} w-1 justify-center rounded-t-lg bg-${color}-400`}></div>
    <div tw={`relative flex h-${bodyHeight} w-full justify-center rounded-lg bg-${color}-400`}></div>
    <div tw={`relative flex h-${lowHeight} w-1 justify-center rounded-b-lg bg-${color}-400`}></div>
    <div tw={`h-${lowPad}`}></div>
  </div>
}