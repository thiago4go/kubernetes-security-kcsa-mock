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
          "explanation": "In STRIDE, 'S' stands for Spoofing.",
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
          "explanation": "Tampering is the category concerned with integrity.",
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
          "explanation": "Repudiation involves the ability to deny that an action occurred.",
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
          "explanation": "Unauthorized reading of sensitive data is an Information Disclosure threat.",
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
          "explanation": "It means obtaining higher access rights than permitted.",
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
          "explanation": "Proper authentication helps verify identity and mitigate spoofing.",
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
          "explanation": "Denial of Service focuses on making services unavailable.",
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
          "explanation": "Threat Modeling is a systematic process to identify and mitigate security risks.",
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
          "explanation": "Exploiting a buffer overflow to gain root access is an Elevation of Privileges threat.",
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
          "explanation": "Encryption helps protect data confidentiality.",
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
          "explanation": "Digital signatures and checksums help ensure data integrity.",
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
          "explanation": "Restricting access to etcd is critical to protect sensitive data.",
          "question_type": "single-choice",
          "domain": "Kubernetes Threat Model",
          "subdomain": "Access to Sensitive Data"
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
          "correct_answers": [2],
          "explanation": "The kube-apiserver is the front end of the control plane.",
          "question_type": "single-choice",
          "domain": "Kubernetes Threat Model",
          "subdomain": "Kubernetes Trust Boundaries and Data Flow"
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
          "correct_answers": [1],
          "explanation": "Securing the Dashboard with RBAC helps limit its exposure.",
          "question_type": "single-choice",
          "domain": "Kubernetes Threat Model",
          "subdomain": "Attacker on the Network"
        },
        {
          "id": 267,
          "question": "Which of the following is a built-in Kubernetes authentication method that is NOT recommended for production use?",
          "options": [
            "Static Token File",
            "OpenID Connect (OIDC)",
            "Service Accounts",
            "Client Certificates",
            "Integrating with cloud provider IAM"
          ],
          "correct_answers": [0],
          "explanation": "Static Token File authentication is not recommended for production.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authentication"
        },
        {
          "id": 268,
          "question": "Which Kubernetes resource is used to define permissions within a namespace?",
          "options": [
            "ClusterRole",
            "ClusterRoleBinding",
            "Role",
            "RoleBinding",
            "ServiceAccount"
          ],
          "correct_answers": [2],
          "explanation": "A Role defines permissions within a namespace.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 269,
          "question": "In Kubernetes RBAC, what does a 'RoleBinding' do?",
          "options": [
            "Defines cluster-wide permissions",
            "Binds a ClusterRole to a namespace",
            "Binds a Role to subjects within a namespace",
            "Creates a new ServiceAccount",
            "Defines network policies"
          ],
          "correct_answers": [2],
          "explanation": "A RoleBinding assigns a Role to users or groups in a namespace.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 270,
          "question": "Which Kubernetes Admission Controller is deprecated and removed in version 1.25?",
          "options": [
            "PodSecurityPolicy",
            "NodeRestriction",
            "AlwaysPullImages",
            "NamespaceLifecycle",
            "LimitRanger"
          ],
          "correct_answers": [0],
          "explanation": "PodSecurityPolicy is deprecated in Kubernetes 1.25.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Standards"
        },
        {
          "id": 271,
          "question": "Which admission controller should be used to enforce Pod Security Standards in Kubernetes 1.25 and above?",
          "options": [
            "PodSecurityPolicy",
            "Pod Security Admission Controller",
            "NodeRestriction",
            "ResourceQuota",
            "LimitRanger"
          ],
          "correct_answers": [1],
          "explanation": "The Pod Security Admission Controller is the recommended method in Kubernetes 1.25+.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 272,
          "question": "What is the primary purpose of using namespaces in Kubernetes?",
          "options": [
            "To provide network isolation",
            "To group and isolate resources logically",
            "To enforce security policies",
            "To manage storage volumes",
            "To monitor cluster health"
          ],
          "correct_answers": [1],
          "explanation": "Namespaces provide logical isolation of resources.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Isolation and Segmentation"
        },
        {
          "id": 274,
          "question": "What is the recommended way to store sensitive data like passwords or tokens in Kubernetes?",
          "options": [
            "Hardcode them in application code",
            "Store them in ConfigMaps",
            "Use Kubernetes Secrets",
            "Store them in environment variables",
            "Include them in container images"
          ],
          "correct_answers": [2],
          "explanation": "Kubernetes Secrets are specifically designed to securely store sensitive data.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 275,
          "question": "Which Kubernetes resource can enforce network segmentation between Pods?",
          "options": [
            "NetworkPolicy",
            "PodSecurityPolicy",
            "ResourceQuota",
            "LimitRange",
            "Ingress"
          ],
          "correct_answers": [0],
          "explanation": "NetworkPolicy defines rules that segment network traffic between Pods.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 276,
          "question": "Why should you avoid running containers with root privileges?",
          "options": [
            "It increases resource consumption",
            "It can lead to security risks by granting unnecessary permissions",
            "It reduces application performance",
            "It prevents containers from accessing the network",
            "It is required by Kubernetes policies"
          ],
          "correct_answers": [1],
          "explanation": "Running as root increases the risk of privilege escalation and other attacks.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 277,
          "question": "Which security context setting ensures a container runs as a non-root user?",
          "options": [
            "privileged: false",
            "allowPrivilegeEscalation: false",
            "runAsNonRoot: true",
            "readOnlyRootFilesystem: true",
            "capabilities: []"
          ],
          "correct_answers": [2],
          "explanation": "Setting 'runAsNonRoot: true' ensures the container is not run as root.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 278,
          "question": "What is the purpose of the 'readOnlyRootFilesystem' security context setting?",
          "options": [
            "To prevent the container from accessing the network",
            "To run the container as root",
            "To make the container's root filesystem read-only",
            "To allow privilege escalation",
            "To disable logging"
          ],
          "correct_answers": [2],
          "explanation": "It makes the container's root filesystem read-only, reducing the risk of tampering.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 279,
          "question": "Which of the following are considered sensitive Kubernetes resources that should be protected? (Select all that apply)",
          "options": [
            "Pods",
            "ConfigMaps",
            "Secrets",
            "ServiceAccounts",
            "PersistentVolumes"
          ],
          "correct_answers": [1, 2, 3],
          "explanation": "ConfigMaps, Secrets and ServiceAccounts often hold sensitive information.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 281,
          "question": "In a Kubernetes NetworkPolicy, what does an empty 'podSelector' field signify?",
          "options": [
            "No pods are selected",
            "All pods in the namespace are selected",
            "An error in the policy",
            "Only new pods are selected",
            "It selects pods in all namespaces"
          ],
          "correct_answers": [1],
          "explanation": "An empty podSelector applies the policy to every pod in the namespace.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 286,
          "question": "Why is it important to regularly scan container images for vulnerabilities?",
          "options": [
            "To improve application performance",
            "To reduce image size",
            "To ensure images are up-to-date and secure",
            "To comply with licensing requirements",
            "To increase deployment speed"
          ],
          "correct_answers": [2],
          "explanation": "Regular scanning helps detect and remediate vulnerabilities in images.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 287,
          "question": "Which of the following tools can be used for static analysis of Kubernetes manifests for security issues?",
          "options": [
            "kube-hunter",
            "kubesec",
            "kubectl describe",
            "kubelet",
            "etcdctl"
          ],
          "correct_answers": [1],
          "explanation": "Kubesec is used for static analysis of manifests for security issues.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Controls and Frameworks"
        },
        {
          "id": 292,
          "question": "Why is it recommended to use Kubernetes network policies?",
          "options": [
            "To increase application performance",
            "To enforce network segmentation and limit pod communication",
            "To manage storage volumes",
            "To provide high availability",
            "To automatically scale applications"
          ],
          "correct_answers": [1],
          "explanation": "Network policies enforce segmentation and improve security.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 293,
          "question": "What is the main purpose of audit logging in Kubernetes?",
          "options": [
            "To monitor application performance",
            "To track actions taken by the API for security and compliance",
            "To manage network policies",
            "To scale applications automatically",
            "To store container images"
          ],
          "correct_answers": [1],
          "explanation": "Audit logging tracks API actions for compliance and security monitoring.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 294,
          "question": "Which command enables audit logging by specifying the audit policy file in the API server configuration?",
          "options": [
            "--audit-log-path",
            "--audit-policy-file",
            "--enable-audit",
            "--audit-log-maxage",
            "--audit-log-format"
          ],
          "correct_answers": [1],
          "explanation": "The '--audit-policy-file' flag is used to point to the audit policy file.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 295,
          "question": "In Kubernetes, what is a 'Pod Security Standard'?",
          "options": [
            "A deprecated feature replaced by PodSecurityPolicy",
            "A set of built-in policies to enforce pod security best practices",
            "A network policy configuration",
            "A type of storage class",
            "An admission controller for scheduling pods"
          ],
          "correct_answers": [1],
          "explanation": "Pod Security Standards are built-in policies to help secure pods.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Standards"
        },
        {
          "id": 296,
          "question": "Which of the following are common levels defined by the Pod Security Standards? (Select all that apply)",
          "options": [
            "Privileged",
            "Baseline",
            "Restricted",
            "Unrestricted",
            "Default"
          ],
          "correct_answers": [0, 1, 2],
          "explanation": "The common levels are Privileged, Baseline, and Restricted.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Standards"
        },
        {
          "id": 297,
          "question": "Which Kubernetes resource can be used to manage policies with Open Policy Agent (OPA)?",
          "options": [
            "ValidatingWebhookConfiguration",
            "MutatingWebhookConfiguration",
            "AdmissionController",
            "CustomResourceDefinition",
            "PolicyController"
          ],
          "correct_answers": [0],
          "explanation": "ValidatingWebhookConfiguration is used to integrate OPA for policy management.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 298,
          "question": "What is the primary function of Open Policy Agent (OPA) in Kubernetes?",
          "options": [
            "Container runtime",
            "Policy enforcement and authorization",
            "Logging and monitoring",
            "Network routing",
            "Storage management"
          ],
          "correct_answers": [1],
          "explanation": "OPA is used to enforce policies and make authorization decisions.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 299,
          "question": "Which of the following is a benefit of using Namespaces in Kubernetes?",
          "options": [
            "Improves application performance",
            "Provides a mechanism for resource isolation",
            "Simplifies container images",
            "Automatically scales applications",
            "Replaces the need for Pods"
          ],
          "correct_answers": [1],
          "explanation": "Namespaces allow for logical isolation of resources.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Isolation and Segmentation"
        }      
    
  ]
  ;
