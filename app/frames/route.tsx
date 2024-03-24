/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw="flex w-full h-full flex-col items-center">
        <img tw="absolute" style={{ opacity: 0.25 }} src={process.env.NEXT_PUBLIC_DOMAIN + "/example.png"} />
        <div tw="flex flex-row h-full items-center"><h2>🔥🔥🔥 Trending on Base</h2></div>
      </div>
    ),
    buttons: [
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/trending"}>
        👀 View
      </Button>,
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap"}>
        🦄 Uniswap Info
      </Button>
    ],
    accepts: [{
      id: 'farcaster',
      version: 'vNext'
  },{
      id: 'xmtp',
      version: 'vNext'
  }]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
