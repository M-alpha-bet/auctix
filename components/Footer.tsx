import { FaXTwitter, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center pt-10 pb-3">
      <div className="flex gap-5 py-4 justify-center">
        <Link href="/">
          <FaXTwitter className="size-5" />
        </Link>
        <Link href="/">
          <FaGithub className="size-5" />
        </Link>
        <Link href="/">
          <FaInstagram className="size-5" />
        </Link>
        <Link href="/">
          <FaWhatsapp className="size-5" />
        </Link>
      </div>
      <p className="text_span_des">by Martinelli.</p>
    </footer>
  );
}
