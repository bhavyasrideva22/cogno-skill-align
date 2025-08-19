import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Zap, Heart, Wrench, Brain, TrendingUp, Eye } from "lucide-react";

interface WISCARSectionProps {
  onComplete: (data: any) => void;
  data: any;
  onPrevious?: () => void;
}

const wiscarSections = [
  {
    key: "will",
    title: "Will & Persistence",
    icon: Zap,
    description: "Your determination and grit for long-term challenges",
    questions: [
      "I persist even when facing significant obstacles or setbacks.",
      "I'm willing to invest years developing expertise in process optimization.",
      "I maintain focus on long-term goals despite short-term distractions.",
      "I'm motivated to push through difficult or tedious analysis work.",
      "I have a track record of completing challenging projects."
    ]
  },
  {
    key: "interest",
    title: "Genuine Interest",
    icon: Heart,
    description: "Your authentic passion for process optimization work",
    questions: [
      "I genuinely enjoy studying how systems and processes work.",
      "I find myself naturally thinking about ways to improve workflows.",
      "I'm excited by the prospect of helping organizations become more efficient.",
      "I actively seek out information about process improvement methods.",
      "I would pursue this field even if the financial rewards were modest."
    ]
  },
  {
    key: "skill",
    title: "Current Skills",
    icon: Wrench,
    description: "Your existing capabilities relevant to the role",
    questions: [
      "I have strong analytical and problem-solving abilities.",
      "I communicate complex ideas clearly to diverse audiences.",
      "I'm comfortable working with data and creating visualizations.",
      "I can facilitate productive discussions and workshops.",
      "I adapt well to different organizational cultures and contexts."
    ]
  },
  {
    key: "cognitive",
    title: "Cognitive Readiness",
    icon: Brain,
    description: "Your thinking style and mental approach",
    questions: [
      "I naturally think in terms of systems and interconnections.",
      "I can hold multiple variables in mind when analyzing problems.",
      "I enjoy breaking down complex processes into component parts.",
      "I'm comfortable with both detailed analysis and big-picture thinking.",
      "I can spot patterns and trends in data or workflow observations."
    ]
  },
  {
    key: "ability",
    title: "Ability to Learn",
    icon: TrendingUp,
    description: "Your capacity for acquiring new knowledge and skills",
    questions: [
      "I actively seek feedback and use it to improve my performance.",
      "I'm comfortable learning new tools and methodologies.",
      "I can quickly grasp and apply new concepts in unfamiliar domains.",
      "I enjoy staying current with industry trends and best practices.",
      "I learn effectively from both formal training and hands-on experience."
    ]
  },
  {
    key: "reality",
    title: "Real-World Fit",
    icon: Eye,
    description: "Alignment between your expectations and job realities",
    questions: [
      "I understand that process improvement often involves managing resistance to change.",
      "I'm prepared for the possibility of frequent travel or client site work.",
      "I recognize that results may take months or years to fully materialize.",
      "I'm comfortable working in ambiguous situations without clear direction.",
      "I understand that much of the work involves detailed documentation and analysis."
    ]
  }
];

const WISCARSection = ({ onComplete }: WISCARSectionProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const currentWISCARSection = wiscarSections[currentSection];
  const totalQuestions = wiscarSections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const questionKey = `${currentSection}-${questionIndex}`;
    setAnswers(prev => ({
      ...prev,
      [questionKey]: parseInt(value)
    }));
  };

  const canProceed = () => {
    for (let i = 0; i < currentWISCARSection.questions.length; i++) {
      const questionKey = `${currentSection}-${i}`;
      if (!answers[questionKey]) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentSection < wiscarSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Process and submit data
      const wiscarData = wiscarSections.reduce((acc, section, sectionIndex) => {
        acc[section.key] = section.questions.map((_, questionIndex) => 
          answers[`${sectionIndex}-${questionIndex}`] || 0
        );
        return acc;
      }, {} as any);
      
      onComplete({ wiscar: wiscarData });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentIcon = currentWISCARSection.icon;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <CurrentIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentWISCARSection.title}</h2>
            <p className="text-muted-foreground">{currentWISCARSection.description}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Dimension {currentSection + 1} of {wiscarSections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* WISCAR Progress Indicators */}
        <div className="flex gap-2 mt-6">
          {wiscarSections.map((section, index) => {
            const Icon = section.icon;
            const isCompleted = index < currentSection;
            const isCurrent = index === currentSection;
            
            return (
              <div
                key={section.key}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  isCompleted 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : isCurrent
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-muted/20 border-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4 mx-auto mb-1" />
                <div className="text-xs text-center font-medium">
                  {section.key.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {currentWISCARSection.questions.map((question, index) => {
          const questionKey = `${currentSection}-${index}`;
          return (
            <Card key={index} className="p-6 bg-gradient-card border-border/50">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {index + 1}. {question}
                </h3>
                
                <RadioGroup
                  value={answers[questionKey]?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(index, value)}
                  className="grid grid-cols-5 gap-4"
                >
                  {[
                    { value: "1", label: "Strongly Disagree" },
                    { value: "2", label: "Disagree" },
                    { value: "3", label: "Neutral" },
                    { value: "4", label: "Agree" },
                    { value: "5", label: "Strongly Agree" }
                  ].map((option) => (
                    <div key={option.value} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem value={option.value} id={`${questionKey}-${option.value}`} />
                      <Label 
                        htmlFor={`${questionKey}-${option.value}`} 
                        className="text-sm text-center cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          Previous Dimension
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-primary hover:bg-primary/90"
        >
          {currentSection === wiscarSections.length - 1 ? "Complete WISCAR Assessment" : "Next Dimension"}
        </Button>
      </div>
    </div>
  );
};

export default WISCARSection;