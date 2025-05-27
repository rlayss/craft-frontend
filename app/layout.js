import { Suspense } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";

export const metadata = {
  title: "CRAFT ERP",
  description: "An integrated ERP system",
};

const NAVIGATION = [];
const BRANDING = {
  title: "CRAFT ERP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Suspense fallback={<LinearProgress />}>
            <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
              {children}
            </NextAppProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
