import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <main className="grid min-h-screen flex-1 place-items-center bg-[#f8f8f7] px-4 py-10">
      <div className="w-full max-w-[22rem]">
        <div className="mb-7 flex items-center justify-center gap-2 text-ink">
          <Image src="/images/logo.png" alt="" width={50} height={35} className="h-6 w-auto" />
          <span className="text-lg tracking-tight">jlsmith group</span>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_16px_40px_-20px_rgba(12,17,27,0.2)]">
          <h1 className="text-lg font-medium tracking-tight text-ink">Sign in to admin</h1>
          <p className="mb-5 mt-0.5 text-[13px] text-ink/50">Manage website content and enquiries.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
