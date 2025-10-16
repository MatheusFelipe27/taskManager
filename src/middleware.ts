import { NextResponse, NextRequest } from "next/server";

const PUBLIC_PATH = ["/"];

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const user = req.cookies.get("user")?.value;

  if(user && PUBLIC_PATH.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/management";
    return NextResponse.redirect(url);
  }

  if (!user && !PUBLIC_PATH.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    const res = NextResponse.redirect(url);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/management",
    "/"
  ],
};
