import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../public/Logos/logo.png";

export default function LogoHeader() {
  const router = useRouter();
  return (
    <header className="w-full flex items-center p-2 sm:p-4 bg-white z-20">
      {/* Removed shadow-sm or border-b */}
      <button
        className="flex items-center"
        style={{ minWidth: 80 }}
        onClick={() => router.push("/")}
        aria-label="Go to homepage"
      >
        <Image
          src={Logo}
          alt="NetNXT Logo"
          className="w-[60px] h-auto sm:w-[70px] md:w-[80px] object-contain"
          priority
        />
      </button>
    </header>
  );
}