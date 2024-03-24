/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { TokenPair } from "@/app/components/TokenPair";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/trending`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  const data = await getData();
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const token0 = data[pageIndex * 2 + 0];
  const token1 = data[pageIndex * 2 + 1];
  return {
    image: (
      <TokenPair tokenList={[token0, token1]} />
    ),
    buttons: [
      pageIndex > 0 ?
        <Button action="post" target={`/trending?pageIndex=${pageIndex - 1}`}>⬅️</Button> :
        <Button action="post" target={`/`}>🏠 Home</Button>,
      <Button action="post" target={`/token?token=${data[pageIndex * 2 + 0].address}`}>{data[pageIndex * 2 + 0].symbol}</Button>,
      <Button action="post" target={`/token?token=${data[pageIndex * 2 + 1].address}`}>{data[pageIndex * 2 + 1].symbol}</Button>,
      pageIndex < totalPages ?
        <Button action="post" target={`/trending?pageIndex=${pageIndex + 1}`}>➡️</Button> :
        <Button action="post" target={`/`}>🏠 Home</Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
