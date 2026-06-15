type ATSCardProps = {
  score: number;
};

export default function ATSCard({
  score,
}: ATSCardProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
      <h2 className="text-zinc-400 text-sm">
        ATS Score
      </h2>

      <div className="text-5xl font-bold text-white mt-3">
        {score}
      </div>

      <p className="text-green-400 mt-2">
        Resume Analysis
      </p>
    </div>
  );
}