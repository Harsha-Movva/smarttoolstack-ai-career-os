import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/ai-os/layout/DashboardLayout";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export default function ComingSoonPage({
  title,
  description,
}: ComingSoonPageProps) {
  return (
    <DashboardLayout>
      <section className="mx-auto max-w-5xl py-12">
        <Link
          href="/ai-os"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Sparkles className="text-cyan-300" size={26} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            SmartToolStack AI Career OS
          </p>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            {description}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Section under development
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
