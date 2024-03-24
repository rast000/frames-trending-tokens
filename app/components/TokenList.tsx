export interface TokenProps {
  name: string
  address: string
  symbol: string
  logo?: {
    small: string
  }
}

export function TokenListToken({ token }: { token: TokenProps }) {
  // console.log(token)
  return <div tw="flex w-full items-center space-x-4 rtl:space-x-reverse">
    <div tw="flex flex-shrink-0">
      <img tw="h-8 w-8 rounded-full" src={token.logo?.small || `${process.env.NEXT_PUBLIC_DOMAIN}/empty.png`} />
    </div>
    <div tw="min-w-0 w-full flex flex-1">
      <p tw="truncate text-sm font-medium text-gray-900 dark:text-white">{token.name}</p>
      <p tw="truncate text-sm ml-2 text-gray-500 dark:text-gray-400">{token.symbol}</p>
    </div>
    <div tw="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{}</div>
  </div>
}

export function TokenList({ tokenList }: { tokenList: TokenProps[] }) {
  return <div tw="flex  w-full h-full flex-col items-center justify-between p-24">
    <div tw="flex w-full max-w m-8 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <div tw="flex w-full flex-1 p-8">
        <ul tw="flex w-full flex-col flex-1  divide-y divide-gray-200 dark:divide-gray-700">
          {tokenList.map((t, i) => <li key={i} tw="pb-3 sm:pb-4"><TokenListToken token={t} /></li>)}
        </ul>
      </div>
    </div>
  </div>
}
