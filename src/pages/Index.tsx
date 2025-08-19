import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Target, Zap, ChevronRight } from "lucide-react";
import AssessmentFlow from "@/components/AssessmentFlow";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <AssessmentFlow onBack={() => setShowAssessment(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            Career Assessment Platform
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Should You Become a
            <span className="block text-accent">Process Optimization Consultant?</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover if you have the psychological fit, technical readiness, and cognitive alignment 
            for a successful career in process optimization consulting.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowAssessment(true)}
            className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Start Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive assessment evaluates five key dimensions to determine your career fit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Psychological Fit</h3>
              <p className="text-muted-foreground">
                Assess your personality traits, working style preferences, and natural inclinations for process optimization work.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <TrendingUp className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3">Technical Readiness</h3>
              <p className="text-muted-foreground">
                Evaluate your current knowledge of Lean, Six Sigma, process mapping, and analytical problem-solving.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">WISCAR Analysis</h3>
              <p className="text-muted-foreground">
                Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world fit.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <Users className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3">Career Mapping</h3>
              <p className="text-muted-foreground">
                Discover which specific roles in process optimization align best with your profile and interests.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Learning Roadmap</h3>
              <p className="text-muted-foreground">
                Get a personalized development plan with specific courses, tools, and next steps for your journey.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
              <ChevronRight className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3">Confidence Score</h3>
              <p className="text-muted-foreground">
                Receive an overall confidence rating that synthesizes all assessment dimensions into a clear recommendation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Preview */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">20-30</span>
              </div>
              <h3 className="font-semibold mb-2">Minutes</h3>
              <p className="text-muted-foreground">Complete assessment duration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-foreground font-bold text-xl">50+</span>
              </div>
              <h3 className="font-semibold mb-2">Questions</h3>
              <p className="text-muted-foreground">Comprehensive evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-xl">100%</span>
              </div>
              <h3 className="font-semibold mb-2">Personalized</h3>
              <p className="text-muted-foreground">Tailored recommendations</p>
            </div>
          </div>
          <Button 
            size="lg" 
            onClick={() => setShowAssessment(true)}
            className="bg-primary hover:bg-primary/90 shadow-primary text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Begin Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;