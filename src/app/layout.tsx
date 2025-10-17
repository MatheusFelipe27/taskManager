import type { Metadata } from "next";
import "./globals.css";
import ClientLoader from "@/components/layout/clientLoader";

export const metadata: Metadata = {
  title: "TaskManager",
  description: "Gerenciador de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >  
      <ClientLoader/>
      {children}
      </body>
    </html>
  );
}
