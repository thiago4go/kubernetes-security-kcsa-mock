
// Exported 35 questions for domain: Platform Security
// Last revision date: 2025-02-06 13:36:42
export const PlatformSecurityQuestions = [
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
    "correct_answers": [
      2
    ],
    "explanation": "PKI manages keys and certificates for secure communication.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "Grafana is used to create dashboards for visualizing metrics.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "'kubeadm' provides commands to renew cluster certificates.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "Prometheus collects metrics that can be visualized in Grafana dashboards.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "This command retrieves logs from the specified pod.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl top' command shows resource usage for pods or nodes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 'describe' command provides detailed information about a resource.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 127,
    "question": "Which command is recommended to check the readiness and status of Kubernetes cluster components?",
    "options": [
      "kubectl get components",
      "kubectl get --raw='/readyz?verbose'",
      "kubectl get cs",
      "kubectl get componentstatuses",
      "kubectl describe components"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The command `kubectl get --raw='/readyz?verbose'` is the recommended way to check the readiness and status of Kubernetes cluster components. This approach provides detailed and up-to-date information about the health of the cluster. Other commands, such as `kubectl get cs` and `kubectl get componentstatuses`, are deprecated and may not provide accurate results in newer Kubernetes versions.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - API Server Health Checks",
        "url": "https://kubernetes.io/docs/reference/using-api/health-checks/"
      },
      {
        "name": "Kubernetes Blog - Deprecation of kubectl get cs",
        "url": "https://kubernetes.io/blog/2020/09/03/kubectl-get-componentstatus-deprecated/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:36:42"
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
    "correct_answers": [
      0
    ],
    "explanation": "This command lists nodes and shows their status.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "This command outputs the pod's YAML definition.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "This command displays the cluster's events.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 151,
    "question": "Which command allows you to list all the nodes in a Kubernetes cluster?",
    "options": [
      "kubectl get nodes",
      "kubectl describe cluster",
      "kubectl list nodes",
      "kubectl cluster-info",
      "kubectl get cluster-nodes"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "kubectl get nodes lists all cluster nodes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 185,
    "question": "Which tool can be used to benchmark a Kubernetes cluster against CIS best practices?",
    "options": [
      "kube-bench",
      "kube-hunter",
      "kubesec",
      "kube-score",
      "kube-linter"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "kube-bench is used to benchmark clusters against CIS standards.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 186,
    "question": "Which Kubernetes resource allows you to configure automatic scaling based on CPU utilization?",
    "options": [
      "HorizontalPodAutoscaler",
      "VerticalPodAutoscaler",
      "ResourceQuota",
      "LimitRange",
      "Deployment"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The HorizontalPodAutoscaler adjusts the number of replicas based on CPU utilisation.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 187,
    "question": "Which command would you use to approve a CertificateSigningRequest named 'user1'?",
    "options": [
      "kubectl certificate approve user1",
      "kubectl csr approve user1",
      "kubectl approve csr user1",
      "kubectl sign csr user1",
      "kubectl certificate sign user1"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "kubectl certificate approve user1 approves the CSR.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 196,
    "question": "Which command can be used to get detailed information about a Kubernetes node?",
    "options": [
      "kubectl get node <node-name>",
      "kubectl describe node <node-name>",
      "kubectl inspect node <node-name>",
      "kubectl info node <node-name>",
      "kubectl logs node <node-name>"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl describe node <node-name>' provides detailed node information.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 197,
    "question": "Which flag can be used with 'kubectl run' to generate a Pod manifest YAML file without creating the resource?",
    "options": [
      "--dry-run=server",
      "--dry-run=client -o yaml",
      "--output=yaml",
      "--generate-only",
      "--no-create"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Using '--dry-run=client -o yaml' outputs the manifest without creation.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 199,
    "question": "Which command can be used to apply a configuration change to a resource defined in 'deployment.yaml'?",
    "options": [
      "kubectl create -f deployment.yaml",
      "kubectl apply -f deployment.yaml",
      "kubectl set -f deployment.yaml",
      "kubectl update -f deployment.yaml",
      "kubectl replace -f deployment.yaml"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "'kubectl apply -f deployment.yaml' applies configuration changes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 206,
    "question": "Which command is used to generate a private key for a new Kubernetes user?",
    "options": [
      "openssl genrsa -out user.key 2048",
      "openssl rsa -in user.key -out user.key",
      "openssl req -newkey rsa:2048 -nodes -keyout user.key -out user.csr",
      "kubectl create secret tls user.key",
      "ssh-keygen -t rsa -b 2048 -f user.key"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'openssl genrsa -out user.key 2048' generates a 2048-bit RSA private key.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 207,
    "question": "After generating a CSR and signing it with the cluster CA, how do you configure kubectl to use the new certificate for user 'alice'?",
    "options": [
      "kubectl config set-credentials alice --client-certificate=alice.crt --client-key=alice.key",
      "kubectl create secret tls alice --cert=alice.crt --key=alice.key",
      "kubectl config set-context alice-context --cluster=kubernetes --user=alice",
      "kubectl apply -f alice.crt",
      "kubectl certificate approve alice"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "Use 'kubectl config set-credentials' with the client certificate and key.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 222,
    "question": "Which command would you use to list all loaded AppArmor profiles on a node?",
    "options": [
      "sudo apparmor_status",
      "sudo aa-enforce",
      "sudo apparmor_parser -L",
      "sudo aa-status",
      "sudo systemctl status apparmor"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The command 'sudo aa-status' lists all loaded AppArmor profiles.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 223,
    "question": "In Kubernetes, how do you apply an AppArmor profile to all containers in a Pod?",
    "options": [
      "Set the profile in the Pod's securityContext",
      "Annotate each container with the AppArmor profile",
      "Use the 'apparmorProfile' field in the container spec",
      "Specify the profile in the Deployment's metadata",
      "Set the profile in the node's AppArmor configuration"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "You annotate each container with the desired AppArmor profile.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 236,
    "question": "Which Kubernetes resource is used to request certificate signing via the Kubernetes API?",
    "options": [
      "CertificateRequest",
      "CertificateSigningRequest",
      "CertificateApproval",
      "CertificateSigning",
      "Certificate"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "CertificateSigningRequest is used to request certificate signing.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 237,
    "question": "After creating a CSR object in Kubernetes, which command is used to approve it?",
    "options": [
      "kubectl sign csr <csr-name>",
      "kubectl create csr <csr-name>",
      "kubectl approve csr <csr-name>",
      "kubectl certificate approve <csr-name>",
      "kubectl csr approve <csr-name>"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The command 'kubectl certificate approve <csr-name>' approves the CSR.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 240,
    "question": "Which command lists all processes listening on TCP and UDP ports?",
    "options": [
      "sudo netstat -tulpn",
      "sudo lsof -i",
      "sudo ss -tulw",
      "sudo ps aux | grep LISTEN",
      "sudo netstat -an"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'sudo netstat -tulpn' lists all listening ports with process IDs.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Connectivity",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 241,
    "question": "After identifying an unwanted process listening on a port, which command can you use to stop it?",
    "options": [
      "killall <process-name>",
      "sudo stop <process-name>",
      "sudo systemctl disable <process-name>",
      "sudo kill <pid>",
      "sudo service <process-name> remove"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "Using 'sudo kill <pid>' stops the process with the given PID.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Connectivity",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 242,
    "question": "Which command can be used to remove an unwanted package 'apache2' from a Debian-based system?",
    "options": [
      "sudo apt-get install apache2",
      "sudo yum remove apache2",
      "sudo apt-get remove apache2",
      "sudo rpm -e apache2",
      "sudo dnf erase apache2"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "On Debian-based systems, 'sudo apt-get remove apache2' removes the package.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Supply Chain Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 243,
    "question": "Which command lists all installed packages on a Debian-based system using apt?",
    "options": [
      "apt list --installed",
      "dpkg -l",
      "rpm -qa",
      "yum list installed",
      "pkg info"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The command 'apt list --installed' lists all packages installed via apt.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Supply Chain Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 244,
    "question": "Which strace option summarises the time spent in each system call?",
    "options": [
      "-c",
      "-p",
      "-t",
      "-e trace=%time",
      "-s"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '-c' option produces a summary of system calls and their time usage.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 245,
    "question": "To trace system calls made by a running process with PID 1234, which command would you use?",
    "options": [
      "strace 1234",
      "strace -p 1234",
      "strace -c 1234",
      "sudo trace -pid 1234",
      "strace --process 1234"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'strace -p 1234' command attaches to the process with PID 1234.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 246,
    "question": "Which command computes the SHA256 checksum of the file '/usr/bin/kubelet'?",
    "options": [
      "sha1sum /usr/bin/kubelet",
      "md5sum /usr/bin/kubelet",
      "checksum -sha256 /usr/bin/kubelet",
      "sha256sum /usr/bin/kubelet",
      "hash -a sha256 /usr/bin/kubelet"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "sha256sum /usr/bin/kubelet calculates the SHA256 checksum.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 247,
    "question": "Why is it important to verify the checksums of Kubernetes binaries?",
    "options": [
      "To ensure they are the latest version",
      "To verify the integrity and authenticity of the binaries",
      "To improve their performance",
      "To check for syntax errors",
      "To enable automatic updates"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Verifying checksums ensures that the binaries are authentic and unaltered.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 289,
    "question": "What is a Service Mesh in Kubernetes?",
    "options": [
      "A network overlay for pod communication",
      "An infrastructure layer for handling service-to-service communication",
      "A type of storage solution",
      "A container runtime interface",
      "A logging mechanism"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A Service Mesh provides an infrastructure layer that handles secure and observable service-to-service communication.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Service Mesh",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 290,
    "question": "Which of the following are advantages of using a Service Mesh? (Select all that apply)",
    "options": [
      "Observability",
      "Simplifies application code",
      "Enhanced security with mutual TLS",
      "Adds significant overhead",
      "Requires no additional expertise"
    ],
    "correct_answers": [
      0,
      2
    ],
    "explanation": "A Service Mesh improves observability and enhances security (for example, via mutual TLS).",
    "question_type": "multiple-choice",
    "domain": "Platform Security",
    "subdomain": "Service Mesh",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 300,
    "question": "Which command can be used to set the default namespace for kubectl commands?",
    "options": [
      "kubectl config use-context <namespace>",
      "kubectl set namespace <namespace>",
      "kubectl config set-context --current --namespace=<namespace>",
      "kubectl namespace set <namespace>",
      "kubectl switch namespace <namespace>"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "This command sets the default namespace in the current context.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [],
    "revision": 0,
    "revision_date": null
  }
];
