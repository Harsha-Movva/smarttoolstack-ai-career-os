export default function CareerScoreCard() {

  const score = 74;

  const status =
    score >= 85
      ? "Outstanding"
      : score >= 70
      ? "Strong"
      : score >= 55
      ? "Growing"
      : "Needs Improvement";

  const color =
    score >= 85
      ? "text-emerald-400"
      : score >= 70
      ? "text-blue-400"
      : score >= 55
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-blue-500/20
        bg-gradient-to-br
        from-zinc-900
        via-zinc-900
        to-blue-950/30
        p-7
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-blue-500/20
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
          bg-blue-500/10
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
            CAREER SCORE
          </p>

          <h1 className="text-6xl font-black text-white mt-5">
            {score}
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
            bg-blue-500/10
            border
            border-blue-500/20
            flex
            items-center
            justify-center
            text-3xl
          "
        >
          🎯
        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-zinc-500">
            Career Readiness
          </span>

          <span className="text-white">
            {score}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

          <div
            className="
              h-2
              rounded-full
              bg-gradient-to-r
              from-blue-400
              to-cyan-500
              transition-all
              duration-700
            "
            style={{
              width: `${score}%`,
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
            bg-blue-500/10
            border
            border-blue-500/20
            px-4
            py-2
            text-sm
            text-blue-300
          "
        >
          Data Science Path
        </span>

      </div>

    </div>
  );
}