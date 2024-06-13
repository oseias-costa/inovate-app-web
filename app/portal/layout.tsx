"use client";
import Header from "../_lib/_components/Header";
import Menu from "../_lib/_components/Menu";
import { useObserveElementWidth } from "../_lib/_hooks/useObserveElementWidth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { width, ref } = useObserveElementWidth();
  const mobile = width < 840;

  return (
    <div style={{ paddingLeft: "0px" }} ref={ref}>
      <Header />
      <div style={{ paddingTop: "2px", display: "flex" }}>
        <Menu isMobile={mobile} />
        <div
          style={{
            width: mobile ? "100%" : "auto",
            paddingLeft: mobile ? "60px" : "300px",
            paddingTop: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
