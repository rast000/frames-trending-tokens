/* eslint-disable react/jsx-key */
import { BarChart } from "@/app/components/BarChart";
import { TokenPair } from "@/app/components/TokenPair";
import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest, { params }: { params: any }) {
  const type = req.nextUrl.searchParams.get('type') || "native";
  const data = await getData("native");

  const selectChart = (type: string) => {
    switch (type) {
      case "native": return <BarChart title="🦄 Uniswap V3 ETH Volume on Base" barData={data} />
      case "tx": return <BarChart title="🦄 Uniswap V3 Transaction Volume on Base" barData={data} />
      case "usd": return <BarChart title="🦄 Uniswap V3 USD Volume on Base" barData={data} />
      default: return <BarChart title="🦄 Uniswap V3 ETH Volume on Base" barData={data} />
    }
  }
  return new ImageResponse(
    selectChart(type),
    {
      width: 1200,
      height: 630,
    }
  )
};
