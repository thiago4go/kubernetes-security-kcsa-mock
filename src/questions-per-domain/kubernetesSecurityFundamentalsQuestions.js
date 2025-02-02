// TODO: Implement functionality for kubernetesSecurityFundamentalsQuestions
export const kubernetesSecurityFundamentalsQuestions = [
    {
      "id": 1,
      "question": "What was the precursor to the Pod Security Standards (PSS) in Kubernetes?",
      "options": [
        "Pod Security Admission (PSA)",
        "Kubernetes Security Policies (KSP)",
        "PodSecurityPolicy (PSP)",
        "Network Policies",
        "Role-Based Access Control (RBAC)"
      ],
      "correct_answers": [2],
      "explanation": "PSP was the precursor to PSS; it was deprecated and replaced by Pod Security Standards and the PodSecurity admission controller.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Standards"
    },
    {
      "id": 2,
      "question": "How do you enable Pod Security Admission (PSA) in a Kubernetes cluster?",
      "options": [
        "Install the PSA plugin via kubectl",
        "Add 'PodSecurity' to the '--enable-admission-plugins' flag in the API server",
        "Apply a custom resource definition for PSA",
        "Use a third-party tool to enforce PSA",
        "Enable it in the kubelet configuration"
      ],
      "correct_answers": [1],
      "explanation": "Enabling the PodSecurity admission plugin requires updating the API server's configuration.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 3,
      "question": "Can you enforce more than one Pod Security Admission (PSA) policy level concurrently within a single namespace?",
      "options": [
        "Yes, by applying multiple labels",
        "No, only one policy level per namespace",
        "Yes, but only with custom configurations",
        "Only if the namespace is partitioned",
        "It depends on the Kubernetes version"
      ],
      "correct_answers": [1],
      "explanation": "PSA policies are applied per namespace using labels; only one policy level can be enforced per namespace.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 4,
      "question": "Which of the following restrictions does the 'baseline' Pod Security Standard enforce? (Select all that apply)",
      "options": [
        "Disallows privileged containers",
        "Allows hostPath volumes",
        "Blocks host networking and ports",
        "Requires running as non-root",
        "Allows all Linux capabilities"
      ],
      "correct_answers": [0, 2],
      "explanation": "The 'baseline' policy disallows privileged containers and blocks host networking and ports.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Standards"
    },
    {
      "id": 5,
      "question": "In Kubernetes RBAC, what does a Role define?",
      "options": [
        "A set of users and their passwords",
        "Permissions within a namespace",
        "Network policies for pods",
        "Global cluster-wide permissions",
        "Resource quotas for a project"
      ],
      "correct_answers": [1],
      "explanation": "A Role defines permissions (rules) applicable within a namespace.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 13,
      "question": "How do Network Policies work in Kubernetes?",
      "options": [
        "By default, they block all traffic between pods",
        "They use iptables rules to control pod communication",
        "They are enforced by the kube-scheduler",
        "They manage access to the Kubernetes API",
        "They control storage access for pods"
      ],
      "correct_answers": [1],
      "explanation": "Network Policies are implemented via iptables rules by the network plugin.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 16,
      "question": "Does setting 'privileged: true' on a pod change its access level to Kubernetes Secrets?",
      "options": [
        "Yes, it grants full access to all Secrets",
        "No, it only affects host system privileges",
        "Yes, but only within the same namespace",
        "No, it prevents access to Secrets",
        "It depends on RBAC settings"
      ],
      "correct_answers": [1],
      "explanation": "Privileged mode doesn't change access to Kubernetes Secrets.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 20,
      "question": "What is a potential impact of enabling detailed auditing of request responses in Kubernetes?",
      "options": [
        "Improved cluster performance",
        "Reduced storage requirements",
        "Increased security without any drawbacks",
        "Performance overhead and increased storage usage",
        "Disabling of API server logging"
      ],
      "correct_answers": [3],
      "explanation": "Detailed auditing can impact performance and increase storage needs.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Audit Logging"
    },
    {
      "id": 30,
      "question": "Why might a pod still have privileged access after enforcing the 'restricted' PSS/PSA on its namespace?",
      "options": [
        "The policy does not apply to existing pods",
        "Misconfigured namespace labels",
        "The API server does not support PSS",
        "The pod overrides the policy",
        "Privileged access is always allowed"
      ],
      "correct_answers": [1],
      "explanation": "If labels are incorrect, the policy won't be enforced.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 31,
      "question": "What are possible issues of not restricting egress traffic from pods?",
      "options": [
        "Pods cannot communicate with the API server",
        "Increased risk of data exfiltration",
        "Reduced cluster performance",
        "Difficulty in scaling applications",
        "Pods will be unable to receive traffic"
      ],
      "correct_answers": [1],
      "explanation": "Unrestricted egress can lead to data leaks and other security issues.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Isolation and Segmentation"
    },
    {
      "id": 33,
      "question": "Which authentication mechanisms are used by kubeadm? (Select all that apply)",
      "options": [
        "TLS certificates",
        "Token-based authentication",
        "OAuth tokens",
        "Static passwords",
        "Biometric authentication"
      ],
      "correct_answers": [0, 1],
      "explanation": "kubeadm uses TLS certificates and token-based authentication mechanisms.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authentication"
    },
    {
      "id": 35,
      "question": "Why is a ConfigMap not suitable for storing secrets?",
      "options": [
        "It cannot be mounted as a volume",
        "It does not support key-value pairs",
        "Data is stored in plain text",
        "It is deprecated in recent Kubernetes versions",
        "It has size limitations"
      ],
      "correct_answers": [2],
      "explanation": "ConfigMaps are not designed to store sensitive data securely.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 51,
      "question": "Which of the following is a method to enable PSA in a Kubernetes cluster?",
      "options": [
        "Applying labels to pods directly",
        "Configuring the API server's admission controllers",
        "Setting environment variables on nodes",
        "Using a third-party admission webhook",
        "Updating kubelet configurations"
      ],
      "correct_answers": [1],
      "explanation": "Enabling PSA involves adding the 'PodSecurity' admission plugin to the API server's '--enable-admission-plugins' flag.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 52,
      "question": "In Kubernetes RBAC, what does a RoleBinding do?",
      "options": [
        "Defines permissions within a namespace",
        "Binds roles to users or groups within a namespace",
        "Creates a new role with cluster-wide permissions",
        "Manages network policies for a namespace",
        "Sets resource quotas for a project"
      ],
      "correct_answers": [1],
      "explanation": "A RoleBinding ties a Role to subjects (users, groups, service accounts) within a namespace.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 60,
      "question": "What is the function of Resource Quotas in Kubernetes?",
      "options": [
        "Limit the number of namespaces",
        "Restrict access to the API server",
        "Control resource consumption per namespace",
        "Schedule pods to specific nodes",
        "Enforce network policies"
      ],
      "correct_answers": [2],
      "explanation": "Resource Quotas limit the amount of resources a namespace can consume.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 62,
      "question": "Which Kubernetes object should you use to store sensitive configuration data?",
      "options": [
        "ConfigMap",
        "Secret",
        "Volume",
        "Pod Annotation",
        "Deployment"
      ],
      "correct_answers": [1],
      "explanation": "Secrets are designed to store sensitive data like passwords, tokens, and keys.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 64,
      "question": "Which of the following are common CNI plugins that support Network Policies? (Select all that apply)",
      "options": [
        "Flannel",
        "Calico",
        "Weave Net",
        "AWS VPC CNI",
        "Cilium"
      ],
      "correct_answers": [1, 2, 4],
      "explanation": "Calico, Weave Net, and Cilium are CNI plugins that support Network Policies. Flannel does not support them by default.",
      "question_type": "multiple-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 67,
      "question": "Which Kubernetes feature allows for encryption of Secrets at rest?",
      "options": [
        "Enabling TLS on the API server",
        "Using etcd encryption provider",
        "Storing Secrets in ConfigMaps",
        "Encrypting data in the application layer",
        "Using third-party encryption tools"
      ],
      "correct_answers": [1],
      "explanation": "Enabling etcd encryption at rest encrypts Secrets stored in etcd.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 68,
      "question": "What is the default network policy behavior if no policies are applied?",
      "options": [
        "All ingress and egress traffic is denied",
        "All ingress traffic is denied; egress is allowed",
        "All ingress and egress traffic is allowed",
        "All egress traffic is denied; ingress is allowed",
        "Traffic is allowed only within the namespace"
      ],
      "correct_answers": [2],
      "explanation": "By default, Kubernetes allows all traffic if no Network Policies are applied.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 69,
      "question": "How does Kubernetes Secrets improve security over ConfigMaps?",
      "options": [
        "Secrets are encrypted by default",
        "Secrets are stored in a separate database",
        "Secrets are base64-encoded and can have additional encryption",
        "Secrets provide versioning",
        "Secrets can only be accessed by cluster admins"
      ],
      "correct_answers": [2],
      "explanation": "Secrets are base64-encoded and can be encrypted at rest, offering better security than ConfigMaps.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 70,
      "question": "Which component is responsible for enforcing Pod Security Standards?",
      "options": [
        "kube-scheduler",
        "kube-apiserver with PodSecurity admission plugin",
        "kube-controller-manager",
        "kubelet",
        "etcd"
      ],
      "correct_answers": [1],
      "explanation": "The PodSecurity admission plugin enforces Pod Security Standards.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 71,
      "question": "What is the purpose of the '--allow-privileged' flag in Kubernetes?",
      "options": [
        "Allows pods to use privileged containers",
        "Enables access to the API server without authentication",
        "Grants admin rights to all users",
        "Disables security contexts",
        "Controls access to network policies"
      ],
      "correct_answers": [0],
      "explanation": "The '--allow-privileged' flag enables or disables the creation of privileged containers.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 75,
      "question": "How can you verify that Pod Security Admission is enforcing policies in a namespace?",
      "options": [
        "Check the API server logs",
        "Attempt to create a pod that violates the policy",
        "Inspect the kubelet configuration",
        "Review the scheduler's event log",
        "Use 'kubectl get psa'"
      ],
      "correct_answers": [1],
      "explanation": "Testing enforcement by trying to create a non-compliant pod verifies PSA functionality.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 76,
      "question": "What is the effect of applying a NetworkPolicy that selects no pods?",
      "options": [
        "It has no effect on the cluster",
        "It denies all traffic to and from all pods",
        "It allows all traffic by default",
        "It causes an error in the network plugin",
        "It only affects newly created pods"
      ],
      "correct_answers": [0],
      "explanation": "A NetworkPolicy that selects no pods does nothing.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 83,
      "question": "How can you restrict a user to only create resources in a specific namespace?",
      "options": [
        "Assign the user to the cluster-admin role",
        "Use a Role and RoleBinding in that namespace",
        "Modify the kube-apiserver configuration",
        "Create a NetworkPolicy for the user",
        "Set a resource quota on the namespace"
      ],
      "correct_answers": [1],
      "explanation": "Assigning permissions via Role and RoleBinding restricts user actions to a namespace.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 87,
      "question": "How can you prevent a container from running as root?",
      "options": [
        "Set 'runAsUser: 0' in the security context",
        "Use a Pod Security Policy that requires non-root user",
        "It is not possible to prevent this",
        "Modify the container image to exclude root",
        "Set 'allowPrivilegeEscalation: true'"
      ],
      "correct_answers": [1],
      "explanation": "Enforcing policies to prevent running as root enhances security.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Pod Security Admissions"
    },
    {
      "id": 88,
      "question": "What is the main purpose of Role-Based Access Control (RBAC) in Kubernetes?",
      "options": [
        "To manage network policies",
        "To control user and process access to resources",
        "To schedule pods efficiently",
        "To monitor cluster performance",
        "To provide logging capabilities"
      ],
      "correct_answers": [1],
      "explanation": "RBAC manages permissions for users and applications.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 89,
      "question": "Which Kubernetes object is used to define a set of network access rules for pods?",
      "options": [
        "Service",
        "Deployment",
        "Ingress",
        "NetworkPolicy",
        "ConfigMap"
      ],
      "correct_answers": [3],
      "explanation": "NetworkPolicy defines networking rules for pods.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 101,
      "question": "What is the function of Kubernetes labels?",
      "options": [
        "To provide human-readable names for resources",
        "To organize and select groups of objects",
        "To store configuration data",
        "To set permissions on resources",
        "To define network policies"
      ],
      "correct_answers": [1],
      "explanation": "Labels are key/value pairs attached to objects for identification and selection.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
    {
      "id": 105,
      "question": "How can you create a ConfigMap from a file?",
      "options": [
        "kubectl create configmap my-config --file=config.yaml",
        "kubectl apply configmap my-config --from-file=config.yaml",
        "kubectl create configmap my-config --from-file=config.yaml",
        "kubectl generate configmap my-config config.yaml",
        "kubectl configmap my-config --import=config.yaml"
      ],
      "correct_answers": [2],
      "explanation": "This command creates a ConfigMap from the specified file.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 141,
      "question": "How do you create a secret from literal values?",
      "options": [
        "kubectl create secret generic my-secret --from-literal=key1=value1",
        "kubectl create secret generic my-secret key1=value1",
        "kubectl create secret my-secret --literal key1=value1",
        "kubectl create secret tls my-secret --key1 value1",
        "kubectl secret create my-secret key1=value1"
      ],
      "correct_answers": [0],
      "explanation": "This command creates a Secret with key-value pairs from literals.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Secrets"
    },
    {
      "id": 142,
      "question": "What is the role of the 'cluster-admin' ClusterRole?",
      "options": [
        "Read-only access to cluster resources",
        "Admin access limited to one namespace",
        "Full control over all resources in the cluster",
        "Access to manage nodes but not pods",
        "Limited to managing storage resources"
      ],
      "correct_answers": [2],
      "explanation": "The 'cluster-admin' role grants full cluster-wide administrative permissions.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Authorization"
    },
    {
      "id": 143,
      "question": "Which command can you use to apply a label to a pod?",
      "options": [
        "kubectl label pods <pod-name> key=value",
        "kubectl annotate pods <pod-name> key=value",
        "kubectl tag pods <pod-name> key=value",
        "kubectl set label pods <pod-name> key=value",
        "kubectl edit pods <pod-name> --label key=value"
      ],
      "correct_answers": [0],
      "explanation": "This command applies a label to a pod.",
      "question_type": "single-choice",
      "domain": "Kubernetes Security Fundamentals",
      "subdomain": "Network Policy"
    },
        {
          "id": 154,
          "question": "What is the purpose of the 'allowPrivilegeEscalation' securityContext field?",
          "options": [
            "Allows the container to run as root",
            "Controls whether a process can gain more privileges than its parent process",
            "Enables privileged mode for the container",
            "Allows mounting of host directories",
            "Disables all capabilities for the container"
          ],
          "correct_answers": [1],
          "explanation": "Setting 'allowPrivilegeEscalation' to false prevents processes from gaining more privileges than the parent.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 155,
          "question": "Which Kubernetes object is used to define network traffic rules for Pods?",
          "options": [
            "NetworkPolicy",
            "Ingress",
            "Service",
            "Endpoint",
            "FirewallRule"
          ],
          "correct_answers": [0],
          "explanation": "A 'NetworkPolicy' defines how Pods are allowed to communicate with each other and other network endpoints.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 157,
          "question": "Which command can be used to create a new Role in Kubernetes?",
          "options": [
            "kubectl apply role",
            "kubectl create role",
            "kubectl generate role",
            "kubectl new role",
            "kubectl init role"
          ],
          "correct_answers": [1],
          "explanation": "The 'kubectl create role' command is used to create a new Role.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 158,
          "question": "In Kubernetes RBAC, which object binds a ClusterRole to all authenticated users?",
          "options": [
            "ClusterRoleBinding",
            "RoleBinding",
            "ClusterRole",
            "ServiceAccount",
            "GroupBinding"
          ],
          "correct_answers": [0],
          "explanation": "A 'ClusterRoleBinding' can bind a ClusterRole to all authenticated users or groups.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 160,
          "question": "Which command would you use to encode the string 'admin' to base64?",
          "options": [
            "echo 'admin' | base64",
            "echo 'admin' | encode base64",
            "echo 'admin' | base64encode",
            "base64 'admin'",
            "encode --base64 'admin'"
          ],
          "correct_answers": [0],
          "explanation": "The command 'echo 'admin' | base64' encodes the string to base64.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 162,
          "question": "To secure an Ingress with TLS, which type of Kubernetes secret is required?",
          "options": [
            "Opaque",
            "TLS",
            "Docker Registry",
            "Basic Auth",
            "SSH Key"
          ],
          "correct_answers": [1],
          "explanation": "A 'TLS' type secret contains a certificate and key for TLS encryption.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 163,
          "question": "Which command can be used to create a TLS secret named 'tls-secret' using files 'tls.crt' and 'tls.key'?",
          "options": [
            "kubectl create secret generic tls-secret --from-file=tls.crt --from-file=tls.key",
            "kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key",
            "kubectl create secret docker-registry tls-secret --docker-server=tls.crt --docker-username=tls.key",
            "kubectl create tls-secret tls-secret --cert=tls.crt --key=tls.key",
            "kubectl create secret tls-secret --type=tls --cert=tls.crt --key=tls.key"
          ],
          "correct_answers": [1],
          "explanation": "The 'kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key' command creates a TLS secret.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 165,
          "question": "Which field in the Pod spec allows you to specify Linux capabilities for a container?",
          "options": [
            "securityContext.capabilities",
            "spec.capabilities",
            "container.securityContext.capabilities",
            "podSecurityContext.capabilities",
            "linuxOptions.capabilities"
          ],
          "correct_answers": [2],
          "explanation": "The 'securityContext.capabilities' field under the container spec allows you to add or drop capabilities.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 166,
          "question": "To drop all Linux capabilities in a container, which configuration should be used?",
          "options": [
            "capabilities: {drop: ['ALL']}",
            "capabilities: {add: ['NONE']}",
            "privileged: false",
            "allowPrivilegeEscalation: false",
            "runAsNonRoot: true"
          ],
          "correct_answers": [0],
          "explanation": "Setting 'capabilities: {drop: ['ALL']}' removes all capabilities from the container.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 168,
          "question": "What is the purpose of the 'namespaceSelector' in a NetworkPolicy?",
          "options": [
            "To select namespaces where the policy is applied",
            "To select Pods in specific namespaces for ingress or egress rules",
            "To label namespaces",
            "To deny traffic to certain namespaces",
            "To enforce policies across all namespaces"
          ],
          "correct_answers": [0],
          "explanation": "The 'namespaceSelector' selects entire namespaces based on labels where the policy will be applied.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 171,
          "question": "Which command can be used to view the audit logs if they are written to '/var/log/kubernetes/audit.log'?",
          "options": [
            "kubectl logs audit",
            "sudo tail -f /var/log/kubernetes/audit.log",
            "kubectl get events --audit",
            "journalctl -u kube-apiserver",
            "kubectl describe audit-logs"
          ],
          "correct_answers": [1],
          "explanation": "Using 'sudo tail -f /var/log/kubernetes/audit.log' allows you to view the audit logs in real-time.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 175,
          "question": "Which field in a container's securityContext prevents processes from gaining elevated privileges?",
          "options": [
            "runAsUser: 0",
            "privileged: false",
            "allowPrivilegeEscalation: false",
            "runAsNonRoot: false",
            "readOnlyRootFilesystem: true"
          ],
          "correct_answers": [2],
          "explanation": "Setting 'allowPrivilegeEscalation: false' prevents processes from gaining more privileges than allowed.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 176,
          "question": "Which of the following are considered sensitive Kubernetes resources that should be audited carefully? (Select all that apply)",
          "options": [
            "Secrets",
            "ConfigMaps",
            "Pods",
            "ServiceAccounts",
            "PersistentVolumes"
          ],
          "correct_answers": [0, 1, 3],
          "explanation": "Secrets, ConfigMaps, and ServiceAccounts can contain sensitive data and should be audited.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 177,
          "question": "Which admission controller is deprecated and replaced by Pod Security Admission in Kubernetes 1.25?",
          "options": [
            "PodSecurityPolicy",
            "NodeRestriction",
            "AlwaysPullImages",
            "NamespaceLifecycle",
            "LimitRanger"
          ],
          "correct_answers": [0],
          "explanation": "PodSecurityPolicy is deprecated and replaced by Pod Security Admission.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Standards"
        },
        {
          "id": 178,
          "question": "Which Kubernetes object allows you to define a set of rules for validating or mutating admission requests?",
          "options": [
            "ValidatingWebhookConfiguration",
            "MutatingWebhookConfiguration",
            "AdmissionController",
            "CustomResourceDefinition",
            "WebhookPolicy"
          ],
          "correct_answers": [0, 1],
          "explanation": "ValidatingWebhookConfiguration and MutatingWebhookConfiguration are used for admission webhooks.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 179,
          "question": "Which field in the Pod spec can you use to disable privilege escalation for all containers in the Pod?",
          "options": [
            "securityContext.allowPrivilegeEscalation: false",
            "spec.containers.securityContext.allowPrivilegeEscalation: false",
            "podSecurityContext.allowPrivilegeEscalation: false",
            "spec.securityContext.allowPrivilegeEscalation: false",
            "metadata.securityContext.allowPrivilegeEscalation: false"
          ],
          "correct_answers": [3],
          "explanation": "Setting 'spec.securityContext.allowPrivilegeEscalation: false' applies to all containers in the Pod.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 181,
          "question": "In a NetworkPolicy, which selector is used to apply the policy to specific Pods?",
          "options": [
            "podSelector",
            "namespaceSelector",
            "policySelector",
            "matchLabels",
            "appSelector"
          ],
          "correct_answers": [0],
          "explanation": "The 'podSelector' field selects the Pods to which the policy applies.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 182,
          "question": "Which field in the NetworkPolicy spec defines allowed egress destinations?",
          "options": [
            "ingress",
            "egress",
            "to",
            "from",
            "destinations"
          ],
          "correct_answers": [1],
          "explanation": "The 'egress' field defines the egress rules in a NetworkPolicy.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Network Policy"
        },
        {
          "id": 183,
          "question": "Which of the following are valid components of a Kubernetes auditing policy? (Select all that apply)",
          "options": [
            "Rules",
            "Levels",
            "Stages",
            "Users",
            "Verbs"
          ],
          "correct_answers": [0, 2, 3, 4],
          "explanation": "An audit policy can specify 'rules' that include 'stages', 'users', and 'verbs'. 'Levels' are specified per rule.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 184,
          "question": "Which 'level' in an audit policy would log metadata but not request bodies?",
          "options": [
            "None",
            "Metadata",
            "Request",
            "RequestResponse",
            "Minimal"
          ],
          "correct_answers": [1],
          "explanation": "'Metadata' level logs metadata about the request but not the request body.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 188,
          "question": "Which securityContext setting ensures that a container runs with a non-root user?",
          "options": [
            "runAsUser: 0",
            "runAsNonRoot: true",
            "runAsGroup: 0",
            "allowPrivilegeEscalation: false",
            "privileged: false"
          ],
          "correct_answers": [1],
          "explanation": "Setting 'runAsNonRoot: true' ensures the container does not run as UID 0.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 189,
          "question": "Which command can be used to list all ServiceAccounts in the 'dev' namespace?",
          "options": [
            "kubectl get sa -n dev",
            "kubectl get serviceaccount -A",
            "kubectl get serviceaccounts --namespace=dev",
            "kubectl describe serviceaccounts -n dev",
            "kubectl list sa dev"
          ],
          "correct_answers": [0, 2],
          "explanation": "Both 'kubectl get sa -n dev' and 'kubectl get serviceaccounts --namespace=dev' list ServiceAccounts in the 'dev' namespace.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 190,
          "question": "Which field in the Pod spec allows you to specify a ServiceAccount to use?",
          "options": [
            "serviceAccount",
            "serviceAccountName",
            "accountName",
            "saName",
            "serviceAccountSpec"
          ],
          "correct_answers": [1],
          "explanation": "The 'serviceAccountName' field specifies the ServiceAccount for the Pod.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authentication"
        },
        {
          "id": 192,
          "question": "Which Kubernetes object defines cluster-wide roles?",
          "options": [
            "Role",
            "ClusterRole",
            "RoleBinding",
            "ClusterRoleBinding",
            "ServiceAccount"
          ],
          "correct_answers": [1],
          "explanation": "'ClusterRole' defines cluster-wide permissions.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 195,
          "question": "Which of the following are common security contexts applied at the Pod level? (Select all that apply)",
          "options": [
            "runAsUser",
            "fsGroup",
            "privileged",
            "capabilities",
            "seLinuxOptions"
          ],
          "correct_answers": [0, 1, 4],
          "explanation": "'runAsUser', 'fsGroup', and 'seLinuxOptions' are commonly applied at the Pod level.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 200,
          "question": "Which field in a container's securityContext allows you to add specific Linux capabilities?",
          "options": [
            "addCapabilities",
            "linuxCapabilities",
            "capabilities.add",
            "securityOptions",
            "privilegedCaps"
          ],
          "correct_answers": [2],
          "explanation": "The 'capabilities' field under 'securityContext' has 'add' and 'drop' lists for capabilities.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 204,
          "question": "To enable audit logging in Kubernetes, which flag must be added to the API server configuration?",
          "options": [
            "--audit-log-path",
            "--audit-policy-file",
            "--enable-audit",
            "--audit-log-maxage",
            "--audit-log-format"
          ],
          "correct_answers": [0],
          "explanation": "The '--audit-log-path' flag specifies the path where audit logs are written, enabling audit logging.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 205,
          "question": "Which of the following are steps to enable audit logging in Kubernetes? (Select all that apply)",
          "options": [
            "Create an audit policy file",
            "Configure the kubelet with audit flags",
            "Add '--audit-policy-file' flag to API server",
            "Restart the kube-controller-manager",
            "Specify '--audit-log-path' in the API server configuration"
          ],
          "correct_answers": [0, 2, 4],
          "explanation": "To enable audit logging, you need to create an audit policy file and configure the API server with '--audit-policy-file' and '--audit-log-path' flags.",
          "question_type": "multiple-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 214,
          "question": "Which Kubernetes resource is used to assign permissions within a namespace to a user or group?",
          "options": [
            "ClusterRole",
            "Role",
            "ClusterRoleBinding",
            "RoleBinding",
            "ServiceAccount"
          ],
          "correct_answers": [3],
          "explanation": "A 'RoleBinding' is used to grant the permissions defined in a 'Role' to a user, group, or service account within a specific namespace.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 215,
          "question": "What is the correct 'kind' value for an object that associates a Role with a user?",
          "options": [
            "RoleBinding",
            "ClusterRole",
            "User",
            "Group",
            "RoleAssignment"
          ],
          "correct_answers": [0],
          "explanation": "A 'RoleBinding' binds a Role to a user or group within a namespace.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Authorization"
        },
        {
          "id": 220,
          "question": "Which securityContext field makes a container's root filesystem read-only?",
          "options": [
            "readOnlyFileSystem",
            "readOnlyRootFilesystem",
            "immutableRoot",
            "filesystemReadonly",
            "noWriteFilesystem"
          ],
          "correct_answers": [1],
          "explanation": "The 'readOnlyRootFilesystem' field in the container's securityContext makes the root filesystem read-only.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 221,
          "question": "What is the primary benefit of making a container's root filesystem read-only?",
          "options": [
            "Improved performance",
            "Reduced image size",
            "Enhanced security by preventing writes to the filesystem",
            "Allows containers to share files",
            "Simplifies application deployment"
          ],
          "correct_answers": [2],
          "explanation": "Making the root filesystem read-only prevents unauthorized writes, enhancing security.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 228,
          "question": "How do you prevent a Pod from automatically mounting a ServiceAccount token?",
          "options": [
            "Set 'mountServiceAccountToken: false' in the Pod spec",
            "Set 'automountServiceAccountToken: false' in the Pod spec",
            "Remove the ServiceAccount from the Pod spec",
            "Set 'serviceAccountName: null' in the Pod spec",
            "Set 'tokenMount: false' in the ServiceAccount"
          ],
          "correct_answers": [1],
          "explanation": "Setting 'automountServiceAccountToken: false' in the Pod spec prevents the token from being mounted.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 229,
          "question": "Why might you disable automounting of ServiceAccount tokens in a Pod?",
          "options": [
            "To reduce memory usage",
            "To prevent unauthorized API access from the Pod",
            "To improve application performance",
            "To enable network policies",
            "To allow multiple ServiceAccounts"
          ],
          "correct_answers": [1],
          "explanation": "Disabling the automounting of ServiceAccount tokens prevents potential unauthorized access to the Kubernetes API from the Pod.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 231,
          "question": "What is the purpose of the ImagePolicyWebhook admission controller?",
          "options": [
            "To scan images for vulnerabilities at runtime",
            "To enforce policies on container images during admission",
            "To provide caching for container images",
            "To update images automatically",
            "To log image pull requests"
          ],
          "correct_answers": [1],
          "explanation": "The ImagePolicyWebhook admission controller enforces policies on container images before they are admitted to the cluster.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        },
        {
          "id": 232,
          "question": "In an audit policy, which level should be set to log the content of requests and responses?",
          "options": [
            "None",
            "Metadata",
            "Request",
            "RequestResponse",
            "Content"
          ],
          "correct_answers": [3],
          "explanation": "The 'RequestResponse' level logs the metadata and the content of requests and responses.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 233,
          "question": "How do you specify in an audit policy to log events for all resources in a specific namespace?",
          "options": [
            "Set 'namespace: <namespace>' in the policy rule",
            "Use 'namespaces: [\"<namespace>\"]' under the rule's 'namespaces' field",
            "Add 'resourceNames: [\"<namespace>\"]' to the rule",
            "Set 'level: Namespace' in the policy",
            "Specify 'namespaceSelector: {matchNames: [\"<namespace>\"]}'"
          ],
          "correct_answers": [1],
          "explanation": "In the audit policy, the 'namespaces' field is an array specifying which namespaces the rule applies to.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Audit Logging"
        },
        {
          "id": 234,
          "question": "Which command creates a generic secret named 'db-secret' with the key 'password' and value 'S3cr3t!'?",
          "options": [
            "kubectl create secret generic db-secret --password='S3cr3t!'",
            "kubectl create secret db-secret --from-literal='password=S3cr3t!'",
            "kubectl create secret generic db-secret --from-literal=password=S3cr3t!",
            "kubectl create secret tls db-secret --key='S3cr3t!'",
            "kubectl create secret docker-registry db-secret --password='S3cr3t!'"
          ],
          "correct_answers": [2],
          "explanation": "The correct command is 'kubectl create secret generic db-secret --from-literal=password=S3cr3t!'.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 235,
          "question": "To read the value of a secret key 'username' from secret 'db-secret' in namespace 'prod', which command can you use?",
          "options": [
            "kubectl get secret db-secret -n prod -o jsonpath='{.data.username}' | base64 --decode",
            "kubectl describe secret db-secret -n prod",
            "kubectl get secret db-secret -n prod -o yaml",
            "kubectl read secret db-secret -n prod --key=username",
            "kubectl decode secret db-secret -n prod --field=username"
          ],
          "correct_answers": [0],
          "explanation": "The command uses 'jsonpath' to extract the base64-encoded value and decodes it.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Secrets"
        },
        {
          "id": 250,
          "question": "Which Kubernetes resource can enforce Pod Security Standards in a namespace?",
          "options": [
            "PodSecurityPolicy",
            "NetworkPolicy",
            "LimitRange",
            "ResourceQuota",
            "Pod Security Admission Controller"
          ],
          "correct_answers": [4],
          "explanation": "The Pod Security Admission Controller enforces Pod Security Standards in Kubernetes.",
          "question_type": "single-choice",
          "domain": "Kubernetes Security Fundamentals",
          "subdomain": "Pod Security Admissions"
        }
       
  ]
  ;
