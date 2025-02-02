// questions.js

// Import domain-specific questions
import { cloudNativeSecurityQuestions } from './questions-per-domain/cloudNativeSecurityQuestions.js';
import { kubernetesClusterComponentSecurityQuestions } from './questions-per-domain/kubernetesClusterComponentSecurityQuestions.js';
import { kubernetesSecurityFundamentalsQuestions } from './questions-per-domain/kubernetesSecurityFundamentalsQuestions.js';
import { kubernetesThreatModelQuestions } from './questions-per-domain/kubernetesThreatModelQuestions.js';
import { platformSecurityQuestions } from './questions-per-domain/platformSecurityQuestions.js';
import { complianceAndSecurityFrameworksQuestions } from './questions-per-domain/complianceAndSecurityFrameworksQuestions.js';

// Merge all arrays into one
export const questions = [
  ...cloudNativeSecurityQuestions,
  ...kubernetesClusterComponentSecurityQuestions,
  ...kubernetesSecurityFundamentalsQuestions,
  ...kubernetesThreatModelQuestions,
  ...platformSecurityQuestions,
  ...complianceAndSecurityFrameworksQuestions
];
