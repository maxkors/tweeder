import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/tweets/:id", "/users/:id"],
};
