import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, res) {
    if (auth.userId && auth.isPublicRoute) {
      let path = process.env.NEXT_PUBLIC_URL_SELECT_ORG;

      if (auth.orgId) {
        path = process.env.NEXT_PUBLIC_URL_NEWS + "/" + auth.orgId;
        console.log(path);
      }

      const orgSelection = new URL(path!, req.url);

      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // console.log(req.nextUrl.pathname);

    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== process.env.NEXT_PUBLIC_URL_SELECT_ORG
    ) {
      const orgSelection = new URL(
        // process.env.NEXT_PUBLIC_URL_SELECT_ORG!,
        auth.userId,
        req.url
      );

      return NextResponse.redirect(orgSelection);
    }
  },
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
