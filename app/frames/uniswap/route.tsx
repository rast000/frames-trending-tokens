/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const type = ctx.searchParams.type || "native";

  return {
    image: process.env.NEXT_PUBLIC_DOMAIN + `/api/image/uniswap?type=${type}`,
    buttons: [
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames"}>🏠 Home</Button>,
      (type != "native" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=native"}>💎 ETH</Button> : null),
      (type != "usd" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=usd"}>💵 USD</Button> : null),
      (type != "tx" ? <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/uniswap?type=tx"}>🧾 Tx</Button> : null)
    ],
    accepts: [{
      id: 'farcaster',
      version: 'vNext'
    }, {
      id: 'xmtp',
      version: 'vNext'
    }]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
