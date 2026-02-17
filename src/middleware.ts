import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|ja|ko|zh|es)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
