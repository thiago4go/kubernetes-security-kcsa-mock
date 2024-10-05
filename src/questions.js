export const questions = [
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
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 3,
      "question": "Can multiple Pod Security Admission (PSA) policies be applied to a single namespace?",
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
      "id": 6,
      "question": "Which admission controller runs first in Kubernetes?",
      "options": [
        "ValidatingAdmissionWebhook",
        "MutatingAdmissionWebhook",
        "ResourceQuota",
        "NamespaceLifecycle",
        "AlwaysPullImages"
      ],
      "correct_answers": [1],
      "explanation": "Mutating admission controllers run before validating ones to modify the request before validation.",
      "question_type": "single-choice"
    },
    {
      "id": 7,
      "question": "What is the primary purpose of a Cloud Workload Protection Platform (CWPP)?",
      "options": [
        "Monitor network traffic",
        "Secure workloads across various environments",
        "Manage cloud costs",
        "Provide identity and access management",
        "Automate infrastructure provisioning"
      ],
      "correct_answers": [1],
      "explanation": "CWPPs are designed to protect workloads in any environment.",
      "question_type": "single-choice"
    },
    {
      "id": 8,
      "question": "Which NIST Special Publication provides guidelines on security and privacy controls for federal information systems?",
      "options": [
        "NIST SP 800-53 Rev. 5",
        "NIST SP 800-190",
        "NIST SP 800-63",
        "NIST SP 800-171",
        "NIST SP 800-30"
      ],
      "correct_answers": [0],
      "explanation": "This publication provides guidelines on security and privacy controls.",
      "question_type": "single-choice"
    },
    {
      "id": 9,
      "question": "How can you restrict access to the kubelet API?",
      "options": [
        "Disable the kubelet",
        "Use '--authorization-mode=Webhook' and '--authentication-token-webhook=true'",
        "Remove kubelet from the nodes",
        "Only use SSH to access kubelet",
        "Set '--allow-privileged=false'"
      ],
      "correct_answers": [1],
      "explanation": "These flags configure the kubelet to use API server authentication and authorization.",
      "question_type": "single-choice"
    },
    {
      "id": 10,
      "question": "What is the purpose of image signing in container environments?",
      "options": [
        "To compress the image size",
        "To verify the image's integrity and authenticity",
        "To add metadata for deployment",
        "To enforce runtime policies",
        "To enable faster image pulls"
      ],
      "correct_answers": [1],
      "explanation": "Image signing ensures images are from trusted sources and have not been tampered with.",
      "question_type": "single-choice"
    },
    {
      "id": 11,
      "question": "What does Public Key Infrastructure (PKI) manage?",
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
      "options": [
        "Code version control",
        "Continuous integration",
        "Monitoring and visualization",
        "Network security",
        "Identity management"
      ],
      "correct_answers": [2],
      "explanation": "Grafana is used to create dashboards for visualizing metrics.",
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 14,
      "question": "What is the purpose of a multistage build in Docker?",
      "options": [
        "To run multiple containers in one image",
        "To build images compatible with multiple architectures",
        "To reduce image size by separating build and runtime stages",
        "To enable parallel builds",
        "To deploy to multiple environments simultaneously"
      ],
      "correct_answers": [2],
      "explanation": "Multistage builds allow copying only necessary artifacts to the final image.",
      "question_type": "single-choice"
    },
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
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 17,
      "question": "How can you update the image of a deployment without altering other configurations?",
      "options": [
        "Edit the deployment YAML file manually",
        "Delete and recreate the deployment",
        "Use 'kubectl set image' command",
        "Scale down the deployment to zero and update",
        "Update the image in the container registry"
      ],
      "correct_answers": [2],
      "explanation": "This command updates the image without altering other configurations.",
      "question_type": "single-choice"
    },
    {
      "id": 18,
      "question": "Which of the following statements are true about gVisor and Firecracker? (Select all that apply)",
      "options": [
        "gVisor is a user-space kernel providing sandboxing",
        "Firecracker uses lightweight microVMs with KVM",
        "Both provide full hardware virtualization",
        "Firecracker is a container runtime interface",
        "gVisor offers better performance than traditional VMs"
      ],
      "correct_answers": [0, 1, 4],
      "explanation": "gVisor provides sandboxing; Firecracker uses microVMs; gVisor offers better performance than traditional VMs.",
      "question_type": "multiple-choice"
    },
    {
      "id": 19,
      "question": "What is the primary difference between MicroVM and User-Space Kernel approaches?",
      "options": [
        "MicroVMs are larger in size",
        "User-space kernels provide hardware virtualization",
        "MicroVMs run directly on hardware without a host OS",
        "User-space kernels intercept system calls in user space",
        "There is no difference; they are the same"
      ],
      "correct_answers": [3],
      "explanation": "User-space kernels like gVisor run in user space and intercept system calls.",
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 21,
      "question": "How do you configure Kubernetes to use a specific container runtime like containerd?",
      "options": [
        "Set the runtime in the pod spec",
        "Use '--container-runtime' flag in kubelet",
        "Configure it in the kube-proxy",
        "It's automatically detected; no action needed",
        "Set an environment variable on the master node"
      ],
      "correct_answers": [1],
      "explanation": "Configuring kubelet with the specific runtime endpoint sets the container runtime.",
      "question_type": "single-choice"
    },
    {
      "id": 22,
      "question": "What components are needed to verify the integrity of a container image?",
      "options": [
        "A checksum and the image manifest",
        "A digital signature, public key, and verification tool",
        "The Dockerfile used to build the image",
        "Access to the container registry logs",
        "The image's pull secret"
      ],
      "correct_answers": [1],
      "explanation": "These components verify image integrity and authenticity.",
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 24,
      "question": "What is the MITRE ATT&CK framework?",
      "options": [
        "A set of compliance requirements for cloud providers",
        "A vulnerability scanning tool",
        "A knowledge base of adversary tactics and techniques",
        "An incident response guide",
        "A network security protocol"
      ],
      "correct_answers": [2],
      "explanation": "MITRE ATT&CK catalogs cyber adversary behaviors.",
      "question_type": "single-choice"
    },
    {
      "id": 25,
      "question": "Which flags should be set to 'false' to minimize the attack surface on the Kubernetes scheduler?",
      "options": [
        "--profiling and --enable-scheduler-policy",
        "--leader-elect and --kubeconfig",
        "--bind-address and --secure-port",
        "--port and --address",
        "--use-legacy-policy and --enable-profiling"
      ],
      "correct_answers": [3],
      "explanation": "Setting these to disable the insecure port and restrict access minimizes the attack surface.",
      "question_type": "single-choice"
    },
    {
      "id": 26,
      "question": "Which controllers are part of the kube-controller-manager? (Select all that apply)",
      "options": [
        "Node Controller",
        "ReplicaSet Controller",
        "Ingress Controller",
        "Cloud Controller",
        "Service Account Controller"
      ],
      "correct_answers": [0, 1, 4],
      "explanation": "Node Controller, ReplicaSet Controller, and Service Account Controller are part of kube-controller-manager.",
      "question_type": "multiple-choice"
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
      "question_type": "multiple-choice"
    },
    {
      "id": 28,
      "question": "What are the 4 Cs of cloud-native security?",
      "options": [
        "Code, Container, Cluster, Cloud",
        "Compute, Connectivity, Compliance, Cost",
        "Cloud, Core, Control, Compliance",
        "Code, Continuous Integration, Cloud, Compliance",
        "Containerization, Coordination, Configuration, Control"
      ],
      "correct_answers": [0],
      "explanation": "The 4 Cs represent layers where security should be applied.",
      "question_type": "single-choice"
    },
    {
      "id": 29,
      "question": "How can you improve kubelet security? (Select all that apply)",
      "options": [
        "Enable authentication and authorization",
        "Disable anonymous access",
        "Expose the kubelet read-only port",
        "Use TLS certificates",
        "Run kubelet in privileged mode"
      ],
      "correct_answers": [0, 1, 3],
      "explanation": "These actions enhance kubelet security by enforcing authentication and encryption.",
      "question_type": "multiple-choice"
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
      "question_type": "single-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 32,
      "question": "Does the underlying cloud infrastructure affect Kubernetes cluster security?",
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
      "question_type": "multiple-choice"
    },
    {
      "id": 34,
      "question": "Which folders on a client machine are sensitive when accessing Kubernetes clusters? (Select all that apply)",
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
      "question_type": "single-choice"
    },
    {
      "id": 36,
      "question": "In managed Kubernetes services, who manages the etcd cluster?",
      "options": [
        "The user manages etcd directly",
        "The cloud provider manages etcd",
        "etcd is not used in managed services",
        "A third-party vendor manages etcd",
        "The Kubernetes community manages etcd"
      ],
      "correct_answers": [1],
      "explanation": "In managed services, etcd is managed by the provider.",
      "question_type": "single-choice"
    },
    {
      "id": 37,
      "question": "What types of data are stored inside etcd? (Select all that apply)",
      "options": [
        "Kubernetes cluster state",
        "Persistent application data",
        "Pod logs",
        "Secrets and ConfigMaps",
        "Container images"
      ],
      "correct_answers": [0, 3],
      "explanation": "etcd stores cluster state, including Secrets and ConfigMaps.",
      "question_type": "multiple-choice"
    },
    {
      "id": 38,
      "question": "When is soft multi-tenancy preferred over hard multi-tenancy?",
      "options": [
        "When strict isolation is required",
        "For untrusted tenant workloads",
        "To maximize resource efficiency in trusted environments",
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
    },
    {
      "id": 40,
      "question": "What is a consistent way of enforcing policies across Kubernetes clusters?",
      "options": [
        "Manually applying policies on each cluster",
        "Using policy as code tools like OPA or Kyverno",
        "Relying on default Kubernetes settings",
        "Using different policies for each environment",
        "Enforcing policies at the application level"
      ],
      "correct_answers": [1],
      "explanation": "Policy as code ensures consistent enforcement across clusters.",
      "question_type": "single-choice"
    },
    {
      "id": 41,
      "question": "Which of the following statements are true about static pods? (Select all that apply)",
      "options": [
        "They are managed by the kubelet",
        "Defined in the API server and stored in etcd",
        "Useful for running critical system components",
        "Automatically rescheduled if the node fails",
        "Can be updated via kubectl commands"
      ],
      "correct_answers": [0, 2],
      "explanation": "Static pods are managed by the kubelet and are useful for critical components.",
      "question_type": "multiple-choice"
    },
    {
      "id": 42,
      "question": "When you run 'kubectl apply', which Kubernetes component processes the request first?",
      "options": [
        "etcd",
        "kube-scheduler",
        "kube-controller-manager",
        "kube-apiserver",
        "kubelet"
      ],
      "correct_answers": [3],
      "explanation": "All kubectl commands interact with the API server first.",
      "question_type": "single-choice"
    },
    {
      "id": 43,
      "question": "What is the primary purpose of the Kubernetes scheduler?",
      "options": [
        "To monitor cluster health",
        "To assign pods to nodes based on resource availability",
        "To manage service discovery",
        "To enforce network policies",
        "To control access to the API server"
      ],
      "correct_answers": [1],
      "explanation": "The scheduler determines the optimal node for a pod.",
      "question_type": "single-choice"
    },
    {
      "id": 44,
      "question": "What happens if kube-proxy is in a 'CrashLoopBackOff' state?",
      "options": [
        "Pods cannot be scheduled",
        "Network traffic between services may be disrupted",
        "The cluster shuts down",
        "kubelet stops working",
        "Secrets cannot be accessed"
      ],
      "correct_answers": [1],
      "explanation": "kube-proxy manages network rules; its failure affects networking.",
      "question_type": "single-choice"
    },
    {
      "id": 45,
      "question": "What could be a possible reason for failing to pull the latest version of an image from 'k8s.gcr.io'?",
      "options": [
        "The image registry is deprecated",
        "Incorrect image tag or name",
        "Network policies blocking egress traffic",
        "The node has insufficient resources",
        "kube-proxy is not running"
      ],
      "correct_answers": [1],
      "explanation": "A common reason is specifying an incorrect image name or tag.",
      "question_type": "single-choice"
    },
    {
      "id": 46,
      "question": "Why might a Network Policy not work as expected in a Kubernetes cluster?",
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
      "question_type": "multiple-choice"
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
      "question_type": "single-choice"
    },
    {
      "id": 50,
      "question": "What is the Payment Card Industry Data Security Standard (PCI DSS)?",
      "options": [
        "A protocol for secure credit card transactions",
        "A set of security standards for organizations handling cardholder data",
        "A government regulation for financial institutions",
        "An encryption algorithm used in banking",
        "A compliance framework for healthcare data"
      ],
      "correct_answers": [1],
      "explanation": "PCI DSS sets requirements for securing credit card information.",
      "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
        },
        {
          "id": 53,
          "question": "What is the order of execution for admission controllers in Kubernetes?",
          "options": [
            "Mutating, then Validating admission controllers",
            "Validating, then Mutating admission controllers",
            "Both run simultaneously",
            "The order is random",
            "Only one type runs depending on configuration"
          ],
          "correct_answers": [0],
          "explanation": "Kubernetes processes MutatingAdmissionWebhook controllers before ValidatingAdmissionWebhook controllers.",
          "question_type": "single-choice"
        },
        {
          "id": 54,
          "question": "Which of the following best describes the function of Open Policy Agent (OPA) in Kubernetes?",
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
          "id": 55,
          "question": "How does image signing enhance container security?",
          "options": [
            "By encrypting the image layers",
            "By verifying the image's source and integrity",
            "By compressing the image for faster deployment",
            "By scanning the image for vulnerabilities",
            "By optimizing runtime performance"
          ],
          "correct_answers": [1],
          "explanation": "Image signing helps ensure that images are from trusted sources and have not been altered.",
          "question_type": "single-choice"
        },
        {
          "id": 56,
          "question": "What is the role of the Service Account Controller in Kubernetes?",
          "options": [
            "Manages authentication tokens for service accounts",
            "Controls access to external services",
            "Assigns network policies to service accounts",
            "Manages the lifecycle of services",
            "Handles scaling of deployments"
          ],
          "correct_answers": [0],
          "explanation": "The Service Account Controller creates and manages service accounts and their tokens.",
          "question_type": "single-choice"
        },
        {
          "id": 57,
          "question": "Which of the following is NOT a controller managed by the kube-controller-manager?",
          "options": [
            "Node Controller",
            "Endpoint Controller",
            "Ingress Controller",
            "Deployment Controller",
            "Service Account Controller"
          ],
          "correct_answers": [2],
          "explanation": "The Ingress Controller is not part of the kube-controller-manager; it is deployed separately.",
          "question_type": "single-choice"
        },
        {
          "id": 58,
          "question": "What are some best practices for securing etcd? (Select all that apply)",
          "options": [
            "Enable TLS encryption for communication",
            "Limit access to trusted networks",
            "Use authentication and authorization",
            "Expose etcd endpoints publicly for monitoring",
            "Store backups in a secure location"
          ],
          "correct_answers": [0, 1, 2, 4],
          "explanation": "Best practices for securing etcd include enabling TLS, limiting network access, using authentication, and storing backups securely. Exposing etcd publicly is not recommended.",
          "question_type": "multiple-choice"
        },
        {
          "id": 59,
          "question": "Which Kubernetes component is responsible for persisting cluster state?",
          "options": [
            "kube-scheduler",
            "etcd",
            "kube-controller-manager",
            "kube-proxy",
            "kubelet"
          ],
          "correct_answers": [1],
          "explanation": "etcd is the key-value store that persists cluster state.",
          "question_type": "single-choice"
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
          "question_type": "single-choice"
        },
        {
          "id": 61,
          "question": "What could happen if you disable anonymous authentication on the kubelet?",
          "options": [
            "Increased security by requiring authentication",
            "Nodes cannot join the cluster",
            "Pods fail to start",
            "kube-proxy stops working",
            "No effect; kubelet does not support anonymous access"
          ],
          "correct_answers": [0],
          "explanation": "Disabling anonymous authentication ensures that only authenticated requests are accepted by the kubelet.",
          "question_type": "single-choice"
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
          "question_type": "single-choice"
        },
        {
          "id": 63,
          "question": "What is a potential risk of mounting the Docker socket ('/var/run/docker.sock') into a container?",
          "options": [
            "No risk; it's a common practice",
            "The container can control the Docker daemon and other containers",
            "It improves container performance",
            "It provides secure access to host resources",
            "It isolates the container from the host"
          ],
          "correct_answers": [1],
          "explanation": "Mounting the Docker socket can lead to full control over the host's Docker daemon.",
          "question_type": "single-choice"
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
          "question_type": "multiple-choice"
        },
        {
          "id": 65,
          "question": "What does the kube-apiserver's '--anonymous-auth=false' flag do?",
          "options": [
            "Disables anonymous requests to the API server",
            "Disables authentication entirely",
            "Allows all requests without authentication",
            "Enables anonymous authentication",
            "Forces all clients to use tokens"
          ],
          "correct_answers": [0],
          "explanation": "Setting '--anonymous-auth=false' ensures that all requests must be authenticated.",
          "question_type": "single-choice"
        },
        {
          "id": 66,
          "question": "How can you ensure that only signed images are run in your Kubernetes cluster?",
          "options": [
            "Use imagePullSecrets",
            "Configure admission controllers to verify image signatures",
            "Manually inspect images before deployment",
            "Disable image caching on nodes",
            "Use a private container registry"
          ],
          "correct_answers": [1],
          "explanation": "Admission controllers can enforce policies to allow only signed images.",
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "multiple-choice"
        },
        {
          "id": 73,
          "question": "What is a key benefit of using multistage Docker builds?",
          "options": [
            "Faster build times",
            "Smaller and more secure final images",
            "Compatibility with older Docker versions",
            "Simplified deployment scripts",
            "Enhanced network performance"
          ],
          "correct_answers": [1],
          "explanation": "Multistage builds produce lean images by excluding unnecessary build-time dependencies.",
          "question_type": "single-choice"
        },
        {
          "id": 74,
          "question": "Which of the following is a disadvantage of not restricting egress traffic in Kubernetes?",
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
          "id": 77,
          "question": "Which Kubernetes object can be used to limit the number of concurrent requests to the API server?",
          "options": [
            "ResourceQuota",
            "LimitRange",
            "PodDisruptionBudget",
            "PriorityClass",
            "There is no such object"
          ],
          "correct_answers": [4],
          "explanation": "Kubernetes does not have an object to limit API server requests; this is controlled via API server flags.",
          "question_type": "single-choice"
        },
        {
          "id": 78,
          "question": "How can you rotate TLS certificates in a Kubernetes cluster?",
          "options": [
            "Manually delete and recreate certificates",
            "Use the 'kubeadm certs renew' command",
            "Certificates cannot be rotated",
            "Restart the kubelet service",
            "Use a third-party certificate manager"
          ],
          "correct_answers": [1],
          "explanation": "'kubeadm' provides commands to renew cluster certificates.",
          "question_type": "single-choice"
        },
        {
          "id": 79,
          "question": "Which of the following is a characteristic of hard multi-tenancy in Kubernetes?",
          "options": [
            "Shared namespaces among tenants",
            "Logical separation using RBAC",
            "Physical isolation of cluster control planes",
            "Shared node resources",
            "Common service accounts for all tenants"
          ],
          "correct_answers": [2],
          "explanation": "Hard multi-tenancy involves strong isolation, often using separate clusters.",
          "question_type": "single-choice"
        },
        {
          "id": 80,
          "question": "What is the role of the kube-proxy component?",
          "options": [
            "Managing network policies",
            "Providing service discovery and routing",
            "Scheduling pods to nodes",
            "Storing cluster state",
            "Monitoring node health"
          ],
          "correct_answers": [1],
          "explanation": "kube-proxy maintains network rules for services on each node.",
          "question_type": "single-choice"
        },
        {
          "id": 81,
          "question": "Which command can you use to check the version of the kube-apiserver?",
          "options": [
            "'kubectl version'",
            "'kubectl get apiserver'",
            "'kube-apiserver --version'",
            "'kubectl cluster-info'",
            "'kubectl describe componentstatus'"
          ],
          "correct_answers": [0],
          "explanation": "This command displays client and server Kubernetes versions.",
          "question_type": "single-choice"
        },
        {
          "id": 82,
          "question": "What is the default service type in Kubernetes if not specified?",
          "options": [
            "ClusterIP",
            "NodePort",
            "LoadBalancer",
            "ExternalName",
            "Ingress"
          ],
          "correct_answers": [0],
          "explanation": "If not specified, the default Service type is ClusterIP.",
          "question_type": "single-choice"
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
          "question_type": "single-choice"
        },
        {
          "id": 84,
          "question": "What is the purpose of a PodDisruptionBudget?",
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
          "id": 85,
          "question": "Which tool can be used to visualize Kubernetes cluster metrics in Grafana?",
          "options": [
            "Prometheus",
            "Elasticsearch",
            "Kibana",
            "Fluentd",
            "Logstash"
          ],
          "correct_answers": [0],
          "explanation": "Prometheus collects metrics that can be visualized in Grafana dashboards.",
          "question_type": "single-choice"
        },
        {
          "id": 86,
          "question": "What is the function of the kubelet in Kubernetes?",
          "options": [
            "Managing pod networking",
            "Running containers on each node",
            "Storing cluster configuration",
            "Scheduling pods to nodes",
            "Managing the control plane"
          ],
          "correct_answers": [1],
          "explanation": "The kubelet starts and manages pods and their containers on nodes.",
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
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
          "question_type": "single-choice"
        },
        {
          "id": 90,
          "question": "What is the outcome of setting 'imagePullPolicy: Never' in a pod spec?",
          "options": [
            "The image will always be pulled from the registry",
            "The pod will fail to start if the image is not present locally",
            "The image will be pulled only if not present",
            "The pod will ignore image updates in the registry",
            "The kubelet will crash"
          ],
          "correct_answers": [1],
          "explanation": "Setting 'imagePullPolicy: Never' prevents pulling images; the image must exist locally.",
          "question_type": "single-choice"
        },
        {
          "id": 91,
          "question": "Which command would you use to view the logs of a pod named 'my-pod'?",
          "options": [
            "'kubectl get logs my-pod'",
            "'kubectl describe my-pod'",
            "'kubectl logs my-pod'",
            "'kubectl status my-pod'",
            "'kubectl inspect my-pod'"
          ],
          "correct_answers": [2],
          "explanation": "This command retrieves logs from the specified pod.",
          "question_type": "single-choice"
        },
        {
          "id": 92,
          "question": "How does Kubernetes ensure that a Deployment has the desired number of replicas?",
          "options": [
            "Through the kube-scheduler",
            "Using the ReplicaSet controller",
            "Via the kubelet on each node",
            "By the API server checking periodically",
            "It does not ensure this automatically"
          ],
          "correct_answers": [1],
          "explanation": "Deployments use ReplicaSets to ensure the desired number of pod replicas.",
          "question_type": "single-choice"
        },
        {
          "id": 93,
          "question": "Which of the following is NOT a valid Kubernetes Service type?",
          "options": [
            "ClusterIP",
            "NodePort",
            "LoadBalancer",
            "ExternalName",
            "InternalPort"
          ],
          "correct_answers": [4],
          "explanation": "InternalPort is not a valid Service type.",
          "question_type": "single-choice"
        },
        {
          "id": 94,
          "question": "What is the function of the '--service-account-key-file' flag in the kube-apiserver?",
          "options": [
            "To specify the key for signing service account tokens",
            "To define the service account used by the API server",
            "To store service account credentials",
            "To encrypt service account Secrets",
            "To disable service accounts"
          ],
          "correct_answers": [0],
          "explanation": "This flag points to the file used to sign service account tokens.",
          "question_type": "single-choice"
        },
        {
          "id": 95,
          "question": "Which of the following best describes the Kubernetes Ingress resource?",
          "options": [
            "It defines internal networking rules between pods",
            "It manages external access to services, typically HTTP",
            "It is used for storing configuration data",
            "It schedules pods to nodes",
            "It provides persistent storage to pods"
          ],
          "correct_answers": [1],
          "explanation": "Ingress resources define rules for routing external traffic to services.",
          "question_type": "single-choice"
        },
        {
          "id": 96,
          "question": "How can you force delete a pod that is stuck in terminating state?",
          "options": [
            "'kubectl delete pod <pod-name>'",
            "Restart the kubelet service",
            "'kubectl delete pod <pod-name> --force --grace-period=0'",
            "Delete the node where the pod is running",
            "Edit the pod's YAML and remove the finalizers"
          ],
          "correct_answers": [2],
          "explanation": "This command forcefully deletes a pod stuck in terminating state.",
          "question_type": "single-choice"
        },
        {
          "id": 97,
          "question": "What does the 'kubectl config use-context' command do?",
          "options": [
            "Switches the active namespace",
            "Changes the current kubeconfig file",
            "Modifies the cluster's context",
            "Sets the current context in kubeconfig",
            "Updates the API server endpoint"
          ],
          "correct_answers": [3],
          "explanation": "This command switches the active context in your kubeconfig.",
          "question_type": "single-choice"
        },
        {
          "id": 98,
          "question": "Which command lists all pods in all namespaces?",
          "options": [
            "'kubectl get pods'",
            "'kubectl get pods --all'",
            "'kubectl get pods -A'",
            "'kubectl get pods --namespaces'",
            "'kubectl get all-pods'"
          ],
          "correct_answers": [2],
          "explanation": "The '-A' flag lists resources in all namespaces.",
          "question_type": "single-choice"
        },
        {
          "id": 99,
          "question": "What is the role of a ReplicaSet in Kubernetes?",
          "options": [
            "To manage the desired state of pods",
            "To expose services to external traffic",
            "To store persistent data",
            "To define network policies",
            "To schedule pods to specific nodes"
          ],
          "correct_answers": [0],
          "explanation": "ReplicaSets ensure that a specified number of pod replicas are running.",
          "question_type": "single-choice"
        },
        {
          "id": 100,
          "question": "How can you view the resources consumed by a pod?",
          "options": [
            "'kubectl describe pod <pod-name>'",
            "'kubectl top pod <pod-name>'",
            "'kubectl get pod <pod-name> --resources'",
            "'kubectl logs <pod-name>'",
            "'kubectl inspect pod <pod-name>'"
          ],
          "correct_answers": [1],
          "explanation": "The 'kubectl top' command shows resource usage for pods or nodes.",
          "question_type": "single-choice"
        }

        ,            {
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
              "question_type": "single-choice"
            },
            {
              "id": 102,
              "question": "How can you scale a deployment named 'my-deployment' to 5 replicas?",
              "options": [
                "kubectl scale deployment my-deployment --replicas=5",
                "kubectl update deployment my-deployment --replicas=5",
                "kubectl set deployment my-deployment replicas=5",
                "kubectl resize deployment my-deployment 5",
                "kubectl deploy my-deployment --replicas=5"
              ],
              "correct_answers": [0],
              "explanation": "This command scales the deployment to the specified number of replicas.",
              "question_type": "single-choice"
            },
            {
              "id": 103,
              "question": "Which component is responsible for maintaining network rules on nodes?",
              "options": [
                "kubelet",
                "kube-proxy",
                "kube-scheduler",
                "kube-controller-manager",
                "etcd"
              ],
              "correct_answers": [1],
              "explanation": "kube-proxy maintains network rules on nodes for services.",
              "question_type": "single-choice"
            },
            {
              "id": 104,
              "question": "What does a DaemonSet ensure in Kubernetes?",
              "options": [
                "A pod runs on all nodes or a subset of nodes",
                "Only one pod runs in the cluster",
                "Pods are automatically scaled based on load",
                "Services are exposed externally",
                "ConfigMaps are synchronized across namespaces"
              ],
              "correct_answers": [0],
              "explanation": "DaemonSets ensure that a copy of a pod runs on selected nodes.",
              "question_type": "single-choice"
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
              "question_type": "single-choice"
            },
            {
              "id": 106,
              "question": "What is the default behavior when a container in a pod crashes?",
              "options": [
                "The pod is deleted",
                "Kubernetes does nothing",
                "The kubelet restarts the container",
                "An alert is sent to the administrator",
                "The node is drained"
              ],
              "correct_answers": [2],
              "explanation": "The kubelet will restart containers in a pod if they crash.",
              "question_type": "single-choice"
            },
            {
              "id": 107,
              "question": "Which of the following commands updates an image in a deployment?",
              "options": [
                "kubectl set image deployment/my-deployment my-container=my-image:tag",
                "kubectl update image deployment/my-deployment my-container=my-image:tag",
                "kubectl replace image deployment/my-deployment my-container=my-image:tag",
                "kubectl change image deployment/my-deployment my-container=my-image:tag",
                "kubectl edit deployment my-deployment"
              ],
              "correct_answers": [0],
              "explanation": "This command updates the image for the specified container in a deployment.",
              "question_type": "single-choice"
            },
            {
              "id": 108,
              "question": "How can you taint a node to prevent pods from being scheduled on it?",
              "options": [
                "kubectl cordon <node-name>",
                "kubectl drain <node-name>",
                "kubectl taint nodes <node-name> key=value:NoSchedule",
                "kubectl label nodes <node-name> unschedulable=true",
                "kubectl delete node <node-name>"
              ],
              "correct_answers": [2],
              "explanation": "Tainting a node prevents pods without a matching toleration from being scheduled on it.",
              "question_type": "single-choice"
            },
            {
              "id": 109,
              "question": "What is the purpose of the 'kubeadm' tool?",
              "options": [
                "To manage container images",
                "To bootstrap Kubernetes clusters",
                "To monitor cluster health",
                "To deploy applications to the cluster",
                "To manage network policies"
              ],
              "correct_answers": [1],
              "explanation": "'kubeadm' simplifies the process of setting up a Kubernetes cluster.",
              "question_type": "single-choice"
            },
            {
              "id": 110,
              "question": "Which command do you use to get detailed information about a Kubernetes object?",
              "options": [
                "kubectl get <resource>",
                "kubectl describe <resource>",
                "kubectl inspect <resource>",
                "kubectl show <resource>",
                "kubectl info <resource>"
              ],
              "correct_answers": [1],
              "explanation": "The 'describe' command provides detailed information about a resource.",
              "question_type": "single-choice"
            },
            {
              "id": 111,
              "question": "How do you delete a namespace and all its resources?",
              "options": [
                "kubectl delete all --namespace=<namespace>",
                "kubectl delete namespace <namespace>",
                "kubectl remove namespace <namespace>",
                "kubectl clean namespace <namespace>",
                "kubectl purge namespace <namespace>"
              ],
              "correct_answers": [1],
              "explanation": "Deleting a namespace removes it and all resources within it.",
              "question_type": "single-choice"
            },
            {
              "id": 112,
              "question": "What does the 'kubectl exec' command do?",
              "options": [
                "Executes a command on the master node",
                "Runs a command in a container",
                "Starts a new pod",
                "Updates a deployment",
                "Deletes a resource"
              ],
              "correct_answers": [1],
              "explanation": "'kubectl exec' executes a command in a running container.",
              "question_type": "single-choice"
            },
            {
              "id": 113,
              "question": "How can you expose a deployment 'my-deployment' as a service?",
              "options": [
                "kubectl expose deployment my-deployment",
                "kubectl service deployment my-deployment",
                "kubectl create service my-deployment",
                "kubectl generate service my-deployment",
                "kubectl map service my-deployment"
              ],
              "correct_answers": [0],
              "explanation": "This command creates a Service exposing the deployment.",
              "question_type": "single-choice"
            },
            {
              "id": 114,
              "question": "What is the function of a Horizontal Pod Autoscaler (HPA)?",
              "options": [
                "Automatically scales nodes",
                "Scales pods based on CPU utilization",
                "Schedules pods to nodes",
                "Balances network traffic",
                "Manages storage volumes"
              ],
              "correct_answers": [1],
              "explanation": "HPA adjusts the number of pod replicas based on resource metrics.",
              "question_type": "single-choice"
            },
            {
              "id": 115,
              "question": "Which command applies changes defined in a YAML file to the cluster?",
              "options": [
                "kubectl create -f <file.yaml>",
                "kubectl apply -f <file.yaml>",
                "kubectl update -f <file.yaml>",
                "kubectl insert -f <file.yaml>",
                "kubectl deploy -f <file.yaml>"
              ],
              "correct_answers": [1],
              "explanation": "The 'apply' command applies the configuration in the YAML file to the cluster.",
              "question_type": "single-choice"
            },
            {
              "id": 116,
              "question": "What is the purpose of an Ingress Controller?",
              "options": [
                "To expose services outside the cluster using HTTP/HTTPS",
                "To manage internal pod communication",
                "To store and manage secrets",
                "To schedule pods to nodes",
                "To provide persistent storage"
              ],
              "correct_answers": [0],
              "explanation": "Ingress Controllers manage external access to services via HTTP/HTTPS.",
              "question_type": "single-choice"
            },
            {
              "id": 117,
              "question": "How do you label a node with key 'env' and value 'production'?",
              "options": [
                "kubectl label node <node-name> env:production",
                "kubectl label nodes <node-name> env=production",
                "kubectl annotate node <node-name> env=production",
                "kubectl set label node <node-name> env=production",
                "kubectl tag node <node-name> env=production"
              ],
              "correct_answers": [1],
              "explanation": "This command adds a label to the specified node.",
              "question_type": "single-choice"
            },
            {
              "id": 118,
              "question": "Which resource would you use to run a one-time task in Kubernetes?",
              "options": [
                "Deployment",
                "StatefulSet",
                "DaemonSet",
                "Job",
                "ReplicaSet"
              ],
              "correct_answers": [3],
              "explanation": "A Job creates one or more pods to perform a task and ensures they complete successfully.",
              "question_type": "single-choice"
            },
            {
              "id": 119,
              "question": "How can you get a list of all contexts in your kubeconfig?",
              "options": [
                "kubectl config get-contexts",
                "kubectl get contexts",
                "kubectl config view",
                "kubectl context list",
                "kubectl list contexts"
              ],
              "correct_answers": [0],
              "explanation": "This command lists all available contexts in your kubeconfig.",
              "question_type": "single-choice"
            },
            {
              "id": 120,
              "question": "What is the effect of setting 'terminationGracePeriodSeconds' to zero in a pod spec?",
              "options": [
                "The pod will terminate immediately without graceful shutdown",
                "The pod will never terminate",
                "The pod will have infinite time to terminate",
                "The setting is ignored by Kubernetes",
                "The pod will terminate after 30 seconds"
              ],
              "correct_answers": [0],
              "explanation": "Setting 'terminationGracePeriodSeconds' to zero forces immediate termination.",
              "question_type": "single-choice"
            },
            {
              "id": 121,
              "question": "Which Kubernetes object manages stateful applications?",
              "options": [
                "Deployment",
                "StatefulSet",
                "ReplicaSet",
                "DaemonSet",
                "Job"
              ],
              "correct_answers": [1],
              "explanation": "StatefulSets manage applications requiring stable storage and network identities.",
              "question_type": "single-choice"
            },
            {
              "id": 122,
              "question": "How can you create a namespace called 'dev'?",
              "options": [
                "kubectl create namespace dev",
                "kubectl apply namespace dev",
                "kubectl generate namespace dev",
                "kubectl make namespace dev",
                "kubectl new namespace dev"
              ],
              "correct_answers": [0],
              "explanation": "This command creates a new namespace named 'dev'.",
              "question_type": "single-choice"
            },
            {
              "id": 123,
              "question": "What command can you use to edit a resource directly in your editor?",
              "options": [
                "kubectl change <resource>",
                "kubectl update <resource>",
                "kubectl edit <resource>",
                "kubectl modify <resource>",
                "kubectl adjust <resource>"
              ],
              "correct_answers": [2],
              "explanation": "The 'edit' command opens the resource's configuration in your default editor.",
              "question_type": "single-choice"
            },
            {
              "id": 124,
              "question": "Which Kubernetes component watches for new pods with no assigned node and assigns them one?",
              "options": [
                "kube-apiserver",
                "kubelet",
                "kube-proxy",
                "kube-scheduler",
                "etcd"
              ],
              "correct_answers": [3],
              "explanation": "The scheduler assigns pods without a node to a suitable node.",
              "question_type": "single-choice"
            },
            {
              "id": 125,
              "question": "How can you port-forward a local port to a port on a pod?",
              "options": [
                "kubectl port-forward <pod-name> <local-port>:<pod-port>",
                "kubectl forward-port <pod-name> <local-port>:<pod-port>",
                "kubectl tunnel <pod-name> <local-port>:<pod-port>",
                "kubectl proxy <pod-name> --port=<local-port>",
                "kubectl connect <pod-name> --port=<local-port>"
              ],
              "correct_answers": [0],
              "explanation": "This command forwards a local port to a port on a pod.",
              "question_type": "single-choice"
            },
            {
              "id": 126,
              "question": "What is the purpose of a PersistentVolumeClaim?",
              "options": [
                "To request storage resources from the cluster",
                "To define storage classes",
                "To monitor disk usage",
                "To create a new volume",
                "To delete unused volumes"
              ],
              "correct_answers": [0],
              "explanation": "PersistentVolumeClaims request storage resources defined by PersistentVolumes.",
              "question_type": "single-choice"
            },
            {
              "id": 127,
              "question": "Which command allows you to view the cluster's component statuses?",
              "options": [
                "kubectl get components",
                "kubectl componentstatus",
                "kubectl get cs",
                "kubectl get componentstatuses",
                "kubectl describe components"
              ],
              "correct_answers": [3],
              "explanation": "This command displays the status of cluster components.",
              "question_type": "single-choice"
            },
            {
              "id": 128,
              "question": "How do you check the health of nodes in the cluster?",
              "options": [
                "kubectl get nodes",
                "kubectl describe nodes",
                "kubectl health nodes",
                "kubectl check nodes",
                "kubectl status nodes"
              ],
              "correct_answers": [0],
              "explanation": "This command lists nodes and shows their status.",
              "question_type": "single-choice"
            },
            {
              "id": 129,
              "question": "Which resource is used for long-running, persistent workloads with stable network identity and storage?",
              "options": [
                "Deployment",
                "Job",
                "StatefulSet",
                "DaemonSet",
                "ReplicaSet"
              ],
              "correct_answers": [2],
              "explanation": "StatefulSets manage applications requiring stable storage and network identities.",
              "question_type": "single-choice"
            },
            {
              "id": 130,
              "question": "What is the default behavior if a pod's container exceeds its memory limit?",
              "options": [
                "The container is throttled",
                "The container is terminated",
                "The pod is moved to another node",
                "Kubernetes does nothing",
                "Additional memory is allocated"
              ],
              "correct_answers": [1],
              "explanation": "If a container exceeds its memory limit, it may be killed by the kubelet (OOMKilled).",
              "question_type": "single-choice"
            },
            {
              "id": 131,
              "question": "How can you list all resources in a namespace?",
              "options": [
                "kubectl get all --namespace=<namespace>",
                "kubectl get resources --namespace=<namespace>",
                "kubectl describe namespace <namespace>",
                "kubectl list namespace <namespace>",
                "kubectl get all <namespace>"
              ],
              "correct_answers": [0],
              "explanation": "This command lists all resources in the specified namespace.",
              "question_type": "single-choice"
            },
            {
              "id": 132,
              "question": "What does the 'kubectl rollout undo' command do?",
              "options": [
                "Deletes the deployment",
                "Rolls back to the previous revision",
                "Pauses the deployment",
                "Scales down the deployment",
                "Updates the deployment to a new version"
              ],
              "correct_answers": [1],
              "explanation": "The 'rollout undo' command reverts a deployment to its previous state.",
              "question_type": "single-choice"
            },
            {
              "id": 133,
              "question": "Which object defines how to build and deploy an application from source code in Kubernetes?",
              "options": [
                "Deployment",
                "StatefulSet",
                "BuildConfig",
                "DaemonSet",
                "Job"
              ],
              "correct_answers": [2],
              "explanation": "While not a native Kubernetes object, BuildConfig is used in OpenShift for this purpose.",
              "question_type": "single-choice"
            },
            {
              "id": 134,
              "question": "What is a common use case for a Kubernetes CronJob?",
              "options": [
                "Running a database",
                "Serving web traffic",
                "Scheduling regular tasks",
                "Managing network policies",
                "Providing persistent storage"
              ],
              "correct_answers": [2],
              "explanation": "CronJobs schedule Jobs to run at specified times.",
              "question_type": "single-choice"
            },
            {
              "id": 135,
              "question": "How do you display a pod's YAML definition?",
              "options": [
                "kubectl show pod <pod-name>",
                "kubectl get pod <pod-name> -o yaml",
                "kubectl describe pod <pod-name>",
                "kubectl view pod <pod-name>",
                "kubectl yaml pod <pod-name>"
              ],
              "correct_answers": [1],
              "explanation": "This command outputs the pod's YAML definition.",
              "question_type": "single-choice"
            },
            {
              "id": 136,
              "question": "Which command would you use to delete a deployment called 'my-app'?",
              "options": [
                "kubectl remove deployment my-app",
                "kubectl delete deployment my-app",
                "kubectl destroy deployment my-app",
                "kubectl erase deployment my-app",
                "kubectl terminate deployment my-app"
              ],
              "correct_answers": [1],
              "explanation": "This command deletes the specified deployment.",
              "question_type": "single-choice"
            },
            {
              "id": 137,
              "question": "What is the function of a Kubernetes Service of type 'NodePort'?",
              "options": [
                "Exposes the service on a static port on each node's IP",
                "Load balances traffic across multiple services",
                "Exposes the service externally using a cloud provider's load balancer",
                "Maps the service to an external name",
                "Provides internal cluster DNS resolution"
              ],
              "correct_answers": [0],
              "explanation": "A NodePort Service exposes the service on the same port across all nodes.",
              "question_type": "single-choice"
            },
            {
              "id": 138,
              "question": "How can you check the cluster's Kubernetes version?",
              "options": [
                "kubectl version",
                "kubectl get version",
                "kubectl cluster-info",
                "kubectl describe cluster",
                "kubectl info"
              ],
              "correct_answers": [0],
              "explanation": "This command shows the client and server versions of Kubernetes.",
              "question_type": "single-choice"
            },
            {
              "id": 139,
              "question": "What is the purpose of the 'kubectl config' command?",
              "options": [
                "To configure Kubernetes cluster settings",
                "To manage kubeconfig files",
                "To update deployment configurations",
                "To set node configurations",
                "To modify pod specifications"
              ],
              "correct_answers": [1],
              "explanation": "'kubectl config' commands are used to view and modify kubeconfig settings.",
              "question_type": "single-choice"
            },
            {
              "id": 140,
              "question": "Which of the following is true about Kubernetes Namespaces?",
              "options": [
                "They provide physical isolation of resources",
                "They are used to group and isolate resources logically",
                "They manage network policies",
                "They control node assignments",
                "They store persistent data"
              ],
              "correct_answers": [1],
              "explanation": "Namespaces provide logical isolation within a cluster.",
              "question_type": "single-choice"
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
              "question_type": "single-choice"
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
              "question_type": "single-choice"
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
              "question_type": "single-choice"
            },
            {
              "id": 144,
              "question": "How do you view the events in a Kubernetes cluster?",
              "options": [
                "kubectl get events",
                "kubectl describe events",
                "kubectl list events",
                "kubectl events",
                "kubectl get logs"
              ],
              "correct_answers": [0],
              "explanation": "This command displays the cluster's events.",
              "question_type": "single-choice"
            },
            {
              "id": 145,
              "question": "What is the function of a Kubernetes Ingress resource?",
              "options": [
                "To manage internal cluster networking",
                "To define rules for external HTTP and HTTPS routing",
                "To provide storage to pods",
                "To schedule pods to nodes",
                "To configure network policies"
              ],
              "correct_answers": [1],
              "explanation": "Ingress resources control external access to services over HTTP/HTTPS.",
              "question_type": "single-choice"
            },
            {
              "id": 146,
              "question": "Which of the following is a key principle of the 4 Cs of cloud-native security?",
              "options": [
                "Encrypting data at rest only",
                "Applying security at Code, Container, Cluster, and Cloud levels",
                "Relying solely on cloud provider security",
                "Using containers to bypass security checks",
                "Limiting security to the network layer"
              ],
              "correct_answers": [1],
              "explanation": "The 4 Cs emphasize layered security across all levels.",
              "question_type": "single-choice"
            },
            {
              "id": 147,
              "question": "How can you enable debug logging for the kubelet?",
              "options": [
                "Set '--v=4' in the kubelet startup arguments",
                "Use 'kubectl debug kubelet'",
                "Modify the kubelet configuration file and set 'logLevel: debug'",
                "Restart kubelet with '--debug=true'",
                "It's not possible to enable debug logging"
              ],
              "correct_answers": [0],
              "explanation": "Increasing the verbosity level enables debug logging for the kubelet.",
              "question_type": "single-choice"
            },
            {
              "id": 148,
              "question": "Which command allows you to create a pod directly from an image?",
              "options": [
                "kubectl create pod <pod-name> --image=<image>",
                "kubectl run <pod-name> --image=<image>",
                "kubectl new pod <pod-name> --image=<image>",
                "kubectl pod <pod-name> --image=<image>",
                "kubectl deploy pod <pod-name> --image=<image>"
              ],
              "correct_answers": [1],
              "explanation": "The 'kubectl run' command creates a deployment or pod from an image.",
              "question_type": "single-choice"
            },
            {
              "id": 149,
              "question": "What is the effect of running 'kubectl drain <node-name>'?",
              "options": [
                "It deletes the node from the cluster",
                "It marks the node as unschedulable and evicts all pods",
                "It restarts the node",
                "It upgrades the node's Kubernetes version",
                "It cleans up unused images on the node"
              ],
              "correct_answers": [1],
              "explanation": "Draining a node prepares it for maintenance by evicting pods and preventing new ones.",
              "question_type": "single-choice"
            },
            {
              "id": 150,
              "question": "Which Kubernetes object allows you to inject environment variables into a pod from a ConfigMap?",
              "options": [
                "VolumeMount",
                "EnvFrom",
                "Secret",
                "Annotation",
                "Label"
              ],
              "correct_answers": [1],
              "explanation": "The 'envFrom' field in a pod spec allows injecting environment variables from a ConfigMap.",
              "question_type": "single-choice"
            }
                    
            
  ];