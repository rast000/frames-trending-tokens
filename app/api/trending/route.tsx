"use server"
import { GraphQLClient, gql } from "graphql-request";
import { init, fetchQuery } from "@airstack/node";
import { TokenProps } from "@/app/components/TokenList";

init(process.env.AIRSTACK_API_KEY || "");

interface QueryResponse {
  data: Data;
  error: Error;
}

interface Data {
  Wallet: Wallet;
}

interface Error {
  message: string;
}

interface Wallet {
  socials: Social[];
  addresses: string[];
}

interface Social {
  dappName: "lens" | "farcaster";
  profileName: string;
}

const query = `query MyQuery {
  TrendingTokens(
    input: {transferType: all, timeFrame: one_hour, audience: farcaster, blockchain: base, criteria: unique_wallets}
  ) {
    TrendingToken {
      address
      criteria
      audience
      criteriaCount
      token {
        name
        symbol
        totalSupply
        logo {
          small
        }
      }
    }
  }
}`;

// const noCacheFetch = async (url: string, options: RequestInit) =>
//   fetch(url, options);

export async function GET() {
  const { data, error }: QueryResponse = await fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }
  if (data.TrendingTokens.TrendingToken.length != 0) {
    const tokenInfo: TokenProps = data.TrendingTokens.TrendingToken.map(t => {
      return {
        name: t.token.name,
        symbol: t.token.symbol,
        address: t.address,
        logo: {
          small: t.token.logo?.small || `${process.env.NEXT_PUBLIC_DOMAIN}/empty.png`
        }
      }
    })
    return Response.json(tokenInfo);
  } else {
    return Response.json({ message: "fetchingError" });
  }
}
