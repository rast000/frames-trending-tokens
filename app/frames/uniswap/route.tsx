/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { BarChart } from "@/app/components/BarChart";

async function getData(type: string) {
  const selectApi = (type: string) => {
    switch (type) {
      case "native": return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/volume/native`);
      case "tx": return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/volume/tx`);
      case "usd": return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/volume/usd`);
      default: return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/volume/native`);
    }
  }
  const res = await selectApi(type);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


const handleRequest = frames(async (ctx) => {
  const type = ctx.searchParams.type || "native";
  const data = await getData("native");

  const selectChart = (type: string) => {
    switch (type) {
      case "native": return <BarChart title="🦄 Uniswap V3 ETH Volume on Base" barData={data} />
      case "tx": return <BarChart title="🦄 Uniswap V3 Transaction Volume on Base" barData={data} />
      case "usd": return <BarChart title="🦄 Uniswap V3 USD Volume on Base" barData={data} />
      default: return <BarChart title="🦄 Uniswap V3 ETH Volume on Base" barData={data} />
    }
  }

  return {
    image: (
      selectChart(type)
    ),
    buttons: [
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/"}>🏠 Home</Button>,
      (type != "native" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=native"}>💎 ETH</Button> : null),
      (type != "usd" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=usd"}>💵 USD</Button> : null),
      (type != "tx" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=tx"}>🧾 Tx</Button> : null)
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
