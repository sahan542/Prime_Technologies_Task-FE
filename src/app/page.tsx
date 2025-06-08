import Image from "next/image";
import Hero from "../components/Hero";
import NewProducts from "@/components/NewProducts";



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Hero />
    </main>
  );
}
