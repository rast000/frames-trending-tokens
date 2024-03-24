"use server"
import { GraphQLClient, gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";
import { init, fetchQuery } from "@airstack/node";
import { TokenInfoProps } from "@/app/components/TokenInfo";

init(process.env.AIRSTACK_API_KEY || "");

const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1`;

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

interface Token {
  timestamp: string,
  amount0: string,
  amount1: string,
}

// const noCacheFetch = async (url: string, options: RequestInit) =>
//   fetch(url, options);

export async function GET(req: NextRequest, { params }: { params: any }) {
  const tokenId = params.tokenId;
  const query = `query MyQuery {
    Tokens(
      input: {filter: {address: {_eq: "${tokenId}"}}, blockchain: base, limit: 10, cursor: ""}
    ) {
      Token {
        name
        symbol
        decimals
        logo {
          small
        }
      }
    }
  }`;
  const swaps = gql`{
    token: token(id: "${tokenId}") {
      name
      symbol
    }
    wethToken: swaps(first: 100, where:{token0: "0x4200000000000000000000000000000000000006", token1: "${tokenId}"}, orderBy: timestamp, orderDirection: desc)
    {
      timestamp
      amount0
      amount1
    }
  }`;

  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    fetch,
    cache: "no-store",
  });

  const format = (t: Token) => ({ timestamp: parseFloat(t.timestamp), price: Math.abs(parseFloat(t.amount0)/parseFloat(t.amount1)) })

  const { data: tokenData, error }: QueryResponse = await fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }

  const response: any = await graphQLClient.request(swaps);
  if (response?.wethToken && tokenData.Tokens.Token.length != 0) {
    const tokenInfo: TokenInfoProps = {
      swaps: response.wethToken.map(format).reverse(),
      token: {
        name: tokenData.Tokens.Token[0].name,
        symbol: tokenData.Tokens.Token[0].symbol,
        logo: {
          small: tokenData.Tokens.Token[0].logo.small
        }
      }
    }
    return Response.json(tokenInfo);
  } else {
    return Response.json({ message: "fetchingError" });
  }
}
