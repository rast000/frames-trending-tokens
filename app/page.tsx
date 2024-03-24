import { currentURL, vercelURL } from "@/app/lib/utils";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frame Trending Tokens",
    description: "Frame Trending Tokens",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          vercelURL() || process.env.NEXT_PUBLIC_DOMAIN
        )
      )),
    },
  };
}

export default async function Home() {
  return (
    <div>
      Frame Trending Tokens: View Trending Tokens and Token Info inside Farcaster
      <Image width={600} height={300} src="/example.png" />
    </div>
  );
}
