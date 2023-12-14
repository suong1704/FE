"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/index";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      const isLoginString: any = localStorage.getItem("token") as String;
      const isLogin: boolean = isLoginString ? isLoginString : false;

      if (!isLogin) {
        router.push("/authentication/login");
      }
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
