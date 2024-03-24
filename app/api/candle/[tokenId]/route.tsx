"use server"

import { GraphQLClient, gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";
import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY || "");

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1`;

// const noCacheFetch = async (url: string, options: RequestInit) =>
//   fetch(url, options);

interface Token {
  timestamp: string,
  amount0: string,
  amount1: string,
}

export async function GET(req: NextRequest, { params }: { params: any }) {
  const tokenId = params.tokenId;
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

  const response: any = await graphQLClient.request(swaps);
  if (response?.wethToken) {
    return Response.json(response.wethToken.map(format).reverse());
  } else {
    return Response.json({ message: "fetchingError" })
  }
}
