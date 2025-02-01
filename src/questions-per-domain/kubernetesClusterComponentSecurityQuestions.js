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
        }
      ]
;
