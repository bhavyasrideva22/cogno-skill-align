import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calculator, BookOpen, Cog } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
  data: any;
  onPrevious?: () => void;
}

const aptitudeQuestions = [
  {
    question: "If a process takes 10 minutes per item and processes 100 items per day, what's the total processing time?",
    options: ["10 hours", "16.7 hours", "100 minutes", "1000 minutes"],
    correct: 1,
    category: "aptitude"
  },
  {
    question: "A process has a 95% accuracy rate. Out of 1000 items, how many errors would you expect?",
    options: ["5", "50", "95", "950"],
    correct: 1,
    category: "aptitude"
  },
  {
    question: "Which logic pattern continues: 2, 4, 8, 16, ?",
    options: ["24", "32", "20", "18"],
    correct: 1,
    category: "aptitude"
  },
  {
    question: "If improving a process reduces cycle time by 30%, and the original time was 60 minutes, what's the new time?",
    options: ["30 minutes", "42 minutes", "18 minutes", "90 minutes"],
    correct: 1,
    category: "aptitude"
  },
  {
    question: "In a flowchart, what shape typically represents a decision point?",
    options: ["Rectangle", "Circle", "Diamond", "Triangle"],
    correct: 2,
    category: "aptitude"
  }
];

const knowledgeQuestions = [
  {
    question: "What does 'Kaizen' mean in process improvement?",
    options: ["Continuous improvement", "Zero defects", "Just in time", "Standard work"],
    correct: 0,
    category: "knowledge"
  },
  {
    question: "In Six Sigma, what does the DMAIC methodology stand for?",
    options: ["Define, Measure, Analyze, Improve, Control", "Design, Make, Analyze, Implement, Check", "Develop, Monitor, Assess, Integrate, Complete", "Direct, Manage, Apply, Investigate, Conclude"],
    correct: 0,
    category: "knowledge"
  },
  {
    question: "What is the primary purpose of value stream mapping?",
    options: ["Calculate costs", "Visualize information and material flow", "Track employee performance", "Measure customer satisfaction"],
    correct: 1,
    category: "knowledge"
  },
  {
    question: "Which of these is NOT one of the 8 wastes in Lean methodology?",
    options: ["Overproduction", "Waiting", "Innovation", "Defects"],
    correct: 2,
    category: "knowledge"
  },
  {
    question: "What does KPI stand for in business process management?",
    options: ["Key Process Indicator", "Key Performance Indicator", "Key Productivity Index", "Key Process Integration"],
    correct: 1,
    category: "knowledge"
  }
];

const domainQuestions = [
  {
    question: "You notice a bottleneck in a manufacturing line. What should you do first?",
    options: ["Add more workers", "Measure and analyze the constraint", "Speed up earlier processes", "Replace equipment"],
    correct: 1,
    category: "domain"
  },
  {
    question: "According to the Pareto Principle, what percentage of problems typically cause 80% of the issues?",
    options: ["10%", "20%", "30%", "50%"],
    correct: 1,
    category: "domain"
  },
  {
    question: "In BPMN (Business Process Model and Notation), what does a circle represent?",
    options: ["Activity", "Gateway", "Event", "Data object"],
    correct: 2,
    category: "domain"
  },
  {
    question: "When would you choose RPA (Robotic Process Automation) over manual process improvement?",
    options: ["For creative tasks", "For rule-based, repetitive tasks", "For customer-facing activities", "For strategic decision making"],
    correct: 1,
    category: "domain"
  },
  {
    question: "What's the best approach when stakeholders resist process changes?",
    options: ["Implement changes immediately", "Focus on communication and involvement", "Ignore resistance", "Use authority to enforce changes"],
    correct: 1,
    category: "domain"
  }
];

const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const sections = [
    { title: "General Aptitude", questions: aptitudeQuestions, icon: Calculator, description: "Test your logical reasoning and numerical skills" },
    { title: "Process Knowledge", questions: knowledgeQuestions, icon: BookOpen, description: "Assess your understanding of process improvement fundamentals" },
    { title: "Domain Application", questions: domainQuestions, icon: Cog, description: "Apply concepts to real-world scenarios" }
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
      if (answers[questionKey] === undefined) {
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
      const technicalData = {
        aptitude: aptitudeQuestions.map((q, i) => {
          const answer = answers[`0-${i}`];
          return answer === q.correct ? 1 : 0;
        }),
        knowledge: knowledgeQuestions.map((q, i) => {
          const answer = answers[`1-${i}`];
          return answer === q.correct ? 1 : 0;
        }),
        domain: domainQuestions.map((q, i) => {
          const answer = answers[`2-${i}`];
          return answer === q.correct ? 1 : 0;
        })
      };
      
      onComplete({ technical: technicalData });
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
          <div className="p-3 bg-accent/20 rounded-lg">
            <CurrentIcon className="h-8 w-8 text-accent" />
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
                  className="space-y-3"
                >
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={optionIndex.toString()} 
                        id={`${questionKey}-${optionIndex}`} 
                      />
                      <Label 
                        htmlFor={`${questionKey}-${optionIndex}`} 
                        className="cursor-pointer flex-1"
                      >
                        {option}
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
          className="bg-accent hover:bg-accent/90"
        >
          {currentSection === sections.length - 1 ? "Complete Technical Assessment" : "Next Section"}
        </Button>
      </div>
    </div>
  );
};

export default TechnicalSection;