
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SciencePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-8 sm:left-6 lg:left-8 p-2 rounded-full hover:bg-foreground/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>

        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            The Science Behind{" "}
            <span className="animate-text-gradient">Visualization</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover how guided visualization can rewire your brain for success
          </p>
        </div>

        <div className="space-y-12">
          <div className="glass rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
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

          <div className="glass rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-primary">
              The Mind-Body Connection
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Visualization techniques activate the same brain regions involved in
              actual performance. This mental rehearsal strengthens neural
              pathways, improving your ability to perform in real-life situations.
            </p>
          </div>

          <div className="glass rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
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
