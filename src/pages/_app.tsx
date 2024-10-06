import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/base/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <title>Instagram</title>
      <Sidebar />
      <Component {...pageProps} />;
    </div>
  );
}
