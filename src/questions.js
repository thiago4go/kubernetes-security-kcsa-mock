// questions.js

// Import domain-specific exported questions
import { CloudNativeSecurityQuestions } from './exported-questions/Cloud_Native_Security.mjs';
import { KubernetesClusterComponentSecurityQuestions } from './exported-questions/Kubernetes_Cluster_Component_Security.mjs';
import { KubernetesSecurityFundamentalsQuestions } from './exported-questions/Kubernetes_Security_Fundamentals.mjs';
import { KubernetesThreatModelQuestions } from './exported-questions/Kubernetes_Threat_Model.mjs';
import { PlatformSecurityQuestions } from './exported-questions/Platform_Security.mjs';
import { ComplianceAndSecurityFrameworksQuestions } from './exported-questions/Compliance_and_Security_Frameworks.mjs';

// Merge all arrays into one
export const questions = [
  ...CloudNativeSecurityQuestions,
  ...KubernetesClusterComponentSecurityQuestions,
  ...KubernetesSecurityFundamentalsQuestions,
  ...KubernetesThreatModelQuestions,
  ...PlatformSecurityQuestions,
  ...ComplianceAndSecurityFrameworksQuestions
];
