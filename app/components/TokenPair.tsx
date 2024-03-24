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
  return <div style={{ "display": "flex", "flexGrow": "1", "marginLeft": "1rem", "flexDirection": "column", "alignItems": "center" }}>
    <p style={{ "color": "#111827" }}>{token.name}</p>
    <p style={{ "marginLeft": "0.5rem", "color": "#6B7280" }}>{token.symbol}</p>
    <img style={{ "borderRadius": "50%", width: "15rem", height: "15rem" }} src={token.logo?.small || `${process.env.NEXT_PUBLIC_DOMAIN}/empty.png`} />
  </div>
}

export function TokenPair({ tokenList }: { tokenList: TokenProps[] }) {
  const [token0, token1] = tokenList;
  return <div style={{
    "display": "flex",
    "padding": "6rem",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "100%",
    "height": "100%",
  }}>
    <div style={{
      "display": "flex",
      "padding": "1.5rem",
      "margin": "2rem",
      "backgroundColor": "#ffffff",
      "flex": "1 1 0%",
      "borderRadius": "0.5rem",
      "borderWidth": "1px",
      "borderColor": "#E5E7EB",
      "boxShadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    }}>
      <TokenCard token={token0} />
    </div>
    <div style={{
      "display": "flex",
      "padding": "1.5rem",
      "margin": "2rem",
      "backgroundColor": "#ffffff",
      "flex": "1 1 0%",
      "borderRadius": "0.5rem",
      "borderWidth": "1px",
      "borderColor": "#E5E7EB",
      "boxShadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    }}>
      <TokenCard token={token1} />
    </div>

  </div>
}
