import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", props.className)}
      {...props}
    >
      <path d="M16.17 6.33a4.68 4.68 0 0 1-4.68 4.68v6.33a4.68 4.68 0 1 1-4.68-4.68h4.68" />
      <path d="M16.17 6.33a4.68 4.68 0 0 1 4.68 4.68" />
    </svg>
  );
}
