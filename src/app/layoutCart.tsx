import Navbar from "@/components/shared/Ui/Navbar/Navbar";
import WhatsAppLive from "@/components/shared/Ui/WhatsAppLive";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <WhatsAppLive />
    </div>
  );
};

export default CommonLayout;
