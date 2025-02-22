import { FC } from "react";

const SciencePage: FC = () => {
  return (
    <div className="science-page min-h-screen w-full bg-background overflow-auto">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            The Science Behind{" "}
            <span className="animate-text-gradient">Visualization</span>
          </h1>
          <p className="text-lg text-foreground/70">
            Discover how guided visualization can rewire your brain for success
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              Neural Plasticity
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Research shows that visualization exercises can create similar neural
              patterns to actual physical practice. This phenomenon, known as
              neural plasticity, allows your brain to form new neural connections
              and pathways.
            </p>
          </div>

          <div className="glass rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              The Mind-Body Connection
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Visualization techniques activate the same brain regions involved in
              actual performance. This mental rehearsal strengthens neural
              pathways, improving your ability to perform in real-life situations.
            </p>
          </div>

          <div className="glass rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              Proven Results
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Studies with athletes, musicians, and professionals show that
              combining physical practice with visualization leads to better
              performance outcomes than physical practice alone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SciencePage;
