/* eslint-disable react/jsx-key */
import { TokenInfo } from "@/app/components/TokenInfo";
import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/token/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function GET(req: NextRequest, { params }: { params: any }) {
  const data = await getData(params.tokenId);
  return new ImageResponse(
    <TokenInfo tokenInfo={data}/>,
    {
      width: 1200,
      height: 630,
    }
  )
};
