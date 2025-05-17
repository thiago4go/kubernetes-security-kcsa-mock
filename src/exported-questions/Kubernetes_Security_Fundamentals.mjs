
// Exported 99 questions for domain: Kubernetes Security Fundamentals
// Last revision date: 2025-05-17 11:25:03
export const KubernetesSecurityFundamentalsQuestions = [
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
    "correct_answers": [
      2
    ],
    "explanation": "PodSecurityPolicy (PSP) was the precursor to Pod Security Standards (PSS). PSP was deprecated and replaced by PSS and the PodSecurity admission controller to improve pod security management in Kubernetes clusters.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Standards",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "PodSecurityPolicy Deprecation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/#podsecuritypolicy"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      1
    ],
    "explanation": "To enable Pod Security Admission (PSA), you need to add 'PodSecurity' to the '--enable-admission-plugins' flag when starting the API server. This ensures that the PodSecurity admission controller is active and enforcing pod security standards.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes API Server Flags",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      1
    ],
    "explanation": "PSA policies are applied at the namespace level. Only one PSA policy level (privileged, baseline, or restricted) can be enforced per namespace for each mode (enforce, audit, or warn). This ensures clear and consistent policy enforcement.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Red Hat Documentation",
        "url": "https://docs.redhat.com/en/documentation/openshift_dedicated/4/html/authentication_and_authorization/understanding-and-managing-pod-security-admission"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
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
    "correct_answers": [
      0,
      2
    ],
    "explanation": "The 'baseline' Pod Security Standard disallows privileged containers and blocks host networking and ports. This ensures that pods are less vulnerable to security risks by limiting their capabilities.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Standards",
    "sources": [
      {
        "name": "Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      1
    ],
    "explanation": "A Role in Kubernetes RBAC defines a set of permissions that are applicable within a specific namespace. This allows for fine-grained control over resources within that namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RBAC Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "RBAC Roles and RoleBindings",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 13,
    "question": "Which statement accurately describes how Kubernetes Network Policies control pod-to-pod communication within a cluster?",
    "options": [
      "By default, they block all traffic between pods.",
      "They use iptables rules (via the CNI plugin) to control pod communication.",
      "They are enforced by the kube-scheduler.",
      "They manage access to the Kubernetes API.",
      "They control storage access for pods."
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes Network Policies define how groups of pods are allowed to communicate with each other and with other network endpoints. These policies are enforced by the Container Network Interface (CNI) plugin used in the cluster. Most CNI plugins implement network policies using iptables or similar mechanisms to control traffic at the network level. By default, if no Network Policy is applied, all pods can communicate freely. Network Policies do not block all traffic by default, nor are they enforced by the kube-scheduler. They do not manage API or storage access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Network Policies (Official Documentation)",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "Kubernetes Security Best Practices (Mirantis)",
        "url": "https://www.mirantis.com/blog/kubernetes-security-best-practices/"
      }
    ],
    "revision": 5,
    "revision_date": "2025-05-17 11:25:03"
  },
  {
    "id": 16,
    "question": "Does setting 'privileged: true' on a Kubernetes pod grant it access to Kubernetes Secrets?",
    "options": [
      "Yes, it grants full access to all Secrets in the cluster",
      "No, it only elevates the pod's privileges on the host system but does not affect Secrets access",
      "Yes, but only to Secrets within the same namespace",
      "No, it explicitly prevents access to Secrets",
      "Access depends solely on RBAC permissions, regardless of privileged mode"
    ],
    "correct_answers": [
      1,
      4
    ],
    "explanation": "Setting 'privileged: true' on a pod grants the container elevated privileges on the host system, such as access to devices and kernel capabilities, but it does not inherently grant access to Kubernetes Secrets. Access to Secrets is controlled by Kubernetes Role-Based Access Control (RBAC) policies and namespace scoping.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes Official Documentation - Using RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ],
    "revision": 3,
    "revision_date": "2025-05-17 11:10:54"
  },
  {
    "id": 20,
    "question": "What are the potential impacts of enabling detailed auditing of request responses in a Kubernetes cluster?",
    "options": [
      "Improved cluster performance due to better monitoring",
      "Reduced storage requirements for audit logs",
      "Increased security with no performance or storage drawbacks",
      "Performance overhead and increased storage usage due to detailed logs",
      "Disabling of API server logging as a side effect"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "Enabling detailed auditing of request responses in Kubernetes increases the volume and detail of audit logs generated, leading to higher storage consumption and potential performance overhead on the API server. While detailed auditing improves security visibility, it must be balanced against these resource impacts.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 30,
    "question": "Why might a pod retain privileged access even after applying the 'restricted' Pod Security Standard (PSS) or Pod Security Admission (PSA) policy to its namespace?",
    "options": [
      "The Pod Security Standard does not apply retroactively to existing pods",
      "The namespace labels required for policy enforcement are misconfigured or missing",
      "The Kubernetes API server does not support Pod Security Standards",
      "The pod specification explicitly overrides the policy",
      "Privileged access is always allowed regardless of policy"
    ],
    "correct_answers": [
      0,
      1
    ],
    "explanation": "The 'restricted' Pod Security Standard or Pod Security Admission policy applies only to pods created or updated after the policy is enforced; existing pods are not automatically remediated. Enforcement also depends on correct namespace labeling (e.g., 'pod-security.kubernetes.io/enforce=restricted'). If these labels are missing or misconfigured, the policy will not be enforced on pods in that namespace.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Blog - Pod Security Standards",
        "url": "https://kubernetes.io/blog/2021/07/14/pod-security-standards-ga/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 33,
    "question": "Which authentication mechanisms are commonly used by kubeadm during Kubernetes cluster bootstrapping? (Select all that apply)",
    "options": [
      "TLS certificates",
      "Token-based authentication",
      "OAuth tokens",
      "Static passwords",
      "Biometric authentication"
    ],
    "correct_answers": [
      0,
      1
    ],
    "explanation": "kubeadm primarily uses TLS certificates and token-based authentication mechanisms to secure communication and authenticate components during cluster bootstrapping. TLS certificates are used for API server and client authentication, while bootstrap tokens facilitate node joining.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authentication",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubeadm TLS Bootstrap",
        "url": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#tls-bootstrap"
      },
      {
        "name": "Kubernetes Official Documentation - Bootstrap Tokens",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/bootstrap-tokens/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 35,
    "question": "Why is a ConfigMap not suitable for storing sensitive information such as secrets in Kubernetes?",
    "options": [
      "ConfigMaps cannot be mounted as volumes in pods",
      "ConfigMaps do not support key-value pairs",
      "Data stored in ConfigMaps is kept in plain text and not encrypted",
      "ConfigMaps are deprecated in recent Kubernetes versions",
      "ConfigMaps have strict size limitations that prevent storing secrets"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "ConfigMaps are designed to store non-sensitive configuration data as key-value pairs and store data in plain text within etcd. They do not provide encryption or access controls suitable for sensitive information. Secrets, on the other hand, are specifically designed to store sensitive data and can be encrypted at rest. ConfigMaps can be mounted as volumes and are not deprecated. While ConfigMaps have size limits, the primary reason they are unsuitable for secrets is the lack of security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - ConfigMaps",
        "url": "https://kubernetes.io/docs/concepts/configuration/configmap/"
      },
      {
        "name": "Kubernetes Official Documentation - Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 46,
    "question": "What is a common reason why a Kubernetes Network Policy might not be enforced as expected in a cluster?",
    "options": [
      "Network Policies are enabled by default in all clusters",
      "The installed CNI plugin does not support Network Policies",
      "The Network Policy YAML contains syntax errors",
      "The Kubernetes API server is unavailable",
      "Network Policies only apply to traffic from outside the cluster"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Network Policies in Kubernetes rely on the underlying Container Network Interface (CNI) plugin to enforce rules. If the CNI plugin does not support Network Policies, then the policies will not be enforced regardless of their correctness. While syntax errors in the YAML or API server issues can cause problems, the primary reason Network Policies might not work is lack of CNI support. Also, Network Policies affect pod-to-pod traffic within the cluster, not just external traffic.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNI Plugins and Network Policy Support",
        "url": "https://www.cni.dev/plugins/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 47,
    "question": "If a user is granted the 'cluster-admin' ClusterRole through a RoleBinding, what level of access will they have?",
    "options": [
      "Full administrative privileges limited to the namespace where the RoleBinding is applied",
      "Full cluster-wide administrative privileges",
      "Read-only access to all resources in the cluster",
      "No permissions; ClusterRoles require ClusterRoleBindings to take effect",
      "Access only to service accounts within the namespace"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "When a ClusterRole, such as 'cluster-admin', is assigned using a RoleBinding, it grants full administrative privileges but only within the namespace where the RoleBinding is applied. This is because RoleBindings are namespace-scoped, meaning they cannot grant cluster-wide permissions even if the associated role is a ClusterRole. To grant cluster-wide permissions, a ClusterRoleBinding must be used. Incorrect options: (1) Full cluster-wide privileges require a ClusterRoleBinding, not a RoleBinding. (2) Read-only access is not tied to this scenario. (3) The statement about 'no permissions' is incorrect because RoleBindings do apply within their namespace. (4) Access to service accounts is not exclusive in this context.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - RBAC",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "StrongDM Blog - Kubernetes RBAC Explained",
        "url": "https://www.strongdm.com/blog/kubernetes-rbac-role-based-access-control"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:58"
  },
  {
    "id": 51,
    "question": "How can you enable Pod Security Admission (PSA) in a Kubernetes cluster to enforce pod security standards?",
    "options": [
      "By applying security labels directly to pods",
      "By configuring the API server to enable the PodSecurity admission controller",
      "By setting environment variables on cluster nodes",
      "By deploying a third-party admission webhook",
      "By updating kubelet configurations on nodes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Pod Security Admission (PSA) is enabled by configuring the Kubernetes API server to include the 'PodSecurity' admission controller in its '--enable-admission-plugins' flag. This admission controller enforces pod security standards based on namespace labels. Applying labels to pods or setting environment variables on nodes does not enable PSA. While third-party admission webhooks can enforce policies, PSA is a built-in admission controller. Kubelet configurations do not control PSA.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Enhancement Proposal (KEP) - Pod Security Admission",
        "url": "https://github.com/kubernetes/enhancements/tree/master/keps/sig-auth/2571-pod-security-admission"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 52,
    "question": "In Kubernetes Role-Based Access Control (RBAC), what is the purpose of a RoleBinding?",
    "options": [
      "Defines permissions within a namespace",
      "Associates a Role with users, groups, or service accounts within a namespace",
      "Creates a new role with cluster-wide permissions",
      "Manages network policies for a namespace",
      "Sets resource quotas for a project"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A RoleBinding in Kubernetes RBAC binds a Role to one or more subjects (users, groups, or service accounts) within a specific namespace, granting them the permissions defined in that Role. Roles themselves define permissions, but RoleBindings associate those permissions with subjects. ClusterRoles and ClusterRoleBindings are used for cluster-wide permissions. Network policies and resource quotas are managed by different Kubernetes objects unrelated to RoleBindings.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Using RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes RBAC Concepts",
        "url": "https://kubernetes.io/docs/concepts/security/authorization/#role-based-access-control-rbac"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 60,
    "question": "What is the primary function of Resource Quotas in a Kubernetes namespace?",
    "options": [
      "Limit the number of namespaces in the cluster",
      "Restrict access to the Kubernetes API server",
      "Control the amount of resources consumed within a namespace",
      "Schedule pods to specific nodes",
      "Enforce network policies"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Resource Quotas in Kubernetes are used to limit the total amount of compute resources (such as CPU, memory, and object counts) that can be consumed within a namespace. This helps prevent a single namespace from exhausting cluster resources. Resource Quotas do not limit namespaces themselves, control API server access, schedule pods, or enforce network policies, which are handled by other Kubernetes components.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Resource Quotas",
        "url": "https://kubernetes.io/docs/concepts/policy/resource-quotas/"
      },
      {
        "name": "Kubernetes Resource Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 62,
    "question": "Which Kubernetes object is specifically designed to store sensitive information such as passwords, tokens, or keys?",
    "options": [
      "ConfigMap",
      "Secret",
      "Volume",
      "Pod Annotation",
      "Deployment"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes Secrets are intended to store sensitive data like passwords, OAuth tokens, and SSH keys securely. Unlike ConfigMaps, which store non-sensitive configuration data, Secrets provide mechanisms to protect this sensitive information, including base64 encoding and integration with encryption at rest. Volumes, Pod Annotations, and Deployments are not designed for securely storing sensitive data.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "Kubernetes Best Practices - Managing Secrets",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#use-secrets-to-store-sensitive-information"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      1,
      2,
      3,
      4
    ],
    "explanation": "Calico, Weave Net, Cilium, and AWS VPC CNI are CNI plugins that support Network Policies. AWS VPC CNI supports network policies but requires them to be enabled and does not support them for Fargate or Windows containers. Flannel does not support Network Policies by default.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "AWS Announcement on VPC CNI Network Policy Support",
        "url": "https://aws.amazon.com/about-aws/whats-new/2023/08/amazon-vpc-cni-kubernetes-networkpolicy-enforcement/"
      },
      {
        "name": "AWS EKS Documentation on Network Policy Configuration",
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/cni-network-policy-configure.html#enable-network-policy-parameter"
      },
      {
        "name": "Kubernetes Documentation on Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 67,
    "question": "Which Kubernetes feature enables encryption of Secrets data at rest within the cluster?",
    "options": [
      "Enabling TLS on the API server",
      "Using the etcd encryption provider for at-rest encryption",
      "Storing Secrets in ConfigMaps",
      "Encrypting data at the application layer",
      "Using third-party encryption tools outside Kubernetes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes supports encryption of Secrets at rest by enabling the etcd encryption provider, which encrypts Secret data stored in etcd, the cluster's backing store. This protects sensitive data from unauthorized access if etcd storage is compromised. TLS on the API server secures data in transit, not at rest. ConfigMaps do not provide encryption and are not intended for sensitive data. Application-layer encryption and third-party tools can add security but are not native Kubernetes features for Secrets encryption.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Encrypting Secret Data at Rest",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/"
      },
      {
        "name": "CNCF Security Whitepaper - Kubernetes Secrets Management",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper.md#kubernetes-secrets"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 68,
    "question": "What is the default behavior of Kubernetes network traffic when no Network Policies are applied to a namespace?",
    "options": [
      "All ingress and egress traffic is denied",
      "All ingress traffic is denied; egress traffic is allowed",
      "All ingress and egress traffic is allowed",
      "All egress traffic is denied; ingress traffic is allowed",
      "Traffic is allowed only within the namespace"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "By default, Kubernetes allows all ingress and egress traffic to pods if no Network Policies are applied. Network Policies are opt-in and must be explicitly created to restrict traffic. Without any policies, pods can send and receive traffic unrestricted. The other options describe behaviors that occur only when specific Network Policies are configured.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNCF Kubernetes Security Best Practices",
        "url": "https://github.com/cncf/sig-security/blob/main/security-best-practices.md#network-policies"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 69,
    "question": "How do Kubernetes Secrets provide improved security compared to ConfigMaps?",
    "options": [
      "Secrets are encrypted by default in etcd",
      "Secrets are stored in a separate database from ConfigMaps",
      "Secrets are base64-encoded and can be encrypted at rest, whereas ConfigMaps are stored in plain text",
      "Secrets provide built-in versioning",
      "Secrets can only be accessed by cluster administrators"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Kubernetes Secrets are base64-encoded and can be configured to be encrypted at rest in etcd, providing better protection for sensitive data than ConfigMaps, which are stored as plain text in etcd. Secrets are not encrypted by default unless encryption at rest is enabled. They do not provide built-in versioning, and access controls depend on RBAC policies rather than restricting access solely to cluster admins.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "Kubernetes Official Documentation - Encrypting Secret Data at Rest",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 70,
    "question": "Which Kubernetes component is responsible for enforcing Pod Security Standards through admission control?",
    "options": [
      "kube-scheduler",
      "kube-apiserver with the PodSecurity admission plugin",
      "kube-controller-manager",
      "kubelet",
      "etcd"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kube-apiserver enforces Pod Security Standards by using the PodSecurity admission plugin, which validates and enforces security policies on pods during creation or update. The kube-scheduler schedules pods to nodes, kube-controller-manager manages controllers, kubelet runs on nodes to manage pods, and etcd is the cluster data store; none of these enforce Pod Security Standards directly.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Official Documentation - Admission Controllers",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 71,
    "question": "What is the purpose of the '--allow-privileged' flag in the Kubernetes API server configuration?",
    "options": [
      "Allows pods to run privileged containers with elevated permissions",
      "Enables unauthenticated access to the API server",
      "Grants cluster-admin rights to all users",
      "Disables security contexts on pods",
      "Controls enforcement of network policies"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '--allow-privileged' flag on the Kubernetes API server enables or disables the ability to create privileged containers, which have elevated permissions on the host and can perform sensitive operations. This flag does not affect authentication, user permissions, security contexts broadly, or network policy enforcement. Running privileged containers increases security risks and should be carefully controlled.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - API Server Flags",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Official Documentation - Privileged Containers",
        "url": "https://kubernetes.io/docs/concepts/policy/pod-security-policy/#privileged"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 74,
    "question": "What is a significant security risk associated with not restricting egress traffic in a Kubernetes cluster?",
    "options": [
      "It complicates the debugging process for network-related issues.",
      "It leads to reduced latency in network communications within the cluster.",
      "It creates a potential pathway for data exfiltration from compromised pods to external, unauthorized destinations.",
      "It enhances and simplifies pod-to-pod communication within the cluster.",
      "It simplifies network configuration, reducing the complexity of network policies."
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Failing to restrict egress traffic in Kubernetes can expose the cluster to significant security risks, most notably data exfiltration. Without proper egress controls, a compromised pod can freely communicate with external servers, potentially leaking sensitive data to attackers. While unrestricted egress might simplify initial network configurations, the security implications far outweigh any convenience gained. Restricting egress traffic is a critical security measure to limit the attack surface and prevent unauthorized communication from within the cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Tigera: Prevent Data Exfiltration in Kubernetes",
        "url": "https://www.tigera.io/blog/prevent-data-exfiltration-in-kubernetes-the-critical-role-of-egress-access-controls/"
      },
      {
        "name": "Red Hat: Guide to Kubernetes Egress Network Policies",
        "url": "https://www.redhat.com/en/blog/guide-to-kubernetes-egress-network-policies"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:18:37"
  },
  {
    "id": 75,
    "question": "How can you verify that Pod Security Admission (PSA) is actively enforcing security policies within a specific Kubernetes namespace?",
    "options": [
      "Check the API server logs for PSA-related entries",
      "Attempt to create a pod that violates the PSA policy and observe the outcome",
      "Inspect the kubelet configuration on the nodes",
      "Review the scheduler's event logs for pod scheduling issues",
      "Use the command 'kubectl get psa' to check enforcement status"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The most direct way to verify that Pod Security Admission is enforcing policies is to try creating a pod that violates the defined PSA policy in the target namespace. If the pod creation is denied, it confirms that PSA is active and enforcing the policies. Checking API server logs or scheduler events may provide indirect clues but are less reliable for verification. The kubelet configuration does not control PSA enforcement, and 'kubectl get psa' is not a valid command for checking PSA status.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Blog - Pod Security Admission Controller",
        "url": "https://kubernetes.io/blog/2021/04/06/pod-security-admission-beta/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 76,
    "question": "What is the effect of applying a Kubernetes NetworkPolicy that does not select any pods in the cluster?",
    "options": [
      "It has no effect on network traffic within the cluster",
      "It denies all network traffic to and from all pods",
      "It allows all network traffic by default",
      "It causes an error in the network plugin",
      "It only affects newly created pods after the policy is applied"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A NetworkPolicy that does not select any pods effectively applies to no pods and therefore has no impact on network traffic. It neither denies nor allows traffic beyond the cluster's default behavior. It does not cause errors in the network plugin, nor does it selectively affect only new pods. NetworkPolicies only affect pods that they select.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNCF - Kubernetes Network Policy Explained",
        "url": "https://www.cncf.io/blog/2020/07/15/understanding-kubernetes-network-policies/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 83,
    "question": "How can you restrict a Kubernetes user to create resources only within a specific namespace?",
    "options": [
      "Assign the user the cluster-admin role",
      "Create a Role and RoleBinding scoped to that namespace for the user",
      "Modify the kube-apiserver configuration to limit user access",
      "Create a NetworkPolicy that restricts user actions",
      "Set a resource quota on the namespace to limit resource creation"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To restrict a user to create resources only within a specific namespace, you create a Role that defines the allowed permissions within that namespace and bind it to the user via a RoleBinding. Assigning cluster-admin grants full cluster-wide permissions, which is too broad. Modifying kube-apiserver configuration is not practical for per-user namespace restrictions. NetworkPolicies control pod network traffic, not user permissions. Resource quotas limit resource consumption but do not restrict user actions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Using RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes Official Documentation - Roles and RoleBindings",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 87,
    "question": "What measures can you take to prevent a container from running as the root user in Kubernetes?",
    "options": [
      "Set 'runAsUser: 0' in the security context",
      "Use a Pod Security Admission to enforce non-root user requirements",
      "It is not possible to prevent this",
      "Modify the container image to exclude root user privileges",
      "Set 'allowPrivilegeEscalation: true' in the security context"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To enhance security, you can use Pod Security Admission to enforce that containers run as non-root users. This prevents potential privilege escalation attacks. Option 1 ('runAsUser: 0') explicitly allows running as root, which is insecure. Option 3 is incorrect because Kubernetes provides mechanisms to enforce non-root users. Option 4 may reduce root privileges but does not enforce non-root execution. Option 5 ('allowPrivilegeEscalation: true') enables privilege escalation, which contradicts the goal of preventing root access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Kubernetes Official Documentation - Security Contexts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 88,
    "question": "What is the primary purpose of Role-Based Access Control (RBAC) in Kubernetes?",
    "options": [
      "To manage network policies for pods",
      "To control user and process access to Kubernetes resources",
      "To schedule pods efficiently across nodes",
      "To monitor cluster performance metrics",
      "To provide logging and audit capabilities"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "RBAC in Kubernetes is designed to control and manage access permissions for users and processes to Kubernetes resources, ensuring that only authorized entities can perform specific actions. It does not manage network policies, scheduling, monitoring, or logging directly, although these areas may have their own mechanisms.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Red Hat - Introduction to Kubernetes RBAC",
        "url": "https://www.redhat.com/sysadmin/kubernetes-rbac"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 89,
    "question": "Which Kubernetes object is used to define a set of network access rules that control traffic to and from pods?",
    "options": [
      "Service",
      "Deployment",
      "Ingress",
      "NetworkPolicy",
      "ConfigMap"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "NetworkPolicy objects in Kubernetes are used to specify rules that control the ingress and egress traffic to and from pods. Services manage access at a different layer, Ingress manages external access, Deployments manage pod lifecycle, and ConfigMaps store configuration data, none of which control pod-level network access rules.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNCF - Kubernetes Network Policy Explained",
        "url": "https://www.cncf.io/blog/2020/07/15/understanding-kubernetes-network-policies/"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 101,
    "question": "What is the primary function of Kubernetes labels in organizing resources?",
    "options": [
      "To provide human-readable names for resources",
      "To organize and select groups of objects",
      "To store configuration data",
      "To set permissions on resources",
      "To define network policies"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes labels are key-value pairs attached to objects, such as pods or services, to facilitate identification and selection. They enable users to organize and filter resources based on specific criteria, making it easier to manage complex environments.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
      },
      {
        "name": "Kubernetes Labels and Selectors",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 105,
    "question": "How can you create a ConfigMap from a file in Kubernetes?",
    "options": [
      "kubectl create configmap my-config --file=config.yaml",
      "kubectl apply configmap my-config --from-file=config.yaml",
      "kubectl create configmap my-config --from-file=config.yaml",
      "kubectl generate configmap my-config config.yaml",
      "kubectl configmap my-config --import=config.yaml"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "To create a ConfigMap from a file, you use the command `kubectl create configmap my-config --from-file=config.yaml`. This command allows you to import configuration data from a file into a ConfigMap, which can then be used by applications running in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes ConfigMaps Documentation",
        "url": "https://kubernetes.io/docs/concepts/configuration/configmap/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-create-em-configmap"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 141,
    "question": "How do you create a Secret from literal values in Kubernetes?",
    "options": [
      "kubectl create secret generic my-secret --from-literal=key1=value1",
      "kubectl create secret generic my-secret key1=value1",
      "kubectl create secret my-secret --literal key1=value1",
      "kubectl create secret tls my-secret --key1 value1",
      "kubectl secret create my-secret key1=value1"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To create a Secret from literal values, you use the command `kubectl create secret generic my-secret --from-literal=key1=value1`. This command allows you to define key-value pairs directly in the command line, which are then stored as a Secret in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Secrets Documentation",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-create-em-secret"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      2
    ],
    "explanation": "The 'cluster-admin' ClusterRole grants full cluster-wide administrative permissions. When bound via a ClusterRoleBinding, it provides full control over all resources in the cluster. When bound via a RoleBinding, its permissions are limited to the namespace specified in the binding.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Documentation - Role-Based Access Control (RBAC)",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes Documentation - Controlling Access to the Kubernetes API",
        "url": "https://kubernetes.io/docs/concepts/security/controlling-access/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 143,
    "question": "Which command is used to apply a label to a pod in Kubernetes?",
    "options": [
      "kubectl label pods <pod-name> key=value",
      "kubectl annotate pods <pod-name> key=value",
      "kubectl tag pods <pod-name> key=value",
      "kubectl set label pods <pod-name> key=value",
      "kubectl edit pods <pod-name> --label key=value"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command `kubectl label pods <pod-name> key=value` is used to apply a label to a pod. This command updates the metadata of the pod with the specified key-value pair, allowing for easier management and filtering of resources.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Labels Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-label-em"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 154,
    "question": "What is the purpose of the 'allowPrivilegeEscalation' field in a Kubernetes pod's security context?",
    "options": [
      "Allows the container to run as root",
      "Controls whether a process can gain more privileges than its parent process",
      "Enables privileged mode for the container",
      "Allows mounting of host directories",
      "Disables all capabilities for the container"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'allowPrivilegeEscalation' field in a Kubernetes pod's security context controls whether a process can gain more privileges than its parent process. This setting is crucial for security as it prevents potential privilege escalation attacks by limiting the capabilities of processes within a container.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Security Context Documentation",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 155,
    "question": "Which Kubernetes object specifically controls inbound/outbound network traffic between Pods at the IP address and port level?",
    "options": [
      "NetworkPolicy",
      "Ingress",
      "Service",
      "Endpoint",
      "FirewallRule"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "NetworkPolicy objects define granular rules for Pod-to-Pod communication, including allowed ingress/egress traffic. While Services enable network access to Pods and Ingress manages external HTTP(S) routing, NetworkPolicy provides critical microsegmentation capabilities for zero-trust security architectures.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Network Policies Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CIS Kubernetes Benchmark v1.8",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 157,
    "question": "What is the correct kubectl command syntax to create a Role named 'pod-reader' with get/watch/list permissions on Pods in the current namespace?",
    "options": [
      "kubectl apply role",
      "kubectl create role pod-reader --verb=get,list,watch --resource=pods",
      "kubectl generate role",
      "kubectl new role",
      "kubectl init role"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl create role' command with proper flags creates RBAC Roles. The full syntax requires specifying verbs (--verb) and resources (--resource). This command creates non-namespaced Roles; for cluster-wide permissions, use 'kubectl create clusterrole' instead.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RBAC Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes in Action (Manning Publications)",
        "url": "https://www.manning.com/books/kubernetes-in-action"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 158,
    "question": "Which RBAC component links a ClusterRole to all authenticated users across the entire Kubernetes cluster?",
    "options": [
      "ClusterRoleBinding",
      "RoleBinding",
      "ClusterRole",
      "ServiceAccount",
      "GroupBinding"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "ClusterRoleBinding associates ClusterRoles with subjects (users/groups/serviceaccounts) cluster-wide. This is critical for security as it affects all namespaces. Best practice recommends using RoleBinding with namespaced Roles for least-privilege access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RBAC Good Practices",
        "url": "https://kubernetes.io/docs/concepts/security/rbac-good-practices/"
      },
      {
        "name": "CIS Kubernetes Benchmark v1.8",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 160,
    "question": "What is the correct command to base64-encode the string 'admin' for Kubernetes Secret creation, including proper newline handling?",
    "options": [
      "echo -n 'admin' | base64",
      "echo 'admin' | base64",
      "echo 'admin' | base64encode",
      "base64 'admin'",
      "encode --base64 'admin'"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '-n' flag prevents adding a trailing newline character, which is critical for accurate encoding. Kubernetes Secrets require precise base64 encoding without unexpected characters. The resulting output can be used in Secret manifests' data field.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Secrets Documentation",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "Linux man-pages project",
        "url": "https://man7.org/linux/man-pages/man1/base64.1.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 162,
    "question": "Which Kubernetes Secret type is required when configuring TLS termination for an Ingress resource?",
    "options": [
      "Opaque",
      "kubernetes.io/tls",
      "Docker Registry",
      "Basic Auth",
      "SSH Key"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "For configuring TLS termination in an Ingress resource, a Secret of type 'kubernetes.io/tls' is required. This type of Secret must contain 'tls.crt' and 'tls.key' entries with PEM-encoded certificates.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Ingress TLS Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/#tls"
      },
      {
        "name": "Kubernetes Secret Types Reference",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/#secret-types"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 163,
    "question": "Which kubectl command correctly creates a TLS secret named 'tls-secret' using the certificate file 'tls.crt' and the key file 'tls.key'?",
    "options": [
      "kubectl create secret generic tls-secret --from-file=tls.crt --from-file=tls.key",
      "kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key",
      "kubectl create secret docker-registry tls-secret --docker-server=tls.crt --docker-username=tls.key",
      "kubectl create tls-secret tls-secret --cert=tls.crt --key=tls.key",
      "kubectl create secret tls-secret --type=tls --cert=tls.crt --key=tls.key"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct command to create a TLS secret in Kubernetes is 'kubectl create secret tls' followed by the secret name and the paths to the certificate and key files using the --cert and --key flags.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets"
      },
      {
        "name": "Kubernetes CLI Reference - kubectl create secret",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#create-secret"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 165,
    "question": "In a Kubernetes Pod specification, which field is used to define Linux capabilities for an individual container?",
    "options": [
      "securityContext.capabilities",
      "spec.capabilities",
      "container.securityContext.capabilities",
      "podSecurityContext.capabilities",
      "linuxOptions.capabilities"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Linux capabilities for containers are specified under the 'securityContext.capabilities' field within the container's specification. This allows fine-grained control over the capabilities added or dropped for that specific container.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes API Reference - PodSpec",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#securitycontext-v1-core"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 166,
    "question": "Which configuration in a Kubernetes container's securityContext is used to drop all Linux capabilities, effectively removing extra privileges?",
    "options": [
      "capabilities: {drop: ['ALL']}",
      "capabilities: {add: ['NONE']}",
      "privileged: false",
      "allowPrivilegeEscalation: false",
      "runAsNonRoot: true"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To remove all Linux capabilities from a container, the 'capabilities' field under the container's securityContext should specify 'drop: ['ALL']'. This explicitly drops all added capabilities, minimizing the container's privileges.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container"
      },
      {
        "name": "Red Hat - Understanding Linux Capabilities in Kubernetes",
        "url": "https://www.redhat.com/sysadmin/linux-capabilities-kubernetes"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 168,
    "question": "What is the role of the 'namespaceSelector' field in a Kubernetes NetworkPolicy?",
    "options": [
      "To select namespaces where the policy is applied",
      "To select Pods in specific namespaces for ingress or egress rules",
      "To label namespaces",
      "To deny traffic to certain namespaces",
      "To enforce policies across all namespaces"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'namespaceSelector' in a NetworkPolicy is used to select Pods in specific namespaces as sources or destinations for ingress or egress traffic rules. It does not select the namespaces where the policy itself is applied; NetworkPolicies are always applied within the namespace they are defined. It also does not label namespaces, deny traffic directly, or enforce policies cluster-wide.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource"
      },
      {
        "name": "Calico Docs - NetworkPolicy namespaceSelector",
        "url": "https://docs.projectcalico.org/security/network-policy#namespace-selector"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 171,
    "question": "If Kubernetes audit logs are stored at '/var/log/kubernetes/audit.log', which command can you use to view these logs in real time?",
    "options": [
      "kubectl logs audit",
      "sudo tail -f /var/log/kubernetes/audit.log",
      "kubectl get events --audit",
      "journalctl -u kube-apiserver",
      "kubectl describe audit-logs"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Audit logs written to a file such as '/var/log/kubernetes/audit.log' can be viewed in real time using the 'tail -f' command with appropriate permissions, hence 'sudo tail -f /var/log/kubernetes/audit.log'. The 'kubectl logs' command is used for container logs, not audit logs stored on the host. 'kubectl get events --audit' and 'kubectl describe audit-logs' are invalid commands. 'journalctl -u kube-apiserver' shows the kube-apiserver service logs but may not include audit logs if they are configured to a separate file.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "Red Hat - Viewing Kubernetes Audit Logs",
        "url": "https://access.redhat.com/documentation/en-us/openshift_container_platform/4.7/html/security_hardening/monitoring-audit-logs_security-hardening"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 175,
    "question": "In a Kubernetes container's securityContext, which field prevents processes from gaining elevated privileges through privilege escalation?",
    "options": [
      "runAsUser: 0",
      "privileged: false",
      "allowPrivilegeEscalation: false",
      "runAsNonRoot: false",
      "readOnlyRootFilesystem: true"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The 'allowPrivilegeEscalation' field, when set to false, prevents a process from gaining more privileges than its parent process, effectively blocking privilege escalation attacks. Setting 'privileged' to false disables privileged mode but does not specifically prevent privilege escalation. 'runAsUser: 0' runs the container as root, which does not prevent privilege escalation. 'runAsNonRoot: false' allows running as root, so it doesn't prevent privilege escalation. 'readOnlyRootFilesystem: true' restricts filesystem writes but does not control privilege escalation.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 176,
    "question": "Which Kubernetes resources, if compromised, could lead to significant security breaches and should be audited carefully? (Select all that apply)",
    "options": [
      "Secrets",
      "ConfigMaps",
      "Pods",
      "ServiceAccounts",
      "PersistentVolumes"
    ],
    "correct_answers": [
      0,
      3
    ],
    "explanation": "Secrets and ServiceAccounts are considered sensitive Kubernetes resources because they often contain confidential information such as credentials, API keys, and tokens. If compromised, these resources can lead to unauthorized access, privilege escalation, or data breaches. ConfigMaps generally contain non-sensitive configuration data and are less critical from a security perspective. While Pods and PersistentVolumes are important, they are not typically audited for sensitive information unless they handle sensitive data explicitly.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Auditing",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "Kubernetes Official Documentation - Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 177,
    "question": "Which Kubernetes Admission Controller was deprecated and replaced by Pod Security Admission in Kubernetes version 1.25?",
    "options": [
      "PodSecurityPolicy",
      "NodeRestriction",
      "AlwaysPullImages",
      "NamespaceLifecycle",
      "LimitRanger"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "PodSecurityPolicy was deprecated in Kubernetes version 1.25 and replaced by the Pod Security Admission (PSA) controller. The PSA controller provides a simpler and more flexible way to enforce pod security standards, aligning with Kubernetes' evolving security model. Other options, such as NodeRestriction, AlwaysPullImages, NamespaceLifecycle, and LimitRanger, are not related to this deprecation.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Standards",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Blog - Deprecation of PodSecurityPolicy",
        "url": "https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:07:54"
  },
  {
    "id": 178,
    "question": "Select all that apply: Which Kubernetes object(s) allow you to define a set of rules for validating or mutating admission requests?",
    "options": [
      "ValidatingWebhookConfiguration",
      "MutatingWebhookConfiguration",
      "AdmissionController",
      "CustomResourceDefinition",
      "WebhookPolicy"
    ],
    "correct_answers": [
      0,
      1
    ],
    "explanation": "`ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` are used to integrate admission webhooks that validate or mutate admission requests. Option 2 (`AdmissionController`) is a general term for the mechanism but not a specific Kubernetes object. Option 3 (`CustomResourceDefinition`) is used to define custom resources, and Option 4 (`WebhookPolicy`) is not a valid Kubernetes object.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Admission Webhooks Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/"
      },
      {
        "name": "Kubernetes API Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:58"
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
    "correct_answers": [
      1
    ],
    "explanation": "The correct field to disable privilege escalation for all containers in a Pod is 'spec.containers.securityContext.allowPrivilegeEscalation: false'. This must be set individually for each container within the Pod, as there is no global 'allowPrivilegeEscalation' setting at the Pod level.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation on Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Wiz Kubernetes Security Context Best Practices",
        "url": "https://www.wiz.io/academy/kubernetes-security-context-best-practices"
      },
      {
        "name": "Red Hat Guide to Kubernetes Security Context",
        "url": "https://www.redhat.com/en/blog/guide-to-kubernetes-security-context-pod-security-policy-psp"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 181,
    "question": "In a Kubernetes NetworkPolicy, which selector is used to specify the Pods to which the policy applies?",
    "options": [
      "podSelector",
      "namespaceSelector",
      "policySelector",
      "matchLabels",
      "appSelector"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The 'podSelector' field in a NetworkPolicy defines the set of Pods that the policy applies to by selecting Pods based on labels. 'namespaceSelector' selects namespaces, not Pods. 'policySelector' is not a valid field in NetworkPolicy. 'matchLabels' is a label selector syntax used inside 'podSelector' but is not itself a selector field. 'appSelector' is not a standard Kubernetes selector field.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNCF Network Policy Specification",
        "url": "https://github.com/kubernetes/community/blob/master/contributors/design-proposals/network/networkpolicy.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 182,
    "question": "In a Kubernetes NetworkPolicy specification, which field defines the allowed egress destinations for Pods?",
    "options": [
      "ingress",
      "egress",
      "to",
      "from",
      "destinations"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'egress' field in a NetworkPolicy spec specifies the rules that allow outbound traffic from selected Pods to specified destinations. The 'ingress' field defines allowed inbound traffic. 'to' is a subfield inside 'egress' rules specifying destination peers but is not the top-level field defining egress rules. 'from' is used in ingress rules to specify source peers. 'destinations' is not a valid field in NetworkPolicy.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "CNCF Network Policy Specification",
        "url": "https://github.com/kubernetes/community/blob/master/contributors/design-proposals/network/networkpolicy.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 183,
    "question": "Which of the following are valid components of a Kubernetes audit policy? (Select all that apply)",
    "options": [
      "Rules",
      "Levels",
      "Stages",
      "Users",
      "Verbs"
    ],
    "correct_answers": [
      0,
      2,
      3,
      4
    ],
    "explanation": "A Kubernetes audit policy is composed of 'Rules' that define what events to capture. Each rule can specify 'Stages' of the request lifecycle (such as RequestReceived, ResponseStarted). 'Users' can be specified to filter audit events by user identity. 'Verbs' define the types of API operations (e.g., get, create) to audit. 'Levels' is not a component of the policy structure but rather a field inside rules specifying the detail level of logging (e.g., None, Metadata).",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "Kubernetes Audit Policy Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#audit"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 184,
    "question": "In a Kubernetes audit policy, which 'level' setting logs only metadata about requests but excludes the request and response bodies?",
    "options": [
      "None",
      "Metadata",
      "Request",
      "RequestResponse",
      "Minimal"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'Metadata' audit level records request metadata such as request method, resource, user, and timestamp but does not log the request or response bodies. 'None' disables logging. 'Request' logs the request body but not the response. 'RequestResponse' logs both request and response bodies. 'Minimal' is not a standard audit level in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "Kubernetes Audit Policy Levels",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#auditpolicy-v1beta1-auditregistration-k8s-io"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 188,
    "question": "In Kubernetes, which securityContext setting ensures that a container runs as a non-root user to enhance security?",
    "options": [
      "runAsUser: 0",
      "runAsNonRoot: true",
      "runAsGroup: 0",
      "allowPrivilegeEscalation: false",
      "privileged: false"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'runAsNonRoot: true' setting enforces that the container must run as a non-root user, preventing it from running with UID 0 (root). This enhances security by limiting container privileges. 'runAsUser: 0' explicitly sets the user to root, which is insecure. 'runAsGroup: 0' sets the group ID but doesn't enforce non-root user. 'allowPrivilegeEscalation: false' prevents privilege escalation but does not enforce non-root user. 'privileged: false' disables privileged mode but does not guarantee a non-root user.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "CNCF - Kubernetes Security Best Practices",
        "url": "https://www.cncf.io/blog/2020/07/15/kubernetes-security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 189,
    "question": "Select all that apply: Which command(s) can be used to list all ServiceAccounts in the 'dev' namespace?",
    "options": [
      "kubectl get sa -n dev",
      "kubectl get serviceaccount -A",
      "kubectl get serviceaccounts --namespace=dev",
      "kubectl describe serviceaccounts -n dev",
      "kubectl list sa dev"
    ],
    "correct_answers": [
      0,
      2,
      3
    ],
    "explanation": "The commands `kubectl get sa -n dev`, `kubectl get serviceaccounts --namespace=dev`, and `kubectl describe serviceaccounts -n dev` all list ServiceAccounts in the 'dev' namespace. The first two provide a summary list, while `kubectl describe` provides detailed information about each ServiceAccount. Option 1 (`kubectl get serviceaccount -A`) lists ServiceAccounts across all namespaces, and Option 4 (`kubectl list sa dev`) is not a valid `kubectl` command.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes kubectl Command Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands/"
      }
    ],
    "revision": 3,
    "revision_date": "2025-04-18 17:38:29"
  },
  {
    "id": 190,
    "question": "In a Kubernetes Pod specification, which field is used to specify the ServiceAccount under which the Pod should run?",
    "options": [
      "serviceAccount",
      "serviceAccountName",
      "accountName",
      "saName",
      "serviceAccountSpec"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The correct field is 'serviceAccountName', which defines the name of the ServiceAccount that the Pod uses for authentication and authorization. The other options are incorrect as they are not valid Pod spec fields. 'serviceAccount' and 'accountName' do not exist in the Pod spec. 'saName' and 'serviceAccountSpec' are not recognized fields.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authentication",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Service Accounts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      },
      {
        "name": "Kubernetes API Reference - PodSpec",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#podspec-v1-core"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 192,
    "question": "Which Kubernetes object defines cluster-wide permissions and roles that can be assigned to users or service accounts?",
    "options": [
      "Role",
      "ClusterRole",
      "RoleBinding",
      "ClusterRoleBinding",
      "ServiceAccount"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'ClusterRole' defines permissions that apply across the entire Kubernetes cluster, allowing for cluster-wide access control. In contrast, 'Role' defines permissions scoped to a specific namespace. 'RoleBinding' and 'ClusterRoleBinding' are used to assign Roles or ClusterRoles to users or service accounts but do not define permissions themselves. 'ServiceAccount' represents an identity for processes running in Pods, not permissions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "name": "Kubernetes Official Documentation - Roles and ClusterRoles",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 195,
    "question": "Which of the following securityContext fields are commonly applied at the Pod level in Kubernetes? (Select all that apply)",
    "options": [
      "runAsUser",
      "fsGroup",
      "privileged",
      "capabilities",
      "seLinuxOptions"
    ],
    "correct_answers": [
      0,
      1,
      4
    ],
    "explanation": "At the Pod level, 'runAsUser' specifies the user ID for all containers in the Pod, 'fsGroup' sets the group ID for mounted volumes, and 'seLinuxOptions' configures SELinux labels for the Pod. 'privileged' and 'capabilities' are container-level settings and cannot be set at the Pod level. Therefore, only 'runAsUser', 'fsGroup', and 'seLinuxOptions' are valid Pod-level securityContext fields.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Red Hat - Understanding Kubernetes Security Contexts",
        "url": "https://www.redhat.com/sysadmin/kubernetes-security-contexts"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 200,
    "question": "In a Kubernetes container's securityContext, which field allows you to add specific Linux capabilities to the container?",
    "options": [
      "addCapabilities",
      "linuxCapabilities",
      "capabilities.add",
      "securityOptions",
      "privilegedCaps"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct field is 'capabilities.add', which is a list under the container's securityContext that specifies which Linux capabilities to add to the container's default set. 'addCapabilities' and 'linuxCapabilities' are incorrect field names. 'securityOptions' and 'privilegedCaps' are not valid Kubernetes securityContext fields.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container"
      },
      {
        "name": "Red Hat - Linux Capabilities in Kubernetes",
        "url": "https://www.redhat.com/sysadmin/linux-capabilities-kubernetes"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 204,
    "question": "To enable audit logging in Kubernetes, which flag must be added to the API server configuration to specify the log file path?",
    "options": [
      "--audit-log-path",
      "--audit-policy-file",
      "--enable-audit",
      "--audit-log-maxage",
      "--audit-log-format"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '--audit-log-path' flag is crucial for enabling audit logging by specifying the path where audit logs will be stored. This allows for the collection and analysis of API requests and responses, which is essential for security auditing and compliance.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Audit Logging",
        "url": "https://kubernetes.io/docs/tasks/debug-application-cluster/audit/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 205,
    "question": "Which of the following steps are necessary to enable audit logging in Kubernetes? (Select all that apply)",
    "options": [
      "Create an audit policy file",
      "Configure the kubelet with audit flags",
      "Add '--audit-policy-file' flag to API server",
      "Restart the kube-controller-manager",
      "Specify '--audit-log-path' in the API server configuration"
    ],
    "correct_answers": [
      0,
      2,
      4
    ],
    "explanation": "To enable audit logging in Kubernetes, you must create an audit policy file, specify this file using the '--audit-policy-file' flag in the API server configuration, and define the log path using '--audit-log-path'. These steps ensure that audit logs are properly configured and stored.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Audit Policy",
        "url": "https://kubernetes.io/docs/tasks/debug-application-cluster/audit/#audit-policy"
      },
      {
        "name": "Kubernetes API Server Configuration",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
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
    "correct_answers": [
      3
    ],
    "explanation": "A RoleBinding is used to grant permissions defined in a Role to users or groups within a specific namespace. This is essential for fine-grained access control in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RoleBinding",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding"
      },
      {
        "name": "Kubernetes Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 215,
    "question": "What is the correct 'kind' value for an object that associates a Role with a user or group?",
    "options": [
      "RoleBinding",
      "ClusterRole",
      "User",
      "Group",
      "RoleAssignment"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A RoleBinding is the Kubernetes object that binds a Role to a user or group within a namespace, enabling them to perform specific actions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RoleBinding",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding"
      },
      {
        "name": "Kubernetes RBAC",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 220,
    "question": "Which securityContext field makes a container's root filesystem read-only to prevent modifications?",
    "options": [
      "readOnlyFileSystem",
      "readOnlyRootFilesystem",
      "immutableRoot",
      "filesystemReadonly",
      "noWriteFilesystem"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'readOnlyRootFilesystem' field in a container's securityContext makes the root filesystem read-only, preventing any modifications and enhancing container security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes SecurityContext",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes Pod Security",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 221,
    "question": "In Kubernetes security best practices, what is the primary security benefit of configuring a container's root filesystem as read-only?",
    "options": [
      "Improved container startup performance",
      "Reduced container image storage requirements",
      "Enhanced security by preventing malicious filesystem modifications",
      "Enables cross-container file sharing capabilities",
      "Simplifies rolling updates for containerized applications"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A read-only root filesystem (configured via securityContext.readOnlyRootFilesystem) prevents attackers from modifying system files, installing malware, or writing to sensitive directories, even if they gain shell access. This security hardening measure is recommended by CIS Kubernetes Benchmarks and Kubernetes security best practices.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation - Security Contexts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "CIS Kubernetes Benchmark v1.8",
        "url": "https://www.cisecurity.org/benchmark/kubernetes"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 224,
    "question": "When creating a NetworkPolicy to implement default deny egress traffic for Kubernetes pods, which policyTypes value must be specified?",
    "options": [
      "Ingress only",
      "Egress only",
      "Both Ingress and Egress",
      "DenyAll policy type",
      "Egress with explicit deny rules"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To create default deny egress, policyTypes must include Egress, and no egress rules should be defined. This combination blocks all outgoing traffic while allowing explicit exceptions through subsequent allow rules. The Kubernetes NetworkPolicy documentation emphasizes this pattern for implementing zero-trust network policies.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes NetworkPolicy Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "Cilium Network Policy Guide",
        "url": "https://docs.cilium.io/en/stable/security/policy/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 225,
    "question": "In Kubernetes NetworkPolicy configuration, what podSelector configuration creates a default-deny-all policy that applies to all pods in a namespace?",
    "options": [
      "Empty selector: {}",
      "Wildcard selector: '*'",
      "Omitted podSelector field",
      "Null value: podSelector: null",
      "Label-based exclusion selector"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "An empty podSelector ({}) matches all pods in the namespace, while omitting the field would make the policy ineffective. This configuration is critical for implementing namespace-wide default-deny policies, as documented in Kubernetes network policy best practices and the CIS Kubernetes Benchmark.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes NetworkPolicy Best Practices",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-deny-all-ingress-and-all-egress-traffic"
      },
      {
        "name": "Aqua Security Kubernetes Network Policy Guide",
        "url": "https://blog.aquasec.com/kubernetes-network-policy-best-practices"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 226,
    "question": "Which securityContext configuration field enables privileged container mode in Kubernetes pods?",
    "options": [
      "allowPrivilegeEscalation: true",
      "runAsPrivileged: true",
      "privileged: true",
      "capabilities.add: [\"ALL\"]",
      "securityContext.privilegedMode: enabled"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The privileged: true setting gives the container full access to host devices and capabilities, equivalent to root privileges on the host. This dangerous configuration should be avoided in production, as emphasized in Kubernetes security documentation and CIS Benchmarks. Privileged containers bypass most security controls and namespace restrictions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Security Context Documentation",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "CIS Kubernetes Benchmark v1.8 - 5.2.1",
        "url": "https://www.cisecurity.org/benchmark/kubernetes"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 228,
    "question": "Which Kubernetes pod specification field prevents automatic mounting of the default ServiceAccount token?",
    "options": [
      "mountServiceAccountToken: false",
      "automountServiceAccountToken: false",
      "serviceAccountToken: disabled",
      "disableServiceAccountMount: true",
      "serviceAccountMountPolicy: none"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "automountServiceAccountToken: false in the pod spec prevents automatic mounting of the service account token, reducing attack surface. This security hardening measure is recommended when pods don't need Kubernetes API access, as noted in the Kubernetes service account documentation and security best practices guides.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Service Accounts Documentation",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 229,
    "question": "Why would you disable automounting of ServiceAccount tokens in a Kubernetes Pod?",
    "options": [
      "To reduce memory usage of the Pod",
      "To prevent the Pod from having unnecessary or unauthorized access to the Kubernetes API",
      "To improve the application's runtime performance",
      "To enable network policies enforcement",
      "To allow the Pod to use multiple ServiceAccounts simultaneously"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Disabling automounting of ServiceAccount tokens prevents the Pod from automatically receiving credentials that grant access to the Kubernetes API. This reduces the attack surface by limiting the Pod's ability to interact with the cluster unless explicitly required. The other options are incorrect because automounting tokens does not significantly affect memory usage or application performance, does not directly enable network policies, and Pods cannot use multiple ServiceAccounts simultaneously.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Service Accounts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      },
      {
        "name": "Kubernetes Official Documentation - Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 231,
    "question": "What is the primary function of the ImagePolicyWebhook admission controller in Kubernetes?",
    "options": [
      "To scan container images for vulnerabilities during runtime",
      "To enforce custom policies on container images during admission to the cluster",
      "To cache container images locally for faster deployment",
      "To automatically update container images to the latest version",
      "To log all image pull requests for auditing purposes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The ImagePolicyWebhook admission controller intercepts Pod creation requests and enforces policies on container images before they are admitted into the cluster, such as validating image signatures or restricting images from untrusted registries. It does not perform runtime vulnerability scanning, caching, automatic updates, or logging image pulls, which are handled by other tools or controllers.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Admission Controllers",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#imagepolicywebhook"
      },
      {
        "name": "Kubernetes Blog - Using ImagePolicyWebhook for Image Validation",
        "url": "https://kubernetes.io/blog/2019/03/21/image-policy-webhook/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 232,
    "question": "In a Kubernetes audit policy, which log level should be set to capture the full content of both requests and responses?",
    "options": [
      "None",
      "Metadata",
      "Request",
      "RequestResponse",
      "Content"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The 'RequestResponse' audit log level records both the metadata and the full content of requests and responses, providing comprehensive audit information. 'None' disables logging, 'Metadata' logs only metadata without content, 'Request' logs request content but not responses, and 'Content' is not a valid audit log level in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "Kubernetes Official Documentation - Audit Policy",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/audit/#audit-levels"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 233,
    "question": "How do you configure a Kubernetes audit policy rule to log events for all resources within a specific namespace?",
    "options": [
      "Set 'namespace: <namespace>' in the policy rule",
      "Use 'namespaces: [\"<namespace>\"]' under the rule's 'namespaces' field",
      "Add 'resourceNames: [\"<namespace>\"]' to the rule",
      "Set 'level: Namespace' in the policy",
      "Specify 'namespaceSelector: {matchNames: [\"<namespace>\"]}'"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "In Kubernetes audit policies, the 'namespaces' field in a rule specifies the namespaces to which the rule applies, allowing you to log events for all resources within those namespaces. The other options are incorrect because 'namespace' is not a valid field, 'resourceNames' filters specific resource names rather than namespaces, 'level' defines log verbosity not scope, and 'namespaceSelector' is not used in audit policies.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Audit Policy Configuration",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy"
      },
      {
        "name": "Kubernetes GitHub - Audit Policy Examples",
        "url": "https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apiserver/plugin/pkg/audit/policy/testdata/policy.yaml"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 234,
    "question": "Which kubectl command correctly creates a generic secret named 'db-secret' with a key 'password' and the value 'S3cr3t!'?",
    "options": [
      "kubectl create secret generic db-secret --password='S3cr3t!'",
      "kubectl create secret db-secret --from-literal='password=S3cr3t!'",
      "kubectl create secret generic db-secret --from-literal=password=S3cr3t!",
      "kubectl create secret tls db-secret --key='S3cr3t!'",
      "kubectl create secret docker-registry db-secret --password='S3cr3t!'"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct command uses 'kubectl create secret generic' with the '--from-literal' flag to specify a key-value pair for the secret. The syntax is: kubectl create secret generic db-secret --from-literal=password=S3cr3t!. The other options are incorrect because '--password' is not a valid flag for generic secrets, 'kubectl create secret' without 'generic' is incomplete, 'tls' secrets require certificate and key files, and 'docker-registry' secrets are for Docker credentials, not arbitrary key-value pairs.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Managing Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-manually"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl create secret",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#create-secret"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 235,
    "question": "How can you retrieve the value of a secret key 'username' from the secret 'db-secret' in the namespace 'prod'?",
    "options": [
      "kubectl get secret db-secret -n prod -o jsonpath='{.data.username}' | base64 --decode",
      "kubectl describe secret db-secret -n prod",
      "kubectl get secret db-secret -n prod -o yaml",
      "kubectl read secret db-secret -n prod --key=username",
      "kubectl decode secret db-secret -n prod --field=username"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To extract and decode the secret value, you use `kubectl get` with `jsonpath` to specify the key and then decode the base64 encoded value. This method is efficient for retrieving specific secret values.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "Kubectl Reference",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 250,
    "question": "Which Kubernetes resource is used to enforce Pod Security Standards within a namespace?",
    "options": [
      "PodSecurityPolicy",
      "NetworkPolicy",
      "LimitRange",
      "ResourceQuota",
      "Pod Security Admission Controller"
    ],
    "correct_answers": [
      4
    ],
    "explanation": "The Pod Security Admission Controller is responsible for enforcing Pod Security Standards in Kubernetes. It ensures that pods comply with predefined security policies, enhancing cluster security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Pod Security Admission Controller",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 267,
    "question": "Which built-in Kubernetes authentication method is generally not recommended for production environments?",
    "options": [
      "Static Token File",
      "OpenID Connect (OIDC)",
      "Service Accounts",
      "Client Certificates",
      "Integrating with cloud provider IAM"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Static Token File authentication is not recommended for production due to security concerns. It lacks the robustness and flexibility of other methods like OIDC or Service Accounts.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authentication",
    "sources": [
      {
        "name": "Kubernetes Authentication",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/"
      },
      {
        "name": "Static Token File Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-token-file"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 268,
    "question": "Which Kubernetes resource defines permissions within a specific namespace?",
    "options": [
      "ClusterRole",
      "ClusterRoleBinding",
      "Role",
      "RoleBinding",
      "ServiceAccount"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A Role in Kubernetes defines permissions within a namespace. It specifies what actions can be performed by users or service accounts within that namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes Roles",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole"
      },
      {
        "name": "RBAC Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 269,
    "question": "What is the primary function of a 'RoleBinding' in Kubernetes RBAC?",
    "options": [
      "Defines cluster-wide permissions",
      "Binds a ClusterRole to a namespace",
      "Binds a Role to users or groups within a namespace",
      "Creates a new ServiceAccount",
      "Defines network policies"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A RoleBinding in Kubernetes assigns a Role to specific users or groups within a namespace, granting them the permissions defined by that Role.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Authorization",
    "sources": [
      {
        "name": "Kubernetes RoleBindings",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding"
      },
      {
        "name": "RBAC Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 271,
    "question": "What admission controller should be used to enforce Pod Security Standards in Kubernetes versions 1.25 and later?",
    "options": [
      "PodSecurityPolicy",
      "Pod Security Admission Controller",
      "NodeRestriction",
      "ResourceQuota",
      "LimitRanger"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The Pod Security Admission Controller is the recommended method for enforcing Pod Security Standards in Kubernetes versions 1.25 and above. This controller replaces the deprecated PodSecurityPolicy and provides a more flexible and efficient way to manage pod security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      },
      {
        "name": "Kubernetes Release Notes",
        "url": "https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 272,
    "question": "In Kubernetes, what is the main reason for using namespaces?",
    "options": [
      "To provide network isolation between different applications.",
      "To group and logically isolate resources such as deployments, services, and pods.",
      "To enforce security policies across the entire cluster.",
      "To manage the lifecycle of persistent storage volumes.",
      "To monitor the overall health and performance of the Kubernetes cluster."
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Namespaces in Kubernetes are primarily used to logically divide a cluster into multiple virtual clusters. This allows teams or projects to operate in isolation from one another within the same physical cluster. While namespaces can be used in conjunction with network policies to provide network isolation, their primary purpose is logical grouping and isolation of Kubernetes resources like pods, services, and deployments. They do not inherently enforce security policies or manage storage volumes directly, nor are they primarily for monitoring cluster health.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Resource Management and Isolation",
    "sources": [
      {
        "name": "Kubernetes Documentation: Namespaces",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      },
      {
        "name": "Aqua Security: Kubernetes Namespaces",
        "url": "https://www.aquasec.com/cloud-native-academy/kubernetes-security/kubernetes-namespaces/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:06:54"
  },
  {
    "id": 274,
    "question": "What is the recommended method for storing sensitive data, such as passwords or tokens, in a Kubernetes environment?",
    "options": [
      "Hardcode them in application code",
      "Store them in ConfigMaps",
      "Use Kubernetes Secrets",
      "Store them in environment variables",
      "Include them in container images"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Kubernetes Secrets are specifically designed to securely store sensitive data. They provide a secure way to manage and distribute sensitive information to pods, reducing the risk of data exposure compared to other methods like hardcoding or using environment variables.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Secrets",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "name": "OWASP Secure Coding Practices",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_Practices.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 275,
    "question": "Which Kubernetes resource is used to enforce network segmentation between pods?",
    "options": [
      "NetworkPolicy",
      "PodSecurityPolicy",
      "ResourceQuota",
      "LimitRange",
      "Ingress"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "NetworkPolicy defines rules that segment network traffic between pods, allowing you to control the flow of traffic and isolate pods from each other. This is essential for securing communication within a Kubernetes cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "Calico Network Policies",
        "url": "https://docs.projectcalico.org/security/calico-network-policy"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 276,
    "question": "Why is it advisable to avoid running containers with root privileges in a Kubernetes environment?",
    "options": [
      "It increases resource consumption",
      "It can lead to security risks by granting unnecessary permissions",
      "It reduces application performance",
      "It prevents containers from accessing the network",
      "It is required by Kubernetes policies"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Running containers as root increases the risk of privilege escalation and other security attacks. By running containers as non-root users, you reduce the attack surface and improve the overall security posture of your Kubernetes environment.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "OWASP Secure Coding Practices",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_Practices.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 277,
    "question": "Which security context setting ensures that a container runs as a non-root user in Kubernetes?",
    "options": [
      "privileged: false",
      "allowPrivilegeEscalation: false",
      "runAsNonRoot: true",
      "readOnlyRootFilesystem: true",
      "capabilities: []"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Setting 'runAsNonRoot: true' in a pod's security context ensures that the container is not run as the root user. This setting helps prevent unnecessary privilege escalation and improves container security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 278,
    "question": "In Kubernetes security contexts, what specific security benefit does configuring 'readOnlyRootFilesystem: true' provide to containers?",
    "options": [
      "Prevents container processes from modifying host network configurations",
      "Enables root user privileges for container operations",
      "Restricts container processes from writing to the root filesystem",
      "Allows containers to bypass filesystem permission checks",
      "Disables container logging capabilities"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Setting readOnlyRootFilesystem to true mounts the container's root filesystem as read-only, preventing malicious processes from writing to or modifying system files. This hardening measure significantly reduces attack surfaces by blocking persistence mechanisms and limiting damage from container escapes. Other options describe unrelated security mechanisms: network restrictions (option 1), privilege escalation (option 2/4), and logging (option 5) require separate configurations.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Documentation - Security Contexts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      },
      {
        "name": "CIS Kubernetes Benchmark v1.8",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 281,
    "question": "When implementing Kubernetes NetworkPolicies, what security implication should administrators consider when using an empty podSelector field?",
    "options": [
      "Creates a default-allow-all traffic pattern within the namespace",
      "Applies the policy to all pods in the specified namespace",
      "Generates validation errors in the policy controller",
      "Only affects newly created pods in the namespace",
      "Enforces cross-namespace communication rules"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "An empty podSelector in a NetworkPolicy selects all pods in the namespace, meaning the policy applies to all pods in that namespace. The effect on traffic depends on the policy's ingress and egress rules; it does not by itself create a default-allow or default-deny behavior. Administrators should carefully design policies with empty podSelectors to avoid unintended broad application. Other options misrepresent NetworkPolicy mechanics: validation errors (option 3) do not occur due to empty selectors, scope is not limited to new pods (option 4), and cross-namespace communication (option 5) requires explicit policy rules.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes NetworkPolicy Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "NSA/CISA Kubernetes Hardening Guide",
        "url": "https://media.defense.gov/2022/Aug/29/2003066362/-1/-1/0/CTR_KUBERNETES_HARDENING_GUIDANCE_1.2_20220829.PDF"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 17:30:24"
  },
  {
    "id": 286,
    "question": "What critical security objectives are achieved through regular vulnerability scanning of container images in Kubernetes environments?",
    "options": [
      "Optimizes container runtime performance metrics",
      "Reduces container image layer count",
      "Identifies and remediates known software vulnerabilities",
      "Ensures compliance with open-source licensing",
      "Accelerates container deployment pipelines"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Regular image scanning detects vulnerabilities in base images and dependencies, enabling remediation before deployment. This practice addresses CVE management and reduces attack surfaces, forming a crucial part of DevSecOps pipelines. Other options describe unrelated benefits: performance (option 1), licensing (option 4), and deployment speed (option 5) require different tooling and processes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Image Security",
    "sources": [
      {
        "name": "NIST SP 800-190 Container Security Guide",
        "url": "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 287,
    "question": "Which open-source tool specializes in static security analysis of Kubernetes manifests through vulnerability scanning and policy checks?",
    "options": [
      "kube-hunter (penetration testing tool)",
      "kubesec (security risk analysis)",
      "kubectl (cluster management CLI)",
      "kubelet (node agent)",
      "etcdctl (key-value store client)"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubesec analyzes Kubernetes manifests for security misconfigurations, providing risk scores and remediation guidance. It checks for common issues like privileged containers, missing security contexts, and insecure capabilities. Other tools serve different purposes: kube-hunter (option 1) tests live clusters, kubectl (option 3) manages resources, kubelet (option 4) runs pods, and etcdctl (option 5) interacts with etcd.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Controls and Frameworks",
    "sources": [
      {
        "name": "Kubesec GitHub Repository",
        "url": "https://github.com/controlplaneio/kubesec"
      },
      {
        "name": "CNCF Security Tooling Landscape",
        "url": "https://landscape.cncf.io/card-mode?category=security-compliance&grouping=category"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 292,
    "question": "How do Kubernetes NetworkPolicies enhance cluster security when properly configured?",
    "options": [
      "Enable automatic TLS certificate rotation",
      "Enforce least-privilege communication between pods",
      "Manage persistent volume encryption",
      "Provide application auto-scaling capabilities",
      "Enable cluster-wide logging aggregation"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "NetworkPolicies implement microsegmentation by controlling pod-to-pod communication through label selectors, effectively enforcing zero-trust networking principles. They prevent lateral movement attacks by restricting traffic flows between services. Other options describe unrelated features: TLS (option 1), storage (option 3), scaling (option 4), and logging (option 5) require different configurations.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Policy",
    "sources": [
      {
        "name": "Kubernetes NetworkPolicy Best Practices",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#best-practices"
      },
      {
        "name": "CIS Kubernetes Benchmark Network Policies Section",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 293,
    "question": "What is the primary purpose of audit logging in Kubernetes?",
    "options": [
      "To monitor application performance",
      "To track and record API server requests for security and compliance auditing",
      "To manage network policies",
      "To automatically scale applications based on load",
      "To store container images"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Audit logging in Kubernetes is designed to record all requests made to the API server, capturing details about who did what and when. This information is crucial for security auditing, compliance monitoring, and forensic analysis. It is not intended for monitoring application performance, managing network policies, scaling applications, or storing container images, which are handled by other Kubernetes components or tools.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/"
      },
      {
        "name": "CNCF Security Whitepaper - Kubernetes Audit Logging",
        "url": "https://github.com/cncf/sig-security/blob/main/security-whitepaper.md#audit-logging"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 294,
    "question": "Which API server flag is used to specify the audit policy file that defines what events are recorded in Kubernetes audit logs?",
    "options": [
      "--audit-log-path",
      "--audit-policy-file",
      "--enable-audit",
      "--audit-log-maxage",
      "--audit-log-format"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The '--audit-policy-file' flag is used to specify the path to the audit policy file, which controls the granularity and types of events that are logged by the Kubernetes API server. Other flags like '--audit-log-path' specify where to write the logs, '--audit-log-maxage' controls log retention, and '--audit-log-format' defines the log format. There is no '--enable-audit' flag; audit logging is enabled by configuring these flags properly.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Audit Logging",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Auditing",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/#audit-policy"
      },
      {
        "name": "Kubernetes API Server Command Line Reference",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 295,
    "question": "In Kubernetes, what is the purpose of the Pod Security Standards?",
    "options": [
      "A deprecated feature replaced by PodSecurityPolicy",
      "A set of built-in policies that enforce best practices for pod security",
      "A configuration for network policies",
      "A type of storage class for pods",
      "An admission controller for scheduling pods"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Pod Security Standards (PSS) are predefined policy levels provided by Kubernetes to enforce security best practices for pods. They replace the deprecated PodSecurityPolicy and provide three levels—Privileged, Baseline, and Restricted—to control pod permissions and capabilities. They are not related to network policies, storage classes, or pod scheduling admission controllers.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Standards",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Kubernetes Blog - Deprecation of PodSecurityPolicy",
        "url": "https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-pod-security-admission/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 296,
    "question": "Which of the following are the recognized Pod Security Standard levels in Kubernetes? (Select all that apply)",
    "options": [
      "Privileged",
      "Baseline",
      "Restricted",
      "Unrestricted",
      "Default"
    ],
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "The Pod Security Standards define three levels of security enforcement for pods: Privileged, Baseline, and Restricted. 'Privileged' allows the most permissions, 'Baseline' enforces a moderate security posture suitable for most applications, and 'Restricted' enforces the strictest security controls. 'Unrestricted' and 'Default' are not recognized Pod Security Standard levels.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Standards",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 297,
    "question": "Which Kubernetes resource is commonly used to integrate Open Policy Agent (OPA) for policy enforcement through admission control?",
    "options": [
      "ValidatingWebhookConfiguration",
      "MutatingWebhookConfiguration",
      "AdmissionController",
      "CustomResourceDefinition",
      "PolicyController"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The 'ValidatingWebhookConfiguration' resource is used to register admission webhooks that validate requests to the Kubernetes API server. Open Policy Agent (OPA) leverages this mechanism to enforce custom policies by intercepting and validating API requests. 'MutatingWebhookConfiguration' is used for modifying requests, 'AdmissionController' is a general concept, 'CustomResourceDefinition' defines new resource types, and 'PolicyController' is not a standard Kubernetes resource.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Admission Controllers",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      },
      {
        "name": "Open Policy Agent - Kubernetes Admission Control",
        "url": "https://www.openpolicyagent.org/docs/latest/kubernetes-admission-control/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  },
  {
    "id": 298,
    "question": "What is the primary function of Open Policy Agent (OPA) in Kubernetes?",
    "options": [
      "To serve as a container runtime",
      "To enforce policies and make authorization decisions",
      "To provide logging and monitoring capabilities",
      "To manage network routing",
      "To handle storage management"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Open Policy Agent (OPA) is a general-purpose policy engine that evaluates inputs against defined policies to make authorization decisions. In Kubernetes, OPA is commonly used to enforce security and compliance policies on cluster resources. Incorrect options, such as serving as a container runtime, logging, or network management, describe functionalities unrelated to OPA's role.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Pod Security Admissions",
    "sources": [
      {
        "name": "CNCF Blog - Secure Your Kubernetes Environment with OPA and Gatekeeper",
        "url": "https://www.cncf.io/blog/2023/10/09/secure-your-kubernetes-environment-with-opa-and-gatekeeper/"
      },
      {
        "name": "Spacelift Blog - Kubernetes with Open Policy Agent (OPA) & Gatekeeper",
        "url": "https://spacelift.io/blog/opa-kubernetes"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:33:32"
  },
  {
    "id": 299,
    "question": "What is a primary benefit of using Namespaces in Kubernetes?",
    "options": [
      "Improves application performance",
      "Provides a mechanism for resource isolation and organization",
      "Simplifies container image management",
      "Automatically scales applications based on load",
      "Eliminates the need for Pods"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Namespaces in Kubernetes provide a way to logically separate and isolate resources within a cluster, enabling multiple teams or projects to share the same cluster without resource conflicts. They help organize cluster resources and apply resource quotas or policies per namespace. Namespaces do not directly improve application performance, simplify container images, automatically scale applications, or replace Pods, which are fundamental units of deployment in Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Security Fundamentals",
    "subdomain": "Network Isolation and Segmentation",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Namespaces",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      },
      {
        "name": "CNCF - Kubernetes Basics: Namespaces",
        "url": "https://www.cncf.io/blog/2020/06/09/kubernetes-namespaces-demystified/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 16:46:36"
  }
];
