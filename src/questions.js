// questions.js

// Import domain-specific questions
import { cloudNativeSecurityQuestions } from './questions-per-domain/cloudNativeSecurityQuestions';
import { kubernetesClusterComponentSecurityQuestions } from './questions-per-domain/kubernetesClusterComponentSecurityQuestions';
import { kubernetesSecurityFundamentalsQuestions } from './questions-per-domain/kubernetesSecurityFundamentalsQuestions';
import { kubernetesThreatModelQuestions } from './questions-per-domain/kubernetesThreatModelQuestions';
import { platformSecurityQuestions } from './questions-per-domain/platformSecurityQuestions';
import { complianceAndSecurityFrameworksQuestions } from './questions-per-domain/complianceAndSecurityFrameworksQuestions';

// Merge all arrays into one
export const questions = [
  ...cloudNativeSecurityQuestions,
  ...kubernetesClusterComponentSecurityQuestions,
  ...kubernetesSecurityFundamentalsQuestions,
  ...kubernetesThreatModelQuestions,
  ...platformSecurityQuestions,
  ...complianceAndSecurityFrameworksQuestions
];
