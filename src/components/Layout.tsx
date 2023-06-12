import Header from "./Header";
import Footer from "./Footer";
import { type ReactNode } from "react";
import useIsMobile from "src/helpers/isMobile";
import MobileNavigator from "./MobileNavigator";
export default function Layout({ children }: { children: ReactNode }) {
  const { isMobile } = useIsMobile();

  return (
    <div>
      <Header />
      {isMobile && <MobileNavigator></MobileNavigator>}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
