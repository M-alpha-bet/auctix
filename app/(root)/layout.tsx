import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <main className="min-h-[80vh]">{children}</main>

      <Footer />
    </>
  );
}
