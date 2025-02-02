// TODO: Implement functionality for kubernetesThreatModelQuestions
export const kubernetesThreatModelQuestions = [
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
      "correct_answers": [2],
      "explanation": "Container breakout is when isolation is breached, and host access is gained.",
      "question_type": "single-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Privilege Escalation"
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
      "correct_answers": [4],
      "explanation": "A Trojan compromising the build server is an act of tampering.",
      "question_type": "single-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Malicious Code Execution and Compromised Applications in Containers"
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
      "correct_answers": [2, 3, 4],
      "explanation": "These actions cross trust boundaries and can pose security risks.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
      "correct_answers": [0, 1, 2],
      "explanation": "These capabilities allow a pod to access and modify the host.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Privilege Escalation"
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
      "correct_answers": [1],
      "explanation": "Changes in the container's filesystem are ephemeral and not persistent.",
      "question_type": "single-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Persistence"
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
      "correct_answers": [1, 2, 4],
      "explanation": "Using minimal base images, applying least privilege, and updating runtimes help prevent container breakouts.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Threat Model",
      "subdomain": "Privilege Escalation"
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
        "correct_answers": [0],
        "explanation": "In STRIDE, 'S' stands for Spoofing, which involves posing as someone else or claiming a false identity.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
        "correct_answers": [1],
        "explanation": "Tampering refers to malicious modification of data or processes and is concerned with integrity.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Malicious Code Execution and Compromised Applications in Containers"
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
        "correct_answers": [1],
        "explanation": "Repudiation involves the ability to deny that an action or event has occurred.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
        "correct_answers": [1],
        "explanation": "Information Disclosure refers to unauthorized access to sensitive information.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Access to Sensitive Data"
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
        "correct_answers": [2],
        "explanation": "Elevation of Privileges involves gaining higher access rights than permitted.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Privilege Escalation"
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
        "correct_answers": [0],
        "explanation": "Proper authentication helps verify identities and prevent spoofing attacks.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
        "correct_answers": [2],
        "explanation": "Denial of Service attacks aim to make services unavailable.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Denial of Service"
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
        "correct_answers": [0],
        "explanation": "Threat Modeling is a structured approach to identifying and mitigating security risks.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
        "correct_answers": [4],
        "explanation": "Gaining root access via a buffer overflow is an Elevation of Privileges threat.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Privilege Escalation"
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
        "correct_answers": [2],
        "explanation": "Replication is not part of STRIDE.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
        "correct_answers": [1],
        "explanation": "Encryption protects data confidentiality, mitigating Information Disclosure threats.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Access to Sensitive Data"
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
        "correct_answers": [1],
        "explanation": "Digital signatures and checksums help ensure data integrity, mitigating Tampering threats.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Malicious Code Execution and Compromised Applications in Containers"
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
        "correct_answers": [1],
        "explanation": "etcd contains critical cluster data; unauthorized access can compromise the entire cluster.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Access to Sensitive Data"
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
        "correct_answers": [2],
        "explanation": "Privileged containers have full access to the host's resources, which can pose security risks.",
        "question_type": "single-choice",
        "domain": "Kubernetes Threat Model",
        "subdomain": "Privilege Escalation"
      }
    
  ]
  ;
