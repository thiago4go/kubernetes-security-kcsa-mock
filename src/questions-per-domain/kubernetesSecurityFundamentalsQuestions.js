// TODO: Implement functionality for kubernetesSecurityFundamentalsQuestions
export const kubernetesSecurityFundamentalsQuestions = 
[
    {
      "id": 1,
      "question": "What was the precursor to the Pod Security Standards (PSS) in Kubernetes?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Pod Security Admission (PSA)",
        "Kubernetes Security Policies (KSP)",
        "PodSecurityPolicy (PSP)",
        "Network Policies",
        "Role-Based Access Control (RBAC)"
      ],
      "correct_answers": [2],
      "explanation": "PSP was the precursor to PSS; it was deprecated and replaced by Pod Security Standards and the PodSecurity admission controller.",
      "question_type": "single-choice"
    },
    {
      "id": 2,
      "question": "How do you enable Pod Security Admission (PSA) in a Kubernetes cluster?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Install the PSA plugin via kubectl",
        "Add 'PodSecurity' to the '--enable-admission-plugins' flag in the API server",
        "Apply a custom resource definition for PSA",
        "Use a third-party tool to enforce PSA",
        "Enable it in the kubelet configuration"
      ],
      "correct_answers": [1],
      "explanation": "Enabling the PodSecurity admission plugin requires updating the API server's configuration.",
      "question_type": "single-choice"
    },
    {
      "id": 3,
      "question": "Can you enforce more than one Pod Security Admission (PSA) policy level concurrently within a single namespace?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Yes, by applying multiple labels",
        "No, only one policy level per namespace",
        "Yes, but only with custom configurations",
        "Only if the namespace is partitioned",
        "It depends on the Kubernetes version"
      ],
      "correct_answers": [1],
      "explanation": "PSA policies are applied per namespace using labels; only one policy level can be enforced per namespace.",
      "question_type": "single-choice"
    },
    {
      "id": 4,
      "question": "Which of the following restrictions does the 'baseline' Pod Security Standard enforce? (Select all that apply)",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Disallows privileged containers",
        "Allows hostPath volumes",
        "Blocks host networking and ports",
        "Requires running as non-root",
        "Allows all Linux capabilities"
      ],
      "correct_answers": [0, 2],
      "explanation": "The 'baseline' policy disallows privileged containers and blocks host networking and ports.",
      "question_type": "multiple-choice"
    },
    {
      "id": 5,
      "question": "In Kubernetes RBAC, what does a Role define?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "A set of users and their passwords",
        "Permissions within a namespace",
        "Network policies for pods",
        "Global cluster-wide permissions",
        "Resource quotas for a project"
      ],
      "correct_answers": [1],
      "explanation": "A Role defines permissions (rules) applicable within a namespace.",
      "question_type": "single-choice"
    },
    {
      "id": 13,
      "question": "How do Network Policies work in Kubernetes?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "By default, they block all traffic between pods",
        "They use iptables rules to control pod communication",
        "They are enforced by the kube-scheduler",
        "They manage access to the Kubernetes API",
        "They control storage access for pods"
      ],
      "correct_answers": [1],
      "explanation": "Network Policies are implemented via iptables rules by the network plugin.",
      "question_type": "single-choice"
    },
    {
      "id": 16,
      "question": "Does setting 'privileged: true' on a pod change its access level to Kubernetes Secrets?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Yes, it grants full access to all Secrets",
        "No, it only affects host system privileges",
        "Yes, but only within the same namespace",
        "No, it prevents access to Secrets",
        "It depends on RBAC settings"
      ],
      "correct_answers": [1],
      "explanation": "Privileged mode doesn't change access to Kubernetes Secrets.",
      "question_type": "single-choice"
    },
    {
      "id": 27,
      "question": "Which of the following actions cross over trust boundaries in Kubernetes? (Select all that apply)",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Accessing the Kubernetes API",
        "Communicating between pods in the same namespace",
        "Mounting hostPath volumes",
        "Using service accounts across namespaces",
        "Pulling images from public registries"
      ],
      "correct_answers": [2, 3, 4],
      "explanation": "These actions cross trust boundaries and can pose security risks.",
      "question_type": "multiple-choice"
    },
    {
      "id": 30,
      "question": "Why might a pod still have privileged access after enforcing the 'restricted' PSS/PSA on its namespace?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "The policy does not apply to existing pods",
        "Misconfigured namespace labels",
        "The API server does not support PSS",
        "The pod overrides the policy",
        "Privileged access is always allowed"
      ],
      "correct_answers": [1],
      "explanation": "If labels are incorrect, the policy won't be enforced.",
      "question_type": "single-choice"
    },
    {
      "id": 31,
      "question": "What are possible issues of not restricting egress traffic from pods?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "Pods cannot communicate with the API server",
        "Increased risk of data exfiltration",
        "Reduced cluster performance",
        "Difficulty in scaling applications",
        "Pods will be unable to receive traffic"
      ],
      "correct_answers": [1],
      "explanation": "Unrestricted egress can lead to data leaks and other security issues.",
      "question_type": "single-choice"
    },
    {
      "id": 35,
      "question": "Why is a ConfigMap not suitable for storing secrets?",
      "domain": "Kubernetes Security Fundamentals",
      "options": [
        "It cannot be mounted as a volume",
        "It does not support key-value pairs",
        "Data is stored in plain text",
        "It is deprecated in recent Kubernetes versions",
        "It has size limitations"
      ],
      "correct_answers": [2],
      "explanation": "ConfigMaps are not designed to store sensitive data securely.",
      "question_type": "single-choice"
    },
    {
        "id": 46,
        "question": "Why might a Network Policy not work as expected in a Kubernetes cluster?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Network Policies are enabled by default",
        "The CNI plugin does not support Network Policies",
        "The policy YAML has a syntax error",
        "The API server is down",
        "Network Policies only affect external traffic"
        ],
        "correct_answers": [1],
        "explanation": "If the plugin doesn't support policies, they won't be enforced.",
        "question_type": "single-choice"
    },
    {
        "id": 47,
        "question": "If a user is granted the 'cluster-admin' ClusterRole via a RoleBinding, what permissions do they have?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Limited to the namespace where the RoleBinding is applied",
        "Full cluster-wide administrative privileges",
        "Read-only access to all resources",
        "No permissions; ClusterRoles require ClusterRoleBindings",
        "Access only to service accounts"
        ],
        "correct_answers": [0],
        "explanation": "RoleBindings apply roles within a namespace.",
        "question_type": "single-choice"
    },
    {
        "id": 51,
        "question": "Which of the following is a method to enable PSA in a Kubernetes cluster?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Applying labels to pods directly",
        "Configuring the API server's admission controllers",
        "Setting environment variables on nodes",
        "Using a third-party admission webhook",
        "Updating kubelet configurations"
        ],
        "correct_answers": [1],
        "explanation": "Enabling PSA involves adding the 'PodSecurity' admission plugin to the API server's '--enable-admission-plugins' flag.",
        "question_type": "single-choice"
    },
    {
        "id": 52,
        "question": "In Kubernetes RBAC, what does a RoleBinding do?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Defines permissions within a namespace",
        "Binds roles to users or groups within a namespace",
        "Creates a new role with cluster-wide permissions",
        "Manages network policies for a namespace",
        "Sets resource quotas for a project"
        ],
        "correct_answers": [1],
        "explanation": "A RoleBinding ties a Role to subjects (users, groups, service accounts) within a namespace.",
        "question_type": "single-choice"
    },
    {
        "id": 54,
        "question": "Which of the following best describes the function of Open Policy Agent (OPA) in Kubernetes?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "A tool for monitoring cluster performance",
        "A general-purpose policy engine that can enforce custom policies",
        "A built-in Kubernetes admission controller",
        "A network policy enforcement tool",
        "A secret management system"
        ],
        "correct_answers": [1],
        "explanation": "OPA allows you to define and enforce custom policies in Kubernetes and other systems.",
        "question_type": "single-choice"
    },
    {
        "id": 60,
        "question": "What is the function of Resource Quotas in Kubernetes?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Limit the number of namespaces",
        "Restrict access to the API server",
        "Control resource consumption per namespace",
        "Schedule pods to specific nodes",
        "Enforce network policies"
        ],
        "correct_answers": [2],
        "explanation": "Resource Quotas limit the amount of resources a namespace can consume.",
        "question_type": "single-choice"
    },
    {
        "id": 62,
        "question": "Which Kubernetes object should you use to store sensitive configuration data?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "ConfigMap",
        "Secret",
        "Volume",
        "Pod Annotation",
        "Deployment"
        ],
        "correct_answers": [1],
        "explanation": "Secrets are designed to store sensitive data like passwords, tokens, and keys.",
        "question_type": "single-choice"
    },
    {
        "id": 64,
        "question": "Which of the following are common CNI plugins that support Network Policies? (Select all that apply)",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Flannel",
        "Calico",
        "Weave Net",
        "AWS VPC CNI",
        "Cilium"
        ],
        "correct_answers": [1, 2, 4],
        "explanation": "Calico, Weave Net, and Cilium are CNI plugins that support Network Policies. Flannel does not support them by default.",
        "question_type": "multiple-choice"
    },
    {
        "id": 68,
        "question": "What is the default network policy behavior if no policies are applied?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "All ingress and egress traffic is denied",
        "All ingress traffic is denied; egress is allowed",
        "All ingress and egress traffic is allowed",
        "All egress traffic is denied; ingress is allowed",
        "Traffic is allowed only within the namespace"
        ],
        "correct_answers": [2],
        "explanation": "By default, Kubernetes allows all traffic if no Network Policies are applied.",
        "question_type": "single-choice"
    },
    {
        "id": 69,
        "question": "How does Kubernetes Secrets improve security over ConfigMaps?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Secrets are encrypted by default",
        "Secrets are stored in a separate database",
        "Secrets are base64-encoded and can have additional encryption",
        "Secrets provide versioning",
        "Secrets can only be accessed by cluster admins"
        ],
        "correct_answers": [2],
        "explanation": "Secrets are base64-encoded and can be encrypted at rest, offering better security than ConfigMaps.",
        "question_type": "single-choice"
    },
    {
        "id": 70,
        "question": "Which component is responsible for enforcing Pod Security Standards?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "kube-scheduler",
        "kube-apiserver with PodSecurity admission plugin",
        "kube-controller-manager",
        "kubelet",
        "etcd"
        ],
        "correct_answers": [1],
        "explanation": "The PodSecurity admission plugin enforces Pod Security Standards.",
        "question_type": "single-choice"
    },
    {
        "id": 71,
        "question": "What is the purpose of the '--allow-privileged' flag in Kubernetes?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Allows pods to use privileged containers",
        "Enables access to the API server without authentication",
        "Grants admin rights to all users",
        "Disables security contexts",
        "Controls access to network policies"
        ],
        "correct_answers": [0],
        "explanation": "The '--allow-privileged' flag enables or disables the creation of privileged containers.",
        "question_type": "single-choice"
    },
    {
        "id": 74,
        "question": "Which of the following is a disadvantage of not restricting egress traffic in Kubernetes?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Easier debugging of network issues",
        "Reduced latency in network communication",
        "Potential for data exfiltration",
        "Improved pod-to-pod communication",
        "Simplified network configuration"
        ],
        "correct_answers": [2],
        "explanation": "Unrestricted egress traffic can allow attackers to send data out of the cluster.",
        "question_type": "single-choice"
    },
    {
        "id": 75,
        "question": "How can you verify that Pod Security Admission is enforcing policies in a namespace?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Check the API server logs",
        "Attempt to create a pod that violates the policy",
        "Inspect the kubelet configuration",
        "Review the scheduler's event log",
        "Use 'kubectl get psa'"
        ],
        "correct_answers": [1],
        "explanation": "Testing enforcement by trying to create a non-compliant pod verifies PSA functionality.",
        "question_type": "single-choice"
    },
    {
        "id": 76,
        "question": "What is the effect of applying a NetworkPolicy that selects no pods?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "It has no effect on the cluster",
        "It denies all traffic to and from all pods",
        "It allows all traffic by default",
        "It causes an error in the network plugin",
        "It only affects newly created pods"
        ],
        "correct_answers": [0],
        "explanation": "A NetworkPolicy that selects no pods does nothing.",
        "question_type": "single-choice"
    },
    {
        "id": 83,
        "question": "How can you restrict a user to only create resources in a specific namespace?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Assign the user to the cluster-admin role",
        "Use a Role and RoleBinding in that namespace",
        "Modify the kube-apiserver configuration",
        "Create a NetworkPolicy for the user",
        "Set a resource quota on the namespace"
        ],
        "correct_answers": [1],
        "explanation": "Assigning permissions via Role and RoleBinding restricts user actions to a namespace.",
        "question_type": "single-choice"
    },
    {
        "id": 84,
        "question": "What is the purpose of a PodDisruptionBudget?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "To prevent pods from being evicted during maintenance",
        "To limit the number of pods in a namespace",
        "To allocate CPU and memory resources",
        "To define pod scheduling constraints",
        "To enforce network policies"
        ],
        "correct_answers": [0],
        "explanation": "PodDisruptionBudget ensures a minimum number of pods remain available during disruptions.",
        "question_type": "single-choice"
    },
    {
        "id": 87,
        "question": "How can you prevent a container from running as root?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Set 'runAsUser: 0' in the security context",
        "Use a Pod Security Policy that requires non-root user",
        "It is not possible to prevent this",
        "Modify the container image to exclude root",
        "Set 'allowPrivilegeEscalation: true'"
        ],
        "correct_answers": [1],
        "explanation": "Enforcing policies to prevent running as root enhances security.",
        "question_type": "single-choice"
    },
    {
        "id": 88,
        "question": "What is the main purpose of Role-Based Access Control (RBAC) in Kubernetes?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "To manage network policies",
        "To control user and process access to resources",
        "To schedule pods efficiently",
        "To monitor cluster performance",
        "To provide logging capabilities"
        ],
        "correct_answers": [1],
        "explanation": "RBAC manages permissions for users and applications.",
        "question_type": "single-choice"
    },
    {
        "id": 89,
        "question": "Which Kubernetes object is used to define a set of network access rules for pods?",
        "domain": "Kubernetes Security Fundamentals",
        "options": [
        "Service",
        "Deployment",
        "Ingress",
        "NetworkPolicy",
        "ConfigMap"
        ],
        "correct_answers": [3],
        "explanation": "NetworkPolicy defines networking rules for pods.",
        "question_type": "single-choice"
    }
      
  ]
  
;
