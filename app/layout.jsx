import "./globals.css";

export const metadata = {
  title: "Todo List",
  description: "A simple todo list built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
