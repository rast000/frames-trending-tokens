export interface BarProps {
  value: number,
  date: number
}
export function Bar({ bar, valueMax }: { bar: BarProps, valueMax: number }) {
  return <div tw="ml-2 relative flex flex-col items-center flex-grow pb-5 group">
    <span tw="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">{bar.value}</span>
    <div tw={`rounded-t-lg relative flex justify-center w-full bg-indigo-400 h-${Math.floor((bar.value / valueMax) * 24) * 4}`}></div>
  </div>
}