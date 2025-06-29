import Link from "next/link";
import MiloLogo from "./MiloLogo";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F8F8F4] px-4 text-center">
      <MiloLogo />
      <h1 className="text-4xl md:text-5xl font-bold mt-6 text-[#2A2F2E]">
        You’re not alone. <br /> Milo’s here.
      </h1>
      <p className="text-gray-600 text-lg mt-4 max-w-md">
        A warm, friendly AI that listens, supports, and helps you reflect — whenever you need.
      </p>
      <Link
        href="/chat"
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-800 transition"
      >
        Start Free Trial
      </Link>
    </div>
  );
}
