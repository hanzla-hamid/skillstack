import React from "react";
import { Link as RouterLink, useRouter, useRouterState } from "@tanstack/react-router";

/**
 * Thin compatibility layer so the existing pages keep their simple
 * `href` based navigation API while routing runs on TanStack Router.
 */

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: React.ReactNode;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, onClick, ...rest }, ref) => {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) {
      return (
        <a ref={ref} href={href} onClick={onClick} {...rest}>
          {children}
        </a>
      );
    }
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      // Same-route clicks (e.g. logo while already on home) don't trigger a
      // route change, so scroll back to the top manually.
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
      }
    };
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <RouterLink ref={ref} to={href as any} onClick={handleClick} {...(rest as any)}>
        {children}
      </RouterLink>
    );
  },
);

Link.displayName = "Link";

export function useLocation(): [string, (to: string) => void] {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = React.useCallback(
    (to: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      void router.navigate({ to: to as any });
    },
    [router],
  );
  return [pathname, navigate];
}

export function useRoute(pattern: string): [boolean, Record<string, string> | null] {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const keys: string[] = [];
  const regex = new RegExp(
    "^" +
      pattern
        .split("/")
        .map((seg) => {
          if (seg.startsWith(":")) {
            keys.push(seg.slice(1).replace(/\?$/, ""));
            return "([^/]+)";
          }
          return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        })
        .join("/") +
      "/?$",
  );
  const match = regex.exec(pathname);
  if (!match) return [false, null];
  const params: Record<string, string> = {};
  keys.forEach((k, i) => {
    params[k] = decodeURIComponent(match[i + 1]);
  });
  return [true, params];
}
