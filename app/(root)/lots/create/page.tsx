import { auth } from "@/auth";
import LotForm from "@/components/lotForm";
import SplitTextEntrance from "@/components/ui/SplitText";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container pattern min-h-[230px]">
        <SplitTextEntrance
          text="SUBMIT YOUR LOT"
          className="dark_bg_container heading"
        />
      </section>
      <LotForm />
    </>
  );
}
