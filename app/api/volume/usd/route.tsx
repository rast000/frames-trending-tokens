"use server"

import { GraphQLClient, gql } from "graphql-request";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/HMuAwufqZ1YCRmzL2SfHTVkzZovC9VL2UAKhjvRqKiR1`;

// const noCacheFetch = async (url: string, options: RequestInit) =>
//   fetch(url, options);

export async function GET() {
  const document = gql`{
    uniswapDayDatas(where:{ date_in: [1692835200, 1694563200, 1696291200, 1698019200, 1699747200, 1701475200, 1703203200, 1704931200, 1706659200, 1708387200] }){
      date
      volumeUSD
    }
  }`;

  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    fetch,
  });

  const response: any = await graphQLClient.request(document);
  if (response?.uniswapDayDatas) {
    return Response.json(response?.uniswapDayDatas.map(({ volumeUSD }) => ({ value: volumeUSD })));
  } else {
    return Response.json({ message: "fetchingError" });
  }
}
