
// Exported 89 questions for domain: Kubernetes Cluster Component Security
// Last revision date: 2025-10-04 21:16:44
export const KubernetesClusterComponentSecurityQuestions = [
  {
    "id": 6,
    "question": "Which Kubernetes admission controller runs first during the admission control process?",
    "options": [
      "ValidatingAdmissionWebhook",
      "MutatingAdmissionWebhook",
      "ResourceQuota",
      "NamespaceLifecycle",
      "AlwaysPullImages"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The MutatingAdmissionWebhook runs first in the Kubernetes admission control process. This is because mutating admission controllers are designed to modify the incoming request before it is validated by validating admission controllers. Other options, such as ValidatingAdmissionWebhook, ResourceQuota, NamespaceLifecycle, and AlwaysPullImages, either run later in the process or serve different purposes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Admission Controllers",
        "url": "https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/"
      },
      {
        "name": "Styra Blog - What Is Kubernetes Admission Control?",
        "url": "https://www.styra.com/blog/what-is-kubernetes-admission-control/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:10:18"
  },
  {
    "id": 9,
    "question": "What is the recommended method to restrict access to the Kubernetes kubelet API securely?",
    "options": [
      "Disable the kubelet service entirely",
      "Configure kubelet with '--authorization-mode=Webhook' and '--authentication-token-webhook=true' flags",
      "Remove the kubelet binary from all nodes",
      "Access kubelet only via SSH tunnels",
      "Set '--allow-privileged=false' to restrict privileged containers"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kubelet API should be secured by enabling authentication and authorization mechanisms. Using the '--authorization-mode=Webhook' flag enables authorization via an external webhook, typically the API server, while '--authentication-token-webhook=true' enables token-based authentication against the API server. This combination ensures that only authenticated and authorized requests can access the kubelet API. Disabling the kubelet or removing it is impractical as it is essential for node management. Accessing kubelet only via SSH does not inherently secure the API itself. Setting '--allow-privileged=false' restricts privileged containers but does not control API access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Kubelet Authentication and Authorization",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-authentication-authorization/"
      },
      {
        "name": "CNCF Kubernetes Security Best Practices",
        "url": "https://github.com/cncf/sig-security/blob/main/security-best-practices/kubelet.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 17,
    "question": "How can you update the container image of a Kubernetes deployment without modifying other deployment configurations?",
    "options": [
      "Manually edit the deployment YAML file and apply changes",
      "Delete the existing deployment and recreate it with the new image",
      "Use the 'kubectl set image' command to update the image",
      "Scale the deployment down to zero replicas, update the image, then scale back up",
      "Update the image directly in the container registry"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The 'kubectl set image' command allows you to update the container image of a deployment directly without changing other configuration parameters. This command triggers a rolling update, ensuring minimal downtime. Manually editing the YAML is error-prone and may unintentionally alter other settings. Deleting and recreating the deployment causes downtime and loss of state. Scaling down to zero is unnecessary and disruptive. Updating the image in the container registry alone does not affect running deployments.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Updating a Deployment",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment"
      },
      {
        "name": "Kubernetes kubectl Cheat Sheet",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/#updating-resources"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 21,
    "question": "How do you configure Kubernetes to use a specific container runtime, such as containerd, on a node?",
    "options": [
      "Specify the container runtime in the pod specification",
      "Set the '--container-runtime-endpoint' flag in the kubelet configuration",
      "Configure the container runtime in the kube-proxy settings",
      "Rely on automatic detection; no manual configuration is required",
      "Set an environment variable on the master node to specify the runtime"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kubelet is responsible for managing the container runtime on each node. To specify a container runtime like containerd, you configure the kubelet with the '--container-runtime-endpoint' flag, which points to the runtime's socket endpoint. This setting ensures kubelet communicates with the correct container runtime. The pod specification does not control the runtime used by the node. Kube-proxy manages networking and is unrelated to container runtimes. Automatic detection is not reliable for runtime selection. Environment variables on the master node do not affect node-level runtime configuration.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Container Runtimes",
        "url": "https://kubernetes.io/docs/setup/production-environment/container-runtimes/"
      },
      {
        "name": "Kubernetes Official Documentation - Kubelet Configuration",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 25,
    "question": "Which of the following best practices are recommended to secure the Kubernetes scheduler (kube-scheduler)? (Select all that apply.)",
    "options": [
      "Bind the scheduler to 0.0.0.0 to ensure it is accessible from all network interfaces",
      "Use Role-Based Access Control (RBAC) to restrict access to the scheduler API",
      "Run the scheduler as a non-root user to minimize privilege escalation risks",
      "Enable anonymous authentication to simplify access for debugging purposes",
      "Configure network policies to restrict network access to and from the scheduler"
    ],
    "correct_answers": [
      1,
      2,
      4
    ],
    "explanation": "The recommended security measures for securing the kube-scheduler include: using Role-Based Access Control (RBAC) to enforce least privilege, ensuring only authorized entities can interact with the scheduler's API; running the kube-scheduler as a non-root user to reduce potential risks of privilege escalation in case of a compromise; and configuring network policies to restrict unauthorized network access to or from the kube-scheduler, thereby enhancing its security. Binding the scheduler to 0.0.0.0 increases exposure and is not recommended. Similarly, enabling anonymous authentication weakens security by allowing unauthenticated access.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [
      {
        "name": "Kubernetes Documentation - Security Overview",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      },
      {
        "name": "Red Hat Blog - Kubernetes Configuration Best Practices",
        "url": "https://www.redhat.com/en/blog/12-kubernetes-configuration-best-practices"
      },
      {
        "name": "Kubernetes RBAC Best Practices",
        "url": "https://www.getambassador.io/blog/kubernetes-rbac-role-based-access-control"
      }
    ],
    "revision": 2,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 26,
    "question": "Which of the following controllers are included in the Kubernetes kube-controller-manager? (Select all that apply)",
    "options": [
      "Node Controller",
      "ReplicaSet Controller",
      "Ingress Controller",
      "Cloud Controller Manager",
      "Service Account Controller"
    ],
    "correct_answers": [
      0,
      1,
      4
    ],
    "explanation": "The kube-controller-manager runs several core controllers including the Node Controller, which manages node status; the ReplicaSet Controller, which ensures the desired number of pod replicas; and the Service Account Controller, which manages service account tokens. The Ingress Controller is typically deployed separately as an add-on and is not part of the kube-controller-manager. The Cloud Controller Manager is a separate component responsible for cloud-specific control loops and is not included in the kube-controller-manager.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Controller Manager",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/"
      },
      {
        "name": "Kubernetes Official Documentation - Controllers",
        "url": "https://kubernetes.io/docs/concepts/architecture/controller/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 29,
    "question": "Which of the following actions can improve the security of the Kubernetes kubelet? (Select all that apply)",
    "options": [
      "Enable authentication and authorization on the kubelet API",
      "Disable anonymous access to the kubelet",
      "Expose the kubelet read-only port to all network interfaces",
      "Use TLS certificates for kubelet communication",
      "Run the kubelet process in privileged mode"
    ],
    "correct_answers": [
      0,
      1,
      3
    ],
    "explanation": "Improving kubelet security involves enabling authentication and authorization to ensure only authorized users can access the API, disabling anonymous access to prevent unauthenticated requests, and using TLS certificates to encrypt communication between components. Exposing the read-only port publicly increases attack surface and is discouraged. Running kubelet in privileged mode is not a security best practice and can increase risk.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Securing the Kubelet",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubelet-authentication-authorization/"
      },
      {
        "name": "CNCF Kubernetes Security Best Practices",
        "url": "https://github.com/cncf/sig-security/blob/main/security-best-practices/kubelet.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 34,
    "question": "Which directories on a client machine contain sensitive information related to accessing Kubernetes clusters? (Select all that apply)",
    "options": [
      "/var/log/",
      "~/.kube/config",
      "/etc/hosts",
      "~/.ssh/",
      "/tmp/"
    ],
    "correct_answers": [
      1,
      3
    ],
    "explanation": "The ~/.kube/config file stores Kubernetes cluster access credentials and configuration, making it sensitive. The ~/.ssh/ directory contains SSH keys used for secure access to nodes or clusters. Other directories like /var/log/, /etc/hosts, and /tmp/ do not typically contain sensitive Kubernetes access information.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Configure Access to Multiple Clusters",
        "url": "https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/"
      },
      {
        "name": "Kubernetes Security Best Practices - SSH Key Management",
        "url": "https://www.redhat.com/sysadmin/kubernetes-security-best-practices"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 36,
    "question": "In managed Kubernetes services (e.g., EKS, GKE, AKS), who is responsible for managing the etcd cluster?",
    "options": [
      "The user manages etcd directly",
      "The cloud provider manages etcd",
      "etcd is not used in managed services",
      "A third-party vendor manages etcd",
      "The Kubernetes community manages etcd"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "In managed Kubernetes services, the cloud provider is responsible for managing the etcd cluster, including backups, scaling, and availability. Users do not manage etcd directly. etcd is a core component of Kubernetes and is always used, but its management is abstracted away in managed services. The Kubernetes community develops etcd but does not manage individual clusters.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [
      {
        "name": "Amazon EKS Documentation - Cluster Architecture",
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/cluster-architecture.html"
      },
      {
        "name": "Google Kubernetes Engine Documentation - Control Plane",
        "url": "https://cloud.google.com/kubernetes-engine/docs/concepts/control-plane"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 37,
    "question": "What types of data are stored inside the etcd key-value store in a Kubernetes cluster? (Select all that apply)",
    "options": [
      "Kubernetes cluster state",
      "Persistent application data",
      "Pod logs",
      "Secrets and ConfigMaps",
      "Container images"
    ],
    "correct_answers": [
      0,
      3
    ],
    "explanation": "etcd stores the entire Kubernetes cluster state, including resource objects such as Secrets and ConfigMaps. It does not store persistent application data (which is stored in volumes), pod logs (which are stored on nodes or centralized logging systems), or container images (stored in container registries).",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - etcd",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#etcd"
      },
      {
        "name": "CoreOS etcd Documentation - What is etcd?",
        "url": "https://etcd.io/docs/v3.5/what-is-etcd/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 41,
    "question": "Which of the following statements about static pods in Kubernetes are true? (Select all that apply)",
    "options": [
      "They are managed directly by the kubelet on a node",
      "They are defined in the API server and stored in etcd",
      "They are useful for running critical system components",
      "They are automatically rescheduled on other nodes if the node fails",
      "They can be updated using kubectl commands"
    ],
    "correct_answers": [
      0,
      2
    ],
    "explanation": "Static pods are defined by placing pod manifest files directly on a node’s filesystem and are managed by the kubelet on that node, not through the API server or etcd. They are useful for running critical system components that must run on a specific node. Static pods are not rescheduled automatically if the node fails, and they cannot be updated via kubectl since they are not managed through the Kubernetes API.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Static Pods",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/"
      },
      {
        "name": "Kubernetes Blog - Understanding Static Pods",
        "url": "https://kubernetes.io/blog/2016/07/static-pods/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 42,
    "question": "When you run the command 'kubectl apply', which Kubernetes component processes the request first?",
    "options": [
      "etcd",
      "kube-scheduler",
      "kube-controller-manager",
      "kube-apiserver",
      "kubelet"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "All kubectl commands interact first with the kube-apiserver, which is the central management entity of the Kubernetes control plane. The API server authenticates and validates the request, then persists the desired state in etcd. Other components like the scheduler and controller manager act later based on the updated state.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl Overview",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes Architecture - Control Plane Components",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 43,
    "question": "What is the primary function of the Kubernetes scheduler in a cluster?",
    "options": [
      "To monitor the overall health of the cluster",
      "To assign pods to nodes based on resource availability and scheduling policies",
      "To manage service discovery within the cluster",
      "To enforce network policies between pods",
      "To control user access to the Kubernetes API server"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The Kubernetes scheduler is responsible for selecting the most suitable node for each pod to run on, based on resource availability, constraints, and scheduling policies. It does not monitor cluster health, manage service discovery, enforce network policies, or control API server access. Those responsibilities belong to other components like the kube-controller-manager, CoreDNS, network plugins, and the API server's authentication/authorization mechanisms.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Scheduler",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/"
      },
      {
        "name": "Kubernetes Architecture Overview",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 44,
    "question": "What is the impact on a Kubernetes cluster if the kube-proxy component enters a 'CrashLoopBackOff' state?",
    "options": [
      "Pods will not be scheduled on any nodes",
      "Network traffic between services may be disrupted or fail",
      "The entire Kubernetes cluster will shut down",
      "The kubelet service on nodes will stop functioning",
      "Access to Kubernetes Secrets will be blocked"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy manages network rules on each node to enable service communication and load balancing. If kube-proxy crashes repeatedly (CrashLoopBackOff), network traffic between services can be disrupted, causing failures in service discovery and connectivity. However, pod scheduling, kubelet operation, cluster availability, and secret access are not directly affected by kube-proxy failures.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kube-proxy",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies"
      },
      {
        "name": "Kubernetes Networking Concepts",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 56,
    "question": "What is the role of the Service Account Controller in Kubernetes?",
    "options": [
      "Manages the creation and lifecycle of service accounts and their associated authentication tokens",
      "Controls access permissions to external services from the cluster",
      "Assigns network policies to service accounts for traffic control",
      "Manages the lifecycle and scaling of Kubernetes services",
      "Handles automatic scaling of deployments based on load"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The Service Account Controller, part of the kube-controller-manager, is responsible for creating service accounts and generating the associated authentication tokens used by pods to interact securely with the Kubernetes API. It does not control external service access, assign network policies, manage service lifecycles, or handle deployment scaling.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Service Accounts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      },
      {
        "name": "Kubernetes Controller Manager Overview",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 57,
    "question": "Which of the following controllers is NOT managed by the kube-controller-manager in Kubernetes?",
    "options": [
      "Node Controller",
      "Endpoint Controller",
      "Ingress Controller",
      "Deployment Controller",
      "Service Account Controller"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The Ingress Controller is not part of the kube-controller-manager; it is typically deployed separately as a pod or set of pods to manage external HTTP/S traffic routing. The kube-controller-manager manages controllers such as Node, Endpoint, Deployment, and Service Account Controllers internally.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Controllers",
        "url": "https://kubernetes.io/docs/concepts/architecture/controller/"
      },
      {
        "name": "Kubernetes Ingress Controllers",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 58,
    "question": "Which of the following are best practices for securing etcd in a Kubernetes cluster? (Select all that apply)",
    "options": [
      "Enable TLS encryption for all communication with etcd",
      "Limit access to etcd endpoints to trusted networks only",
      "Use authentication and authorization mechanisms for etcd access",
      "Expose etcd endpoints publicly to facilitate monitoring",
      "Store etcd backups in a secure and access-controlled location"
    ],
    "correct_answers": [
      0,
      1,
      2,
      4
    ],
    "explanation": "Securing etcd is critical as it stores the cluster state and sensitive data. Best practices include enabling TLS encryption to protect data in transit, restricting access to trusted networks to prevent unauthorized access, implementing authentication and authorization to control who can access etcd, and securely storing backups to prevent data loss or compromise. Exposing etcd endpoints publicly is strongly discouraged as it poses a significant security risk.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Securing etcd",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/#securing-etcd"
      },
      {
        "name": "etcd Security Best Practices",
        "url": "https://etcd.io/docs/v3.5/op-guide/security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 59,
    "question": "Which Kubernetes component is responsible for persisting the cluster's state?",
    "options": [
      "kube-scheduler",
      "etcd",
      "kube-controller-manager",
      "kube-proxy",
      "kubelet"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "etcd is a distributed key-value store that persists the Kubernetes cluster's state. It ensures that the cluster's configuration and data are consistent across all nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      },
      {
        "name": "etcd Documentation",
        "url": "https://etcd.io/docs/v3.5/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 61,
    "question": "What is the effect of disabling anonymous authentication on the kubelet?",
    "options": [
      "Increased security by requiring authentication",
      "Nodes cannot join the cluster",
      "Pods fail to start",
      "kube-proxy stops working",
      "No effect; kubelet does not support anonymous access"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Disabling anonymous authentication on the kubelet enhances security by ensuring that only authenticated requests are accepted. This prevents unauthorized access and reduces the risk of attacks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      },
      {
        "name": "Kubelet Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 65,
    "question": "What does the '--anonymous-auth=false' flag do when set on the kube-apiserver?",
    "options": [
      "Disables anonymous requests to the API server",
      "Disables authentication entirely",
      "Allows all requests without authentication",
      "Enables anonymous authentication",
      "Forces all clients to use tokens"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Setting '--anonymous-auth=false' on the kube-apiserver ensures that all requests to the API server must be authenticated. This enhances security by preventing unauthorized access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes API Server Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Security Configuration",
        "url": "https://kubernetes.io/docs/concepts/security/controlling-access/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 77,
    "question": "Is there a Kubernetes object specifically designed to limit the number of concurrent requests to the API server?",
    "options": [
      "ResourceQuota",
      "LimitRange",
      "PodDisruptionBudget",
      "PriorityClass",
      "There is no such object"
    ],
    "correct_answers": [
      4
    ],
    "explanation": "Kubernetes does not have an object specifically for limiting concurrent API server requests. Instead, this is typically controlled through API server configuration flags.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes API Server Configuration",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Resource Management",
        "url": "https://kubernetes.io/docs/concepts/policy/resource-quotas/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 80,
    "question": "What is the primary role of the kube-proxy component in Kubernetes?",
    "options": [
      "Managing network policies",
      "Providing service discovery and routing",
      "Scheduling pods to nodes",
      "Storing cluster state",
      "Monitoring node health"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy is responsible for maintaining network rules on each node to ensure service discovery and routing. It does not manage network policies or schedule pods.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [
      {
        "name": "Kubernetes Networking Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/"
      },
      {
        "name": "kube-proxy Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 81,
    "question": "What command is used to check the version of the Kubernetes API server?",
    "options": [
      "'kubectl version'",
      "'kubectl get apiserver'",
      "'kube-apiserver --version'",
      "'kubectl cluster-info'",
      "'kubectl describe componentstatus'"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The `kubectl version` command is used to display the client and server versions of Kubernetes. This is useful for ensuring compatibility and identifying potential version mismatches.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes API Server",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 82,
    "question": "What is the default service type in Kubernetes if not explicitly specified?",
    "options": [
      "ClusterIP",
      "NodePort",
      "LoadBalancer",
      "ExternalName",
      "Ingress"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "If not specified, the default service type in Kubernetes is ClusterIP. This means the service is only accessible within the cluster. Other types like NodePort or LoadBalancer are used for external access.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Service Types",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types"
      },
      {
        "name": "Kubernetes Networking",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 84,
    "question": "What is the primary purpose of a PodDisruptionBudget in Kubernetes?",
    "options": [
      "To prevent pods from being evicted during maintenance",
      "To limit the number of pods in a namespace",
      "To allocate CPU and memory resources",
      "To define pod scheduling constraints",
      "To enforce network policies"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A PodDisruptionBudget ensures that a specified number of replicas of a pod are available at any time, preventing disruptions during maintenance or other events that might cause pod eviction.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes PodDisruptionBudget",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/disruptions/"
      },
      {
        "name": "Kubernetes Pod Management",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 86,
    "question": "What is the main function of the kubelet in a Kubernetes node?",
    "options": [
      "Managing pod networking",
      "Running containers on each node",
      "Storing cluster configuration",
      "Scheduling pods to nodes",
      "Managing the control plane"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kubelet is responsible for running and managing containers on each node in a Kubernetes cluster. It ensures that the pods are running as expected and reports back to the control plane.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Kubelet",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/"
      },
      {
        "name": "Kubernetes Node Management",
        "url": "https://kubernetes.io/docs/concepts/architecture/nodes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 92,
    "question": "How does Kubernetes ensure that a Deployment maintains the desired number of replicas?",
    "options": [
      "Through the kube-scheduler",
      "Using the ReplicaSet controller",
      "Via the kubelet on each node",
      "By the API server checking periodically",
      "It does not ensure this automatically"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes Deployments use ReplicaSets to ensure that the desired number of pod replicas is maintained. ReplicaSets automatically adjust the number of replicas if any discrepancies are detected.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Deployments",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      },
      {
        "name": "Kubernetes ReplicaSets",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
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
    "correct_answers": [
      4
    ],
    "explanation": "Kubernetes defines several Service types to expose applications: ClusterIP, NodePort, LoadBalancer, and ExternalName are valid types. 'InternalPort' is not a recognized Service type in Kubernetes and does not exist in the official API. ClusterIP exposes the service on a cluster-internal IP, NodePort exposes the service on each node's IP at a static port, LoadBalancer provisions an external load balancer, and ExternalName maps the service to a DNS name. Therefore, 'InternalPort' is invalid.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Services",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/"
      },
      {
        "name": "Kubernetes API Reference - Service Spec",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#service-v1-core"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 94,
    "question": "What is the purpose of the '--service-account-key-file' flag in the kube-apiserver?",
    "options": [
      "To specify the private key file used to sign service account tokens",
      "To define the service account used by the API server",
      "To store service account credentials",
      "To encrypt service account Secrets",
      "To disable service accounts"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '--service-account-key-file' flag in the kube-apiserver specifies the path to the private key file used to sign service account tokens. This key is critical for token authentication and validation. The API server uses this key to cryptographically sign tokens issued to service accounts, ensuring their authenticity. Other options are incorrect: the flag does not define which service account the API server uses, nor does it store credentials or encrypt Secrets. It also does not disable service accounts.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Service Accounts",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Security Best Practices - Service Accounts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 95,
    "question": "Which statement best describes the Kubernetes Ingress resource?",
    "options": [
      "It defines internal networking rules between pods",
      "It manages external HTTP and HTTPS access to services",
      "It is used for storing configuration data",
      "It schedules pods to nodes",
      "It provides persistent storage to pods"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes Ingress is a resource that manages external access to services, typically HTTP and HTTPS traffic. It provides routing rules to direct external requests to the appropriate backend services within the cluster. It does not define internal pod networking (that is handled by Services and network plugins), nor is it used for storing configuration data (ConfigMaps/Secrets), scheduling pods (handled by the scheduler), or providing persistent storage (handled by PersistentVolumes).",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Ingress",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/"
      },
      {
        "name": "Kubernetes Networking Concepts",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 96,
    "question": "How can you force delete a Kubernetes pod that is stuck in the 'Terminating' state?",
    "options": [
      "Run 'kubectl delete pod <pod-name>' normally",
      "Restart the kubelet service on the node",
      "Run 'kubectl delete pod <pod-name> --force --grace-period=0'",
      "Delete the node where the pod is running",
      "Edit the pod's YAML to remove finalizers"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A pod stuck in 'Terminating' state can be force deleted using the command 'kubectl delete pod <pod-name> --force --grace-period=0'. This command bypasses the graceful termination period and forcibly removes the pod from the API server, even if the pod's containers are still running. Restarting the kubelet or deleting the node can be disruptive and are not recommended first steps. Editing the pod's YAML to remove finalizers can help if finalizers are blocking deletion, but the force delete command is the standard immediate solution.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Deleting Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination"
      },
      {
        "name": "Kubernetes GitHub Issue - Pod stuck in Terminating",
        "url": "https://github.com/kubernetes/kubernetes/issues/40682"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 97,
    "question": "What is the effect of the 'kubectl config use-context' command in Kubernetes?",
    "options": [
      "Switches the active namespace in the current context",
      "Changes the current kubeconfig file being used",
      "Modifies the cluster configuration in kubeconfig",
      "Sets the current context to the specified one in kubeconfig",
      "Updates the API server endpoint in the current context"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The command 'kubectl config use-context <context-name>' sets the current context in the kubeconfig file to the specified context. This changes which cluster, user, and namespace kubectl commands operate against by default. It does not switch namespaces directly (that requires 'kubectl config set-context' or 'kubectl config set-namespace'), nor does it change the kubeconfig file itself or modify cluster details. It simply selects which predefined context is active.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Managing kubeconfig Files",
        "url": "https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/"
      },
      {
        "name": "Kubernetes kubectl Cheat Sheet",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 98,
    "question": "What command is used to list all pods across all namespaces in a Kubernetes cluster?",
    "options": [
      "'kubectl get pods'",
      "'kubectl get pods --all'",
      "'kubectl get pods -A'",
      "'kubectl get pods --namespaces'",
      "'kubectl get all-pods'"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The '-A' flag is used with 'kubectl get pods' to list resources in all namespaces. This is a shorthand for '--all-namespaces', which ensures that pods from every namespace are displayed.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/get-pods"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 99,
    "question": "What is the primary function of a ReplicaSet in Kubernetes?",
    "options": [
      "To ensure that a specified number of pod replicas are running at all times",
      "To expose services to external traffic using load balancing",
      "To store persistent data for applications",
      "To define and enforce network policies for pods",
      "To schedule pods to specific nodes based on resource requirements"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A ReplicaSet in Kubernetes ensures that a specified number of pod replicas are running at all times. It monitors existing pods and creates or deletes them as needed to maintain the desired state. Incorrect options: (1) Exposing services to external traffic is handled by Services, not ReplicaSets. (2) Persistent data storage is managed by PersistentVolumes and PersistentVolumeClaims. (3) Network policies are defined separately using NetworkPolicy resources. (4) Scheduling pods to specific nodes is handled by the Kubernetes Scheduler.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - ReplicaSet",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/"
      },
      {
        "name": "Kubernetes Concepts - Workloads and Controllers",
        "url": "https://kubernetes.io/docs/concepts/workloads/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 102,
    "question": "How do you scale a Kubernetes deployment named 'my-deployment' to 5 replicas using the CLI?",
    "options": [
      "kubectl scale deployment my-deployment --replicas=5",
      "kubectl update deployment my-deployment --replicas=5",
      "kubectl set deployment my-deployment replicas=5",
      "kubectl resize deployment my-deployment 5",
      "kubectl deploy my-deployment --replicas=5"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The 'kubectl scale' command is used to adjust the number of replicas in a deployment. In this case, 'kubectl scale deployment my-deployment --replicas=5' will scale the deployment to 5 replicas.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/scale"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/scale"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 103,
    "question": "Which Kubernetes component is responsible for maintaining network rules on nodes for services?",
    "options": [
      "kubelet",
      "kube-proxy",
      "kube-scheduler",
      "kube-controller-manager",
      "etcd"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy is the component that maintains network rules on nodes for services. It ensures that incoming traffic is properly routed to the correct service endpoints.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/"
      },
      {
        "name": "Kubernetes Architecture",
        "url": "https://kubernetes.io/docs/concepts/architecture/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 104,
    "question": "What is the primary function of a DaemonSet in Kubernetes?",
    "options": [
      "A pod runs on all nodes or a subset of nodes",
      "Only one pod runs in the cluster",
      "Pods are automatically scaled based on load",
      "Services are exposed externally",
      "ConfigMaps are synchronized across namespaces"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "DaemonSets ensure that a copy of a pod runs on each node or a subset of nodes in a Kubernetes cluster. This is useful for running system daemons or monitoring agents.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/"
      },
      {
        "name": "Kubernetes Workloads",
        "url": "https://kubernetes.io/docs/concepts/workloads/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 106,
    "question": "What happens by default when a container in a Kubernetes pod crashes?",
    "options": [
      "The pod is deleted",
      "Kubernetes does nothing",
      "The kubelet restarts the container",
      "An alert is sent to the administrator",
      "The node is drained"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "By default, when a container in a Kubernetes pod crashes, the kubelet will automatically restart it. This behavior can be configured using restart policies.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
      },
      {
        "name": "Kubernetes Kubelet",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 107,
    "question": "What command is used to update an image in a Kubernetes deployment?",
    "options": [
      "kubectl set image deployment/my-deployment my-container=my-image:tag",
      "kubectl update image deployment/my-deployment my-container=my-image:tag",
      "kubectl replace image deployment/my-deployment my-container=my-image:tag",
      "kubectl change image deployment/my-deployment my-container=my-image:tag",
      "kubectl edit deployment my-deployment"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The `kubectl set image` command is used to update the image for a specified container in a Kubernetes deployment. This command modifies the deployment configuration to use the new image, which triggers a rollout of the updated pods.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/commands/set-image"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 108,
    "question": "How can you prevent pods from being scheduled on a Kubernetes node?",
    "options": [
      "kubectl cordon <node-name>",
      "kubectl drain <node-name>",
      "kubectl taint nodes <node-name> key=value:NoSchedule",
      "kubectl label nodes <node-name> unschedulable=true",
      "kubectl delete node <node-name>"
    ],
    "correct_answers": [
      0,
      2
    ],
    "explanation": "Both cordoning and tainting a node with `kubectl taint nodes <node-name> key=value:NoSchedule` prevents pods without a matching toleration from being scheduled on it. This is a way to mark nodes as unsuitable for certain workloads without completely removing them from the cluster.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Taints and Tolerations",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/commands/taint"
      }
    ],
    "revision": 2,
    "revision_date": "2025-10-04 21:16:44"
  },
  {
    "id": 109,
    "question": "What is the primary function of the 'kubeadm' tool in Kubernetes?",
    "options": [
      "To manage container images",
      "To bootstrap Kubernetes clusters",
      "To monitor cluster health",
      "To deploy applications to the cluster",
      "To manage network policies"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The `kubeadm` tool is used to bootstrap a Kubernetes cluster, making it easier to set up and manage clusters. It automates the installation and configuration process, ensuring that all necessary components are properly initialized.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes kubeadm Documentation",
        "url": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/"
      },
      {
        "name": "Kubernetes kubeadm CLI Reference",
        "url": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 111,
    "question": "How do you delete a Kubernetes namespace and all its associated resources?",
    "options": [
      "kubectl delete all --namespace=<namespace>",
      "kubectl delete namespace <namespace>",
      "kubectl remove namespace <namespace>",
      "kubectl clean namespace <namespace>",
      "kubectl purge namespace <namespace>"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Deleting a namespace with `kubectl delete namespace <namespace>` removes the namespace and all resources within it. This includes pods, services, deployments, and other objects defined within that namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Namespaces Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/commands/delete-namespace"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 112,
    "question": "What is the purpose of the 'kubectl exec' command in Kubernetes?",
    "options": [
      "Executes a command on the Kubernetes control plane",
      "Runs a command inside a container in a pod",
      "Creates a new pod in the cluster",
      "Updates an existing deployment",
      "Deletes a Kubernetes resource"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl exec' is used to execute a command inside a running container within a Kubernetes pod. This is particularly useful for debugging or interacting with applications running inside containers. For example, you can use it to access logs or run shell commands within the container. Other options are incorrect because:\n- Option 0: Commands are not executed on the control plane using 'kubectl exec'.\n- Option 2: It does not create new pods; 'kubectl run' or deployment manifests are used for that.\n- Option 3: Updating deployments is done using 'kubectl apply' or 'kubectl set'.\n- Option 4: Deleting resources is handled by 'kubectl delete'.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod Management",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl exec",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#exec"
      },
      {
        "name": "Kubernetes Basics - Debugging Applications",
        "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/debug-application/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 113,
    "question": "How can you expose a Kubernetes deployment as a service?",
    "options": [
      "kubectl expose deployment my-deployment",
      "kubectl service deployment my-deployment",
      "kubectl create service my-deployment",
      "kubectl generate service my-deployment",
      "kubectl map service my-deployment"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The `kubectl expose` command creates a Service that exposes the deployment, allowing access to the pods within the deployment from outside the cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Services Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/"
      },
      {
        "name": "Kubernetes CLI Reference",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/commands/expose"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 114,
    "question": "What is the primary function of a Horizontal Pod Autoscaler (HPA) in Kubernetes?",
    "options": [
      "Automatically scales nodes",
      "Scales pods based on CPU utilization",
      "Schedules pods to nodes",
      "Balances network traffic",
      "Manages storage volumes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A Horizontal Pod Autoscaler (HPA) in Kubernetes automatically adjusts the number of replicas of a pod based on observed CPU utilization or other custom metrics. This helps ensure that the application has sufficient resources to handle the current workload without over-allocating resources when demand is low.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
      },
      {
        "name": "Horizontal Pod Autoscaling",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/horizontal-pod-autoscaler/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 116,
    "question": "What is the main purpose of an Ingress Controller in Kubernetes?",
    "options": [
      "To expose services outside the cluster using HTTP/HTTPS",
      "To manage internal pod communication",
      "To store and manage secrets",
      "To schedule pods to nodes",
      "To provide persistent storage"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Ingress Controllers in Kubernetes manage external access to cluster services via HTTP/HTTPS. They act as entry points for incoming HTTP requests and route them to appropriate services within the cluster, allowing for load balancing, SSL termination, and path-based routing.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/"
      },
      {
        "name": "Ingress Controllers",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 117,
    "question": "How do you label a Kubernetes node with the key 'env' and value 'production'?",
    "options": [
      "kubectl label node <node-name> env:production",
      "kubectl label nodes <node-name> env=production",
      "kubectl annotate node <node-name> env=production",
      "kubectl set label node <node-name> env=production",
      "kubectl tag node <node-name> env=production"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To label a Kubernetes node with the key 'env' and value 'production', you use the command `kubectl label nodes <node-name> env=production`. This command adds a label to the specified node, which can be used for filtering or selecting nodes for specific tasks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#label"
      },
      {
        "name": "Kubectl Label",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#label"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 118,
    "question": "Which Kubernetes resource is used to run a one-time task?",
    "options": [
      "Deployment",
      "StatefulSet",
      "DaemonSet",
      "Job",
      "ReplicaSet"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "In Kubernetes, a Job is used to run a one-time task. Jobs create one or more pods to perform a task and ensure they complete successfully. They are ideal for batch processing or running tasks that need to complete before the pods are terminated.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/job/"
      },
      {
        "name": "Jobs",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/job/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 119,
    "question": "How can you retrieve a list of all contexts in your kubeconfig file?",
    "options": [
      "kubectl config get-contexts",
      "kubectl get contexts",
      "kubectl config view",
      "kubectl context list",
      "kubectl list contexts"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To list all contexts in your kubeconfig file, you use the command `kubectl config get-contexts`. This command displays all available contexts, which are used to manage different Kubernetes clusters or environments.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#config"
      },
      {
        "name": "Kubectl Config",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#config"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 120,
    "question": "What happens when you set 'terminationGracePeriodSeconds' to zero in a Kubernetes pod spec?",
    "options": [
      "The pod will terminate immediately without a graceful shutdown",
      "The pod will never terminate",
      "The pod will have infinite time to terminate",
      "The setting is ignored by Kubernetes",
      "The pod will terminate after 30 seconds"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Setting 'terminationGracePeriodSeconds' to zero forces the pod to terminate immediately without a graceful shutdown. This means any running processes will be forcefully stopped, which can lead to data corruption or other issues if not handled properly.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
      },
      {
        "name": "Kubernetes Termination Grace Period",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.24/#podspec-v1-core"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 121,
    "question": "Which Kubernetes object is used to manage stateful applications that require persistent storage and network identities?",
    "options": [
      "Deployment",
      "StatefulSet",
      "ReplicaSet",
      "DaemonSet",
      "Job"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "StatefulSets are used to manage stateful applications that require persistent storage and network identities. Unlike Deployments, StatefulSets maintain a stable network identity and storage for each pod, making them suitable for applications like databases.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes StatefulSets",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/"
      },
      {
        "name": "Kubernetes Deployments vs StatefulSets",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 122,
    "question": "How do you create a Kubernetes namespace named 'dev'?",
    "options": [
      "kubectl create namespace dev",
      "kubectl apply namespace dev",
      "kubectl generate namespace dev",
      "kubectl make namespace dev",
      "kubectl new namespace dev"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To create a Kubernetes namespace named 'dev', you use the command 'kubectl create namespace dev'. This command directly creates a new namespace in your cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Namespaces",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      },
      {
        "name": "Kubernetes CLI Commands",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 123,
    "question": "What command can you use to edit a Kubernetes resource directly in your default editor?",
    "options": [
      "kubectl change <resource>",
      "kubectl update <resource>",
      "kubectl edit <resource>",
      "kubectl modify <resource>",
      "kubectl adjust <resource>"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The 'kubectl edit' command is used to edit a Kubernetes resource directly in your default editor. This command opens the resource's configuration file in your editor, allowing you to make changes before saving and applying them.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes CLI Commands",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes Resource Management",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 125,
    "question": "How do you port-forward a local port to a port on a Kubernetes pod?",
    "options": [
      "kubectl port-forward <pod-name> <local-port>:<pod-port>",
      "kubectl forward-port <pod-name> <local-port>:<pod-port>",
      "kubectl tunnel <pod-name> <local-port>:<pod-port>",
      "kubectl proxy <pod-name> --port=<local-port>",
      "kubectl connect <pod-name> --port=<local-port>"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To port-forward a local port to a port on a Kubernetes pod, you use the command 'kubectl port-forward <pod-name> <local-port>:<pod-port>'. This command allows you to access the pod's port from your local machine.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Port Forwarding",
        "url": "https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/"
      },
      {
        "name": "Kubernetes CLI Commands",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 126,
    "question": "What is the primary purpose of a PersistentVolumeClaim (PVC) in Kubernetes?",
    "options": [
      "To request storage resources from the cluster",
      "To define storage classes",
      "To monitor disk usage",
      "To create a new volume",
      "To delete unused volumes"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A PersistentVolumeClaim (PVC) is a request for storage by a user that binds to a PersistentVolume (PV) in the cluster. It abstracts the details of how storage is provided and allows pods to use storage resources without knowing the underlying storage implementation. PVCs do not define storage classes, monitor disk usage, create new volumes directly, or delete volumes; those tasks are handled by other Kubernetes components.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Persistent Volumes",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
      },
      {
        "name": "Kubernetes Official Documentation - PersistentVolumeClaim",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 129,
    "question": "Which Kubernetes resource is designed to manage long-running, stateful applications that require stable network identities and persistent storage?",
    "options": [
      "Deployment",
      "Job",
      "StatefulSet",
      "DaemonSet",
      "ReplicaSet"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "StatefulSets are used to manage stateful applications that require stable, unique network identifiers and persistent storage across pod restarts. Unlike Deployments or ReplicaSets, which are suited for stateless applications, StatefulSets ensure that pods are created in order and maintain persistent identities. Jobs are for batch or finite tasks, and DaemonSets ensure a pod runs on every node but do not provide stable identities or storage.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - StatefulSets",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/"
      },
      {
        "name": "Kubernetes Official Documentation - Workloads Overview",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 130,
    "question": "What is the default Kubernetes behavior when a container exceeds its configured memory limit?",
    "options": [
      "The container is throttled",
      "The container is terminated",
      "The pod is moved to another node",
      "Kubernetes does nothing",
      "Additional memory is allocated"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "When a container exceeds its memory limit, the Kubernetes kubelet kills the container to prevent it from affecting other workloads. This is known as an Out Of Memory (OOM) kill. The container is terminated and may be restarted depending on the pod's restart policy. CPU limits result in throttling, but memory limits cause termination. Kubernetes does not move pods automatically to other nodes or allocate additional memory beyond the specified limit.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Managing Compute Resources for Containers",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      },
      {
        "name": "Kubernetes Official Documentation - Pod Lifecycle",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 131,
    "question": "Which kubectl command lists all resource types within a specific namespace?",
    "options": [
      "kubectl get all --namespace=<namespace>",
      "kubectl get resources --namespace=<namespace>",
      "kubectl describe namespace <namespace>",
      "kubectl list namespace <namespace>",
      "kubectl get all <namespace>"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'kubectl get all --namespace=<namespace>' retrieves all resource types (pods, services, deployments, etc.) within the specified namespace. The other options are either invalid commands or do not list all resources. 'kubectl describe namespace' provides details about the namespace itself, not its resources.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl Cheat Sheet",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 132,
    "question": "What is the effect of the 'kubectl rollout undo' command on a Kubernetes deployment?",
    "options": [
      "Deletes the deployment",
      "Rolls back to the previous revision",
      "Pauses the deployment",
      "Scales down the deployment",
      "Updates the deployment to a new version"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl rollout undo' command reverts a deployment to its previous revision, effectively rolling back any changes made in the most recent update. It does not delete, pause, scale, or update the deployment to a new version but restores the last known good state.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl rollout",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#rollout"
      },
      {
        "name": "Kubernetes Official Documentation - Deployments",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 134,
    "question": "What is a common use case for a Kubernetes CronJob?",
    "options": [
      "Running a database",
      "Serving web traffic",
      "Scheduling regular, recurring tasks",
      "Managing network policies",
      "Providing persistent storage"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Kubernetes CronJobs are designed to schedule and run Jobs at specified times or intervals, similar to cron jobs in Unix-like systems. They are ideal for automating repetitive tasks such as backups, report generation, or periodic maintenance. Other options like running a database, serving web traffic, managing network policies, or providing persistent storage are outside the scope of CronJobs' functionality.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - CronJobs",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/"
      },
      {
        "name": "Kubernetes Patterns - CronJob Pattern",
        "url": "https://kubernetes.io/blog/2019/07/16/welcome-cronjob/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 136,
    "question": "Which kubectl command is used to delete a deployment named 'my-app' in Kubernetes?",
    "options": [
      "kubectl remove deployment my-app",
      "kubectl delete deployment my-app",
      "kubectl destroy deployment my-app",
      "kubectl erase deployment my-app",
      "kubectl terminate deployment my-app"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The correct command to delete a deployment in Kubernetes is 'kubectl delete deployment my-app'. This command removes the deployment resource and all associated pods. The other options are incorrect as they are not valid kubectl commands for deleting resources.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl delete",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#delete"
      },
      {
        "name": "Kubernetes Basics - Deleting a Deployment",
        "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 137,
    "question": "What is the primary function of a Kubernetes Service of type 'NodePort'?",
    "options": [
      "Exposes the service on a static port on each node's IP address",
      "Load balances traffic across multiple services",
      "Exposes the service externally using a cloud provider's load balancer",
      "Maps the service to an external DNS name",
      "Provides internal cluster DNS resolution"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A Kubernetes Service of type 'NodePort' exposes the service on the same static port across all nodes in the cluster, allowing external traffic to access the service via <NodeIP>:<NodePort>. It does not provide load balancing across multiple services (that is handled by ClusterIP or LoadBalancer types), nor does it map to external DNS names or provide internal DNS resolution. The LoadBalancer type is used to expose services externally via cloud provider load balancers.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Services",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#nodeport"
      },
      {
        "name": "Kubernetes Networking Deep Dive",
        "url": "https://www.cncf.io/blog/2019/04/02/kubernetes-networking-deep-dive/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 138,
    "question": "Which kubectl command displays the Kubernetes client and server versions for the cluster?",
    "options": [
      "kubectl version",
      "kubectl get version",
      "kubectl cluster-info",
      "kubectl describe cluster",
      "kubectl info"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'kubectl version' shows both the client and server (cluster) Kubernetes versions, which is useful for verifying compatibility and troubleshooting. Other commands like 'kubectl get version' or 'kubectl info' are invalid or do not provide version details. 'kubectl cluster-info' provides cluster endpoint information but not version details.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl version",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#version"
      },
      {
        "name": "Kubernetes CLI Cheat Sheet",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 139,
    "question": "What is the primary purpose of the 'kubectl config' command in Kubernetes?",
    "options": [
      "To configure Kubernetes cluster settings",
      "To manage kubeconfig files and contexts",
      "To update deployment configurations",
      "To set node configurations",
      "To modify pod specifications"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl config' is used to view and modify kubeconfig files, which store cluster connection information, user credentials, and contexts. This command helps manage multiple clusters and user access configurations. It does not directly configure cluster settings, deployments, nodes, or pods.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl config",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#config"
      },
      {
        "name": "Kubernetes Basics - Accessing Clusters",
        "url": "https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 145,
    "question": "What is the primary function of a Kubernetes Ingress resource in managing network traffic?",
    "options": [
      "To manage internal cluster networking",
      "To define rules for routing external HTTP and HTTPS traffic to services",
      "To provide persistent storage to pods",
      "To schedule pods onto nodes",
      "To configure network policies for pod communication"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A Kubernetes Ingress resource primarily manages external access to services within a cluster by defining rules for routing HTTP and HTTPS traffic. It acts as an entry point that controls how external clients reach services inside the cluster. Other options are incorrect because internal networking is handled by Services and CNI plugins, storage is managed by PersistentVolumes, pod scheduling is done by the scheduler, and network policies control pod-to-pod communication rather than external traffic.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Ingress",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/"
      },
      {
        "name": "Cloud Native Computing Foundation - Kubernetes Networking",
        "url": "https://www.cncf.io/blog/2018/12/19/a-deep-dive-into-kubernetes-networking/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 147,
    "question": "How can you enable debug-level logging for the Kubernetes kubelet component?",
    "options": [
      "Set the verbosity level to 4 by adding '--v=4' to the kubelet startup arguments",
      "Run the command 'kubectl debug kubelet'",
      "Modify the kubelet configuration file to set 'logLevel: debug'",
      "Restart the kubelet with the flag '--debug=true'",
      "Debug logging cannot be enabled for the kubelet"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Debug logging in kubelet is enabled by increasing the verbosity level through the '--v' flag, with '--v=4' commonly used to enable debug-level logs. The other options are incorrect: 'kubectl debug kubelet' is not a valid command; kubelet configuration does not use a 'logLevel' field; '--debug=true' is not a recognized flag; and debug logging is indeed possible and commonly used for troubleshooting.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Kubelet Command Line Flags",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/"
      },
      {
        "name": "Kubernetes Logging and Monitoring",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/logging/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 148,
    "question": "Which kubectl command is used to create a pod directly from a container image?",
    "options": [
      "kubectl create pod <pod-name> --image=<image>",
      "kubectl run <pod-name> --image=<image>",
      "kubectl new pod <pod-name> --image=<image>",
      "kubectl pod <pod-name> --image=<image>",
      "kubectl deploy pod <pod-name> --image=<image>"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl run' command is used to create a pod or deployment from a specified container image. It is the standard way to quickly start a pod with a given image. The other options are invalid commands or syntaxes that do not exist in kubectl.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl run",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run"
      },
      {
        "name": "Kubernetes Basics - Running a Pod",
        "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 149,
    "question": "What is the effect of executing the command 'kubectl drain <node-name>' on a Kubernetes node?",
    "options": [
      "Deletes the node from the cluster",
      "Marks the node as unschedulable and evicts all pods safely",
      "Restarts the node",
      "Upgrades the node's Kubernetes version",
      "Cleans up unused container images on the node"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl drain' prepares a node for maintenance by marking it unschedulable to prevent new pods from being scheduled and safely evicting all existing pods. It does not delete the node, restart it, upgrade Kubernetes, or clean images. This ensures workloads are gracefully moved before maintenance.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl drain",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#drain"
      },
      {
        "name": "Kubernetes Cluster Administration - Node Maintenance",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 152,
    "question": "When configuring encryption at rest for Kubernetes secrets using etcd, which Kubernetes component's configuration must be updated to enable this encryption?",
    "options": [
      "kube-scheduler",
      "kube-controller-manager",
      "kubelet",
      "kube-apiserver",
      "etcd"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "Encryption at rest for Kubernetes secrets is configured by updating the kube-apiserver with an encryption configuration file. The kube-apiserver handles requests and encrypts secrets before storing them in etcd. The other components do not manage encryption configuration for secrets.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Encrypting Secret Data at Rest",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/"
      },
      {
        "name": "Kubernetes Security Best Practices - Secrets Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 153,
    "question": "In Kubernetes Pod specifications, which field explicitly defines the container runtime class that should be used for pod execution?",
    "options": [
      "runtime",
      "runtimeClassName",
      "containerRuntime",
      "runtimeClass",
      "containerRuntimeClass"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'runtimeClassName' field in Pod specifications references a RuntimeClass object that defines container runtime configurations. This allows administrators to control runtime security parameters and isolation mechanisms. Other options like 'runtimeClass' or 'containerRuntimeClass' are invalid field names in the Kubernetes API.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [
      {
        "name": "Kubernetes RuntimeClass Documentation",
        "url": "https://kubernetes.io/docs/concepts/containers/runtime-class/"
      },
      {
        "name": "Kubernetes Pod Specification Reference",
        "url": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 161,
    "question": "Which Kubernetes resource provides layer 7 (HTTP/HTTPS) routing rules for external access to cluster services while enabling path-based and host-based routing?",
    "options": [
      "Ingress",
      "Service",
      "Endpoint",
      "NetworkPolicy",
      "LoadBalancer"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Ingress resources define HTTP/HTTPS routing rules and integrate with Ingress controllers to expose services. Services (ClusterIP, NodePort, LoadBalancer) operate at layer 4, while NetworkPolicy controls network traffic flow. LoadBalancer is a Service type, not a separate resource.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [
      {
        "name": "Kubernetes Ingress Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/"
      },
      {
        "name": "Kubernetes Networking Best Practices",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 167,
    "question": "Which Kubernetes admission controller specifically restricts kubelets to only modify their own Node API objects and Pod objects bound to their node?",
    "options": [
      "NodeRestriction",
      "LimitRanger",
      "NamespaceLifecycle",
      "ResourceQuota",
      "PodSecurityPolicy"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The NodeRestriction admission controller limits kubelet permissions to prevent node spoofing and privilege escalation. It ensures kubelets can only modify their own Node API object and Pod objects scheduled on their node, while LimitRanger and ResourceQuota manage resource constraints.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Admission Controllers Guide",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      },
      {
        "name": "Kubernetes Node Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/node/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 172,
    "question": "Which of the following are critical security hardening measures for the Kubernetes API server? (Select all that apply)",
    "options": [
      "Disable anonymous authentication",
      "Enable RBAC authorization",
      "Allow all admission controllers",
      "Enable etcd encryption for secrets",
      "Use insecure port for API communication"
    ],
    "correct_answers": [
      0,
      1,
      3
    ],
    "explanation": "Disabling anonymous authentication prevents unauthorized access, RBAC enables granular permissions, and etcd encryption protects sensitive data. Allowing all admission controllers (including deprecated ones) and using insecure ports would reduce security. The insecure port (--insecure-port) is deprecated and should be disabled.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes API Server Security",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "CIS Kubernetes Benchmark",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 173,
    "question": "Which Kubernetes control plane component is exclusively responsible for evaluating scheduling constraints and binding Pods to appropriate worker nodes?",
    "options": [
      "kube-controller-manager",
      "kube-scheduler",
      "kube-apiserver",
      "kubelet",
      "etcd"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kube-scheduler evaluates Pod specifications against node resources, taints/tolerations, and affinity/anti-affinity rules to select optimal nodes. The kube-controller-manager handles node lifecycle controllers, while kubelets manage Pod execution on worker nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [
      {
        "name": "Kubernetes Scheduler Documentation",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/"
      },
      {
        "name": "Kubernetes Components Overview",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 174,
    "question": "In Kubernetes, which resource allows multiple containers to share the same network stack, enabling them to communicate using 'localhost'?",
    "options": [
      "Deployment",
      "DaemonSet",
      "Pod",
      "Service",
      "StatefulSet"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "A Pod in Kubernetes is the smallest deployable unit that can host one or more containers. Containers within the same Pod share the same network stack, including the same IP address and port space. This allows them to communicate with each other using 'localhost'. Other resources like Deployment, DaemonSet, Service, and StatefulSet are higher-level abstractions that manage Pods but do not define such shared networking behavior directly.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/"
      },
      {
        "name": "Kubernetes Networking Concepts",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 180,
    "question": "What is the correct command to label a Kubernetes namespace named 'production' with the label 'env=prod'?",
    "options": [
      "kubectl label namespace env=prod production",
      "kubectl label namespace production env=prod",
      "kubectl annotate namespace production env=prod",
      "kubectl label namespaces env=prod production",
      "kubectl set label namespace production env=prod"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To label a Kubernetes namespace, you use the `kubectl label` command. The correct syntax is `kubectl label namespace <namespace_name> <label_key>=<label_value>`. Therefore, to label the 'production' namespace with 'env=prod', you would use `kubectl label namespace production env=prod`. This command updates the namespace with the specified label, which can be useful for organizing and filtering resources within your cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/kubectl/overview/"
      },
      {
        "name": "Kubernetes Label Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 193,
    "question": "What command should you use to delete all pods within a Kubernetes namespace named 'test'?",
    "options": [
      "kubectl delete pods --all -n test",
      "kubectl delete pod -A",
      "kubectl delete pods -n test",
      "kubectl remove pods --namespace=test",
      "kubectl delete pods * -n test"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "To delete all pods in a specific namespace, you use the `kubectl delete pods` command with the `--all` flag to specify all pods, and the `-n` flag to specify the namespace. The correct command is `kubectl delete pods --all -n test`. This command will delete all pods in the 'test' namespace, which can be useful for cleaning up resources or resetting a namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes Pod Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/"
      },
      {
        "name": "Kubernetes Delete Command Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/delete"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 198,
    "question": "Which Kubernetes object is used to persist data across the lifecycle of a pod?",
    "options": [
      "PersistentVolume",
      "ConfigMap",
      "Secret",
      "PersistentVolumeClaim",
      "EmptyDir"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "A PersistentVolume (PV) is a Kubernetes resource that provides persistent storage for data that needs to be preserved across pod lifecycles. Unlike data stored in an EmptyDir or other ephemeral storage, data in a PersistentVolume remains available even if the pod is deleted or recreated. PersistentVolumeClaims (PVCs) are used to request storage resources from PersistentVolumes, but the PV itself is the resource that holds the data.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [
      {
        "name": "Kubernetes Persistent Volumes Documentation",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
      },
      {
        "name": "Kubernetes Storage Overview",
        "url": "https://kubernetes.io/docs/concepts/storage/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 202,
    "question": "If the Kubernetes API server is not responding, which configuration file should you check for possible misconfigurations?",
    "options": [
      "/var/log/kube-apiserver.log",
      "/etc/kubernetes/manifests/kube-scheduler.yaml",
      "/etc/kubernetes/manifests/kube-apiserver.yaml",
      "/etc/kubernetes/config/apiserver.conf",
      "/var/lib/kubelet/config.yaml"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The Kubernetes API server's configuration is typically defined in its static pod manifest, which is usually located at `/etc/kubernetes/manifests/kube-apiserver.yaml`. This file contains the configuration for the API server, including any custom settings or overrides that might be causing issues. Checking this file can help identify misconfigurations that could be preventing the API server from responding.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes API Server Documentation",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Manifests Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/init-containers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 208,
    "question": "According to the CIS Kubernetes Benchmark, which setting should be disabled on the kube-apiserver for security reasons?",
    "options": [
      "Anonymous authentication",
      "RBAC authorization",
      "TLS encryption",
      "Admission controllers",
      "Audit logging"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Anonymous authentication should be disabled on the kube-apiserver to enhance security, as recommended by the CIS Kubernetes Benchmark. Enabling anonymous authentication allows unauthorized access to cluster resources, which is a significant security risk. Disabling it ensures that all interactions with the API server require proper authentication.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "CIS Kubernetes Benchmark",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      },
      {
        "name": "Kubernetes Authentication Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 209,
    "question": "Which kube-apiserver flag must be configured to disable anonymous authentication and prevent unauthenticated requests to the Kubernetes API?",
    "options": [
      "--disable-anonymous-auth",
      "--anonymous-auth=false",
      "--enable-auth=false",
      "--no-anonymous",
      "--deny-anonymous"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The '--anonymous-auth=false' flag explicitly disables anonymous requests to the API server, forcing authentication for all requests. This is critical for production clusters to prevent unauthorized access. The other options are either non-existent flags or use incorrect syntax for authentication configuration.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes API Server Security Settings",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/"
      },
      {
        "name": "Kubernetes Authentication Documentation",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 230,
    "question": "Which kube-apiserver configuration flag properly enables the ImagePolicyWebhook admission controller in modern Kubernetes versions (v1.10+)?",
    "options": [
      "--enable-admission-plugins=ImagePolicyWebhook",
      "--admission-control=ImagePolicyWebhook",
      "--admission-plugins=ImagePolicyWebhook",
      "--enable-image-policy",
      "--image-policy-webhook=true"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "In Kubernetes v1.10+, admission controllers are enabled using '--enable-admission-plugins'. The '--admission-control' flag was deprecated in favor of this new syntax. The ImagePolicyWebhook controller enables image verification through external webhooks, crucial for enforcing image registry policies.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Admission Controllers Guide",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      },
      {
        "name": "ImagePolicyWebhook Configuration",
        "url": "https://kubernetes.io/docs/reference/config-api/apiserver-webhook.v1/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 238,
    "question": "Which Kubernetes resource type allows cluster administrators to define and enforce the use of specific container runtimes like gVisor or Kata Containers?",
    "options": [
      "Runtime",
      "RuntimeClass",
      "PodSecurityPolicy",
      "SecurityContext",
      "ContainerRuntime"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "RuntimeClass is a first-class Kubernetes resource that specifies container runtime configurations. It enables security-conscious runtime selection (like gVisor's sandboxed environment) while maintaining portability across different container runtimes. PodSecurityPolicy (deprecated in v1.21) handled security policies but not runtime selection.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [
      {
        "name": "Kubernetes RuntimeClass Documentation",
        "url": "https://kubernetes.io/docs/concepts/containers/runtime-class/"
      },
      {
        "name": "gVisor Integration Guide",
        "url": "https://gvisor.dev/docs/user_guide/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 239,
    "question": "Where in a Pod specification should you declare the use of a gVisor RuntimeClass to ensure all containers in the Pod use this secure runtime environment?",
    "options": [
      "Set 'runtime: gvisor'",
      "Set 'securityContext: {runtimeClassName: \"gvisor\"}'",
      "Set 'runtimeClassName: \"gvisor\"' at the Pod spec level",
      "Set 'containerRuntime: \"gvisor\"' in the container spec",
      "Annotate the Pod with 'runtimeClass: gvisor'"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The 'runtimeClassName' field must be specified directly in the Pod's spec section (pod.spec.runtimeClassName). This ensures all containers in the Pod use the specified runtime. SecurityContext handles security parameters but not runtime selection, and container-level runtime configuration isn't supported in this manner.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [
      {
        "name": "Kubernetes Pod Specification",
        "url": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/"
      },
      {
        "name": "RuntimeClass Usage Guide",
        "url": "https://kubernetes.io/docs/concepts/containers/runtime-class/#usage"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 263,
    "question": "Which Kubernetes component is responsible for securely storing and managing all cluster data, including Secrets, ConfigMaps, and cluster state?",
    "options": [
      "kube-apiserver",
      "kube-scheduler",
      "kubelet",
      "etcd",
      "kube-controller-manager"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "etcd is the distributed key-value store that serves as Kubernetes' primary data store. It maintains the cluster's state, configuration data, and Secrets. While the kube-apiserver interacts with etcd, it doesn't store data directly. Proper etcd configuration (encryption, access controls, backups) is critical for cluster security.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [
      {
        "name": "Kubernetes etcd Documentation",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#etcd"
      },
      {
        "name": "etcd Security Guide",
        "url": "https://etcd.io/docs/v3.5/op-guide/security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 280,
    "question": "What command is used to create a Kubernetes namespace named 'production'?",
    "options": [
      "kubectl create namespace production",
      "kubectl new namespace production",
      "kubectl apply namespace production",
      "kubectl init namespace production",
      "kubectl generate namespace production"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'kubectl create namespace production' is used to create a new namespace in a Kubernetes cluster. Namespaces provide a way to divide cluster resources between multiple applications or teams. They are essential for organizing and isolating resources within a cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#create"
      },
      {
        "name": "Kubernetes Namespace Management",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 282,
    "question": "In a Kubernetes cluster, which component is responsible for assigning pods to specific nodes based on resource requirements and constraints?",
    "options": [
      "kube-apiserver",
      "kube-scheduler",
      "kubelet",
      "kube-controller-manager",
      "etcd"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The kube-scheduler is the component in Kubernetes responsible for scheduling pods onto nodes. It evaluates the resource requirements of the pods (e.g., CPU, memory) and matches them with the available resources on nodes. Other components, such as kube-apiserver, handle API requests; kubelet manages node-level operations; kube-controller-manager handles controllers; and etcd is the key-value store for cluster data.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Scheduler",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/"
      },
      {
        "name": "Kubernetes Components Overview",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:57:04"
  },
  {
    "id": 285,
    "question": "What is the primary function of the Kubernetes 'LimitRange' resource?",
    "options": [
      "To limit the number of namespaces",
      "To set default resource requests and limits for pods in a namespace",
      "To restrict network access between pods",
      "To control access to the Kubernetes API",
      "To define storage classes"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A LimitRange in Kubernetes is used to enforce constraints on resource usage within a namespace. It sets default resource requests and limits for pods, ensuring that they do not exceed specified thresholds. This helps in preventing resource over-allocation and maintaining cluster stability.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [
      {
        "name": "Kubernetes LimitRange Documentation",
        "url": "https://kubernetes.io/docs/concepts/policy/limit-range/"
      },
      {
        "name": "Kubernetes Resource Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  },
  {
    "id": 291,
    "question": "Which Kubernetes resource is used to request persistent storage for a Pod?",
    "options": [
      "PersistentVolume",
      "PersistentVolumeClaim",
      "StorageClass",
      "VolumeMount",
      "ConfigMap"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A PersistentVolumeClaim (PVC) is used by a Pod to request persistent storage resources. The PVC is matched with a PersistentVolume (PV), which provides the actual storage. StorageClasses are used to dynamically provision PersistentVolumes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [
      {
        "name": "Kubernetes Persistent Volumes Documentation",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
      },
      {
        "name": "Kubernetes Storage Classes Documentation",
        "url": "https://kubernetes.io/docs/concepts/storage/storage-classes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:43:18"
  }
];
