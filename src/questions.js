// questions.js

// Import domain-specific exported questions
import { CloudNativeSecurityQuestions } from './exported-questions/Cloud_Native_Security.js';
import { KubernetesClusterComponentSecurityQuestions } from './exported-questions/Kubernetes_Cluster_Component_Security.js';
import { KubernetesSecurityFundamentalsQuestions } from './exported-questions/Kubernetes_Security_Fundamentals.js';
import { KubernetesThreatModelQuestions } from './exported-questions/Kubernetes_Threat_Model.js';
import { PlatformSecurityQuestions } from './exported-questions/Platform_Security.js';
import { ComplianceAndSecurityFrameworksQuestions } from './exported-questions/Compliance_and_Security_Frameworks.js';

// Merge all arrays into one
export const questions = [
  ...CloudNativeSecurityQuestions,
  ...KubernetesClusterComponentSecurityQuestions,
  ...KubernetesSecurityFundamentalsQuestions,
  ...KubernetesThreatModelQuestions,
  ...PlatformSecurityQuestions,
  ...ComplianceAndSecurityFrameworksQuestions
];
