/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
 
const handleRequest = frames(async (ctx) => {
  return {
    image: process.env.NEXT_PUBLIC_DOMAIN + `/api/image/token/${ctx.searchParams.token}`,
    buttons: [
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames"}>🏠 Home</Button>,
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/trending"}>🔙 Back</Button>,
    ],
    accepts: [{
      id: 'farcaster',
      version: 'vNext'
    }, {
      id: 'xmtp',
      version: 'vNext'
    }],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
