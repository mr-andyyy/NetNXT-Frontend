"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Logo from "../public/Logos/logo.png";

const LayoutWithLogo = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Show logo only on these paths
  const showLogo = pathname === "/get-solutions";

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {showLogo && (
        <div
          className="p-6 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src={Logo} alt="NetNXT Logo" width={80} height={40} />
        </div>
      )}
      <main>{children}</main>
    </div>
  );
};

export default LayoutWithLogo;
