
// Exported 30 questions for domain: Compliance and Security Frameworks
// Last revision date: 2025-04-18 17:51:56
export const ComplianceAndSecurityFrameworksQuestions = [
  {
    "id": 8,
    "question": "Which NIST Special Publication provides comprehensive guidelines on security and privacy controls specifically for federal information systems?",
    "options": [
      "NIST SP 800-53 Rev. 5",
      "NIST SP 800-190",
      "NIST SP 800-63",
      "NIST SP 800-171",
      "NIST SP 800-30"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "NIST SP 800-53 Rev. 5 is the primary publication that provides guidelines on security and privacy controls for federal information systems. It outlines a comprehensive set of controls that are crucial for protecting the confidentiality, integrity, and availability of federal information systems. NIST SP 800-190 focuses on cloud computing security, NIST SP 800-63 deals with digital identity guidelines, NIST SP 800-171 provides guidelines for protecting controlled unclassified information in nonfederal systems, and NIST SP 800-30 is about risk management.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [
      {
        "name": "NIST Special Publication 800-53 Rev. 5",
        "url": "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:51:56"
  },
  {
    "id": 24,
    "question": "What is the MITRE ATT&CK framework, and how is it used in cybersecurity?",
    "options": [
      "A set of compliance requirements for cloud providers",
      "A vulnerability scanning tool",
      "A knowledge base of adversary tactics and techniques used in cyberattacks",
      "An incident response guide for organizations",
      "A network security protocol for secure communication"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The MITRE ATT&CK framework is a comprehensive knowledge base that catalogs adversary tactics, techniques, and procedures (TTPs) observed in real-world cyberattacks. It is widely used by cybersecurity professionals to understand attacker behavior, improve threat detection, and enhance defense strategies. Other options are incorrect because they describe unrelated tools or concepts.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [
      {
        "name": "MITRE ATT&CK Official Website",
        "url": "https://attack.mitre.org/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:00:20"
  },
  {
    "id": 301,
    "question": "What is the primary focus of the NIST Cybersecurity Framework?",
    "options": [
      "A universal law for international data privacy",
      "A set of risk management guidelines to identify, protect, detect, respond, and recover from cyber threats",
      "A standard for container registry licensing",
      "A government mandate exclusively for financial institutions",
      "A platform for automating software supply chain security"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The NIST CSF provides a framework for identifying, protecting against, detecting, responding to, and recovering from cyber threats.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 302,
    "question": "Which statement best describes the CIS Kubernetes Benchmark?",
    "options": [
      "It is a proprietary software suite for securing virtual machines",
      "It offers prescriptive configuration guidelines for hardening Kubernetes clusters",
      "It focuses solely on threat modelling for Kubernetes",
      "It is primarily used for scanning container images for malware",
      "It provides guidelines for zero-trust network architecture"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The CIS Kubernetes Benchmark provides detailed configuration guidelines to harden and secure Kubernetes environments.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 304,
    "question": "What is the main purpose of Microsoft’s Security Development Lifecycle (SDL)?",
    "options": [
      "To provide a compliance checklist for healthcare data",
      "To outline an encryption standard for IoT devices",
      "To offer a threat modelling and mitigation process during software development",
      "To define data storage formats for container logs",
      "To guide zero-downtime deployment strategies"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Microsoft’s SDL aims to incorporate threat modelling and mitigation at every stage of software development.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 305,
    "question": "In a Data Flow Diagram (DFD) approach to threat modelling, what is primarily visualised?",
    "options": [
      "Financial transaction records across global markets",
      "Network latency metrics in high-availability clusters",
      "Entry points, exit points, and potential threat vectors within the system",
      "Container orchestration for microservices deployment",
      "Source code management for Git-based repositories"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "DFDs illustrate application data flows, highlighting entry/exit points and possible threat vectors.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 306,
    "question": "Which best defines PCI DSS in a containerized environment?",
    "options": [
      "A software license for open-source container platforms",
      "A set of security standards for systems handling cardholder data, applicable to container-based workflows",
      "A Kubernetes admission controller for preventing configuration drift",
      "A recommended approach to container performance tuning",
      "A zero-trust compliance framework for data science workloads"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "PCI DSS in a containerized environment refers to the application of its security standards to workflows that handle cardholder data within containers. This includes ensuring compliance with requirements such as network segmentation, access control, and real-time monitoring. Other options are incorrect because they either mischaracterize PCI DSS or describe unrelated concepts like software licenses or Kubernetes-specific tools.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [
      {
        "name": "Sysdig Blog - PCI Compliance for Containers and Kubernetes",
        "url": "https://sysdig.com/blog/container-pci-compliance/"
      },
      {
        "name": "Red Hat - Container and Kubernetes Compliance Considerations",
        "url": "https://www.redhat.com/en/topics/containers/compliance"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:16:11"
  },
  {
    "id": 307,
    "question": "Why is TLS certificate integration critical for supply chain security in Kubernetes?",
    "options": [
      "It ensures faster application deployment via automation",
      "It facilitates multi-cloud resource allocation",
      "It secures admission controller communication with the API server to prevent man-in-the-middle attacks",
      "It helps in container orchestration on legacy systems",
      "It extends the cluster’s node pool automatically"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Using TLS certificates protects communication channels in Kubernetes, preventing interception or tampering in the supply chain.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Supply Chain Compliance",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 308,
    "question": "Which tool is commonly used to automate CIS Benchmark compliance checks in Kubernetes?",
    "options": [
      "Nmap",
      "Kube-bench",
      "Grafana",
      "syslog-ng",
      "Bash scripts in CronJobs"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kube-bench automates checks against the CIS Kubernetes Benchmark to ensure configuration compliance.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 309,
    "question": "What is the primary purpose of Open Policy Agent (OPA) Gatekeeper in Kubernetes?",
    "options": [
      "To manage node scaling based on CPU usage",
      "To provide an integrated container registry",
      "To enforce policy-as-code by validating configurations during admission",
      "To offer a threat feed for container vulnerabilities",
      "To install an alternative container runtime in Kubernetes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "OPA Gatekeeper is a validating admission controller that enforces policies defined as code during resource creation or updates in Kubernetes. It ensures compliance by preventing non-compliant resources from being admitted to the cluster. Incorrect options, such as managing node scaling or providing a container registry, are unrelated to OPA Gatekeeper's functionality. Similarly, it does not handle threat feeds or runtime installation.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [
      {
        "name": "Cloud Google - Pod Security Policies with Gatekeeper",
        "url": "https://cloud.google.com/kubernetes-engine/docs/how-to/pod-security-policies-with-gatekeeper"
      },
      {
        "name": "Open Policy Agent Documentation - Kubernetes Admission Control",
        "url": "https://www.openpolicyagent.org/docs/v0.12.2/kubernetes-admission-control/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:33:32"
  },
  {
    "id": 310,
    "question": "Which of the following best describes Kyverno in a Kubernetes environment?",
    "options": [
      "A container scanning tool for malware detection",
      "A platform for automating cost optimisations",
      "An admission controller for writing and enforcing policies as Kubernetes resources",
      "An event streaming system for logs",
      "A vulnerability database maintained by CIS"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Kyverno is a policy engine designed for Kubernetes, allowing users to write policies as Kubernetes-native resources.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 311,
    "question": "Which statement accurately describes container scanning tools like Aqua Security or Clair?",
    "options": [
      "They are used to manage multi-cluster ingress controllers",
      "They automate vulnerability detection in container images, often before deployment",
      "They provide a database of open-source container licences",
      "They specialise in high-availability cluster provisioning",
      "They replace Kubernetes’ default scheduler"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Tools like Aqua Security or Clair scan container images for known vulnerabilities as part of a secure supply chain process.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Supply Chain Compliance",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 312,
    "question": "Which of the following is a core function of the NIST Cybersecurity Framework?",
    "options": [
      "Monitor, Map, Maintain, Minimise, and Mutate",
      "Identify, Protect, Detect, Respond, and Recover",
      "Review, Replace, Retract, Renew, and Reserve",
      "Discover, Compare, Archive, Document, and Renew",
      "Encrypt, Store, Backup, Alert, and Evaluate"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "NIST CSF’s core functions are Identify, Protect, Detect, Respond, and Recover.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 313,
    "question": "What is the main goal of Botkube in a Kubernetes environment?",
    "options": [
      "To provide an integrated container build system",
      "To automate Slack-based alerts for compliance events and checks",
      "To serve as an API gateway for microservices",
      "To orchestrate container autoscaling across clusters",
      "To replace kubelet on worker nodes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Botkube integrates with messaging platforms (like Slack) to notify about compliance and security events in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 314,
    "question": "Which framework specifically focuses on secure software development practices by including threat modelling and validation phases?",
    "options": [
      "Microsoft Security Development Lifecycle (SDL)",
      "Open Container Initiative (OCI) Standard",
      "JWT Token Compliance Framework",
      "HTTP Strict Transport Security (HSTS)",
      "NIST SP 800-63"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Microsoft’s SDL includes phases for requirements definition, threat modelling, mitigation, and validation.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 315,
    "question": "Which compliance framework is best known for emphasising continuous policy review and network traffic monitoring in cloud environments?",
    "options": [
      "NIST Cybersecurity Framework",
      "SOC 1 Type II",
      "ISO 27017",
      "FedRAMP",
      "COBIT"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The NIST Cybersecurity Framework underlines ongoing policy review and traffic monitoring to manage risks effectively.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 316,
    "question": "What is the primary purpose of threat modelling in Kubernetes security?",
    "options": [
      "To define default CPU and memory limits for all workloads",
      "To visualise data flows and identify potential attack vectors in cluster configurations",
      "To enforce container image scanning during runtime",
      "To conduct load testing on container orchestration systems",
      "To accelerate pipeline deployments in CI/CD"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Threat modelling aims to uncover vulnerabilities by mapping data flows and identifying potential risks within the Kubernetes environment.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 317,
    "question": "Which of the following best describes the role of Kubernetes admission controllers in compliance?",
    "options": [
      "They schedule pods onto nodes according to resource requirements",
      "They manage persistent storage volumes for stateful applications",
      "They intercept API requests to validate and enforce policies before object creation or modification",
      "They act as a certificate authority for cluster nodes",
      "They provide a GUI for cluster configuration"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Admission controllers can validate and enforce compliance policies before an object is admitted into the cluster’s runtime environment.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 318,
    "question": "Which guidance document provides best practices for mitigating supply chain risks in Kubernetes environments?",
    "options": [
      "TOGAF Enterprise Architecture Framework",
      "OWASP Top 10 Security Risks",
      "NSA/CISA Kubernetes Hardening Guidance",
      "ITIL Service Management Framework",
      "SRE (Site Reliability Engineering) Handbook"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The NSA/CISA Kubernetes Hardening Guidance outlines strategies to mitigate supply chain risks in Kubernetes environments. It includes recommendations for securing container images, implementing role-based access control (RBAC), and ensuring secure configurations for clusters.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [
      {
        "name": "NSA/CISA Kubernetes Hardening Guidance",
        "url": "https://media.defense.gov/2021/Aug/03/2002820346/-1/-1/0/ESF_KUBERNETES_HARDENING_GUIDANCE.PDF"
      },
      {
        "name": "Kubernetes Supply Chain Security Best Practices",
        "url": "https://kubernetes.io/blog/2021/04/06/supply-chain-security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:43:26"
  },
  {
    "id": 319,
    "question": "Why is Infrastructure as Code (IaC) relevant to Kubernetes compliance?",
    "options": [
      "It replaces the need for container registries",
      "It enables the manual application of security patches",
      "It provides a script-free approach to deployment",
      "It ensures repeatable and auditable deployments aligned with security best practices",
      "It automatically detects vulnerabilities without scanning"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "IaC tools like Terraform or CloudFormation allow consistent and secure provisioning, which is crucial for compliance and auditing.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 320,
    "question": "Which compliance standard is particularly relevant for organisations in healthcare handling Protected Health Information (PHI)?",
    "options": [
      "HIPAA",
      "SOX",
      "ISO 9001",
      "GDPR",
      "MITRE ATT&CK"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "HIPAA contains security and privacy rules pertinent to PHI and is relevant when deploying healthcare solutions on Kubernetes.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 321,
    "question": "Which methodology involves visualising application components and interactions to identify security threats?",
    "options": [
      "Scrum methodology",
      "Data Flow Diagram (DFD) approach",
      "Waterfall model",
      "Incident Response Cycle",
      "Serverless microservices design"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The DFD approach helps map out data paths and interactions, facilitating threat identification and mitigation.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Threat Modelling Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 322,
    "question": "Which tool can be used for real-time compliance monitoring and alerting in Kubernetes clusters?",
    "options": [
      "Sysdig Secure",
      "NTP daemon",
      "CoreDNS",
      "Kubernetes Dashboard",
      "etcd"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Sysdig Secure, like other tools, offers real-time compliance monitoring, anomaly detection, and security enforcement in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 324,
    "question": "How does Kube-bench contribute to Kubernetes security?",
    "options": [
      "By automating cluster scaling during high load",
      "By auditing cluster configurations against CIS Kubernetes Benchmark recommendations",
      "By providing a continuous integration pipeline for containers",
      "By replacing default CNI plugins with a secure version",
      "By encrypting container images at runtime"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kube-bench automates the evaluation of Kubernetes cluster configurations to align with CIS best practices.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 325,
    "question": "Which compliance framework is considered mandatory for U.S. federal agencies or their contractors hosting government data in the cloud?",
    "options": [
      "FedRAMP",
      "COSO",
      "ISO 20000",
      "DMARC",
      "SAML"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "FedRAMP is a government-wide program for assessing and authorising cloud services used by U.S. federal agencies.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 326,
    "question": "Which of the following is a key objective of supply chain compliance in Kubernetes?",
    "options": [
      "To reduce container start-up times",
      "To ensure each software component, including third-party images, meets security standards",
      "To provide a universal logging format for microservices",
      "To scale nodes automatically based on temperature sensor data",
      "To track CPU resource usage for cost optimisation"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Supply chain compliance addresses verifying the integrity and security of all components used in an application’s lifecycle.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Supply Chain Compliance",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 327,
    "question": "Which statement best describes the purpose of the CIS Controls in an enterprise security context?",
    "options": [
      "They are licensing restrictions for enterprise software",
      "They list hardware specifications for data centre appliances",
      "They outline a set of actions to defend systems from common cyber attacks",
      "They provide guidelines for AI-based container scheduling",
      "They focus exclusively on physical security measures"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The CIS Controls recommend a series of steps to help organisations defend against the most widespread cyber threats.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 328,
    "question": "Which tool allows policy enforcement through a webhooks-based admission controller for Kubernetes compliance?",
    "options": [
      "Kubeproxy",
      "Prometheus",
      "OPA Gatekeeper",
      "kubectl",
      "MetalLB"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Open Policy Agent (OPA) Gatekeeper uses admission webhooks to enforce custom policies on Kubernetes resources.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Automation and Tooling",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  },
  {
    "id": 329,
    "question": "What is the primary focus of the NSA/CISA Kubernetes Hardening Guidance?",
    "options": [
      "Using insecure container registries for testing purposes",
      "Skipping vulnerability scanning to reduce operational overhead",
      "Securing supply chain components and minimizing container privileges",
      "Disabling TLS to accelerate deployment processes",
      "Automatically approving all configuration changes to enhance agility"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The NSA/CISA Kubernetes Hardening Guidance emphasizes securing the software supply chain and minimizing container privileges to reduce attack surfaces. This includes practices like signing container images, scanning for vulnerabilities, and implementing least privilege access controls.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [
      {
        "name": "NSA/CISA Kubernetes Hardening Guidance",
        "url": "https://media.defense.gov/2021/Aug/03/2002820346/-1/-1/0/ESF_KUBERNETES_HARDENING_GUIDANCE.PDF"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:43:26"
  },
  {
    "id": 330,
    "question": "What is the main advantage of applying CIS Kubernetes Benchmark in production clusters?",
    "options": [
      "It guarantees zero downtime of all microservices",
      "It provides prescriptive hardening steps to bolster security and compliance",
      "It enforces a rolling-update strategy by default",
      "It offers automatic data encryption for stateful workloads",
      "It replaces manual container orchestration with serverless functions"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The CIS Kubernetes Benchmark offers practical recommendations to harden production clusters, improving overall security and compliance.",
    "question_type": "single-choice",
    "domain": "Compliance and Security Frameworks",
    "subdomain": "Compliance Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": "2025-02-04 15:50:32"
  }
];
