import {
  AlertTriangle,
  CheckCircle,
  Download,
  Share,
  Target,
  TrendingUp
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

interface AnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  analysisData: {
    match_score: number
    match_quality: string
    matching_keywords: string[]
    missing_keywords: string[]
    improvement_suggestions: string[]
  }
}

export function AnalysisModal({ open, onOpenChange, analysisData }: AnalysisModalProps) {
  if (!analysisData) return null; 

  const {
    match_score,
    match_quality,
    matching_keywords,
    missing_keywords,
    improvement_suggestions
  } = analysisData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Analysis Results</DialogTitle>
          <DialogDescription>Here's how your resume matches the job description</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Match Score */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Overall Match Score</h3>
                    <p className="text-sm text-muted-foreground">Based on keywords and requirements</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{match_score}%</div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  >
                    {match_quality}
                  </Badge>
                </div>
              </div>
              <Progress value={match_score} className="h-3" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matching Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Matching Keywords</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {matching_keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missing Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Missing Keywords</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {missing_keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Improvement Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {improvement_suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share Results</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Save to History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
