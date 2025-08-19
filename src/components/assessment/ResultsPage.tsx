import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Download,
  Mail
} from "lucide-react";
import { AssessmentData } from "../AssessmentFlow";

interface ResultsPageProps {
  data: AssessmentData;
  onComplete?: () => void;
  onPrevious?: () => void;
}

const calculateScore = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / (values.length * 5)) * 100);
};

const calculateTechnicalScore = (sections: { aptitude: number[]; knowledge: number[]; domain: number[] }): number => {
  const totalCorrect = [...sections.aptitude, ...sections.knowledge, ...sections.domain].reduce((sum, val) => sum + val, 0);
  const totalQuestions = sections.aptitude.length + sections.knowledge.length + sections.domain.length;
  return Math.round((totalCorrect / totalQuestions) * 100);
};

const getRecommendation = (psychometricScore: number, technicalScore: number, wiscarScore: number) => {
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);
  
  if (overallScore >= 80) {
    return {
      decision: "YES",
      confidence: overallScore,
      message: "You show excellent alignment with process optimization consulting. Your psychological fit, technical foundation, and WISCAR profile indicate high potential for success.",
      color: "success",
      icon: CheckCircle
    };
  } else if (overallScore >= 60) {
    return {
      decision: "MAYBE",
      confidence: overallScore,
      message: "You have good potential for process optimization consulting with some areas for development. A structured learning plan is recommended.",
      color: "warning", 
      icon: AlertCircle
    };
  } else {
    return {
      decision: "CONSIDER ALTERNATIVES",
      confidence: overallScore,
      message: "Your profile suggests exploring adjacent roles or developing foundational skills before pursuing process optimization consulting.",
      color: "error",
      icon: XCircle
    };
  }
};

const careerRoles = [
  {
    title: "Process Optimization Consultant",
    description: "Lead end-to-end process improvement initiatives across organizations",
    requirements: ["Psychological Fit: 75+", "Technical: 70+", "WISCAR: 80+"]
  },
  {
    title: "Lean Six Sigma Analyst", 
    description: "Apply statistical methods and Lean principles to eliminate waste",
    requirements: ["Technical: 80+", "Analytical Skills: High", "Data-driven mindset"]
  },
  {
    title: "Business Process Analyst",
    description: "Model, analyze and improve business workflows and procedures", 
    requirements: ["Technical: 65+", "Communication: High", "Systems thinking"]
  },
  {
    title: "Operational Excellence Manager",
    description: "Embed continuous improvement culture across the organization",
    requirements: ["Leadership: High", "Change Management", "Strategic thinking"]
  }
];

const learningPath = [
  {
    stage: "Foundation",
    duration: "2-3 months", 
    topics: ["Process Mapping (SIPOC, Flowcharts)", "Basic Lean Principles", "Root Cause Analysis"],
    tools: ["Lucidchart", "Visio", "Basic Excel"]
  },
  {
    stage: "Intermediate",
    duration: "4-6 months",
    topics: ["Six Sigma DMAIC", "Value Stream Mapping", "Statistical Analysis"],
    tools: ["Minitab", "Power BI", "Process Mining Software"]
  },
  {
    stage: "Advanced", 
    duration: "6-12 months",
    topics: ["Change Management", "RPA Implementation", "Advanced Analytics"],
    tools: ["UiPath", "Tableau", "Python/R for analysis"]
  }
];

const ResultsPage = ({ data }: ResultsPageProps) => {
  const scores = useMemo(() => {
    // Calculate psychometric score
    const psychometricScores = [
      ...data.psychometric.interest,
      ...data.psychometric.personality, 
      ...data.psychometric.workStyle,
      ...data.psychometric.motivation
    ];
    const psychometricScore = calculateScore(psychometricScores);

    // Calculate technical score
    const technicalScore = calculateTechnicalScore(data.technical);

    // Calculate WISCAR scores
    const wiscarScores = {
      will: calculateScore(data.wiscar.will),
      interest: calculateScore(data.wiscar.interest), 
      skill: calculateScore(data.wiscar.skill),
      cognitive: calculateScore(data.wiscar.cognitive),
      ability: calculateScore(data.wiscar.ability),
      reality: calculateScore(data.wiscar.reality)
    };
    
    const wiscarOverall = Math.round(Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6);

    return {
      psychometric: psychometricScore,
      technical: technicalScore,
      wiscar: wiscarOverall,
      wiscarDetailed: wiscarScores
    };
  }, [data]);

  const recommendation = getRecommendation(scores.psychometric, scores.technical, scores.wiscar);
  
  const radarData = [
    { dimension: 'Will', score: scores.wiscarDetailed.will },
    { dimension: 'Interest', score: scores.wiscarDetailed.interest },
    { dimension: 'Skill', score: scores.wiscarDetailed.skill },
    { dimension: 'Cognitive', score: scores.wiscarDetailed.cognitive },
    { dimension: 'Ability', score: scores.wiscarDetailed.ability },
    { dimension: 'Reality', score: scores.wiscarDetailed.reality }
  ];

  const overallData = [
    { category: 'Psychological Fit', score: scores.psychometric },
    { category: 'Technical Readiness', score: scores.technical },
    { category: 'WISCAR Overall', score: scores.wiscar }
  ];

  const RecommendationIcon = recommendation.icon;

  return (
    <div className="space-y-8">
      {/* Overall Recommendation */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${
              recommendation.color === 'success' ? 'bg-success/20' :
              recommendation.color === 'warning' ? 'bg-warning/20' : 'bg-error/20'
            }`}>
              <RecommendationIcon className={`h-12 w-12 ${
                recommendation.color === 'success' ? 'text-success' :
                recommendation.color === 'warning' ? 'text-warning' : 'text-error'
              }`} />
            </div>
          </div>
          
          <div>
            <Badge className={`text-lg px-4 py-2 ${
              recommendation.color === 'success' ? 'bg-success/20 text-success border-success/30' :
              recommendation.color === 'warning' ? 'bg-warning/20 text-warning border-warning/30' : 
              'bg-error/20 text-error border-error/30'
            }`}>
              {recommendation.decision}
            </Badge>
            <div className="mt-2">
              <span className="text-2xl font-bold">{recommendation.confidence}%</span>
              <span className="text-muted-foreground ml-2">Confidence Score</span>
            </div>
          </div>

          <p className="text-lg text-center max-w-2xl mx-auto">
            {recommendation.message}
          </p>
        </div>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Psychological Fit</h3>
                <p className="text-2xl font-bold">{scores.psychometric}%</p>
              </div>
            </div>
            <Progress value={scores.psychometric} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Personality alignment with process optimization work
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Technical Readiness</h3>
                <p className="text-2xl font-bold">{scores.technical}%</p>
              </div>
            </div>
            <Progress value={scores.technical} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Current knowledge and aptitude level
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">WISCAR Overall</h3>
                <p className="text-2xl font-bold">{scores.wiscar}%</p>
              </div>
            </div>
            <Progress value={scores.wiscar} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Comprehensive readiness across all dimensions
            </p>
          </div>
        </Card>
      </div>

      {/* WISCAR Radar Chart */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <h3 className="text-2xl font-bold mb-6 text-center">WISCAR Profile Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {radarData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.dimension}</span>
                <div className="flex items-center gap-3">
                  <Progress value={item.score} className="w-24 h-2" />
                  <span className="text-sm font-bold w-12">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Career Roles Matching */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <h3 className="text-2xl font-bold mb-6">Recommended Career Paths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerRoles.map((role, index) => (
            <Card key={index} className="p-6 border-border/30">
              <h4 className="font-semibold text-lg mb-2">{role.title}</h4>
              <p className="text-muted-foreground mb-4">{role.description}</p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Requirements:</p>
                <ul className="space-y-1">
                  {role.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Learning Path */}
      <Card className="p-8 bg-gradient-card border-border/50">
        <h3 className="text-2xl font-bold mb-6">Your Personalized Learning Roadmap</h3>
        <div className="space-y-6">
          {learningPath.map((stage, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                {index < learningPath.length - 1 && (
                  <div className="w-0.5 h-16 bg-border mt-4" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h4 className="text-lg font-semibold">{stage.stage}</h4>
                  <Badge variant="outline">{stage.duration}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Key Topics:</p>
                    <ul className="space-y-1">
                      {stage.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="w-3 h-3" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Recommended Tools:</p>
                    <ul className="space-y-1">
                      {stage.tools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Email Results
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;