
// Exported 22 questions for domain: Kubernetes Threat Model
// Last revision date: 2025-04-18 18:09:53
export const KubernetesThreatModelQuestions = [
  {
    "id": 15,
    "question": "What does the term 'container breakout' refer to in the context of container security?",
    "options": [
      "When a container fails to start properly",
      "A container exceeding its allocated resource limits",
      "An attack where an attacker escapes container isolation to gain access to the host system",
      "Scaling a container beyond its maximum configured replicas",
      "Migrating a container to a different node in the cluster"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A container breakout occurs when an attacker exploits vulnerabilities to escape the isolation boundaries of a container and gain unauthorized access to the underlying host system. This compromises the host's security and can lead to privilege escalation. Other options describe container lifecycle or resource management issues, which are unrelated to security breaches involving isolation escape.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "CNCF Security Whitepaper - Container Security",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper/container_security.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 23,
    "question": "In the STRIDE threat model, which category best describes a Trojan horse that compromises a build server?",
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
    "explanation": "A Trojan horse compromising a build server is an example of tampering because it involves unauthorized modification of system components or data. Tampering refers to malicious alterations that can affect the integrity of software or systems. Spoofing involves impersonation, repudiation relates to denial of actions, information disclosure concerns unauthorized data exposure, and denial of service targets availability, none of which precisely describe this scenario.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [
      {
        "name": "Microsoft STRIDE Threat Model",
        "url": "https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling-tool"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 27,
    "question": "Which of the following actions in Kubernetes cross trust boundaries and potentially introduce security risks? (Select all that apply)",
    "options": [
      "Accessing the Kubernetes API server",
      "Communicating between pods within the same namespace",
      "Mounting hostPath volumes into pods",
      "Using service accounts across different namespaces",
      "Pulling container images from public registries"
    ],
    "correct_answers": [
      2,
      3,
      4
    ],
    "explanation": "Mounting hostPath volumes allows pods to access the host filesystem, crossing the boundary between container and host, which poses significant security risks. Using service accounts across namespaces can bypass namespace isolation, potentially escalating privileges. Pulling images from public registries introduces risks from untrusted or malicious images. Accessing the Kubernetes API is a controlled and authenticated action, while pod-to-pod communication within the same namespace is generally within the same trust boundary and less risky.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      },
      {
        "name": "CNCF Cloud Native Security Whitepaper",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper/cloud_native_security_whitepaper.pdf"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 48,
    "question": "Which combination of capabilities can allow a compromised Kubernetes pod to access and modify the host system? (Select all that apply)",
    "options": [
      "Running the pod in privileged mode",
      "Mounting the host filesystem into the pod",
      "Using host networking in the pod",
      "Dropping all Linux capabilities from the pod",
      "Running the pod as a non-root user"
    ],
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "Running a pod in privileged mode grants it almost unrestricted access to the host, enabling it to perform operations that can compromise host security. Mounting the host filesystem exposes the host's files to the pod, allowing modification or data theft. Using host networking gives the pod access to the host's network stack, which can be exploited. Conversely, dropping Linux capabilities and running as a non-root user reduce the pod's privileges and help mitigate risks.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "CNCF Security Whitepaper - Privilege Escalation",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper/privilege_escalation.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 49,
    "question": "When an attacker gains access to a Kubernetes pod, which of the following attack scenarios is typically not persistent after the pod restarts?",
    "options": [
      "Modifying the container image stored in the registry",
      "Installing malware inside the pod's ephemeral filesystem",
      "Exfiltrating data from the pod during its runtime",
      "Altering data stored in a mounted PersistentVolume",
      "Changing configurations stored in a ConfigMap"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The pod's filesystem is ephemeral, meaning any changes such as malware installation inside the container's filesystem are lost when the pod restarts. Modifications to the container image in the registry, persistent volumes, or ConfigMaps are persistent because they exist outside the pod lifecycle. Data exfiltration is a runtime activity and does not persist but can have lasting impact.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Persistence",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Volumes",
        "url": "https://kubernetes.io/docs/concepts/storage/volumes/"
      },
      {
        "name": "CNCF Security Whitepaper - Container Security",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper/container_security.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 72,
    "question": "Which of the following practices help prevent container breakout vulnerabilities? (Select all that apply)",
    "options": [
      "Running containers with root privileges",
      "Using minimal base images to reduce attack surface",
      "Applying the principle of least privilege to container permissions",
      "Disabling security modules like SELinux or AppArmor",
      "Regularly updating container runtimes and dependencies"
    ],
    "correct_answers": [
      1,
      2,
      4
    ],
    "explanation": "Preventing container breakouts involves minimizing the attack surface and restricting privileges. Using minimal base images reduces unnecessary software that could be exploited. Applying the principle of least privilege limits container capabilities to only what is necessary, reducing risk. Regularly updating container runtimes ensures known vulnerabilities are patched. Conversely, running containers as root increases risk, and disabling security modules like SELinux or AppArmor removes important security layers, increasing breakout potential.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Docker Security - Best Practices",
        "url": "https://docs.docker.com/develop/security/security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 227,
    "question": "What is a primary security risk associated with running a container in privileged mode?",
    "options": [
      "Increased memory usage",
      "Limited network access",
      "Container gaining unrestricted access to host resources, posing security risks",
      "Reduced application performance",
      "Inability to use persistent volumes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Running a container in privileged mode grants it almost the same access to the host as the root user, including direct access to host devices and kernel capabilities. This significantly increases the risk of container breakout and host compromise. The other options, such as increased memory usage or reduced performance, are not typical consequences of privileged mode, and privileged containers can still use persistent volumes and network access normally.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Docker Documentation - Privileged Containers",
        "url": "https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 251,
    "question": "In the STRIDE threat modeling framework, what does the letter 'S' represent?",
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
    "explanation": "In STRIDE, a widely used threat modeling framework, 'S' stands for Spoofing, which refers to an attacker pretending to be someone or something else to gain unauthorized access. The other options like scanning, snooping, spamming, and sniffing are related to security but are not part of the STRIDE categories.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Microsoft STRIDE Threat Model",
        "url": "https://learn.microsoft.com/en-us/security/engineering/stride-threat-model"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 252,
    "question": "Which STRIDE threat category primarily addresses threats related to data integrity?",
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
    "explanation": "The 'Tampering' category in STRIDE focuses on threats that compromise data integrity by unauthorized modification of data. Spoofing relates to identity, repudiation to denial of actions, information disclosure to confidentiality breaches, and denial of service to availability issues.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [
      {
        "name": "Microsoft STRIDE Threat Model",
        "url": "https://learn.microsoft.com/en-us/security/engineering/stride-threat-model"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 253,
    "question": "In the STRIDE threat modeling framework, what does 'Repudiation' refer to?",
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
    "explanation": "'Repudiation' in STRIDE refers to the ability of an attacker or user to deny having performed an action or event, which can hinder accountability and auditing. It is distinct from unauthorized access (spoofing), data leakage (information disclosure), service unavailability (denial of service), and privilege escalation.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Microsoft STRIDE Threat Model",
        "url": "https://learn.microsoft.com/en-us/security/engineering/stride-threat-model"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 254,
    "question": "What is an example of 'Information Disclosure' under the STRIDE threat model?",
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
    "explanation": "Information Disclosure refers to unauthorized access to sensitive data. This can occur when a user reads confidential information without proper authorization. Other options do not fit this category because they involve different types of threats: data deletion (Tampering), denial of actions (Denial of Service), privilege escalation (Elevation of Privileges), and network disruption (Denial of Service).",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [
      {
        "name": "Microsoft STRIDE",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/azuresecurity/threat-modeling-stride"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-project-threat-modeling/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 255,
    "question": "What does 'Elevation of Privileges' mean in the context of STRIDE?",
    "options": [
      "Gaining access to resources by posing as someone else",
      "Modifying data in transit",
      "Gaining unauthorized access rights that one should not have",
      "Denial of actions performed",
      "Accessing services during downtime"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Elevation of Privileges refers to the unauthorized acquisition of higher access rights than those originally granted. This can lead to increased capabilities to perform actions that were previously restricted. The other options describe different threats: impersonation (Spoofing), data tampering (Tampering), denial of actions (Denial of Service), and accessing services during maintenance (not a specific STRIDE category).",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Microsoft STRIDE",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/azuresecurity/threat-modeling-stride"
      },
      {
        "name": "OWASP Privilege Escalation",
        "url": "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 256,
    "question": "What is a common mitigation strategy for 'Spoofing' threats?",
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
    "explanation": "Spoofing threats can be mitigated by implementing robust authentication mechanisms. These mechanisms help verify the identity of users or systems, reducing the risk of impersonation. While encryption (option 2) and audit logging (option 3) are important security practices, they do not directly address spoofing. Rate limiting (option 4) is more relevant to Denial of Service attacks, and running processes as root (option 5) increases security risks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "OWASP Authentication Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
      },
      {
        "name": "Microsoft Authentication and Authorization",
        "url": "https://docs.microsoft.com/en-us/azure/architecture/guide/identity/authz"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 257,
    "question": "Which STRIDE category is primarily concerned with service availability?",
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
    "explanation": "Denial of Service (DoS) is the STRIDE category focused on making services unavailable. This can be achieved through various means, such as overwhelming a system with requests or disrupting network connectivity. The other options involve different types of threats: impersonation (Spoofing), data modification (Tampering), unauthorized data access (Information Disclosure), and unauthorized privilege escalation (Elevation of Privileges).",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Denial of Service",
    "sources": [
      {
        "name": "Microsoft STRIDE",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/azuresecurity/threat-modeling-stride"
      },
      {
        "name": "OWASP Denial of Service Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 258,
    "question": "What is 'Threat Modeling' in the context of security?",
    "options": [
      "A systematic process to identify and mitigate security risks",
      "A method to design software architectures",
      "A technique to improve application performance",
      "A strategy for marketing products",
      "An approach to project management"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Threat Modeling is a structured approach to identifying and mitigating potential security threats. It involves analyzing systems to uncover vulnerabilities and developing strategies to address them. This process is crucial for ensuring the security and integrity of systems. The other options describe unrelated activities: software design, performance optimization, marketing, and project management.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Microsoft Threat Modeling",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/azuresecurity/threat-modeling-stride"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-project-threat-modeling/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 259,
    "question": "In the STRIDE threat model, which category best describes an attacker exploiting a buffer overflow to gain root access?",
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
    "explanation": "Exploiting a buffer overflow to gain root access is classified as an Elevation of Privileges threat because it involves escalating an attacker's privileges to access sensitive resources. This is a critical threat as it can lead to full system compromise.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Privilege Escalation",
    "sources": [
      {
        "name": "Microsoft STRIDE",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/secdev/stride-a-threat-modeling-tool"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 260,
    "question": "Which of the following options is NOT a category in the STRIDE threat model?",
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
    "explanation": "Replication is not one of the categories in the STRIDE threat model. The STRIDE model includes Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privileges.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Microsoft STRIDE",
        "url": "https://docs.microsoft.com/en-us/archive/blogs/secdev/stride-a-threat-modeling-tool"
      },
      {
        "name": "OWASP Threat Modeling",
        "url": "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 261,
    "question": "What is an effective mitigation technique for 'Information Disclosure' threats in a Kubernetes environment?",
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
    "explanation": "Encrypting data at rest and in transit is crucial for protecting against Information Disclosure threats. This ensures that even if unauthorized access occurs, the data remains confidential and unreadable.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 262,
    "question": "What is a common mitigation strategy for 'Tampering' threats in Kubernetes?",
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
    "explanation": "Using digital signatures and checksums is an effective way to mitigate Tampering threats. These mechanisms ensure data integrity by verifying that data has not been altered during transmission or storage.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Malicious Code Execution and Compromised Applications in Containers",
    "sources": [
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      },
      {
        "name": "OWASP Secure Coding Practices",
        "url": "https://owasp.org/www-project-secure-coding-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 264,
    "question": "Why is it crucial to restrict access to etcd in a Kubernetes cluster?",
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
    "explanation": "Restricting access to etcd is vital because it stores sensitive data, including cluster secrets. Unauthorized access to etcd can compromise the entire Kubernetes cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Access to Sensitive Data",
    "sources": [
      {
        "name": "Kubernetes etcd Security",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/securing-etcd/"
      },
      {
        "name": "etcd Documentation",
        "url": "https://etcd.io/docs/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 265,
    "question": "Which Kubernetes component serves as the entry point for the control plane and exposes the Kubernetes API?",
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
    "explanation": "The kube-apiserver acts as the front end of the control plane, handling incoming API requests and serving as the primary interface for Kubernetes cluster management. It is responsible for authenticating and authorizing all requests to the API server, ensuring secure access to cluster resources. For more information, refer to the official Kubernetes documentation on components and architecture[1][3].",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Kubernetes Trust Boundaries and Data Flow",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      },
      {
        "name": "Kubernetes Architecture",
        "url": "https://kubernetes.io/docs/concepts/architecture/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  },
  {
    "id": 266,
    "question": "What is the recommended approach to secure the Kubernetes Dashboard?",
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
    "explanation": "Securing the Kubernetes Dashboard with Role-Based Access Control (RBAC) is crucial to limit exposure and ensure that only authorized users can access and manage cluster resources. This approach helps prevent unauthorized access and reduces the attack surface by enforcing strict access controls. For guidance on securing the Dashboard, refer to Kubernetes security best practices and RBAC documentation[1][3].",
    "question_type": "single-choice",
    "domain": "Kubernetes Threat Model",
    "subdomain": "Attacker on the Network",
    "sources": [
      {
        "name": "Kubernetes RBAC Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:09:53"
  }
];
