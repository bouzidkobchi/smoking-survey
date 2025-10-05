import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Cigarette, AlertCircle, TrendingDown, FileText } from "lucide-react";
import { Survey } from "@shared/schema";
import { Link } from "wouter";

export default function Results() {
  const { data: surveys, isLoading, error } = useQuery<Survey[]>({
    queryKey: ["/api/surveys"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading survey results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Results</h2>
            <p className="text-muted-foreground">Unable to fetch survey results. Please try again.</p>
          </div>
        </Card>
      </div>
    );
  }

  const totalResponses = surveys?.length || 0;
  const currentSmokers = surveys?.filter(s => s.currentlySmoking).length || 0;
  const exSmokers = totalResponses - currentSmokers;

  // Demographics statistics
  const maleCount = surveys?.filter(s => s.gender === "male").length || 0;
  const femaleCount = surveys?.filter(s => s.gender === "female").length || 0;
  
  const avgAge = surveys && surveys.length > 0
    ? Math.round(surveys.reduce((sum, s) => sum + s.age, 0) / surveys.length)
    : 0;

  // Health awareness
  const awareOfDiseases = surveys?.filter(s => s.awarenessOfDiseases).length || 0;

  // Quit intentions (for current smokers)
  const consideringQuitting = surveys?.filter(s => 
    s.currentlySmoking && s.consideringQuitting && s.consideringQuitting !== "not-considering"
  ).length || 0;

  const interestedInProgram = surveys?.filter(s => s.interestedInProgram).length || 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Survey Results Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive analysis of smoking behavior survey responses</p>
          </div>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-to-survey">
              <FileText className="h-4 w-4 mr-2" />
              Back to Survey
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6" data-testid="card-total-responses">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Responses</p>
                <p className="text-3xl font-bold text-foreground">{totalResponses}</p>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6" data-testid="card-current-smokers">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Smokers</p>
                <p className="text-3xl font-bold text-foreground">{currentSmokers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalResponses > 0 ? Math.round((currentSmokers / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-destructive/10">
                <Cigarette className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-6" data-testid="card-ex-smokers">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ex-Smokers</p>
                <p className="text-3xl font-bold text-foreground">{exSmokers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalResponses > 0 ? Math.round((exSmokers / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6" data-testid="card-interested-in-program">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interested in Program</p>
                <p className="text-3xl font-bold text-foreground">{interestedInProgram}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalResponses > 0 ? Math.round((interestedInProgram / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Demographics and Health Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Demographics Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Age</span>
                <Badge variant="secondary">{avgAge} years</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Male Respondents</span>
                <Badge variant="secondary">{maleCount} ({totalResponses > 0 ? Math.round((maleCount / totalResponses) * 100) : 0}%)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Female Respondents</span>
                <Badge variant="secondary">{femaleCount} ({totalResponses > 0 ? Math.round((femaleCount / totalResponses) * 100) : 0}%)</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Health Awareness
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Aware of Disease Risks</span>
                <Badge variant="secondary">{awareOfDiseases} ({totalResponses > 0 ? Math.round((awareOfDiseases / totalResponses) * 100) : 0}%)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Considering Quitting</span>
                <Badge variant="secondary">{consideringQuitting} ({currentSmokers > 0 ? Math.round((consideringQuitting / currentSmokers) * 100) : 0}% of smokers)</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Individual Responses */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Individual Responses</h2>
          {surveys && surveys.length > 0 ? (
            <div className="space-y-4">
              {surveys.map((survey, index) => (
                <Card key={survey.id} className="p-4 hover-elevate" data-testid={`response-card-${index}`}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Respondent</p>
                      <p className="font-medium text-foreground">
                        {survey.gender === "male" ? "Male" : "Female"}, {survey.age} years
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Smoking Status</p>
                      <Badge variant={survey.currentlySmoking ? "destructive" : "default"}>
                        {survey.currentlySmoking ? "Current Smoker" : "Ex-Smoker"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Education</p>
                      <p className="text-sm text-foreground capitalize">{survey.educationLevel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Residence</p>
                      <p className="text-sm text-foreground capitalize">{survey.residence}</p>
                    </div>
                  </div>
                  
                  {survey.currentlySmoking && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="grid md:grid-cols-3 gap-4">
                        {survey.tobaccoType && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tobacco Type</p>
                            <p className="text-sm text-foreground capitalize">{survey.tobaccoType.replace("-", " ")}</p>
                          </div>
                        )}
                        {survey.cigarettesPerDay && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Cigarettes/Day</p>
                            <p className="text-sm text-foreground capitalize">{survey.cigarettesPerDay.replace("-", " ")}</p>
                          </div>
                        )}
                        {survey.consideringQuitting && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Quit Plans</p>
                            <p className="text-sm text-foreground capitalize">{survey.consideringQuitting.replace("-", " ")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!survey.currentlySmoking && survey.timeSinceQuit && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Time Since Quit</p>
                          <p className="text-sm text-foreground">{survey.timeSinceQuit}</p>
                        </div>
                        {survey.quitDifficulty && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Quit Difficulty</p>
                            <p className="text-sm text-foreground capitalize">{survey.quitDifficulty.replace("-", " ")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(survey.opinionOnCampaigns || survey.suggestionsForHelp) && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      {survey.opinionOnCampaigns && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Opinion on Campaigns</p>
                          <p className="text-sm text-foreground">{survey.opinionOnCampaigns}</p>
                        </div>
                      )}
                      {survey.suggestionsForHelp && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Suggestions</p>
                          <p className="text-sm text-foreground">{survey.suggestionsForHelp}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(survey.createdAt).toLocaleString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No survey responses yet</p>
              <Link href="/">
                <Button className="mt-4" variant="default">
                  Take the Survey
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
