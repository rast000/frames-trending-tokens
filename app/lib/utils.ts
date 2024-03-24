import { headers } from "next/headers";

export interface Tick {
  timestamp: number,
  price: number
}

export interface Candle {
  timestamp: number,
  open: number,
  high: number,
  low: number,
  close: number,
}

export function convertTicksToCandlesticks(tickData: Tick[], intervalInMs: number) {
  const candlesticks: Candle[] = [];
  let currentCandle: Candle | null = null;

  for (const tick of tickData) {
      const candleTimestamp = Math.floor(tick.timestamp / intervalInMs) * intervalInMs;

      // New candle period 
      if (!currentCandle || currentCandle.timestamp !== candleTimestamp) {
        let open = tick.price
        if (currentCandle && currentCandle.open) {
          open = currentCandle.close
          candlesticks.push(currentCandle);                
        }
        currentCandle = { 
            open: open,
            high: tick.price,
            low: tick.price,
            close: tick.price, // Will be updated within the candle period
            timestamp: candleTimestamp 
        };
      }

      currentCandle.high = Math.max(currentCandle.high, tick.price);
      currentCandle.low = Math.min(currentCandle.low, tick.price);
      currentCandle.close = tick.price; 
  }

  if (currentCandle) candlesticks.push(currentCandle); 

  return candlesticks;
}

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  try {
    return new URL(pathname, `${protocol}://${host}`);
  } catch (error) {
    return new URL(process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000");
  }
}

export function vercelURL() {
  return process.env.NEXT_PUBLIC_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
    : undefined;
}
