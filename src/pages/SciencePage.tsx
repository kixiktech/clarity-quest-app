
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SciencePage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('science-page');
    return () => {
      document.body.classList.remove('science-page');
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 animate-fade-in relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-8 sm:left-6 lg:left-8 p-2 rounded-full hover:bg-foreground/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Transform Your Future: Harness the Neuroscience of Visualization
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
            Imagine waking up each morning with crystal-clear mental clarity, effortlessly navigating challenges, and watching your most ambitious goals materialize. This isn't magic—it's the science-backed power of visualization.
          </p>
        </div>

        {/* Revolutionary Science Section */}
        <div className="glass rounded-lg p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
            The Revolutionary Science of Mental Simulation
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground/90">
            How Your Brain Blurs Reality and Imagination
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            When you visualize an action with vivid detail, your brain activates the same neural networks as during physical execution. Neuroscientists call this functional equivalence—a phenomenon where mental rehearsal strengthens synaptic connections as effectively as real-world practice.
          </p>
          <ul className="space-y-4 text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Motor cortex activation: Visualizing a tennis swing triggers the same motor planning regions as actual movement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Neuroplastic reinforcement: Repeated mental simulations create durable neural pathways, making desired behaviors automatic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Epigenetic influence: Intense visualization can modulate gene expression related to stress resilience and cognitive performance</span>
            </li>
          </ul>
          <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80">
            "The brain doesn't distinguish between real and imagined experiences at the neurological level. What we visualize repeatedly becomes our biological blueprint." – Dr. Alena Candova, Cognitive Neuroscientist
          </blockquote>
        </div>

        {/* Historical Evolution Section */}
        <div className="glass rounded-lg p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
            500 Years of Proven Results: The Evolution of Visualization
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground/90">
            From Renaissance Maps to Modern Mind-Tech
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            While visualization seems cutting-edge, its roots trace back to 1644 when Flemish astronomer Michael Florent Van Langren created the first statistical graph to resolve a longitude debate.
          </p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Key Historical Milestones:</h4>
            <ul className="space-y-4 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>18th Century: William Playfair invents pie charts/bar graphs, proving visual data representation enhances decision-making</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>1984 Olympics: Russian scientists document 23% performance gains in athletes using mental rehearsal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>2020s: fMRI studies confirm visualization activates the prefrontal cortex and default mode network simultaneously</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="glass rounded-lg p-6 sm:p-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
            Case Studies: Visualization in Action
          </h2>
          
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground/90">
              Athletic Dominance Through Mental Rehearsal
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              Olympic swimmer Michael Phelps' coach required 2 hours daily of dryland visualization—mentally simulating every stroke, turn, and victory ceremony. This regimen helped Phelps win 23 gold medals, often outperforming physically superior competitors.
            </p>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Proven Results:</h4>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Basketball players improved free throws by 23% through pure mental practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Gymnasts reduced competition anxiety by 38% using pre-event imagery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Surgeons enhanced procedural accuracy by 19% with preoperative mental walkthroughs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground/90">
              Corporate Titans' Secret Weapon
            </h3>
            <p className="text-foreground/70">
              Elon Musk and Sheryl Sandberg publicly credit visualization for:
            </p>
            <ul className="space-y-4 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Strategic foresight: Mentally stress-testing business decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Crisis management: Pre-living high-pressure scenarios to reduce cortisol spikes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Innovation acceleration: 3D mental prototyping of products pre-development</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PETTLEP Model Section */}
        <div className="glass rounded-lg p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
            Your Brain's Hidden Interface: Principles of Effective Visualization
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground/90">
            The PETTLEP Model for Maximum Impact
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            Sports psychologists developed this 7-factor framework to optimize mental rehearsal:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Physical: Adopt the actual posture/equipment',
              'Environment: Visualize in context-specific settings',
              'Task: Focus on process over outcome',
              'Timing: Match real-world duration',
              'Learning: Adjust imagery as skills progress',
              'Emotion: Embed authentic feelings',
              'Perspective: Alternate between 1st/3rd person views'].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-foreground/70">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80">
            "Vivid multi-sensory visualization creates 400% stronger neural imprints than vague daydreaming." – Dr. Dan Dworkis, USC Emergency Medicine
          </blockquote>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Ready to Transform Your Future?
          </h2>
          <Button
            onClick={() => navigate("/login?mode=signup")}
            className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey Now
          </Button>
          <p className="text-sm text-foreground/60">
            Join thousands who have already unlocked their potential through scientific visualization
          </p>
        </div>
      </div>
    </div>
  );
};

export default SciencePage;
