import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import PsychometricSection from "./assessment/PsychometricSection";
import TechnicalSection from "./assessment/TechnicalSection";
import WISCARSection from "./assessment/WISCARSection";
import ResultsPage from "./assessment/ResultsPage";

export interface AssessmentData {
  psychometric: {
    interest: number[];
    personality: number[];
    workStyle: number[];
    motivation: number[];
  };
  technical: {
    aptitude: number[];
    knowledge: number[];
    domain: number[];
  };
  wiscar: {
    will: number[];
    interest: number[];
    skill: number[];
    cognitive: number[];
    ability: number[];
    reality: number[];
  };
}

interface AssessmentFlowProps {
  onBack: () => void;
}

const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {
      interest: [],
      personality: [],
      workStyle: [],
      motivation: []
    },
    technical: {
      aptitude: [],
      knowledge: [],
      domain: []
    },
    wiscar: {
      will: [],
      interest: [],
      skill: [],
      cognitive: [],
      ability: [],
      reality: []
    }
  });

  const steps = [
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical Assessment", component: TechnicalSection },
    { title: "WISCAR Framework", component: WISCARSection }
  ];

  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  const handleStepComplete = (stepData: any) => {
    setAssessmentData(prev => ({
      ...prev,
      ...stepData
    }));
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 0 ? "Back to Home" : "Previous"}
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length + 1}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {currentStep === steps.length ? "Results & Recommendations" : steps[currentStep].title}
              </h1>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {currentStep === steps.length ? (
          <ResultsPage 
            data={assessmentData}
            onPrevious={handlePrevious}
          />
        ) : (
          (() => {
            const CurrentComponent = steps[currentStep].component;
            return (
              <CurrentComponent 
                onComplete={handleStepComplete}
                data={assessmentData}
                onPrevious={handlePrevious}
              />
            );
          })()
        )}
      </div>
    </div>
  );
};

export default AssessmentFlow;