import { FaXTwitter, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center pt-10 pb-3">
      <div className="flex gap-5 py-4 justify-center">
        <Link href="https://x.com/martinfriday5?s=21">
          <FaXTwitter className="size-5" />
        </Link>
        <Link href="https://github.com/M-alpha-bet/auctix">
          <FaGithub className="size-5" />
        </Link>
        <Link href="https://www.instagram.com/martinelli_mabs?igsh=MXZldm04cHBlazBwaw%3D%3D&utm_source=qr">
          <FaInstagram className="size-5" />
        </Link>
        <Link href="https://wa.me/2348144565996">
          <FaWhatsapp className="size-5" />
        </Link>
      </div>
      <p className="text_span_des">by Martinelli.</p>
    </footer>
  );
}
