import Image from "next/image";
import Hero from "../components/Hero";
import NewProducts from "@/components/NewProducts";



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start bg-gray-100 p-4 sm:p-8 sm:min-h-screen">
      <Hero />
    </main>
  );
}
