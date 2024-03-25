/* eslint-disable react/jsx-key */
import { TokenPair } from "@/app/components/TokenPair";
import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest, { params }: { params: any }) {
  const data = await getData();
  const pageIndex = Math.min(4, Math.abs(Number(req.nextUrl.searchParams.get('pageIndex') || 0)));
  const token0 = data[pageIndex * 2 + 0];
  const token1 = data[pageIndex * 2 + 1];
  return new ImageResponse(
    <TokenPair tokenList={[token0, token1]} />,
    {
      width: 1200,
      height: 630,
    }
  )
};
