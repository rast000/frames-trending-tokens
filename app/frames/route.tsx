/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: process.env.NEXT_PUBLIC_DOMAIN + "/api/image/main",
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
