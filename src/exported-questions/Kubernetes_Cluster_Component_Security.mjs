
// Exported 89 questions for domain: Kubernetes Cluster Component Security
// Last revision date: 2025-02-06 16:21:38
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
    "question": "How can you restrict access to the kubelet API?",
    "options": [
      "Disable the kubelet",
      "Use '--authorization-mode=Webhook' and '--authentication-token-webhook=true'",
      "Remove kubelet from the nodes",
      "Only use SSH to access kubelet",
      "Set '--allow-privileged=false'"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "These flags configure the kubelet to use API server authentication and authorization.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "This command updates the image without altering other configurations.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Configuring kubelet with the specific runtime endpoint sets the container runtime.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "Which controllers are part of the kube-controller-manager? (Select all that apply)",
    "options": [
      "Node Controller",
      "ReplicaSet Controller",
      "Ingress Controller",
      "Cloud Controller",
      "Service Account Controller"
    ],
    "correct_answers": [
      0,
      1,
      4
    ],
    "explanation": "Node Controller, ReplicaSet Controller, and Service Account Controller are part of kube-controller-manager.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0,
      1,
      3
    ],
    "explanation": "These actions enhance kubelet security by enforcing authentication and encryption.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1,
      3
    ],
    "explanation": "~/.kube/config and ~/.ssh/ contain sensitive cluster and SSH access information.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "In managed services, etcd is managed by the provider.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0,
      3
    ],
    "explanation": "etcd stores cluster state, including Secrets and ConfigMaps.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0,
      2
    ],
    "explanation": "Static pods are managed by the kubelet and are useful for critical components.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      3
    ],
    "explanation": "All kubectl commands interact with the API server first.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The scheduler determines the optimal node for a pod.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy manages network rules; its failure affects networking.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "The Service Account Controller creates and manages service accounts and their tokens.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "The Ingress Controller is not part of the kube-controller-manager; it is deployed separately.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0,
      1,
      2,
      4
    ],
    "explanation": "Best practices for securing etcd include enabling TLS, limiting network access, using authentication, and storing backups securely. Exposing etcd publicly is not recommended.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "etcd is the key-value store that persists cluster state.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Disabling anonymous authentication ensures that only authenticated requests are accepted by the kubelet.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Setting '--anonymous-auth=false' ensures that all requests must be authenticated.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      4
    ],
    "explanation": "Kubernetes does not have an object to limit API server requests; this is controlled via API server flags.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy maintains network rules for services on each node.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command displays client and server Kubernetes versions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "If not specified, the default Service type is ClusterIP.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "PodDisruptionBudget ensures a minimum number of pods remain available during disruptions.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The kubelet starts and manages pods and their containers on nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Deployments use ReplicaSets to ensure the desired number of pod replicas.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "explanation": "InternalPort is not a valid Service type.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This flag points to the file used to sign service account tokens.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Ingress resources define rules for routing external traffic to services.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "This command forcefully deletes a pod stuck in terminating state.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      3
    ],
    "explanation": "This command switches the active context in your kubeconfig.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "The '-A' flag lists resources in all namespaces.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "How can you scale a deployment named 'my-deployment' to 5 replicas?",
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
    "explanation": "This command scales the deployment to the specified number of replicas.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "kube-proxy maintains network rules on nodes for services.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "KubeProxy",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "DaemonSets ensure that a copy of a pod runs on selected nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "The kubelet will restart containers in a pod if they crash.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command updates the image for the specified container in a deployment.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "Tainting a node prevents pods without a matching toleration from being scheduled on it.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "'kubeadm' simplifies the process of setting up a Kubernetes cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Deleting a namespace removes it and all resources within it.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "How can you expose a deployment 'my-deployment' as a service?",
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
    "explanation": "This command creates a Service exposing the deployment.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "HPA adjusts the number of pod replicas based on resource metrics.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Ingress Controllers manage external access to services via HTTP/HTTPS.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "This command adds a label to the specified node.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      3
    ],
    "explanation": "A Job creates one or more pods to perform a task and ensures they complete successfully.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command lists all available contexts in your kubeconfig.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Setting 'terminationGracePeriodSeconds' to zero forces immediate termination.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "StatefulSets manage applications requiring stable storage and network identities.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command creates a new namespace named 'dev'.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "The 'edit' command opens the resource's configuration in your default editor.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command forwards a local port to a port on a pod.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "PersistentVolumeClaims request storage resources defined by PersistentVolumes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "StatefulSets manage applications requiring stable storage and network identities.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Exceeding memory limits typically results in the container being terminated (OOMKilled).",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command lists all resources in the specified namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 'rollout undo' command reverts a deployment to its previous state.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "CronJobs schedule Jobs to run at specified times.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "This command deletes the specified deployment.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Controller Manager",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "A NodePort Service exposes the service on the same port across all nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command shows the client and server versions of Kubernetes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl config' commands are used to view and modify kubeconfig settings.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Ingress resources control external access to services over HTTP/HTTPS.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Increasing the verbosity level enables debug logging for the kubelet.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl run' command creates a deployment or pod from an image.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Draining a node prepares it for maintenance by evicting pods and preventing new ones.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Kubelet",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 152,
    "question": "When configuring etcd encryption for secrets, which Kubernetes component's configuration must be updated?",
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
    "explanation": "The kube-apiserver must be updated with the encryption configuration file.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 153,
    "question": "Which field in the Pod spec is used to specify the container runtime class?",
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
    "explanation": "The 'runtimeClassName' field specifies which RuntimeClass to use.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 161,
    "question": "Which Kubernetes resource is used to define external access to services, typically HTTP?",
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
    "explanation": "An Ingress resource exposes HTTP and HTTPS routes from outside the cluster.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Networking",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 167,
    "question": "Which admission controller ensures that kubelets can only modify their own Node and Pod objects?",
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
    "explanation": "The NodeRestriction admission controller limits kubelet modifications to their own Node and Pod objects.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 172,
    "question": "Which of the following are common steps in hardening the Kubernetes API server? (Select all that apply)",
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
    "explanation": "Disabling anonymous auth, enabling RBAC, and using etcd encryption are best practices.",
    "question_type": "multiple-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 173,
    "question": "Which component is responsible for scheduling Pods onto nodes?",
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
    "explanation": "The kube-scheduler assigns Pods to nodes.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Scheduler",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "Which command would you use to label a namespace 'production' with 'env=prod'?",
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
    "explanation": "The correct command is 'kubectl label namespace production env=prod'.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Client Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 193,
    "question": "Which command would you use to delete all pods in a namespace 'test'?",
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
    "explanation": "The command deletes all pods in the 'test' namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 198,
    "question": "Which Kubernetes object can be used to persist data across the lifecycle of a Pod?",
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
    "explanation": "A PersistentVolume is a cluster resource that holds data independently of pod lifecycles.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 202,
    "question": "If the API server is not responding, which file should you check for possible misconfigurations?",
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
    "explanation": "The API server's static pod manifest is usually located at '/etc/kubernetes/manifests/kube-apiserver.yaml'.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 208,
    "question": "According to the CIS Kubernetes Benchmark, which of the following settings should be disabled on the kube-apiserver for security?",
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
    "explanation": "Anonymous authentication should be disabled per CIS Benchmarks.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 209,
    "question": "Which flag disables anonymous authentication in the kube-apiserver?",
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
    "explanation": "The '--anonymous-auth=false' flag disables anonymous requests.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 230,
    "question": "Which API server flag enables the ImagePolicyWebhook admission controller?",
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
    "explanation": "The '--enable-admission-plugins=ImagePolicyWebhook' flag enables the ImagePolicyWebhook admission controller.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 238,
    "question": "Which Kubernetes object allows you to specify the use of a custom runtime like gVisor?",
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
    "explanation": "'RuntimeClass' specifies the container runtime to use.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 239,
    "question": "In a Pod spec, how do you specify that it should use the gVisor runtime class?",
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
    "explanation": "The 'runtimeClassName' field at the Pod spec level specifies which RuntimeClass to use.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Container Runtime",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 263,
    "question": "Which component of Kubernetes is responsible for storing cluster data, including secrets?",
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
    "explanation": "etcd is the key-value store for cluster data.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Etcd",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 280,
    "question": "Which command can be used to create a namespace named 'production'?",
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
    "explanation": "The command 'kubectl create namespace production' creates the namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "API Server",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "What is the main purpose of the Kubernetes 'LimitRange' resource?",
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
    "explanation": "A LimitRange sets default resource limits within a namespace.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Pod",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "explanation": "A PersistentVolumeClaim requests storage resources provided by a PersistentVolume.",
    "question_type": "single-choice",
    "domain": "Kubernetes Cluster Component Security",
    "subdomain": "Storage",
    "sources": [],
    "revision": 0,
    "revision_date": null
  }
];
