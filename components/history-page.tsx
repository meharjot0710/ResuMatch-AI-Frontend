"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, FileText, Calendar, Target, Trash2, Eye, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface AnalysisHistory {
  id: string
  fileName: string
  jobTitle: string
  matchScore: number
  date: string
  status: "completed" | "processing" | "failed"
}

const mockHistory: AnalysisHistory[] = [
  {
    id: "1",
    fileName: "John_Doe_Resume.pdf",
    jobTitle: "Senior Frontend Developer",
    matchScore: 92,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    fileName: "John_Doe_Resume_v2.pdf",
    jobTitle: "Full Stack Engineer",
    matchScore: 87,
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: "3",
    fileName: "John_Doe_Resume.pdf",
    jobTitle: "React Developer",
    matchScore: 95,
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "4",
    fileName: "John_Doe_Resume_Updated.pdf",
    jobTitle: "Software Engineer",
    matchScore: 78,
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: "5",
    fileName: "John_Doe_Resume.pdf",
    jobTitle: "Backend Developer",
    matchScore: 0,
    date: "2024-01-11",
    status: "processing",
  },
]

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [history, setHistory] = useState(mockHistory)
  const { toast } = useToast()

  const filteredHistory = history.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Analysis deleted",
      description: "The analysis has been removed from your history.",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100 dark:bg-green-900/20"
    if (score >= 70) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    return "text-red-600 bg-red-100 dark:bg-red-900/20"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Completed</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Failed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
          <p className="text-muted-foreground">View and manage your past resume analyses</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{history.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">88%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Score</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Your resume analysis history with match scores and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.fileName}</h3>
                    <p className="text-sm text-muted-foreground">{item.jobTitle}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {item.status === "completed" && (
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(item.matchScore)}`}>{item.matchScore}%</div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Re-analyze
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No analyses found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Start by analyzing your first resume"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
