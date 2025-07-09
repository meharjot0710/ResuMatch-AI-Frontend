"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Target, TrendingUp, CheckCircle, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AnalysisModal } from "@/components/analysis-modal"
import { verifyToken } from "@/api/auth/verifytoken"
import { useRouter } from "next/navigation"
import { upload, getresume } from "@/services/resume"
import { parse } from "path"

export function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [LLMresp, setLLMresp] = useState<{
    match_score: number
    match_quality: string
    matching_keywords: string[]
    missing_keywords: string[]
    improvement_suggestions: string[]
  } | undefined>(undefined);
  const router = useRouter();
  type User = {
    totalAnalysis?: number;
    avgMatchScore?: number;
  };
  const [user, setuser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      setuser(JSON.parse(localStorage.getItem('user') || '{}'));
      if (token) {
        const check = await verifyToken(token);
        console.log(check);
        if(check!=true){
          router.push('/');
        }
      } 
      else {
        router.push("/");
      }
    };
    checkToken();
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
        simulateUpload()
        toast({
          title: "File uploaded successfully",
          description: `${selectedFile.name} has been uploaded.`,
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        })
      }
    }
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  function extractJSONFromLLMResponse(response: string): any | null {
    try {
      const jsonBlockMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonBlockMatch && jsonBlockMatch[1]) {
        const jsonString = jsonBlockMatch[1].trim();
        return JSON.parse(jsonString);
      }

      const codeBlockMatch = response.match(/```\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        const jsonString = codeBlockMatch[1].trim();
        return JSON.parse(jsonString);
      }

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0].trim();
        return JSON.parse(jsonString);
      }

      return JSON.parse(response);
    } catch (error) {
      console.error("Failed to parse LLM response as JSON:", error);
      console.error("Raw response:", response);
      
      return {
        error: "Failed to parse AI response",
        rawResponse: response.substring(0, 200) + "...",
        match_score: 0,
        match_quality: "Error",
        matching_keywords: [],
        missing_keywords: [],
        improvement_suggestions: ["Unable to analyze resume due to parsing error"],
        tailored_resume: "Analysis failed. Please try again."
      };
    }
  }

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and provide a job description.",
        variant: "destructive",
      })
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      const formData = new FormData();
      formData.append('file', file)
      formData.append('jobDescription', jobDescription)
      
      const up = await upload(formData, localStorage.getItem('token'));
      
      if (!up.analysis) {
        throw new Error("No analysis received from server");
      }
      
      const parsedAnalysis = extractJSONFromLLMResponse(up.analysis);
      
      if (parsedAnalysis && parsedAnalysis.error) {
        toast({
          title: "Analysis Error",
          description: "There was an issue parsing the analysis results. Please try again.",
          variant: "destructive",
        })
        return
      }
      
      setLLMresp(parsedAnalysis);
      
      if (up.user) {
        localStorage.setItem('user', JSON.stringify(up.user));
        setuser(JSON.parse(localStorage.getItem('user') || '{}'));
      }
      
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
        toast({
          title: "Analysis complete!",
          description: "Your resume has been analyzed successfully.",
        })
      }, 3000)
      
    } catch (error) {
      console.error("Analysis error:", error);
      setIsAnalyzing(false)
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      })
    }
  }
  const loadPrevResume = async () => {
    try {
      const response = await getresume(localStorage.getItem("token"));
      if (!response.ok) {
        console.error("Failed to fetch resume");
        return;
      }

      const blob = await response.blob();
      const file = new File([blob], "resume.pdf", { type: "application/pdf" });

      setFile(file);
      simulateUpload()
      toast({
        title: "File uploaded successfully",
        description: `resume.pdf has been uploaded.`,
      })
    } catch (error) {
      console.error("Error loading previous resume:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Upload your resume and job description to get AI-powered matching insights
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{user?.totalAnalysis}</p>
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
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
                <p className="text-2xl font-bold">{user?.avgMatchScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Resume</span>
            </CardTitle>
            <CardDescription>Upload your resume in PDF or DOCX format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-muted-foreground/50 transition-colors">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Click to upload resume</p>
                    <p className="text-sm text-muted-foreground">PDF or DOCX up to 10MB</p>
                  </div>
                  {/* <Button onClick={loadPrevResume}>Use previously uploaded resume</Button? */}
                </div>
              </label>
            </div>

            {file && (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const blob = new Blob([file], { type: file.type });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = file.name;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full text-left"
                >
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </button>

                {uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Job Description</span>
            </CardTitle>
            <CardDescription>Paste the job description you want to match against</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="mt-2 text-right">
              <span className="text-sm text-muted-foreground">{jobDescription.length} characters</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyze Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="font-semibold mb-1">Ready to analyze?</h3>
              <p className="text-sm text-muted-foreground">
                Get instant feedback on how well your resume matches the job description
              </p>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={!file || !jobDescription.trim() || isAnalyzing}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <>
                  <Zap className="mr-2 w-5 h-5" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Modal */}
      <AnalysisModal
        open={showResults}
        onOpenChange={setShowResults}
        analysisData={
          LLMresp ?? {
            match_score: 0,
            match_quality: "",
            matching_keywords: [],
            missing_keywords: [],
            improvement_suggestions: [],
          }
        }
      />
    </div>
  )
}
