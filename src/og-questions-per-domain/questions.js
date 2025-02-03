// questions.js

// Import domain-specific questions
import { cloudNativeSecurityQuestions } from './cloudNativeSecurityQuestions.js';
import { kubernetesClusterComponentSecurityQuestions } from './kubernetesClusterComponentSecurityQuestions.js';
import { kubernetesSecurityFundamentalsQuestions } from './kubernetesSecurityFundamentalsQuestions.js';
import { kubernetesThreatModelQuestions } from './kubernetesThreatModelQuestions.js';
import { platformSecurityQuestions } from './platformSecurityQuestions.js';
import { complianceAndSecurityFrameworksQuestions } from './complianceAndSecurityFrameworksQuestions.js';

// Merge all arrays into one
export const questions = [
  ...cloudNativeSecurityQuestions,
  ...kubernetesClusterComponentSecurityQuestions,
  ...kubernetesSecurityFundamentalsQuestions,
  ...kubernetesThreatModelQuestions,
  ...platformSecurityQuestions,
  ...complianceAndSecurityFrameworksQuestions
];
