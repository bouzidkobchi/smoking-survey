import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ClipboardList, Globe } from "lucide-react";
import { insertSurveySchema } from "@shared/schema";

const surveyFormSchema = insertSurveySchema.extend({
  gender: z.string().min(1, "Gender is required"),
  age: z.number().min(1, "Age is required").max(120, "Please enter a valid age"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  occupation: z.string().min(1, "Occupation is required"),
  residence: z.string().min(1, "Residence type is required"),
  informationSource: z.string().min(1, "Information source is required"),
});

type SurveyFormValues = z.infer<typeof surveyFormSchema>;

export default function SurveyForm() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const { toast } = useToast();

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: {
      gender: "",
      age: 0,
      maritalStatus: "",
      educationLevel: "",
      occupation: "",
      residence: "",
      currentlySmoking: false,
      awarenessOfDiseases: false,
      diseasesKnown: [],
      informationSource: "",
      chronicCough: false,
      breathingIssues: false,
      doctorVisit: false,
      familyHistory: false,
      interestedInProgram: false,
      experiencedRelapse: false,
    },
  });

  const currentlySmoking = form.watch("currentlySmoking");

  const submitMutation = useMutation({
    mutationFn: async (data: SurveyFormValues) => {
      const res = await apiRequest("POST", "/api/surveys", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: language === "en" ? "Survey Submitted!" : "تم إرسال الاستبيان!",
        description: language === "en" 
          ? "Thank you for completing the survey." 
          : "شكراً لك على إكمال الاستبيان.",
      });
      form.reset();
      window.scrollTo(0, 0);
    },
    onError: (error: any) => {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description: error.message || (language === "en" ? "Failed to submit survey" : "فشل إرسال الاستبيان"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SurveyFormValues) => {
    submitMutation.mutate(data);
  };

  const t = {
    en: {
      title: "Smoking Behavior Survey",
      subtitle: "Please answer all questions honestly. Your responses are confidential.",
      language: "Language",
      demographics: "Section 1: Demographics",
      gender: "Gender",
      male: "Male",
      female: "Female",
      age: "Age (years)",
      maritalStatus: "Marital Status",
      single: "Single",
      married: "Married",
      divorced: "Divorced",
      widowed: "Widowed",
      education: "Educational Level",
      primary: "Primary",
      middle: "Middle School",
      high: "High School",
      university: "University",
      occupation: "Occupation",
      residence: "Place of Residence",
      urban: "Urban",
      rural: "Rural",
      smokingBehavior: "Section 2: Smoking Behavior",
      currentlySmoking: "Do you currently smoke?",
      yes: "Yes",
      no: "No",
      ageStarted: "At what age did you start smoking? (years)",
      tobaccoType: "What type of tobacco do you usually consume?",
      cigarettes: "Cigarettes",
      hookah: "Hookah (Shisha)",
      cigar: "Cigar",
      handRolled: "Hand-rolled tobacco",
      cigarettesPerDay: "How many cigarettes do you smoke per day?",
      lessThan5: "Less than 5",
      "5to10": "5-10",
      "11to20": "11-20",
      moreThan20: "More than 20",
      frequency: "Do you smoke daily or occasionally?",
      daily: "Daily",
      occasionally: "Occasionally",
      firstCigarette: "How soon after waking up do you smoke your first cigarette?",
      within5: "Within 5 minutes",
      "5to30": "5-30 minutes",
      after30: "More than 30 minutes",
      indoors: "Do you smoke in enclosed spaces (home, workplace)?",
      quitAttempts: "How many times have you tried to quit smoking?",
      never: "Never",
      once: "Once",
      moreThanOnce: "More than once",
      longestQuit: "What was the longest period you remained smoke-free?",
      reasonStarted: "What was the main reason you started smoking?",
      curiosity: "Curiosity",
      peerPressure: "Peer pressure",
      stress: "Psychological stress",
      pleasure: "Pleasure",
      other: "Other",
      considersAddicted: "Do you consider yourself addicted to smoking?",
      healthAwareness: "Section 3: Health Awareness",
      awarenessOfDiseases: "Are you aware that smoking causes serious diseases?",
      diseasesKnown: "Which diseases do you associate with smoking? (Select all that apply)",
      cancer: "Cancer",
      cardiovascular: "Cardiovascular diseases",
      respiratory: "Respiratory diseases",
      infertility: "Infertility",
      informationSource: "What is your main source of information about smoking?",
      internet: "Internet",
      physician: "Physician",
      media: "Media",
      friends: "Friends",
      school: "School",
      healthImpact: "Section 4: Health Impact",
      chronicCough: "Do you suffer from a chronic cough?",
      breathingIssues: "Do you experience shortness of breath or frequent fatigue?",
      doctorVisit: "Have you ever visited a doctor for smoking-related health issues?",
      familyHistory: "Are there any serious illnesses in your family related to smoking?",
      quitIntentions: "Section 5: Quit Intentions (Current Smokers)",
      consideringQuitting: "Are you considering quitting smoking?",
      withinMonth: "Yes, within the next month",
      withinYear: "Yes, within the next year",
      notConsidering: "Not considering it currently",
      quitBarrier: "What is the main barrier preventing you from quitting?",
      socialEnvironment: "Social environment",
      addiction: "Addiction",
      fearOfFailure: "Fear of failure",
      preferredMethod: "What method would you prefer to quit smoking?",
      onMyOwn: "On my own",
      medicalAssistance: "With medical assistance",
      nicotinePatches: "Using nicotine patches or medication",
      psychologicalSupport: "Through psychological support",
      interestedInProgram: "Would you be interested in participating in a smoking cessation program?",
      exSmokers: "Section 6: For Ex-Smokers",
      timeSinceQuit: "How long has it been since you quit smoking?",
      quitReason: "What motivated you to quit?",
      healthProblem: "Health problem",
      doctorAdvice: "Doctor's advice",
      personalDecision: "Personal decision",
      financialReasons: "Financial reasons",
      quitDifficulty: "How would you describe your experience during cessation?",
      easy: "Easy",
      moderatelyDifficult: "Moderately difficult",
      veryDifficult: "Very difficult",
      experiencedRelapse: "Have you experienced a relapse?",
      adviceForSmokers: "What advice would you give to smokers who wish to quit?",
      feedback: "Section 7: Additional Feedback",
      opinionOnCampaigns: "What is your opinion about anti-smoking awareness campaigns in your country?",
      suggestionsForHelp: "What suggestions do you consider most effective in helping smokers quit?",
      submit: "Submit Survey",
      submitting: "Submitting...",
    },
    ar: {
      title: "استبيان سلوك التدخين",
      subtitle: "يرجى الإجابة على جميع الأسئلة بصدق. إجاباتك سرية.",
      language: "اللغة",
      demographics: "القسم 1: البيانات الديموغرافية",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      age: "العمر (بالسنوات)",
      maritalStatus: "الحالة الاجتماعية",
      single: "أعزب",
      married: "متزوج",
      divorced: "مطلق",
      widowed: "أرمل",
      education: "المستوى التعليمي",
      primary: "ابتدائي",
      middle: "متوسط",
      high: "ثانوي",
      university: "جامعي",
      occupation: "المهنة",
      residence: "مكان الإقامة",
      urban: "حضري",
      rural: "ريفي",
      smokingBehavior: "القسم 2: سلوك التدخين",
      currentlySmoking: "هل تدخن حاليًا؟",
      yes: "نعم",
      no: "لا",
      ageStarted: "في أي عمر بدأت التدخين؟ (بالسنوات)",
      tobaccoType: "ما نوع التبغ الذي تستهلكه عادة؟",
      cigarettes: "سجائر",
      hookah: "نرجيلة",
      cigar: "سيجار",
      handRolled: "تبغ ملفوف يدويًا",
      cigarettesPerDay: "كم عدد السجائر التي تدخنها يوميًا؟",
      lessThan5: "أقل من 5",
      "5to10": "5-10",
      "11to20": "11-20",
      moreThan20: "أكثر من 20",
      frequency: "هل تدخن يوميًا أم بشكل متقطع؟",
      daily: "يوميًا",
      occasionally: "أحيانًا فقط",
      firstCigarette: "كم تدوم سيجارتك الأولى بعد الاستيقاظ؟",
      within5: "أقل من 5 دقائق",
      "5to30": "من 5 إلى 30 دقيقة",
      after30: "أكثر من 30 دقيقة",
      indoors: "هل تدخن في أماكن مغلقة (المنزل، العمل)؟",
      quitAttempts: "كم مرة حاولت التوقف عن التدخين؟",
      never: "لم أحاول",
      once: "مرة واحدة",
      moreThanOnce: "أكثر من مرة",
      longestQuit: "ما هو أطول مدة توقفت فيها عن التدخين؟",
      reasonStarted: "ما السبب الذي دفعك إلى البدء في التدخين؟",
      curiosity: "فضول",
      peerPressure: "ضغط الأصدقاء",
      stress: "توتر نفسي",
      pleasure: "متعة",
      other: "أخرى",
      considersAddicted: "هل تعتبر نفسك مدمنًا على التدخين؟",
      healthAwareness: "القسم 3: الوعي الصحي",
      awarenessOfDiseases: "هل تعلم أن التدخين يسبب أمراضًا خطيرة؟",
      diseasesKnown: "ما أكثر الأمراض التي تعرف أنها ناتجة عن التدخين؟ (اختر جميع ما ينطبق)",
      cancer: "السرطان",
      cardiovascular: "أمراض القلب",
      respiratory: "أمراض الرئة",
      infertility: "العقم",
      informationSource: "من أين تحصل على معلوماتك عن التدخين؟",
      internet: "الإنترنت",
      physician: "الطبيب",
      media: "الإعلام",
      friends: "الأصدقاء",
      school: "المدرسة",
      healthImpact: "القسم 4: التأثير الصحي",
      chronicCough: "هل تعاني من سعال مزمن؟",
      breathingIssues: "هل تشعر بضيق في التنفس أو تعب متكرر؟",
      doctorVisit: "هل زرت طبيبًا بسبب مشاكل متعلقة بالتدخين؟",
      familyHistory: "هل توجد حالات مرضية خطيرة في عائلتك مرتبطة بالتدخين؟",
      quitIntentions: "القسم 5: نية الإقلاع (للمدخنين الحاليين)",
      consideringQuitting: "هل تفكر في الإقلاع عن التدخين؟",
      withinMonth: "نعم خلال الشهر القادم",
      withinYear: "نعم خلال السنة القادمة",
      notConsidering: "لا أفكر حاليًا",
      quitBarrier: "ما هو أكبر عائق يمنعك من الإقلاع؟",
      socialEnvironment: "الرفقة",
      addiction: "الإدمان",
      fearOfFailure: "الخوف من الفشل",
      preferredMethod: "ما الطريقة التي تفضلها للإقلاع؟",
      onMyOwn: "بمفردي",
      medicalAssistance: "بمساعدة طبية",
      nicotinePatches: "باستخدام لصقات أو أدوية",
      psychologicalSupport: "من خلال الدعم النفسي",
      interestedInProgram: "هل تود المشاركة في برنامج لمساعدتك على التوقف عن التدخين؟",
      exSmokers: "القسم 6: للمقلعين عن التدخين",
      timeSinceQuit: "منذ متى أقلعت عن التدخين؟",
      quitReason: "ما السبب الذي دفعك للإقلاع؟",
      healthProblem: "مشكلة صحية",
      doctorAdvice: "نصيحة طبيب",
      personalDecision: "رغبة شخصية",
      financialReasons: "أسباب مالية",
      quitDifficulty: "كيف كانت تجربتك أثناء التوقف؟",
      easy: "سهلة",
      moderatelyDifficult: "متوسطة الصعوبة",
      veryDifficult: "صعبة جدًا",
      experiencedRelapse: "هل تعرضت لانتكاسة؟",
      adviceForSmokers: "ما النصيحة التي تقدمها للمدخنين الراغبين في التوقف؟",
      feedback: "القسم 7: ملاحظات إضافية",
      opinionOnCampaigns: "ما رأيك في حملات التوعية ضد التدخين في بلدك؟",
      suggestionsForHelp: "ما الاقتراحات التي تراها فعالة لمساعدة المدخنين على الإقلاع؟",
      submit: "إرسال الاستبيان",
      submitting: "جاري الإرسال...",
    },
  };

  const text = t[language];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{text.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{text.subtitle}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              data-testid="button-language-toggle"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Demographics */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.demographics}</h2>
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.gender}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" data-testid="radio-gender">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" data-testid="radio-male" />
                            <label htmlFor="male" className="cursor-pointer">{text.male}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" data-testid="radio-female" />
                            <label htmlFor="female" className="cursor-pointer">{text.female}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.age}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.maritalStatus}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3" data-testid="radio-marital-status">
                          {[
                            { value: "single", label: text.single },
                            { value: "married", label: text.married },
                            { value: "divorced", label: text.divorced },
                            { value: "widowed", label: text.widowed },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={option.value} data-testid={`radio-${option.value}`} />
                              <label htmlFor={option.value} className="cursor-pointer">{option.label}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.education}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3" data-testid="radio-education">
                          {[
                            { value: "primary", label: text.primary },
                            { value: "middle", label: text.middle },
                            { value: "high", label: text.high },
                            { value: "university", label: text.university },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={option.value} data-testid={`radio-${option.value}`} />
                              <label htmlFor={option.value} className="cursor-pointer">{option.label}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.occupation}</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-occupation" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="residence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.residence}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" data-testid="radio-residence">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="urban" id="urban" data-testid="radio-urban" />
                            <label htmlFor="urban" className="cursor-pointer">{text.urban}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rural" id="rural" data-testid="radio-rural" />
                            <label htmlFor="rural" className="cursor-pointer">{text.rural}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Smoking Behavior */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.smokingBehavior}</h2>
                
                <FormField
                  control={form.control}
                  name="currentlySmoking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.currentlySmoking}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-currently-smoking"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="smoking-yes" data-testid="radio-smoking-yes" />
                            <label htmlFor="smoking-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="smoking-no" data-testid="radio-smoking-no" />
                            <label htmlFor="smoking-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {currentlySmoking && (
                  <>
                    <FormField
                      control={form.control}
                      name="ageStartedSmoking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.ageStarted}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                              data-testid="input-age-started"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tobaccoType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.tobaccoType}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-2 gap-3" data-testid="radio-tobacco-type">
                              {[
                                { value: "cigarettes", label: text.cigarettes },
                                { value: "hookah", label: text.hookah },
                                { value: "cigar", label: text.cigar },
                                { value: "hand-rolled", label: text.handRolled },
                              ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={option.value} data-testid={`radio-${option.value}`} />
                                  <label htmlFor={option.value} className="cursor-pointer">{option.label}</label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cigarettesPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.cigarettesPerDay}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-2 gap-3" data-testid="radio-cigarettes-per-day">
                              {[
                                { value: "less-than-5", label: text.lessThan5 },
                                { value: "5-10", label: text["5to10"] },
                                { value: "11-20", label: text["11to20"] },
                                { value: "more-than-20", label: text.moreThan20 },
                              ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={option.value} />
                                  <label htmlFor={option.value} className="cursor-pointer">{option.label}</label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smokingFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.frequency}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="flex gap-4" data-testid="radio-frequency">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="daily" id="daily" data-testid="radio-daily" />
                                <label htmlFor="daily" className="cursor-pointer">{text.daily}</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="occasionally" id="occasionally" data-testid="radio-occasionally" />
                                <label htmlFor="occasionally" className="cursor-pointer">{text.occasionally}</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firstCigaretteTiming"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.firstCigarette}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-1 gap-3" data-testid="radio-first-cigarette">
                              {[
                                { value: "within-5", label: text.within5 },
                                { value: "5-30", label: text["5to30"] },
                                { value: "after-30", label: text.after30 },
                              ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={option.value} />
                                  <label htmlFor={option.value} className="cursor-pointer">{option.label}</label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smokesIndoors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.indoors}</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={(value) => field.onChange(value === "true")} 
                              value={field.value ? "true" : "false"} 
                              className="flex gap-4"
                              data-testid="radio-indoors"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="indoors-yes" data-testid="radio-indoors-yes" />
                                <label htmlFor="indoors-yes" className="cursor-pointer">{text.yes}</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="indoors-no" data-testid="radio-indoors-no" />
                                <label htmlFor="indoors-no" className="cursor-pointer">{text.no}</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quitAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.quitAttempts}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-1 gap-3" data-testid="radio-quit-attempts">
                              {[
                                { value: "never", label: text.never },
                                { value: "once", label: text.once },
                                { value: "more-than-once", label: text.moreThanOnce },
                              ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={`quit-${option.value}`} />
                                  <label htmlFor={`quit-${option.value}`} className="cursor-pointer">{option.label}</label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longestQuitPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.longestQuit}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} data-testid="input-longest-quit" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reasonStarted"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.reasonStarted}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-2 gap-3" data-testid="radio-reason-started">
                              {[
                                { value: "curiosity", label: text.curiosity },
                                { value: "peer-pressure", label: text.peerPressure },
                                { value: "stress", label: text.stress },
                                { value: "pleasure", label: text.pleasure },
                                { value: "other", label: text.other },
                              ].map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.value} id={`reason-${option.value}`} />
                                  <label htmlFor={`reason-${option.value}`} className="cursor-pointer">{option.label}</label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("reasonStarted") === "other" && (
                      <FormField
                        control={form.control}
                        name="reasonStartedOther"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{text.other}</FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value || ""} data-testid="input-reason-other" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="considersAddicted"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.considersAddicted}</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={(value) => field.onChange(value === "true")} 
                              value={field.value ? "true" : "false"} 
                              className="flex gap-4"
                              data-testid="radio-considers-addicted"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="addicted-yes" data-testid="radio-addicted-yes" />
                                <label htmlFor="addicted-yes" className="cursor-pointer">{text.yes}</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="addicted-no" data-testid="radio-addicted-no" />
                                <label htmlFor="addicted-no" className="cursor-pointer">{text.no}</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              {/* Health Awareness */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.healthAwareness}</h2>
                
                <FormField
                  control={form.control}
                  name="awarenessOfDiseases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.awarenessOfDiseases}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-awareness"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="aware-yes" data-testid="radio-aware-yes" />
                            <label htmlFor="aware-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="aware-no" data-testid="radio-aware-no" />
                            <label htmlFor="aware-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diseasesKnown"
                  render={() => (
                    <FormItem>
                      <FormLabel>{text.diseasesKnown}</FormLabel>
                      <div className="space-y-2">
                        {[
                          { value: "cancer", label: text.cancer },
                          { value: "cardiovascular", label: text.cardiovascular },
                          { value: "respiratory", label: text.respiratory },
                          { value: "infertility", label: text.infertility },
                          { value: "other", label: text.other },
                        ].map((disease) => (
                          <FormField
                            key={disease.value}
                            control={form.control}
                            name="diseasesKnown"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(disease.value)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, disease.value]);
                                      } else {
                                        field.onChange(current.filter((v) => v !== disease.value));
                                      }
                                    }}
                                    data-testid={`checkbox-disease-${disease.value}`}
                                  />
                                </FormControl>
                                <FormLabel className="!mt-0 cursor-pointer">{disease.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("diseasesKnown")?.includes("other") && (
                  <FormField
                    control={form.control}
                    name="diseasesKnownOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.other}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} data-testid="input-disease-other" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="informationSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.informationSource}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3" data-testid="radio-info-source">
                          {[
                            { value: "internet", label: text.internet },
                            { value: "physician", label: text.physician },
                            { value: "media", label: text.media },
                            { value: "friends", label: text.friends },
                            { value: "school", label: text.school },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`info-${option.value}`} />
                              <label htmlFor={`info-${option.value}`} className="cursor-pointer">{option.label}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Health Impact */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.healthImpact}</h2>
                
                <FormField
                  control={form.control}
                  name="chronicCough"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.chronicCough}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-chronic-cough"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="cough-yes" data-testid="radio-cough-yes" />
                            <label htmlFor="cough-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="cough-no" data-testid="radio-cough-no" />
                            <label htmlFor="cough-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breathingIssues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.breathingIssues}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-breathing"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="breathing-yes" data-testid="radio-breathing-yes" />
                            <label htmlFor="breathing-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="breathing-no" data-testid="radio-breathing-no" />
                            <label htmlFor="breathing-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctorVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.doctorVisit}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-doctor"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="doctor-yes" data-testid="radio-doctor-yes" />
                            <label htmlFor="doctor-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="doctor-no" data-testid="radio-doctor-no" />
                            <label htmlFor="doctor-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="familyHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.familyHistory}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          value={field.value ? "true" : "false"} 
                          className="flex gap-4"
                          data-testid="radio-family-history"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="family-yes" data-testid="radio-family-yes" />
                            <label htmlFor="family-yes" className="cursor-pointer">{text.yes}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="family-no" data-testid="radio-family-no" />
                            <label htmlFor="family-no" className="cursor-pointer">{text.no}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Quit Intentions */}
              {currentlySmoking && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.quitIntentions}</h2>
                  
                  <FormField
                    control={form.control}
                    name="consideringQuitting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.consideringQuitting}</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-1 gap-3" data-testid="radio-considering-quitting">
                            {[
                              { value: "within-month", label: text.withinMonth },
                              { value: "within-year", label: text.withinYear },
                              { value: "not-considering", label: text.notConsidering },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`considering-${option.value}`} />
                                <label htmlFor={`considering-${option.value}`} className="cursor-pointer">{option.label}</label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quitBarrier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.quitBarrier}</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-2 gap-3" data-testid="radio-quit-barrier">
                            {[
                              { value: "stress", label: text.stress },
                              { value: "social-environment", label: text.socialEnvironment },
                              { value: "addiction", label: text.addiction },
                              { value: "fear-of-failure", label: text.fearOfFailure },
                              { value: "other", label: text.other },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`barrier-${option.value}`} />
                                <label htmlFor={`barrier-${option.value}`} className="cursor-pointer">{option.label}</label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("quitBarrier") === "other" && (
                    <FormField
                      control={form.control}
                      name="quitBarrierOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.other}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} data-testid="input-barrier-other" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="preferredQuitMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.preferredMethod}</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-1 gap-3" data-testid="radio-quit-method">
                            {[
                              { value: "on-my-own", label: text.onMyOwn },
                              { value: "medical-assistance", label: text.medicalAssistance },
                              { value: "nicotine-patches", label: text.nicotinePatches },
                              { value: "psychological-support", label: text.psychologicalSupport },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`method-${option.value}`} />
                                <label htmlFor={`method-${option.value}`} className="cursor-pointer">{option.label}</label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestedInProgram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.interestedInProgram}</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={(value) => field.onChange(value === "true")} 
                            value={field.value ? "true" : "false"} 
                            className="flex gap-4"
                            data-testid="radio-interested-program"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="program-yes" data-testid="radio-program-yes" />
                              <label htmlFor="program-yes" className="cursor-pointer">{text.yes}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="program-no" data-testid="radio-program-no" />
                              <label htmlFor="program-no" className="cursor-pointer">{text.no}</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Ex-Smokers Section */}
              {!currentlySmoking && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.exSmokers}</h2>
                  
                  <FormField
                    control={form.control}
                    name="timeSinceQuit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.timeSinceQuit}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} data-testid="input-time-since-quit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quitReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.quitReason}</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-2 gap-3" data-testid="radio-quit-reason">
                            {[
                              { value: "health-problem", label: text.healthProblem },
                              { value: "doctor-advice", label: text.doctorAdvice },
                              { value: "personal-decision", label: text.personalDecision },
                              { value: "financial-reasons", label: text.financialReasons },
                              { value: "other", label: text.other },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`quit-reason-${option.value}`} />
                                <label htmlFor={`quit-reason-${option.value}`} className="cursor-pointer">{option.label}</label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("quitReason") === "other" && (
                    <FormField
                      control={form.control}
                      name="quitReasonOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text.other}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} data-testid="input-quit-reason-other" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="quitDifficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.quitDifficulty}</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value || ""} className="grid grid-cols-1 gap-3" data-testid="radio-quit-difficulty">
                            {[
                              { value: "easy", label: text.easy },
                              { value: "moderately-difficult", label: text.moderatelyDifficult },
                              { value: "very-difficult", label: text.veryDifficult },
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`difficulty-${option.value}`} />
                                <label htmlFor={`difficulty-${option.value}`} className="cursor-pointer">{option.label}</label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experiencedRelapse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.experiencedRelapse}</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={(value) => field.onChange(value === "true")} 
                            value={field.value ? "true" : "false"} 
                            className="flex gap-4"
                            data-testid="radio-relapse"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="relapse-yes" data-testid="radio-relapse-yes" />
                              <label htmlFor="relapse-yes" className="cursor-pointer">{text.yes}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="relapse-no" data-testid="radio-relapse-no" />
                              <label htmlFor="relapse-no" className="cursor-pointer">{text.no}</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adviceForSmokers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.adviceForSmokers}</FormLabel>
                        <FormControl>
                          <Textarea {...field} value={field.value || ""} rows={4} data-testid="textarea-advice" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Feedback */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground border-b pb-2">{text.feedback}</h2>
                
                <FormField
                  control={form.control}
                  name="opinionOnCampaigns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.opinionOnCampaigns}</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} rows={4} data-testid="textarea-campaigns" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="suggestionsForHelp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.suggestionsForHelp}</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} rows={4} data-testid="textarea-suggestions" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitMutation.isPending}
                data-testid="button-submit-survey"
              >
                {submitMutation.isPending ? text.submitting : text.submit}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
