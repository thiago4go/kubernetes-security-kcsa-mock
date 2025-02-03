
// Exported 22 questions for domain: Kubernetes Threat Model
// Last revision date: N/A
export const KubernetesThreatModelQuestions = [
  {
    "id": 15,
    "question": "What is a container breakout?",
    "options": [
      "When a container fails to start",
      "A container exceeding its resource limits",
      "An exploit where an attacker escapes the container to the host",
      "Scaling a container beyond maximum replicas",
      "Moving a container to another node"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Container breakout is when isolation is breached, and host access is gained.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 23,
    "question": "In the STRIDE threat model, under which category does a Trojan compromising the build server fall?",
    "options": [
      "Spoofing",
      "Repudiation",
      "Information Disclosure",
      "Denial of Service",
      "Tampering"
    ],
    "correct_answers": [
      4
    ],
    "explanation": "A Trojan compromising the build server is an act of tampering.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 27,
    "question": "Which of the following actions cross over trust boundaries in Kubernetes? (Select all that apply)",
    "options": [
      "Accessing the Kubernetes API",
      "Communicating between pods in the same namespace",
      "Mounting hostPath volumes",
      "Using service accounts across namespaces",
      "Pulling images from public registries"
    ],
    "correct_answers": [
      2,
      3,
      4
    ],
    "explanation": "These actions cross trust boundaries and can pose security risks.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 48,
    "question": "Which combination of capabilities allows a compromised pod to access and modify the host? (Select all that apply)",
    "options": [
      "Running in privileged mode",
      "Mounting the host filesystem",
      "Using host networking",
      "Dropping all Linux capabilities",
      "Running as a non-root user"
    ],
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "These capabilities allow a pod to access and modify the host.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 49,
    "question": "When an attacker gains access to a pod, which scenario is not persistent?",
    "options": [
      "The attacker modifies the container image",
      "The attacker installs malware in the pod's filesystem",
      "The attacker exfiltrates data from the pod",
      "The attacker alters data in a mounted PersistentVolume",
      "The attacker changes configurations stored in a ConfigMap"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Changes in the container's filesystem are ephemeral and not persistent.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Persistence",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 72,
    "question": "Which of the following practices can help prevent container breakouts? (Select all that apply)",
    "options": [
      "Running containers as root",
      "Using minimal base images",
      "Applying the principle of least privilege",
      "Disabling SELinux or AppArmor",
      "Regularly updating container runtimes"
    ],
    "correct_answers": [
      1,
      2,
      4
    ],
    "explanation": "Using minimal base images, applying least privilege, and updating runtimes help prevent container breakouts.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 227,
    "question": "What is a potential risk of running a privileged container?",
    "options": [
      "Increased memory usage",
      "Limited network access",
      "Container can access host resources, leading to security risks",
      "Reduced application performance",
      "Inability to use persistent volumes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Privileged containers have full access to the host's resources, which can pose security risks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 251,
    "question": "What does the 'S' in STRIDE stand for in threat modeling?",
    "options": [
      "Spoofing",
      "Scanning",
      "Snooping",
      "Spamming",
      "Sniffing"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "In STRIDE, 'S' stands for Spoofing.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 252,
    "question": "Which category of STRIDE is primarily concerned with integrity?",
    "options": [
      "Spoofing",
      "Tampering",
      "Repudiation",
      "Information Disclosure",
      "Denial of Service"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Tampering is the category concerned with integrity.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 253,
    "question": "In the context of STRIDE, what does 'Repudiation' refer to?",
    "options": [
      "Unauthorized access",
      "Denial of an action or event",
      "Data leakage",
      "Service unavailability",
      "Privilege escalation"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Repudiation involves the ability to deny that an action occurred.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 254,
    "question": "Which of the following is an example of 'Information Disclosure' under STRIDE?",
    "options": [
      "A user deletes all records from a database",
      "A user reads sensitive data in a database without authorization",
      "A user denies performing a destructive action",
      "A user overflows a buffer to gain root access",
      "A user floods a network to make services unavailable"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Unauthorized reading of sensitive data is an Information Disclosure threat.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 255,
    "question": "What does 'Elevation of Privileges' mean in STRIDE?",
    "options": [
      "Gaining access to resources by posing as someone else",
      "Modifying data in transit",
      "Gaining unauthorized access that one should not have",
      "Denial of actions performed",
      "Accessing services during downtime"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "It means obtaining higher access rights than permitted.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 256,
    "question": "Which of the following is a common mitigation for 'Spoofing' threats?",
    "options": [
      "Implementing proper authentication mechanisms",
      "Using encryption for data at rest",
      "Implementing audit logging",
      "Applying rate limiting",
      "Running processes as root"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Proper authentication helps verify identity and mitigate spoofing.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 257,
    "question": "Which STRIDE category is primarily concerned with availability?",
    "options": [
      "Spoofing",
      "Tampering",
      "Denial of Service",
      "Information Disclosure",
      "Elevation of Privileges"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Denial of Service focuses on making services unavailable.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Denial of Service",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 258,
    "question": "Which of the following best describes 'Threat Modeling'?",
    "options": [
      "A process to identify and mitigate security risks systematically",
      "A method to design software architectures",
      "A technique to improve application performance",
      "A strategy for marketing products",
      "An approach to project management"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Threat Modeling is a systematic process to identify and mitigate security risks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 259,
    "question": "In STRIDE, which category would an attacker exploiting a buffer overflow to gain root access fall under?",
    "options": [
      "Spoofing",
      "Tampering",
      "Repudiation",
      "Information Disclosure",
      "Elevation of Privileges"
    ],
    "correct_answers": [
      4
    ],
    "explanation": "Exploiting a buffer overflow to gain root access is an Elevation of Privileges threat.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 260,
    "question": "Which of the following is NOT one of the STRIDE categories?",
    "options": [
      "Spoofing",
      "Tampering",
      "Replication",
      "Information Disclosure",
      "Denial of Service"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Replication is not part of STRIDE.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 261,
    "question": "Which mitigation technique is suitable for 'Information Disclosure' threats?",
    "options": [
      "Implementing audit logging",
      "Encrypting data at rest and in transit",
      "Using rate limiting",
      "Implementing CAPTCHA",
      "Using prepared SQL statements"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Encryption helps protect data confidentiality.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 262,
    "question": "What is a common mitigation for 'Tampering' threats?",
    "options": [
      "Implementing strong authentication",
      "Using digital signatures and checksums",
      "Applying redundant servers",
      "Implementing multi-factor authentication",
      "Enforcing password complexity"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Digital signatures and checksums help ensure data integrity.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 264,
    "question": "Why is it important to restrict access to etcd in a Kubernetes cluster?",
    "options": [
      "Because etcd stores logs that can be tampered with",
      "Because etcd contains all cluster data, including secrets, and access can lead to cluster compromise",
      "Because etcd runs the application code",
      "Because etcd controls network policies",
      "Because etcd is not important and can be ignored"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Restricting access to etcd is critical to protect sensitive data.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 265,
    "question": "Which Kubernetes component exposes the Kubernetes API and is considered the front end of the control plane?",
    "options": [
      "kubelet",
      "kube-scheduler",
      "kube-apiserver",
      "kube-proxy",
      "etcd"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The kube-apiserver is the front end of the control plane.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 266,
    "question": "What is the recommended way to secure the Kubernetes Dashboard?",
    "options": [
      "Expose it publicly without authentication",
      "Use Role-Based Access Control (RBAC) and restrict access",
      "Grant it cluster-admin privileges",
      "Disable it entirely",
      "Run it as a privileged container"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Securing the Dashboard with RBAC helps limit its exposure.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Attacker on the Network",
    "sources": [],
    "revision": 0,
    "revision_date": null
  }
];
