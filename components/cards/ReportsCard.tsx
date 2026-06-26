type ReportsCardProps = {
  total: number;
};

export default function ReportsCard({
  total,
}: ReportsCardProps) {

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-purple-500/20
        bg-gradient-to-br
        from-zinc-900
        via-zinc-900
        to-purple-950/30
        p-7
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-purple-500/20
      "
    >

      <div
        className="
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      <div className="flex justify-between">

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-zinc-500
            "
          >
            REPORTS
          </p>

          <h1 className="text-6xl font-black text-white mt-5">
            {total}
          </h1>

          <p className="text-purple-400 mt-3 font-semibold">
            Resume History
          </p>

        </div>

        <div
          className="
            h-16
            w-16
            rounded-2xl
            bg-purple-500/10
            border
            border-purple-500/20
            flex
            items-center
            justify-center
            text-3xl
          "
        >
          📑
        </div>

      </div>

      <div className="mt-8">

        <span
          className="
            inline-flex
            rounded-full
            bg-purple-500/10
            border
            border-purple-500/20
            px-4
            py-2
            text-sm
            text-purple-300
          "
        >
          Saved Reports
        </span>

      </div>

    </div>
  );
}