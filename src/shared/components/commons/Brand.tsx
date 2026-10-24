import Link from "next/link";
import { APP_NAME } from "@/shared/constants/Site";
import CatMark from "./CatMark";

type BrandProps = {
  href?: string;
};

export default function Brand({ href = "/chat" }: BrandProps) {
  return (
    <Link href={href} className="flex w-fit items-center gap-2">
      <CatMark size={36} />
      <span className="font-heading text-2xl font-semibold tracking-tight">{APP_NAME}</span>
    </Link>
  );
}