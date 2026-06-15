type RoadmapCardProps = {
  roadmap: string[];
};

export default function RoadmapCard({
  roadmap,
}: RoadmapCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Learning Roadmap
        </h2>

        <span className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-400">
          Career Plan
        </span>
      </div>

      {roadmap.length === 0 ? (
        <div className="mt-6 text-zinc-500">
          Upload a resume to generate a personalized roadmap.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {roadmap.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-800 bg-black/20"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700 text-white font-bold">
                {index + 1}
              </div>

              <div className="text-zinc-300">
                {item}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}