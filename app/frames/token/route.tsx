/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { TokenInfo } from "@/app/components/TokenInfo";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/token/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
const handleRequest = frames(async (ctx) => {
  const data = await getData(ctx.searchParams.token);
  return {
    image: (
      <TokenInfo tokenInfo={data}/>
    ),
    buttons: [
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames"}>🏠 Home</Button>,
      <Button action="post" target={process.env.NEXT_PUBLIC_DOMAIN + "/frames" + "/trending"}>🔙 Back</Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
