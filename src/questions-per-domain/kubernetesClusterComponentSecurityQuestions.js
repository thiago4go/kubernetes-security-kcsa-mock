// TODO: Implement functionality for kubernetesClusterComponentSecurityQuestions
export const kubernetesClusterComponentSecurityQuestions = 
    [
        {
          "id": 6,
          "question": "Which admission controller runs first in Kubernetes?",
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 9,
          "question": "How can you restrict access to the kubelet API?",
          "domain": "Kubernetes Cluster Component Security",
          "options": [
            "Disable the kubelet",
            "Use '--authorization-mode=Webhook' and '--authentication-token-webhook=true'",
            "Remove kubelet from the nodes",
            "Only use SSH to access kubelet",
            "Set '--allow-privileged=false'"
          ],
          "correct_answers": [1],
          "explanation": "These flags configure the kubelet to use API server authentication and authorisation.",
          "question_type": "single-choice"
        },
        {
          "id": 17,
          "question": "How can you update the image of a deployment without altering other configurations?",
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 20,
          "question": "What is a potential impact of enabling detailed auditing of request responses in Kubernetes?",
          "domain": "Kubernetes Cluster Component Security",
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
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 25,
          "question": "Which flags should be set to 'false' to minimise the attack surface on the Kubernetes scheduler?",
          "domain": "Kubernetes Cluster Component Security",
          "options": [
            "--profiling and --enable-scheduler-policy",
            "--leader-elect and --kubeconfig",
            "--bind-address and --secure-port",
            "--port and --address",
            "--use-legacy-policy and --enable-profiling"
          ],
          "correct_answers": [3],
          "explanation": "Setting these to disable the insecure port and restrict access minimises the attack surface.",
          "question_type": "single-choice"
        },
        {
          "id": 26,
          "question": "Which controllers are part of the kube-controller-manager? (Select all that apply)",
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 29,
          "question": "How can you improve kubelet security? (Select all that apply)",
          "domain": "Kubernetes Cluster Component Security",
          "options": [
            "Enable authentication and authorisation",
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
          "id": 33,
          "question": "Which authentication mechanisms are used by kubeadm? (Select all that apply)",
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 36,
          "question": "In managed Kubernetes services, who manages the etcd cluster?",
          "domain": "Kubernetes Cluster Component Security",
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
          "domain": "Kubernetes Cluster Component Security",
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
          "id": 40,
          "question": "What is a consistent way of enforcing policies across Kubernetes clusters?",
          "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 53,
            "question": "What is the order of execution for admission controllers in Kubernetes?",
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 56,
            "question": "What is the role of the Service Account Controller in Kubernetes?",
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
            "options": [
            "Enable TLS encryption for communication",
            "Limit access to trusted networks",
            "Use authentication and authorisation",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 61,
            "question": "What could happen if you disable anonymous authentication on the kubelet?",
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 65,
            "question": "What does the kube-apiserver's '--anonymous-auth=false' flag do?",
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 67,
            "question": "Which Kubernetes feature allows for encryption of Secrets at rest?",
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 77,
            "question": "Which Kubernetes object can be used to limit the number of concurrent requests to the API server?",
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 80,
            "question": "What is the role of the kube-proxy component?",
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 86,
            "question": "What is the function of the kubelet in Kubernetes?",
            "domain": "Kubernetes Cluster Component Security",
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
            "id": 91,
            "question": "Which command would you use to view the logs of a pod named 'my-pod'?",
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
            "domain": "Kubernetes Cluster Component Security",
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
    
      ]
;
