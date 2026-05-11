"use client";
import Link from "next/link";
import { useSiteSettings } from "@/context/site-settings-context";
import { useTheme } from "@/components/theme/theme-provider";

const Logo = ({ footer = false }: { footer?: boolean }) => {
  const { site } = useSiteSettings();
  const { resolvedTheme } = useTheme();
  const lightLogo =
    site.lightLogoUrl || site.logoUrl || "/assets/kasa-logo-light.png";
  const darkLogo =
    site.darkLogoUrl ||
    site.footerLogoUrl ||
    site.logoUrl ||
    "/assets/kasa-logo-dark.png";
  const src = resolvedTheme === "dark" ? darkLogo : lightLogo;
  const wrapperClass = footer
    ? "flex min-w-0 items-center justify-center md:justify-start"
    : "flex min-w-0 items-center justify-center md:justify-start";

  return (
    <Link href="/" className={wrapperClass}>
      <div className="relative h-14 w-40 sm:h-15 sm:w-40 md:h-16 md:w-45">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={site.siteName || "logo"}
          src={src}
          width={250}
          height={60}
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
