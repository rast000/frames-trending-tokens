import { Bar, BarProps } from "@/app/components/Bar";

export function BarChart({ title, barData }: { title: string, barData: BarProps[] }) {
  const valueMax = Math.max(...barData.map(({ value }) => value));
  return <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    }}
    tw="p-8"
  >
    <div tw="flex flex-col items-center w-full h-full p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8">
      <h1 tw="text-2xl font-bold">{title}</h1>
      <div tw="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
        {barData.map((bar, i) => <Bar key={i} bar={bar} valueMax={valueMax} />)}
      </div>
    </div>
  </div>
}