export interface TokenProps {
  name: string
  address: string
  symbol: string
  logo?: {
    small: string
  }
}

export function TokenCard({ token }: { token: TokenProps }) {
  // console.log(token)
  return <div tw="flex flex-col border-2 flex-1 items-center space-x-4 rtl:space-x-reverse">
    <div tw="flex text-4xl">
      <p tw="truncate font-medium text-gray-900 dark:text-white truncate">{token.name}</p>
      <p tw="truncate ml-2 text-gray-500 dark:text-gray-400">{token.symbol}</p>
    </div>
    <div tw="flex">
      <img tw="h-60 w-60 rounded-full" src={token.logo?.small || `${process.env.NEXT_PUBLIC_DOMAIN}/empty.png`} />
    </div>
  </div>
}

export function TokenPair({ tokenList }: { tokenList: TokenProps[] }) {
  const [token0, token1] = tokenList;
  return <div tw="flex  w-full h-full flex-row items-center justify-between p-24">
    <div tw="flex flex-1 max-w m-8 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <div tw="flex w-full flex-1 p-8">
        <ul tw="flex flex-row flex-1  divide-y divide-gray-200 dark:divide-gray-700">
          <TokenCard token={token0}/>
        </ul>
      </div>
    </div>
    <div tw="flex flex-1 max-w m-8 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <div tw="flex w-full flex-1 p-8">
        <ul tw="flex flex-row flex-1  divide-y divide-gray-200 dark:divide-gray-700">
          <TokenCard token={token1}/>
        </ul>
      </div>
    </div>

  </div>
}
