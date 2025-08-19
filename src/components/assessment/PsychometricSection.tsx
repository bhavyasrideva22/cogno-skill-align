import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Users, Target } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (data: any) => void;
  data: any;
  onPrevious?: () => void;
}

const interestQuestions = [
  {
    question: "I'm fascinated by identifying and solving inefficiencies in systems.",
    category: "interest"
  },
  {
    question: "I enjoy analyzing data to find patterns and insights.",
    category: "interest"
  },
  {
    question: "I find satisfaction in helping organizations improve their performance.",
    category: "interest"
  },
  {
    question: "I'm drawn to understanding how different parts of a business work together.",
    category: "interest"
  },
  {
    question: "I like creating visual maps and diagrams to represent processes.",
    category: "interest"
  }
];

const personalityQuestions = [
  {
    question: "I prefer structured environments with clear procedures and guidelines.",
    category: "personality"
  },
  {
    question: "I'm comfortable challenging existing ways of doing things.",
    category: "personality"
  },
  {
    question: "I work well with people at all levels of an organization.",
    category: "personality"
  },
  {
    question: "I remain calm and focused when working under pressure.",
    category: "personality"
  },
  {
    question: "I'm naturally curious about why things work the way they do.",
    category: "personality"
  }
];

const workStyleQuestions = [
  {
    question: "I prefer working on long-term projects that show measurable impact.",
    category: "workStyle"
  },
  {
    question: "I'm comfortable working independently with minimal supervision.",
    category: "workStyle"
  },
  {
    question: "I enjoy facilitating meetings and group discussions.",
    category: "workStyle"
  },
  {
    question: "I'm willing to travel frequently for client engagements.",
    category: "workStyle"
  },
  {
    question: "I thrive in environments where I can influence organizational change.",
    category: "workStyle"
  }
];

const motivationQuestions = [
  {
    question: "I'm motivated by opportunities to continuously learn and grow.",
    category: "motivation"
  },
  {
    question: "Financial rewards are important drivers for my career choices.",
    category: "motivation"
  },
  {
    question: "I'm energized by tackling complex, challenging problems.",
    category: "motivation"
  },
  {
    question: "Recognition and professional status motivate me significantly.",
    category: "motivation"
  },
  {
    question: "I'm driven by the desire to make a meaningful impact on organizations.",
    category: "motivation"
  }
];

const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const sections = [
    { title: "Interest Assessment", questions: interestQuestions, icon: Heart, description: "How much do these statements resonate with you?" },
    { title: "Personality Fit", questions: personalityQuestions, icon: Brain, description: "Rate how well these describe you" },
    { title: "Work Style Preferences", questions: workStyleQuestions, icon: Users, description: "How do you prefer to work?" },
    { title: "Motivation Drivers", questions: motivationQuestions, icon: Target, description: "What motivates you most?" }
  ];

  const currentQuestions = sections[currentSection].questions;
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
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
    for (let i = 0; i < currentQuestions.length; i++) {
      const questionKey = `${currentSection}-${i}`;
      if (!answers[questionKey]) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Process and submit data
      const psychometricData = {
        interest: interestQuestions.map((_, i) => answers[`0-${i}`] || 0),
        personality: personalityQuestions.map((_, i) => answers[`1-${i}`] || 0),
        workStyle: workStyleQuestions.map((_, i) => answers[`2-${i}`] || 0),
        motivation: motivationQuestions.map((_, i) => answers[`3-${i}`] || 0)
      };
      
      onComplete({ psychometric: psychometricData });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentIcon = sections[currentSection].icon;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <CurrentIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{sections[currentSection].title}</h2>
            <p className="text-muted-foreground">{sections[currentSection].description}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Section {currentSection + 1} of {sections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((q, index) => {
          const questionKey = `${currentSection}-${index}`;
          return (
            <Card key={index} className="p-6 bg-gradient-card border-border/50">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {index + 1}. {q.question}
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
          Previous Section
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-primary hover:bg-primary/90"
        >
          {currentSection === sections.length - 1 ? "Complete Psychometric Assessment" : "Next Section"}
        </Button>
      </div>
    </div>
  );
};

export default PsychometricSection;