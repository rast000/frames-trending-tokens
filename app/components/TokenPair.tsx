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
  return <div style={{ "display": "flex", "flexGrow": "1", "flexDirection": "column", "alignItems": "center",
    border: "1px solid #6B7280", margin: "20px", padding: "20px", paddingBottom: "40px", borderRadius: "30px"
   }}>
    <div style={{ "display": "flex" }}>
    <p tw="overflow-x-clip" style={{ "color": "#111827" }}>{token.name}</p>
    <p style={{ "marginLeft": "10px", "color": "#6B7280" }}>{token.symbol}</p>
    </div>
    <img style={{ "borderRadius": "64px", width: "250px", height: "250px" }} src={token.logo?.small || `${process.env.NEXT_PUBLIC_DOMAIN}/empty.png`} />
  </div>
}

export function TokenPair({ tokenList }: { tokenList: TokenProps[] }) {
  const [token0, token1] = tokenList;
  return <div style={{
    "display": "flex",
    "padding": "60px",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "100%",
    "height": "100%",
  }}>
    <TokenCard token={token0} />
    <TokenCard token={token1} />
  </div>
}
