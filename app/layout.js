import "./globals.css";
import Nav from "@/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav /> {children}
      </body>
    </html>
  );
}
