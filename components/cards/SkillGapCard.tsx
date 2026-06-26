export default function SkillGapCard() {

  const gap = 23;

  const status =
    gap <= 20
      ? "Excellent"
      : gap <= 40
      ? "Improving"
      : "Needs Attention";

  const color =
    gap <= 20
      ? "text-emerald-400"
      : gap <= 40
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-yellow-500/20
        bg-gradient-to-br
        from-zinc-900
        via-zinc-900
        to-yellow-950/30
        p-7
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-yellow-500/20
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
          bg-yellow-500/10
          blur-3xl
        "
      />

      <div className="flex justify-between items-start">

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-zinc-500
            "
          >
            SKILL GAP
          </p>

          <h1 className="text-6xl font-black text-white mt-5">
            {gap}%
          </h1>

          <p className={`${color} font-semibold mt-3`}>
            {status}
          </p>

        </div>

        <div
          className="
            h-16
            w-16
            rounded-2xl
            bg-yellow-500/10
            border
            border-yellow-500/20
            flex
            items-center
            justify-center
            text-3xl
          "
        >
          📈
        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-zinc-500">
            Missing Skills
          </span>

          <span className="text-white">
            {gap}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

          <div
            className="
              h-2
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              to-orange-500
              transition-all
              duration-700
            "
            style={{
              width: `${gap}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8">

        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-yellow-500/10
            border
            border-yellow-500/20
            px-4
            py-2
            text-sm
            text-yellow-300
          "
        >
          Cloud & DevOps Skills
        </span>

      </div>

    </div>
  );
}