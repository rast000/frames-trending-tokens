import { createFrames } from "frames.js/next";
import { coreMiddleware, openframes } from "frames.js/middleware";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

// farcaster middleware assumes that every valid payload is a farcaster payload so when it recieves xmtp payload it throws TypeError
const farcaster = coreMiddleware[2];
function farcasterPatch() {
  return async (context, next) => {
    try {
      return await farcaster(context, next);
    } catch (e) {
      if (e instanceof TypeError) {
        return next();
      }
      return next();
    }
  }
}
coreMiddleware[2] = farcasterPatch()
 
export const frames = createFrames({
  basePath: "/frames",
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body: JSON) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);
 
          return { ...result };
        },
      },
    }),
  ]
});
