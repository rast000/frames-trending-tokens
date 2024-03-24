/* eslint-disable react/jsx-key */
import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  return new ImageResponse(
      <div tw="flex w-full h-full flex-col items-center">
        <img tw="absolute" style={{ opacity: 0.25 }} src={process.env.NEXT_PUBLIC_DOMAIN + "/example.png"} />
        <div tw="flex flex-row h-full items-center"><h1 style={{ fontSize: "60px"}} >🔥🔥🔥 Trending on Base</h1></div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
  )
};
