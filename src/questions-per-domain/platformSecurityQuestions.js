// TODO: Implement functionality for platformSecurityQuestions
export const platformSecurityQuestions = 
[
    {
      "id": 11,
      "question": "What does Public Key Infrastructure (PKI) manage?",
      "domain": "Platform Security",
      "options": [
        "Network configurations",
        "Storage volumes",
        "Digital certificates and encryption keys",
        "Container images",
        "Application logs"
      ],
      "correct_answers": [2],
      "explanation": "PKI manages keys and certificates for secure communication.",
      "question_type": "single-choice"
    },
    {
      "id": 12,
      "question": "Grafana is primarily used for:",
      "domain": "Platform Security",
      "options": [
        "Code version control",
        "Continuous integration",
        "Monitoring and visualisation",
        "Network security",
        "Identity management"
      ],
      "correct_answers": [2],
      "explanation": "Grafana is used to create dashboards for visualising metrics.",
      "question_type": "single-choice"
    },
    {
      "id": 32,
      "question": "Does the underlying cloud infrastructure affect Kubernetes cluster security?",
      "domain": "Platform Security",
      "options": [
        "No, Kubernetes abstracts the infrastructure entirely",
        "Yes, because infrastructure vulnerabilities can compromise the cluster",
        "Only if using on-premises hardware",
        "It depends on the Kubernetes version",
        "Only when running stateful applications"
      ],
      "correct_answers": [1],
      "explanation": "The security of the underlying infrastructure affects the cluster's security.",
      "question_type": "single-choice"
    },
    {
      "id": 34,
      "question": "Which folders on a client machine are sensitive when accessing Kubernetes clusters?",
      "domain": "Platform Security",
      "options": [
        "/var/log/",
        "~/.kube/config",
        "/etc/hosts",
        "~/.ssh/",
        "/tmp/"
      ],
      "correct_answers": [1, 3],
      "explanation": "~/.kube/config and ~/.ssh/ contain sensitive cluster and SSH access information.",
      "question_type": "multiple-choice"
    },
    {
      "id": 38,
      "question": "When is soft multi-tenancy preferred over hard multi-tenancy?",
      "domain": "Platform Security",
      "options": [
        "When strict isolation is required",
        "For untrusted tenant workloads",
        "To maximise resource efficiency in trusted environments",
        "In compliance-regulated industries",
        "When using multiple clusters"
      ],
      "correct_answers": [2],
      "explanation": "Soft tenancy is suitable when strict isolation isn't required.",
      "question_type": "single-choice"
    },
    {
      "id": 39,
      "question": "How can resources be isolated in a multi-tenancy Kubernetes setting? (Select all that apply)",
      "domain": "Platform Security",
      "options": [
        "Using separate clusters for each tenant",
        "Implementing namespaces and RBAC",
        "Applying network policies",
        "Sharing service accounts among tenants",
        "Disabling resource quotas"
      ],
      "correct_answers": [0, 1, 2],
      "explanation": "These methods help isolate resources in multi-tenancy setups.",
      "question_type": "multiple-choice"
    }
  ]
;
