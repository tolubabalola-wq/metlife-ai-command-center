// EMEA AI Command Center — Synthetic Data Model
// All figures are illustrative for discussion only and do not represent actual company data.

export const BRAND_COLORS = {
  blue: '#0090DA',
  green: '#5DA831',
  greenLight: '#8CC63F',
  amber: '#E0992E',
  red: '#D9483B',
  teal: '#0F97A6',
  canvas: '#F3F6FB',
  border: '#E1E8F1',
  navy: '#16273D',
  navySecondary: '#54657E',
  navyFaint: '#8290A6',
};

export type Stage = 'Idea' | 'Pilot' | 'Scaling' | 'Production';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type HandoffStatus = 'automated' | 'human-review' | 'manual-gap';

export interface AITool {
  id: string;
  name: string;
  description: string;
  function: string;
  leadMarket: string;
  markets: string[];
  stage: Stage;
  riskLevel: RiskLevel;
  riskScore: number;
  yearlyValue: number; // USD millions
  usagePercent: number; // 0-100
  model: string;
  costPerUse: number; // cents
  usesPerMonth: number;
  monthlyRunCost: number; // USD thousands
  testing: {
    casesCovered: number;
    testPassRate: number;
    sourceBackedAnswers: number;
    incorrectAnswerRate: number;
    overallQuality: number;
    customerSatisfaction: number;
  };
  speed: {
    typicalResponseMs: number;
    slowest5pctMs: number;
  };
  humanStepInReasons: string[];
  responsibleAI: {
    fairness: number;
    transparency: number;
    privacy: number;
    accountability: number;
    performance: number;
    dataGovernance: number;
    resiliency: number;
  };
  newFrontierPriority: string;
  newFrontierOutcome: 'revenue' | 'expense'; // Which New Frontier outcome this tool primarily drives
  weeklyQualityTrend: number[];
}

export const NEW_FRONTIER_PRIORITIES = [
  'Extend leadership in Group Benefits',
  'Capitalize on the retirement platform',
  'Accelerate asset management',
  'Expand in high-growth international markets',
  'Technology and efficiency enabler',
];

export const FUNCTIONS = [
  'Distribution',
  'Underwriting',
  'Claims',
  'Service',
  'Policy Admin and Operations',
  'Actuarial and Pricing',
  'Finance',
  'Risk and Compliance',
  'HR and Corporate',
  'Technology',
];

export const MARKETS = [
  'Center',
  'Poland Hub',
  'Gulf Cluster',
  'Egypt',
  'Turkey',
  'UK',
  'France',
  'Italy',
  'Spain',
  'CEE',
];

export const AI_TOOLS: AITool[] = [
  {
    id: 'claims-triage',
    name: 'Claims Triage AI',
    description: 'Reads incoming claim documents and routes each claim to the right team with a recommended priority, cutting manual sorting time.',
    function: 'Claims',
    leadMarket: 'Poland Hub',
    markets: ['Poland Hub', 'Gulf Cluster', 'UK', 'Turkey', 'Egypt'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 28,
    yearlyValue: 14.2,
    usagePercent: 82,
    model: 'AI Claims LLM v2',
    costPerUse: 3.2,
    usesPerMonth: 48000,
    monthlyRunCost: 153.6,
    testing: { casesCovered: 2400, testPassRate: 94, sourceBackedAnswers: 91, incorrectAnswerRate: 3.1, overallQuality: 91, customerSatisfaction: 88 },
    speed: { typicalResponseMs: 820, slowest5pctMs: 2400 },
    humanStepInReasons: ['Ambiguous policy wording', 'High-value claim above threshold', 'Fraud flag raised'],
    responsibleAI: { fairness: 88, transparency: 85, privacy: 92, accountability: 90, performance: 91, dataGovernance: 89, resiliency: 87 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [88, 89, 90, 91, 90, 92, 91, 91],
  },
  {
    id: 'fraud-detection',
    name: 'Fraud Detection Engine',
    description: 'Scores every claim and transaction for fraud risk using pattern recognition across historical data, flagging anomalies for investigator review.',
    function: 'Claims',
    leadMarket: 'Center',
    markets: ['Center', 'Poland Hub', 'UK', 'France', 'Gulf Cluster', 'Turkey'],
    stage: 'Production',
    riskLevel: 'Medium',
    riskScore: 52,
    yearlyValue: 18.7,
    usagePercent: 91,
    model: 'AI Risk Classifier v3',
    costPerUse: 1.8,
    usesPerMonth: 72000,
    monthlyRunCost: 129.6,
    testing: { casesCovered: 3800, testPassRate: 91, sourceBackedAnswers: 78, incorrectAnswerRate: 4.2, overallQuality: 88, customerSatisfaction: 82 },
    speed: { typicalResponseMs: 340, slowest5pctMs: 980 },
    humanStepInReasons: ['Score in borderline range', 'New fraud pattern not in training data', 'Regulatory review required'],
    responsibleAI: { fairness: 79, transparency: 72, privacy: 85, accountability: 83, performance: 88, dataGovernance: 84, resiliency: 90 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [85, 86, 87, 88, 87, 89, 88, 88],
  },
  {
    id: 'contact-centre-copilot',
    name: 'Contact Centre Copilot',
    description: 'Listens to live customer calls and suggests the next best response to the agent in real time, reducing handling time and improving consistency.',
    function: 'Service',
    leadMarket: 'Poland Hub',
    markets: ['Poland Hub', 'UK', 'Turkey', 'Gulf Cluster', 'Egypt'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 22,
    yearlyValue: 9.8,
    usagePercent: 76,
    model: 'AI Dialogue v1',
    costPerUse: 4.5,
    usesPerMonth: 38000,
    monthlyRunCost: 171.0,
    testing: { casesCovered: 1900, testPassRate: 89, sourceBackedAnswers: 84, incorrectAnswerRate: 5.1, overallQuality: 86, customerSatisfaction: 91 },
    speed: { typicalResponseMs: 1200, slowest5pctMs: 3100 },
    humanStepInReasons: ['Complaint escalation', 'Complex policy query', 'Customer requests human'],
    responsibleAI: { fairness: 85, transparency: 88, privacy: 90, accountability: 87, performance: 86, dataGovernance: 88, resiliency: 84 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [83, 84, 85, 86, 85, 87, 86, 86],
  },
  {
    id: 'virtual-assistant',
    name: 'Customer Virtual Assistant',
    description: 'Handles routine customer questions about policies, claims status, and payments through a conversational interface on web and mobile.',
    function: 'Service',
    leadMarket: 'Gulf Cluster',
    markets: ['Gulf Cluster', 'Egypt', 'Turkey', 'UK', 'Spain', 'Italy'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 19,
    yearlyValue: 7.4,
    usagePercent: 88,
    model: 'AI Dialogue v1',
    costPerUse: 2.1,
    usesPerMonth: 95000,
    monthlyRunCost: 199.5,
    testing: { casesCovered: 4200, testPassRate: 92, sourceBackedAnswers: 89, incorrectAnswerRate: 3.8, overallQuality: 90, customerSatisfaction: 87 },
    speed: { typicalResponseMs: 680, slowest5pctMs: 1900 },
    humanStepInReasons: ['Complaint or distress signal', 'Policy change request', 'Billing dispute'],
    responsibleAI: { fairness: 90, transparency: 91, privacy: 93, accountability: 89, performance: 90, dataGovernance: 91, resiliency: 88 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [88, 89, 90, 91, 90, 91, 90, 90],
  },
  {
    id: 'underwriting-assistant',
    name: 'Underwriting Assistant',
    description: 'Summarizes applicant medical and financial data and suggests a risk band, helping underwriters reach decisions faster and more consistently.',
    function: 'Underwriting',
    leadMarket: 'UK',
    markets: ['UK', 'France', 'Gulf Cluster', 'Center'],
    stage: 'Production',
    riskLevel: 'Medium',
    riskScore: 48,
    yearlyValue: 11.3,
    usagePercent: 71,
    model: 'AI Medical LLM v2',
    costPerUse: 8.4,
    usesPerMonth: 22000,
    monthlyRunCost: 184.8,
    testing: { casesCovered: 1100, testPassRate: 88, sourceBackedAnswers: 93, incorrectAnswerRate: 4.5, overallQuality: 89, customerSatisfaction: 84 },
    speed: { typicalResponseMs: 2100, slowest5pctMs: 5800 },
    humanStepInReasons: ['Borderline risk case', 'Missing medical data', 'High-sum assured above limit'],
    responsibleAI: { fairness: 76, transparency: 80, privacy: 88, accountability: 85, performance: 88, dataGovernance: 86, resiliency: 82 },
    newFrontierPriority: 'Extend leadership in Group Benefits',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [86, 87, 88, 89, 88, 89, 89, 89],
  },
  {
    id: 'broker-copilot',
    name: 'Broker and Agent Sales Copilot',
    description: 'Gives brokers and agents instant access to product comparisons, eligibility checks, and proposal drafts during client conversations.',
    function: 'Distribution',
    leadMarket: 'Gulf Cluster',
    markets: ['Gulf Cluster', 'Egypt', 'Turkey', 'UK', 'France', 'Italy', 'Spain'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 24,
    yearlyValue: 12.6,
    usagePercent: 79,
    model: 'AI Sales LLM v1',
    costPerUse: 3.8,
    usesPerMonth: 41000,
    monthlyRunCost: 155.8,
    testing: { casesCovered: 2100, testPassRate: 90, sourceBackedAnswers: 87, incorrectAnswerRate: 4.0, overallQuality: 88, customerSatisfaction: 90 },
    speed: { typicalResponseMs: 1100, slowest5pctMs: 2900 },
    humanStepInReasons: ['Complex group scheme', 'Regulatory disclosure required', 'Price exception needed'],
    responsibleAI: { fairness: 83, transparency: 86, privacy: 89, accountability: 88, performance: 88, dataGovernance: 87, resiliency: 85 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [86, 87, 88, 89, 88, 90, 89, 88],
  },
  {
    id: 'doc-digitization',
    name: 'Document Digitization',
    description: 'Converts paper and scanned documents into structured data, extracting key fields and routing them to the right system automatically.',
    function: 'Policy Admin and Operations',
    leadMarket: 'Poland Hub',
    markets: ['Poland Hub', 'Egypt', 'Turkey', 'CEE', 'Gulf Cluster'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 16,
    yearlyValue: 6.1,
    usagePercent: 94,
    model: 'AI OCR Plus v2',
    costPerUse: 0.9,
    usesPerMonth: 180000,
    monthlyRunCost: 162.0,
    testing: { casesCovered: 8000, testPassRate: 96, sourceBackedAnswers: 98, incorrectAnswerRate: 1.8, overallQuality: 95, customerSatisfaction: 86 },
    speed: { typicalResponseMs: 420, slowest5pctMs: 1200 },
    humanStepInReasons: ['Illegible document', 'Missing mandatory field', 'Unusual document format'],
    responsibleAI: { fairness: 92, transparency: 90, privacy: 91, accountability: 93, performance: 95, dataGovernance: 94, resiliency: 91 },
    newFrontierPriority: 'Technology and efficiency enabler',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [93, 94, 95, 95, 94, 96, 95, 95],
  },
  {
    id: 'retention-nba',
    name: 'Retention Next-Best-Action',
    description: 'Identifies customers at risk of lapsing and recommends the most effective outreach action for each, prioritized by predicted retention value.',
    function: 'Distribution',
    leadMarket: 'Turkey',
    markets: ['Turkey', 'Egypt', 'Gulf Cluster', 'CEE', 'Spain'],
    stage: 'Scaling',
    riskLevel: 'Low',
    riskScore: 31,
    yearlyValue: 5.8,
    usagePercent: 58,
    model: 'AI Propensity v1',
    costPerUse: 2.4,
    usesPerMonth: 28000,
    monthlyRunCost: 67.2,
    testing: { casesCovered: 1400, testPassRate: 87, sourceBackedAnswers: 82, incorrectAnswerRate: 5.8, overallQuality: 84, customerSatisfaction: 83 },
    speed: { typicalResponseMs: 890, slowest5pctMs: 2200 },
    humanStepInReasons: ['VIP customer', 'Complex multi-policy household', 'Regulatory opt-out'],
    responsibleAI: { fairness: 81, transparency: 79, privacy: 87, accountability: 84, performance: 84, dataGovernance: 83, resiliency: 80 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [80, 81, 82, 83, 83, 84, 84, 84],
  },
  {
    id: 'complaints-assistant',
    name: 'Complaints Assistant',
    description: 'Reads complaint submissions, categorizes the issue, drafts an initial acknowledgment, and flags regulatory-sensitive cases for priority handling.',
    function: 'Service',
    leadMarket: 'UK',
    markets: ['UK', 'France', 'Italy', 'Spain', 'Poland Hub'],
    stage: 'Production',
    riskLevel: 'Medium',
    riskScore: 44,
    yearlyValue: 4.2,
    usagePercent: 83,
    model: 'AI Dialogue v1',
    costPerUse: 3.1,
    usesPerMonth: 18000,
    monthlyRunCost: 55.8,
    testing: { casesCovered: 900, testPassRate: 88, sourceBackedAnswers: 85, incorrectAnswerRate: 4.9, overallQuality: 86, customerSatisfaction: 85 },
    speed: { typicalResponseMs: 1400, slowest5pctMs: 3600 },
    humanStepInReasons: ['Regulatory escalation', 'Legal threat', 'Media or social media risk'],
    responsibleAI: { fairness: 82, transparency: 84, privacy: 88, accountability: 86, performance: 86, dataGovernance: 85, resiliency: 83 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [83, 84, 85, 86, 85, 87, 86, 86],
  },
  {
    id: 'actuarial-research',
    name: 'Actuarial Research Assistant',
    description: 'Searches and summarizes internal and external actuarial literature, helping pricing teams build models faster with better evidence.',
    function: 'Actuarial and Pricing',
    leadMarket: 'Center',
    markets: ['Center', 'UK', 'France'],
    stage: 'Scaling',
    riskLevel: 'Medium',
    riskScore: 41,
    yearlyValue: 3.4,
    usagePercent: 62,
    model: 'AI Research LLM v1',
    costPerUse: 6.2,
    usesPerMonth: 8000,
    monthlyRunCost: 49.6,
    testing: { casesCovered: 400, testPassRate: 85, sourceBackedAnswers: 91, incorrectAnswerRate: 5.2, overallQuality: 87, customerSatisfaction: 81 },
    speed: { typicalResponseMs: 3200, slowest5pctMs: 8400 },
    humanStepInReasons: ['Novel risk class', 'Conflicting source data', 'Regulatory sign-off needed'],
    responsibleAI: { fairness: 80, transparency: 83, privacy: 86, accountability: 84, performance: 85, dataGovernance: 87, resiliency: 79 },
    newFrontierPriority: 'Capitalize on the retirement platform',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [83, 84, 85, 86, 86, 87, 87, 87],
  },
  {
    id: 'proposal-generator',
    name: 'Proposal Generator',
    description: 'Produces tailored group insurance proposal documents in minutes, pulling live pricing and product data and formatting them to client specifications.',
    function: 'Distribution',
    leadMarket: 'Gulf Cluster',
    markets: ['Gulf Cluster', 'UK', 'France', 'Turkey', 'Egypt'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 20,
    yearlyValue: 8.9,
    usagePercent: 85,
    model: 'AI Sales LLM v1',
    costPerUse: 5.6,
    usesPerMonth: 14000,
    monthlyRunCost: 78.4,
    testing: { casesCovered: 700, testPassRate: 91, sourceBackedAnswers: 88, incorrectAnswerRate: 3.6, overallQuality: 90, customerSatisfaction: 89 },
    speed: { typicalResponseMs: 4800, slowest5pctMs: 11200 },
    humanStepInReasons: ['Bespoke benefit design', 'Large scheme above threshold', 'Client requests custom format'],
    responsibleAI: { fairness: 86, transparency: 88, privacy: 90, accountability: 89, performance: 90, dataGovernance: 88, resiliency: 86 },
    newFrontierPriority: 'Extend leadership in Group Benefits',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [87, 88, 89, 90, 89, 91, 90, 90],
  },
  {
    id: 'hr-knowledge-bot',
    name: 'HR Knowledge Bot',
    description: 'Answers employee questions about HR policies, benefits, and processes instantly, available in multiple languages across all EMEA markets.',
    function: 'HR and Corporate',
    leadMarket: 'Poland Hub',
    markets: ['Poland Hub', 'Center', 'UK', 'France', 'Italy', 'Spain', 'Turkey', 'Gulf Cluster', 'Egypt', 'CEE'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 18,
    yearlyValue: 2.8,
    usagePercent: 91,
    model: 'AI Dialogue v1',
    costPerUse: 1.2,
    usesPerMonth: 62000,
    monthlyRunCost: 74.4,
    testing: { casesCovered: 3100, testPassRate: 93, sourceBackedAnswers: 90, incorrectAnswerRate: 2.9, overallQuality: 92, customerSatisfaction: 90 },
    speed: { typicalResponseMs: 580, slowest5pctMs: 1600 },
    humanStepInReasons: ['Sensitive personal matter', 'Policy exception request', 'Legal or union query'],
    responsibleAI: { fairness: 89, transparency: 90, privacy: 94, accountability: 91, performance: 92, dataGovernance: 92, resiliency: 89 },
    newFrontierPriority: 'Technology and efficiency enabler',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [90, 91, 92, 92, 91, 93, 92, 92],
  },
  {
    id: 'developer-copilot',
    name: 'Developer Copilot',
    description: 'Assists EMEA engineers with code generation, review, and documentation, accelerating delivery of the AI platform itself.',
    function: 'Technology',
    leadMarket: 'Center',
    markets: ['Center', 'Poland Hub', 'UK'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 25,
    yearlyValue: 4.1,
    usagePercent: 88,
    model: 'AI Code LLM v1',
    costPerUse: 2.8,
    usesPerMonth: 45000,
    monthlyRunCost: 126.0,
    testing: { casesCovered: 2200, testPassRate: 90, sourceBackedAnswers: 86, incorrectAnswerRate: 4.1, overallQuality: 88, customerSatisfaction: 88 },
    speed: { typicalResponseMs: 1800, slowest5pctMs: 4200 },
    humanStepInReasons: ['Security-sensitive code', 'Architecture decision', 'Compliance review'],
    responsibleAI: { fairness: 84, transparency: 87, privacy: 89, accountability: 88, performance: 88, dataGovernance: 87, resiliency: 86 },
    newFrontierPriority: 'Technology and efficiency enabler',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [86, 87, 88, 88, 87, 89, 88, 88],
  },
  {
    id: 'regulatory-scanner',
    name: 'Regulatory Scanner',
    description: 'Monitors regulatory publications across EMEA markets and flags changes that affect EMEA products or operations, with a plain-language summary.',
    function: 'Risk and Compliance',
    leadMarket: 'Center',
    markets: ['Center', 'UK', 'France', 'Italy', 'Spain', 'Gulf Cluster', 'Turkey', 'Egypt', 'CEE'],
    stage: 'Production',
    riskLevel: 'Medium',
    riskScore: 46,
    yearlyValue: 3.9,
    usagePercent: 78,
    model: 'AI Research LLM v1',
    costPerUse: 4.1,
    usesPerMonth: 12000,
    monthlyRunCost: 49.2,
    testing: { casesCovered: 600, testPassRate: 87, sourceBackedAnswers: 94, incorrectAnswerRate: 4.8, overallQuality: 88, customerSatisfaction: 83 },
    speed: { typicalResponseMs: 2600, slowest5pctMs: 6800 },
    humanStepInReasons: ['Material regulatory change', 'Legal interpretation needed', 'Cross-border impact'],
    responsibleAI: { fairness: 83, transparency: 88, privacy: 87, accountability: 90, performance: 87, dataGovernance: 91, resiliency: 84 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [85, 86, 87, 88, 87, 88, 88, 88],
  },
  {
    id: 'bancassurance-onboarding',
    name: 'Bancassurance Onboarding',
    description: 'Automates the customer onboarding journey for bank-distributed insurance, verifying identity, checking eligibility, and issuing policy documents.',
    function: 'Distribution',
    leadMarket: 'Egypt',
    markets: ['Egypt', 'Turkey', 'Gulf Cluster'],
    stage: 'Scaling',
    riskLevel: 'Medium',
    riskScore: 55,
    yearlyValue: 4.7,
    usagePercent: 49,
    model: 'AI Identity v1',
    costPerUse: 7.2,
    usesPerMonth: 9500,
    monthlyRunCost: 68.4,
    testing: { casesCovered: 480, testPassRate: 84, sourceBackedAnswers: 79, incorrectAnswerRate: 6.8, overallQuality: 82, customerSatisfaction: 80 },
    speed: { typicalResponseMs: 3400, slowest5pctMs: 8900 },
    humanStepInReasons: ['Identity verification failure', 'Sanctions screening match', 'Missing bank data'],
    responsibleAI: { fairness: 77, transparency: 75, privacy: 83, accountability: 81, performance: 82, dataGovernance: 80, resiliency: 78 },
    newFrontierPriority: 'Expand in high-growth international markets',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [78, 79, 80, 81, 81, 82, 82, 82],
  },
  {
    id: 'medical-underwriting-summarizer',
    name: 'Medical Underwriting Summarizer',
    description: 'Reads medical reports and clinical notes and produces a structured summary for the underwriter, highlighting relevant conditions and risk factors.',
    function: 'Underwriting',
    leadMarket: 'UK',
    markets: ['UK', 'France', 'Gulf Cluster', 'Italy'],
    stage: 'Production',
    riskLevel: 'High',
    riskScore: 68,
    yearlyValue: 6.8,
    usagePercent: 74,
    model: 'AI Medical LLM v2',
    costPerUse: 9.8,
    usesPerMonth: 16000,
    monthlyRunCost: 156.8,
    testing: { casesCovered: 800, testPassRate: 86, sourceBackedAnswers: 95, incorrectAnswerRate: 5.9, overallQuality: 87, customerSatisfaction: 82 },
    speed: { typicalResponseMs: 4200, slowest5pctMs: 10600 },
    humanStepInReasons: ['Rare or complex condition', 'Conflicting clinical data', 'High-sum assured case'],
    responsibleAI: { fairness: 72, transparency: 74, privacy: 86, accountability: 80, performance: 86, dataGovernance: 83, resiliency: 77 },
    newFrontierPriority: 'Extend leadership in Group Benefits',
    newFrontierOutcome: 'revenue',
    weeklyQualityTrend: [83, 84, 85, 86, 85, 87, 86, 87],
  },
  {
    id: 'multilingual-translation',
    name: 'Multilingual Translation',
    description: 'Translates policy documents, customer communications, and internal content across 14 EMEA languages, maintaining insurance terminology accuracy.',
    function: 'Policy Admin and Operations',
    leadMarket: 'Poland Hub',
    markets: ['Poland Hub', 'Center', 'Turkey', 'Egypt', 'Gulf Cluster', 'CEE', 'France', 'Italy', 'Spain'],
    stage: 'Production',
    riskLevel: 'Low',
    riskScore: 21,
    yearlyValue: 3.2,
    usagePercent: 96,
    model: 'AI Language v2',
    costPerUse: 0.6,
    usesPerMonth: 220000,
    monthlyRunCost: 132.0,
    testing: { casesCovered: 11000, testPassRate: 95, sourceBackedAnswers: 97, incorrectAnswerRate: 1.4, overallQuality: 95, customerSatisfaction: 88 },
    speed: { typicalResponseMs: 280, slowest5pctMs: 820 },
    humanStepInReasons: ['Legal document requiring certified translation', 'Ambiguous insurance term', 'New language pair'],
    responsibleAI: { fairness: 91, transparency: 89, privacy: 92, accountability: 90, performance: 95, dataGovernance: 91, resiliency: 90 },
    newFrontierPriority: 'Technology and efficiency enabler',
    newFrontierOutcome: 'expense',
    weeklyQualityTrend: [93, 94, 95, 95, 94, 96, 95, 95],
  },
];

// Ideas in backlog (21 ideas)
export const IDEAS_BACKLOG = [
  { id: 'idea-1', name: 'Automated Policy Renewal Nudge', function: 'Distribution', market: 'Turkey', gateStep: 'Business Case', recommendedAction: 'Approve business case and assign product owner' },
  { id: 'idea-2', name: 'Claims Photo Assessment', function: 'Claims', market: 'Gulf Cluster', gateStep: 'Feasibility', recommendedAction: 'Complete data availability assessment' },
  { id: 'idea-3', name: 'Actuarial Pricing Optimizer', function: 'Actuarial and Pricing', market: 'Center', gateStep: 'Concept', recommendedAction: 'Define success metrics and data requirements' },
  { id: 'idea-4', name: 'Group Benefits Enrollment Bot', function: 'Distribution', market: 'UK', gateStep: 'Business Case', recommendedAction: 'Secure budget and sponsor sign-off' },
  { id: 'idea-5', name: 'Investment Portfolio Summarizer', function: 'Finance', market: 'Center', gateStep: 'Feasibility', recommendedAction: 'Assess model suitability for financial data' },
  { id: 'idea-6', name: 'Reinsurance Data Extractor', function: 'Actuarial and Pricing', market: 'Center', gateStep: 'Concept', recommendedAction: 'Map data sources and reinsurance treaty formats' },
  { id: 'idea-7', name: 'Customer Sentiment Tracker', function: 'Service', market: 'Poland Hub', gateStep: 'Business Case', recommendedAction: 'Define KPIs and pilot market' },
  { id: 'idea-8', name: 'Broker Performance Insights', function: 'Distribution', market: 'Gulf Cluster', gateStep: 'Feasibility', recommendedAction: 'Validate data quality from broker systems' },
  { id: 'idea-9', name: 'Finance Reconciliation AI', function: 'Finance', market: 'Poland Hub', gateStep: 'Business Case', recommendedAction: 'Quantify manual reconciliation hours saved' },
  { id: 'idea-10', name: 'Compliance Training Generator', function: 'Risk and Compliance', market: 'Center', gateStep: 'Concept', recommendedAction: 'Assess regulatory approval requirements' },
  { id: 'idea-11', name: 'Absence and Leave Predictor', function: 'HR and Corporate', market: 'Poland Hub', gateStep: 'Feasibility', recommendedAction: 'Review HR data privacy requirements' },
  { id: 'idea-12', name: 'Telematics Risk Scorer', function: 'Underwriting', market: 'Turkey', gateStep: 'Business Case', recommendedAction: 'Confirm telematics data feed availability' },
  { id: 'idea-13', name: 'Digital Claims First Notice', function: 'Claims', market: 'Egypt', gateStep: 'Concept', recommendedAction: 'Define customer journey and channel strategy' },
  { id: 'idea-14', name: 'Pension Statement Generator', function: 'Policy Admin and Operations', market: 'UK', gateStep: 'Feasibility', recommendedAction: 'Map regulatory disclosure requirements' },
  { id: 'idea-15', name: 'Anti-Money Laundering Scanner', function: 'Risk and Compliance', market: 'Center', gateStep: 'Business Case', recommendedAction: 'Engage Compliance and Legal for approval pathway' },
  { id: 'idea-16', name: 'Sales Forecasting Model', function: 'Distribution', market: 'CEE', gateStep: 'Concept', recommendedAction: 'Identify historical sales data sources' },
  { id: 'idea-17', name: 'Policy Lapse Early Warning', function: 'Service', market: 'Spain', gateStep: 'Business Case', recommendedAction: 'Define lapse prediction model approach' },
  { id: 'idea-18', name: 'Vendor Contract Reviewer', function: 'Finance', market: 'Center', gateStep: 'Feasibility', recommendedAction: 'Assess legal risk of AI contract review' },
  { id: 'idea-19', name: 'Group Claims Benchmarking', function: 'Claims', market: 'UK', gateStep: 'Concept', recommendedAction: 'Source industry benchmark datasets' },
  { id: 'idea-20', name: 'Bancassurance Cross-Sell Engine', function: 'Distribution', market: 'Egypt', gateStep: 'Business Case', recommendedAction: 'Align with bank partner on data sharing' },
  { id: 'idea-21', name: 'Multilingual Voice IVR', function: 'Service', market: 'Gulf Cluster', gateStep: 'Feasibility', recommendedAction: 'Evaluate voice model accuracy for Arabic dialects' },
];

// Compute portfolio summary stats
export function getPortfolioStats() {
  const production = AI_TOOLS.filter(t => t.stage === 'Production');
  const scaling = AI_TOOLS.filter(t => t.stage === 'Scaling');
  const pilot = AI_TOOLS.filter(t => t.stage === 'Pilot');

  const valueRealized = production.reduce((sum, t) => sum + t.yearlyValue * (t.usagePercent / 100), 0);
  const totalPipelineValue = AI_TOOLS.reduce((sum, t) => sum + t.yearlyValue, 0);
  const monthlyRunCost = production.reduce((sum, t) => sum + t.monthlyRunCost, 0) + scaling.reduce((sum, t) => sum + t.monthlyRunCost, 0);

  // Weighted risk score
  const weightedRisk = production.reduce((sum, t) => sum + t.riskScore * t.yearlyValue, 0) /
    production.reduce((sum, t) => sum + t.yearlyValue, 1);

  // Average quality
  const avgQuality = production.reduce((sum, t) => sum + t.testing.overallQuality, 0) / production.length;

  return {
    valueRealized: Math.round(valueRealized * 10) / 10,
    totalPipelineValue: Math.round(totalPipelineValue * 10) / 10,
    monthlyRunCost: Math.round(monthlyRunCost * 10) / 10, // in $K
    riskScore: Math.round(weightedRisk),
    answerQuality: Math.round(avgQuality * 10) / 10,
    toolsLive: production.length,
    toolsScaling: scaling.length,
    toolsPilot: pilot.length,
    ideasBacklog: IDEAS_BACKLOG.length,
  };
}

// Value by New Frontier priority
export function getValueByPriority() {
  const priorities: Record<string, number> = {};
  NEW_FRONTIER_PRIORITIES.forEach(p => { priorities[p] = 0; });
  AI_TOOLS.filter(t => t.stage === 'Production').forEach(t => {
    priorities[t.newFrontierPriority] = (priorities[t.newFrontierPriority] || 0) + t.yearlyValue * (t.usagePercent / 100);
  });
  return NEW_FRONTIER_PRIORITIES.map(p => ({ priority: p, value: Math.round(priorities[p] * 10) / 10 }));
}

// Returns value bucketed into the two New Frontier strategic outcomes.
// Value is calculated from Production tools only (realized value).
// The tools list includes Production + Scaling so the full pipeline is visible.
export function getValueByOutcome() {
  const liveOrScaling = AI_TOOLS.filter(t => t.stage === 'Production' || t.stage === 'Scaling');
  const production = AI_TOOLS.filter(t => t.stage === 'Production');
  const revenueTools = liveOrScaling.filter(t => t.newFrontierOutcome === 'revenue');
  const expenseTools = liveOrScaling.filter(t => t.newFrontierOutcome === 'expense');
  // Value counts only Production tools (realized)
  const revenueValue = production.filter(t => t.newFrontierOutcome === 'revenue').reduce((s, t) => s + t.yearlyValue * (t.usagePercent / 100), 0);
  const expenseValue = production.filter(t => t.newFrontierOutcome === 'expense').reduce((s, t) => s + t.yearlyValue * (t.usagePercent / 100), 0);
  return {
    revenue: { value: Math.round(revenueValue * 10) / 10, tools: revenueTools },
    expense: { value: Math.round(expenseValue * 10) / 10, tools: expenseTools },
  };
}

// Monthly value trend (last 8 months)
export const MONTHLY_VALUE_TREND = [
  { month: 'Nov', value: 52.1 },
  { month: 'Dec', value: 55.8 },
  { month: 'Jan', value: 58.4 },
  { month: 'Feb', value: 61.2 },
  { month: 'Mar', value: 65.7 },
  { month: 'Apr', value: 69.3 },
  { month: 'May', value: 74.8 },
  { month: 'Jun', value: 79.6 },
];

// Responsible AI portfolio scores
export function getPortfolioRAIScores() {
  const principles = ['fairness', 'transparency', 'privacy', 'accountability', 'performance', 'dataGovernance', 'resiliency'] as const;
  const production = AI_TOOLS.filter(t => t.stage === 'Production');
  return principles.map(p => {
    const avg = production.reduce((sum, t) => sum + t.responsibleAI[p], 0) / production.length;
    return { principle: p, score: Math.round(avg), label: p === 'dataGovernance' ? 'Data Governance' : p.charAt(0).toUpperCase() + p.slice(1) };
  });
}

export function getStatusColor(score: number, thresholds = { green: 80, amber: 65 }): 'green' | 'amber' | 'red' {
  if (score >= thresholds.green) return 'green';
  if (score >= thresholds.amber) return 'amber';
  return 'red';
}

export function getRiskStatus(score: number): 'green' | 'amber' | 'red' {
  if (score < 45) return 'green';
  if (score <= 60) return 'amber';
  return 'red';
}

// Escalated decisions
export const ESCALATED_DECISIONS = [
  { id: 1, item: 'Medical Underwriting Summarizer: Risk score above 60 — approve enhanced oversight framework or pause scaling', owner: 'Chief Risk Officer', dueWindow: 'This week', urgency: 'red' as const },
  { id: 2, item: 'Bancassurance Onboarding: Identity verification failure rate at 6.8% — approve model retraining budget', owner: 'Chief Technology Officer', dueWindow: 'Next 2 weeks', urgency: 'amber' as const },
  { id: 3, item: 'Fraud Detection Engine: Transparency score at 72 — approve explainability investment roadmap', owner: 'Chief Compliance Officer', dueWindow: 'This month', urgency: 'amber' as const },
  { id: 4, item: 'Retention Next-Best-Action: Approve expansion from 3 to 6 markets in Q3', owner: 'EMEA President', dueWindow: 'This month', urgency: 'green' as const },
];

// Quarterly milestones
export const QUARTERLY_MILESTONES = [
  { id: 1, milestone: 'Bancassurance Onboarding reaches Production stage in Egypt', date: 'Jul 2025', status: 'on-track' as const },
  { id: 2, milestone: 'Retention Next-Best-Action expands to 6 markets', date: 'Aug 2025', status: 'on-track' as const },
  { id: 3, milestone: 'Medical Underwriting Summarizer risk remediation complete', date: 'Aug 2025', status: 'watch' as const },
  { id: 4, milestone: 'Actuarial Research Assistant reaches Production stage', date: 'Sep 2025', status: 'on-track' as const },
  { id: 5, milestone: 'Group Benefits Enrollment Bot pilot launch in UK', date: 'Sep 2025', status: 'on-track' as const },
];

// Process Owners and Journeys
export interface JourneyStep {
  team: string;
  tool: string | null;
  toolId: string | null;
  handoffStatus: HandoffStatus | null; // status of handoff TO next step
}

export interface Journey {
  id: string;
  name: string;
  owner: string;
  ownerTitle: string;
  ownerInitials: string;
  touchlessRate: number; // percent
  openExceptions: number;
  integrationStatus: 'green' | 'amber' | 'red';
  timeBefore: string;
  timeAfter: string;
  yearlyValue: number;
  steps: JourneyStep[];
  exceptionDetails: string;
}

export const JOURNEYS: Journey[] = [
  {
    id: 'quote-to-bind',
    name: 'Quote to Bind',
    owner: 'Amira Hassan',
    ownerTitle: 'Global Process Owner, Distribution',
    ownerInitials: 'AH',
    touchlessRate: 68,
    openExceptions: 4,
    integrationStatus: 'green',
    timeBefore: '3.2 days',
    timeAfter: '0.9 days',
    yearlyValue: 21.5,
    exceptionDetails: 'Pricing exception hand-offs between Distribution and Underwriting taking over 4 hours on average',
    steps: [
      { team: 'Distribution', tool: 'Broker and Agent Sales Copilot', toolId: 'broker-copilot', handoffStatus: 'automated' },
      { team: 'Underwriting', tool: 'Underwriting Assistant', toolId: 'underwriting-assistant', handoffStatus: 'human-review' },
      { team: 'Underwriting', tool: 'Medical Underwriting Summarizer', toolId: 'medical-underwriting-summarizer', handoffStatus: 'automated' },
      { team: 'Policy Admin', tool: 'Document Digitization', toolId: 'doc-digitization', handoffStatus: 'automated' },
      { team: 'Distribution', tool: 'Proposal Generator', toolId: 'proposal-generator', handoffStatus: null },
    ],
  },
  {
    id: 'claims-settlement',
    name: 'Claims: Notification to Settlement',
    owner: 'Piotr Kowalski',
    ownerTitle: 'Global Process Owner, Claims',
    ownerInitials: 'PK',
    touchlessRate: 54,
    openExceptions: 9,
    integrationStatus: 'amber',
    timeBefore: '8.4 days',
    timeAfter: '3.1 days',
    yearlyValue: 33.0,
    exceptionDetails: 'Fraud flag hand-offs from Claims to Risk and Compliance lack a defined SLA, creating a backlog of 9 open cases',
    steps: [
      { team: 'Service', tool: 'Customer Virtual Assistant', toolId: 'virtual-assistant', handoffStatus: 'automated' },
      { team: 'Claims', tool: 'Claims Triage AI', toolId: 'claims-triage', handoffStatus: 'automated' },
      { team: 'Claims', tool: 'Fraud Detection Engine', toolId: 'fraud-detection', handoffStatus: 'manual-gap' },
      { team: 'Risk and Compliance', tool: 'Regulatory Scanner', toolId: 'regulatory-scanner', handoffStatus: 'human-review' },
      { team: 'Policy Admin', tool: 'Document Digitization', toolId: 'doc-digitization', handoffStatus: null },
    ],
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    owner: 'Leila Al-Rashid',
    ownerTitle: 'Global Process Owner, Service',
    ownerInitials: 'LA',
    touchlessRate: 41,
    openExceptions: 6,
    integrationStatus: 'amber',
    timeBefore: '5.1 days',
    timeAfter: '2.2 days',
    yearlyValue: 14.7,
    exceptionDetails: 'KYC verification hand-off between Service and Risk and Compliance is still manual — no AI tool in place at this step',
    steps: [
      { team: 'Distribution', tool: 'Bancassurance Onboarding', toolId: 'bancassurance-onboarding', handoffStatus: 'human-review' },
      { team: 'Service', tool: 'Customer Virtual Assistant', toolId: 'virtual-assistant', handoffStatus: 'manual-gap' },
      { team: 'Risk and Compliance', tool: null, toolId: null, handoffStatus: 'human-review' }, // visible gap — idea only
      { team: 'Policy Admin', tool: 'Document Digitization', toolId: 'doc-digitization', handoffStatus: 'automated' },
      { team: 'Service', tool: 'Multilingual Translation', toolId: 'multilingual-translation', handoffStatus: null },
    ],
  },
  {
    id: 'servicing-retention',
    name: 'Servicing and Retention',
    owner: 'Marco Ferretti',
    ownerTitle: 'Global Process Owner, Service and Distribution',
    ownerInitials: 'MF',
    touchlessRate: 72,
    openExceptions: 3,
    integrationStatus: 'green',
    timeBefore: '2.8 days',
    timeAfter: '0.7 days',
    yearlyValue: 12.3,
    exceptionDetails: 'Retention model hand-offs to Distribution agents occasionally delayed when propensity score is borderline',
    steps: [
      { team: 'Service', tool: 'Customer Virtual Assistant', toolId: 'virtual-assistant', handoffStatus: 'automated' },
      { team: 'Distribution', tool: 'Retention Next-Best-Action', toolId: 'retention-nba', handoffStatus: 'automated' },
      { team: 'Distribution', tool: 'Contact Centre Copilot', toolId: 'contact-centre-copilot', handoffStatus: 'automated' },
      { team: 'Policy Admin', tool: 'Document Digitization', toolId: 'doc-digitization', handoffStatus: null },
    ],
  },
  {
    id: 'complaints-remediation',
    name: 'Complaints and Remediation',
    owner: 'Sophie Beaumont',
    ownerTitle: 'Global Process Owner, Risk and Compliance',
    ownerInitials: 'SB',
    touchlessRate: 38,
    openExceptions: 11,
    integrationStatus: 'red',
    timeBefore: '6.2 days',
    timeAfter: '2.4 days',
    yearlyValue: 8.1,
    exceptionDetails: 'Regulatory escalation hand-offs between Complaints and Risk and Compliance are fully manual, with 11 cases open beyond SLA',
    steps: [
      { team: 'Service', tool: 'Complaints Assistant', toolId: 'complaints-assistant', handoffStatus: 'human-review' },
      { team: 'Risk and Compliance', tool: 'Regulatory Scanner', toolId: 'regulatory-scanner', handoffStatus: 'manual-gap' },
      { team: 'Service', tool: 'Contact Centre Copilot', toolId: 'contact-centre-copilot', handoffStatus: 'human-review' },
      { team: 'Policy Admin', tool: 'Document Digitization', toolId: 'doc-digitization', handoffStatus: null },
    ],
  },
];

// Heatmap data: market x function
export function getHeatmapData() {
  const data: Record<string, Record<string, AITool[]>> = {};
  MARKETS.forEach(market => {
    data[market] = {};
    FUNCTIONS.forEach(fn => { data[market][fn] = []; });
  });
  AI_TOOLS.filter(t => t.stage === 'Production' || t.stage === 'Scaling').forEach(tool => {
    tool.markets.forEach(market => {
      if (data[market] && data[market][tool.function]) {
        data[market][tool.function].push(tool);
      }
    });
  });
  return data;
}

export const GLOSSARY = [
  { term: 'Value Realized', definition: 'The yearly financial benefit being banked today from AI tools in production, calculated as the tool\'s full value multiplied by how widely it is actually being used.' },
  { term: 'Pipeline Value', definition: 'The potential yearly value of all AI tools including those still in pilot or idea stage. This is what could be realized if all tools reach full production.' },
  { term: 'Running Cost', definition: 'The monthly cost to operate all live AI tools, driven by how many times they are used and the cost per use.' },
  { term: 'Risk Level', definition: 'A single portfolio score from 0 to 100, weighted by the size of each tool. Below 45 is low risk (green), 45 to 60 is watch (amber), above 60 is high risk (red). Lower is better.' },
  { term: 'Answer Quality', definition: 'How accurate and reliable the AI answers are, checked against known-good examples. Combines test pass rate, how often answers cite a source, and human review findings. Target is 88 or above.' },
  { term: 'Touchless Rate', definition: 'The share of an end-to-end customer journey completed with no human step at all. This is a journey measure owned by the process owner.' },
  { term: 'Resolved Without a Person', definition: 'The share of individual customer contacts the AI handles from start to finish without passing to a human agent. This is different from touchless rate, which covers the whole journey.' },
  { term: 'Cost Per Use', definition: 'The cost of one single use of an AI tool, measured in cents.' },
  { term: 'AI', definition: 'EMEA\'s own AI platform that powers all the tools shown in this dashboard. Every tool runs on AI.' },
  { term: 'New Frontier', definition: 'EMEA\'s strategic framework with four priorities: Group Benefits leadership, retirement platform, asset management, and international market growth.' },
  { term: 'Responsible AI', definition: 'The seven principles the company uses to govern AI: Fairness, Transparency, Privacy, Accountability, Performance, Data Governance, and Resiliency.' },
  { term: 'Process Owner', definition: 'A Global Process Owner who is accountable for an end-to-end customer journey across all teams and markets, including the hand-offs and exceptions between teams.' },
  { term: 'Hand-off', definition: 'The point where work passes from one team to the next in a journey. Green means automated, amber means a human reviews before passing on, red means a manual gap with no AI support.' },
];
