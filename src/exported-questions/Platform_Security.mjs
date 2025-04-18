
// Exported 34 questions for domain: Platform Security
// Last revision date: 2025-04-18 18:33:20
export const PlatformSecurityQuestions = [
  {
    "id": 11,
    "question": "What is the primary role of Public Key Infrastructure (PKI) in IT security?",
    "options": [
      "Managing network configurations",
      "Handling storage volumes",
      "Issuing and managing digital certificates and encryption keys",
      "Maintaining container images",
      "Collecting and analyzing application logs"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Public Key Infrastructure (PKI) is a framework that manages digital certificates and encryption keys to enable secure communication and authentication over networks. It does not handle network configurations, storage volumes, container images, or application logs. PKI ensures trust by issuing certificates that verify identities and encrypt data.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Microsoft Docs - Public Key Infrastructure (PKI)",
        "url": "https://learn.microsoft.com/en-us/windows-server/security/public-key-infrastructure/pki-overview"
      },
      {
        "name": "NIST Special Publication 800-32 - Introduction to Public Key Technology and the Federal PKI Infrastructure",
        "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-32.pdf"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 12,
    "question": "What is the primary purpose of Grafana in IT operations?",
    "options": [
      "Managing code version control",
      "Automating continuous integration pipelines",
      "Visualizing and monitoring metrics through dashboards",
      "Enforcing network security policies",
      "Managing user identities and access"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Grafana is an open-source platform used primarily for creating dashboards that visualize metrics and monitoring data from various sources. It helps IT teams observe system performance and troubleshoot issues. It is not used for version control, continuous integration, network security enforcement, or identity management.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Grafana Labs - What is Grafana?",
        "url": "https://grafana.com/docs/grafana/latest/introduction/what-is-grafana/"
      },
      {
        "name": "The New Stack - Introduction to Grafana",
        "url": "https://thenewstack.io/what-is-grafana/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 78,
    "question": "What is the recommended method to rotate TLS certificates in a Kubernetes cluster managed by kubeadm?",
    "options": [
      "Manually delete and recreate certificates",
      "Use the 'kubeadm certs renew' command to renew certificates",
      "TLS certificates cannot be rotated once issued",
      "Restart the kubelet service to refresh certificates",
      "Use a third-party certificate manager exclusively"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Kubernetes clusters initialized with kubeadm provide the 'kubeadm certs renew' command to safely renew TLS certificates without manual deletion. Manually deleting certificates or restarting kubelet alone is not sufficient and can cause downtime. While third-party certificate managers can be used, kubeadm's built-in commands are the recommended approach for certificate rotation.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Managing Certificates",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/"
      },
      {
        "name": "Kubeadm Certificate Management Guide",
        "url": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-certs/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 85,
    "question": "Which tool serves as a data source for visualizing Kubernetes cluster metrics in Grafana?",
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
    "explanation": "Prometheus is a robust monitoring and alerting toolkit that collects metrics from Kubernetes clusters. These metrics can be integrated into Grafana as a data source to create dashboards for visualization. While Grafana handles the visualization, Prometheus provides the necessary data. Other options like Elasticsearch, Kibana, Fluentd, and Logstash are primarily used for logging and log analysis, not for collecting or serving metrics directly.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Documentation - Monitoring with Prometheus",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/monitoring/"
      },
      {
        "name": "Grafana Documentation - Prometheus Integration",
        "url": "https://grafana.com/docs/grafana/latest/datasources/prometheus/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 91,
    "question": "Which kubectl command is used to retrieve the logs of a pod named 'my-pod'?",
    "options": [
      "kubectl get logs my-pod",
      "kubectl describe my-pod",
      "kubectl logs my-pod",
      "kubectl status my-pod",
      "kubectl inspect my-pod"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct command to view the logs of a pod named 'my-pod' is 'kubectl logs my-pod'. This command fetches the standard output and error logs from the pod's containers. 'kubectl describe' provides detailed resource information but not logs. The other commands are invalid or do not exist.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Viewing Logs",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/logging/"
      },
      {
        "name": "Kubernetes kubectl Reference - logs",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 100,
    "question": "Which kubectl command allows you to view the current resource usage (CPU and memory) of a specific pod?",
    "options": [
      "kubectl describe pod <pod-name>",
      "kubectl top pod <pod-name>",
      "kubectl get pod <pod-name> --resources",
      "kubectl logs <pod-name>",
      "kubectl inspect pod <pod-name>"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'kubectl top pod <pod-name>' command displays the current CPU and memory usage of the specified pod, provided that the Metrics Server is installed and running in the cluster. 'kubectl describe' shows detailed pod information but not real-time resource usage. The other commands do not provide resource consumption data.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Metrics Server",
        "url": "https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/"
      },
      {
        "name": "Kubernetes kubectl Reference - top",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#top"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 110,
    "question": "Which kubectl command provides detailed information about a specific Kubernetes resource, including its configuration and status?",
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
    "explanation": "The 'kubectl describe <resource>' command outputs detailed information about a Kubernetes resource, including its configuration, status, events, and other metadata. In contrast, 'kubectl get <resource>' provides a summary list or status of resources, but not detailed information. The other commands such as 'inspect', 'show', and 'info' are not valid kubectl commands for this purpose.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl describe",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#describe"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
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
    "explanation": "The command `kubectl get --raw='/readyz?verbose'` is the recommended way to check the readiness and status of Kubernetes cluster components. This approach provides detailed and up-to-date information about the health of the cluster. Other commands, such as `kubectl get cs` (deprecated shorthand) and `kubectl get componentstatuses` (deprecated endpoint), are no longer reliable in newer Kubernetes versions.",
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
    "revision": 2,
    "revision_date": "2025-04-18 18:33:20"
  },
  {
    "id": 128,
    "question": "Which kubectl command is used to check the health status and readiness of all nodes in a Kubernetes cluster?",
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
    "explanation": "'kubectl get nodes' lists all nodes in the cluster along with their status, including whether they are Ready or NotReady, which indicates their health and availability. While 'kubectl describe nodes' provides detailed information about each node, including conditions and events, the primary command to quickly check node health is 'kubectl get nodes'. The other commands are not valid kubectl commands.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Viewing Nodes",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/nodes/"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 135,
    "question": "How do you display the full YAML definition of a specific pod in Kubernetes using kubectl?",
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
    "explanation": "The command 'kubectl get pod <pod-name> -o yaml' outputs the complete YAML manifest of the specified pod, showing its configuration as stored in the cluster. 'kubectl describe pod <pod-name>' provides detailed runtime information but not the raw YAML definition. The other commands are not valid kubectl commands.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      },
      {
        "name": "Kubernetes Official Documentation - Viewing Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 144,
    "question": "Which kubectl command allows you to view the events occurring in a Kubernetes cluster, such as pod lifecycle changes and errors?",
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
    "explanation": "'kubectl get events' lists all recent events in the cluster, including warnings and normal lifecycle events for pods, nodes, and other resources. 'kubectl describe events' is not a valid command; 'kubectl describe' is used with resource types but not directly with 'events'. 'kubectl list events' and 'kubectl events' are not valid commands. 'kubectl get logs' is used to fetch logs from pods, not cluster events.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Viewing Events",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/event-logging/"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 151,
    "question": "Which kubectl command lists all the nodes currently registered in a Kubernetes cluster?",
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
    "explanation": "'kubectl get nodes' is the standard command to list all nodes in the cluster along with their status and other summary information. 'kubectl describe cluster' and 'kubectl get cluster-nodes' are not valid commands. 'kubectl list nodes' is not a valid kubectl command. 'kubectl cluster-info' provides cluster endpoint information but does not list nodes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Nodes",
        "url": "https://kubernetes.io/docs/concepts/architecture/nodes/"
      },
      {
        "name": "Kubernetes Official Documentation - kubectl get",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 185,
    "question": "Which tool is specifically designed to benchmark a Kubernetes cluster against the Center for Internet Security (CIS) Kubernetes Benchmark best practices?",
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
    "explanation": "kube-bench is a tool that runs checks against the CIS Kubernetes Benchmark, which is a set of best practices for securing Kubernetes clusters. It audits cluster components and configuration to identify security issues. Other tools like kube-hunter focus on penetration testing, kubesec and kube-score analyze resource configurations but do not perform CIS benchmark compliance checks, and kube-linter is a static analysis tool for Kubernetes manifests.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Aqua Security - kube-bench GitHub Repository",
        "url": "https://github.com/aquasecurity/kube-bench"
      },
      {
        "name": "Center for Internet Security - Kubernetes Benchmark",
        "url": "https://www.cisecurity.org/benchmark/kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 186,
    "question": "Which Kubernetes resource enables automatic horizontal scaling of Pods based on observed CPU utilization?",
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
    "explanation": "The HorizontalPodAutoscaler (HPA) automatically adjusts the number of pod replicas in a deployment or replica set based on observed CPU utilization or other select metrics. VerticalPodAutoscaler adjusts resource requests and limits for containers rather than scaling pod count. ResourceQuota and LimitRange control resource usage limits but do not perform scaling. Deployment manages pod lifecycle but does not scale automatically based on CPU.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Horizontal Pod Autoscaling",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
      },
      {
        "name": "Kubernetes Official Documentation - Vertical Pod Autoscaling",
        "url": "https://kubernetes.io/docs/tasks/run-application/vertical-pod-autoscale/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 18:33:20"
  },
  {
    "id": 196,
    "question": "Which kubectl command provides detailed information about a specific Kubernetes node, including its status, capacity, and allocated resources?",
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
    "explanation": "The command 'kubectl describe node <node-name>' shows detailed information about the node, such as labels, annotations, resource capacity, allocated resources, conditions, and events. 'kubectl get node' provides a summary list of nodes but not detailed info. 'kubectl inspect' and 'kubectl info' are not valid kubectl commands for nodes. 'kubectl logs' is used for retrieving logs from pods, not nodes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Inspecting Nodes",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/nodes/"
      },
      {
        "name": "Kubernetes kubectl Cheat Sheet",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 197,
    "question": "Which flag combination with the 'kubectl run' command generates a Pod manifest in YAML format without actually creating the Pod resource in the cluster?",
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
    "explanation": "Using '--dry-run=client -o yaml' with 'kubectl run' simulates the creation of the Pod resource on the client side and outputs the manifest in YAML format without sending it to the API server, thus not creating the resource. '--dry-run=server' validates on the server side but does not output YAML by default. '--output=yaml' alone does not prevent creation. '--generate-only' and '--no-create' are deprecated or invalid flags.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl run",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run"
      },
      {
        "name": "Kubernetes Blog - Understanding kubectl dry-run",
        "url": "https://kubernetes.io/blog/2020/06/08/kubectl-dry-run/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 199,
    "question": "Which command is used to apply configuration changes defined in 'deployment.yaml' to a Kubernetes resource?",
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
    "explanation": "The 'kubectl apply -f deployment.yaml' command applies configuration changes to a Kubernetes resource defined in the YAML file. It uses declarative management, ensuring that the resource's current state matches the desired state specified in the file. Other commands like 'kubectl create' are used for creating resources but do not update existing ones, while 'kubectl replace' replaces the entire resource instead of merging changes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Documentation: kubectl apply",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply"
      },
      {
        "name": "Spacelift Blog: kubectl apply vs create",
        "url": "https://spacelift.io/blog/kubectl-apply-vs-create"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:49:03"
  },
  {
    "id": 206,
    "question": "Which command is used to generate a 2048-bit RSA private key for a new Kubernetes user?",
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
    "explanation": "The command 'openssl genrsa -out user.key 2048' generates a 2048-bit RSA private key and saves it to 'user.key'. The second command attempts to process an existing key but does not generate a new one. The third command generates a new private key and a certificate signing request (CSR), not just the key. 'kubectl create secret tls' is for creating TLS secrets, not generating keys. 'ssh-keygen' generates SSH keys, which are different from the keys used for Kubernetes user certificates.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "OpenSSL Documentation - genrsa",
        "url": "https://www.openssl.org/docs/man1.1.1/man1/openssl-genrsa.html"
      },
      {
        "name": "Kubernetes Official Documentation - Creating a Client Certificate",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/certificates/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 207,
    "question": "After generating a Certificate Signing Request (CSR) and having it signed by the Kubernetes cluster Certificate Authority (CA), how do you configure kubectl to use the new client certificate and key for the user 'alice'?",
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
    "explanation": "To configure kubectl to use a new client certificate for a user, you use the command 'kubectl config set-credentials' specifying the user name along with the paths to the client certificate and private key files. This updates the kubeconfig file with the user's credentials. The other options do not configure kubectl credentials: 'kubectl create secret tls' creates a TLS secret in Kubernetes but does not affect kubectl client config; 'kubectl config set-context' sets the context but does not set credentials; 'kubectl apply -f' applies Kubernetes resources and is unrelated; 'kubectl certificate approve' approves a CSR but does not configure kubectl.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Configure Access to Multiple Clusters",
        "url": "https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/"
      },
      {
        "name": "Kubernetes Official Documentation - Certificate Signing Requests",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 222,
    "question": "Which commands can be used to list all loaded AppArmor profiles on a Linux node?",
    "options": [
      "sudo apparmor_status",
      "sudo aa-enforce",
      "sudo apparmor_parser -L",
      "sudo aa-status",
      "sudo systemctl status apparmor"
    ],
    "correct_answers": [
      0,
      3
    ],
    "explanation": "Both `sudo apparmor_status` and `sudo aa-status` can be used to list all loaded AppArmor profiles on a Linux node. These commands provide detailed information about AppArmor, including the number of loaded profiles, their modes (enforce or complain), and any unconfined processes.\n\nOther options are incorrect for the following reasons:\n\n1. `sudo aa-enforce`: This command is used to set an AppArmor profile to enforce mode, not to list profiles.\n2. `sudo apparmor_parser -L`: This command is used for loading AppArmor profiles but does not list them.\n3. `sudo systemctl status apparmor`: This command checks the status of the AppArmor service but does not provide a list of loaded profiles.\n\nUsing either `sudo apparmor_status` or `sudo aa-status` ensures you can monitor and manage AppArmor profiles effectively.",
    "question_type": "multiple-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "AppArmor Documentation - Ubuntu",
        "url": "https://ubuntu.com/server/docs/security-apparmor"
      },
      {
        "name": "Linux Manual Pages - aa-status",
        "url": "https://manpages.ubuntu.com/manpages/bionic/man8/aa-status.8.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 16:21:38"
  },
  {
    "id": 223,
    "question": "In Kubernetes, how can you apply an AppArmor profile to all containers within a Pod?",
    "options": [
      "Set the profile in the Pod's securityContext",
      "Annotate each container with the AppArmor profile",
      "Use the 'appArmorProfile' field in the container spec",
      "Specify the profile in the Deployment's metadata",
      "Set the profile in the node's AppArmor configuration"
    ],
    "correct_answers": [
      2,
      3
    ],
    "explanation": "To apply an AppArmor profile to all containers in a Pod, you can use one of two methods:\n\n1. **Annotations**: Use the annotation `container.apparmor.security.beta.kubernetes.io/<container_name>: <profile_ref>` for each container in the Pod. This method has been traditionally used and is backward-compatible.\n\n2. **`appArmorProfile` field in `securityContext`**: Starting with Kubernetes v1.30, you can specify the AppArmor profile directly in the `securityContext` of a container using the `appArmorProfile` field. This method is more intuitive and avoids relying on annotations.\n\nOther options, such as setting it in the Deployment metadata or node-level configuration, are not valid methods for applying AppArmor profiles to specific containers.",
    "question_type": "multiple-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Security Contexts",
        "url": "https://kubernetes.io/docs/tutorials/clusters/apparmor/"
      },
      {
        "name": "Kubernetes v1.30 Release Notes",
        "url": "https://kubernetes.io/docs/setup/release/notes/#feature-apparmor-profile-in-securitycontext"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 18:33:20"
  },
  {
    "id": 236,
    "question": "Which Kubernetes resource object is used to request a certificate signing operation via the Kubernetes API?",
    "options": [
      "CertificateRequest",
      "CertificateSigningRequest",
      "CertificateApproval",
      "CertificateSigning",
      "Certificate"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The Kubernetes resource 'CertificateSigningRequest' (CSR) is the official API object used to request a certificate signing operation. Users or components create a CSR object containing a public key and metadata; cluster administrators or automated controllers then approve and sign it. The other options are not valid Kubernetes resource kinds: 'CertificateRequest' and 'CertificateSigning' do not exist as Kubernetes resources; 'CertificateApproval' is not a resource but an action; 'Certificate' is not a Kubernetes resource for CSRs.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Certificate Signing Requests",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/"
      },
      {
        "name": "Kubernetes API Reference - CertificateSigningRequest",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#certificatesigningrequest-v1-certificates-k8s-io"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 18:33:20"
  },
  {
    "id": 237,
    "question": "Which command is used to approve a CertificateSigningRequest (CSR) in Kubernetes?",
    "options": [
      "kubectl sign csr <csr-name>",
      "kubectl create csr <csr-name>",
      "kubectl certificate approve <csr-name>",
      "kubectl approve csr <csr-name>",
      "kubectl csr approve <csr-name>"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct command to approve a CertificateSigningRequest (CSR) in Kubernetes is 'kubectl certificate approve <csr-name>'. This command instructs the certificate signing controller to approve the CSR, allowing the requested certificate to be issued. Other options like 'kubectl create' are used for creating resources, while 'kubectl sign', 'kubectl approve csr', and 'kubectl csr approve' are invalid commands.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Kubernetes Documentation: Managing TLS Certificates",
        "url": "https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster/"
      },
      {
        "name": "Kubernetes Reference: kubectl certificate approve",
        "url": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_certificate/kubectl_certificate_approve/"
      }
    ],
    "revision": 2,
    "revision_date": "2025-04-18 18:33:20"
  },
  {
    "id": 240,
    "question": "Which command lists all processes currently listening on TCP and UDP ports on a Linux system, including the associated process IDs?",
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
    "explanation": "The command 'sudo netstat -tulpn' lists all listening TCP and UDP ports along with the process IDs and names that are using those ports. The flags mean: '-t' for TCP, '-u' for UDP, '-l' for listening sockets, '-p' to show process info, and '-n' to show numeric addresses. 'sudo lsof -i' also shows network connections but is less focused on listening ports specifically. 'sudo ss -tulw' shows listening sockets but may omit process names without additional flags. 'sudo ps aux | grep LISTEN' is incorrect because 'LISTEN' is not a process name but a socket state. 'sudo netstat -an' shows all connections but does not include process information.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Connectivity",
    "sources": [
      {
        "name": "Linux man page - netstat",
        "url": "https://man7.org/linux/man-pages/man8/netstat.8.html"
      },
      {
        "name": "Linux man page - ss",
        "url": "https://man7.org/linux/man-pages/man8/ss.8.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 241,
    "question": "After identifying an unwanted process listening on a network port, which command can you use to terminate that process by its process ID (PID)?",
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
    "explanation": "The command 'sudo kill <pid>' sends a termination signal to the process with the specified PID, effectively stopping it. 'killall <process-name>' kills all processes matching the name but requires the exact process name and may affect multiple processes. 'sudo stop <process-name>' is used to stop services managed by Upstart, which is less common now. 'sudo systemctl disable <process-name>' disables a systemd service from starting on boot but does not stop a running process immediately. 'sudo service <process-name> remove' is not a valid command to stop processes.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Connectivity",
    "sources": [
      {
        "name": "Linux kill Command Manual",
        "url": "https://man7.org/linux/man-pages/man1/kill.1.html"
      },
      {
        "name": "Linux killall Command Manual",
        "url": "https://man7.org/linux/man-pages/man1/killall.1.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 242,
    "question": "Which command is used to remove the 'apache2' package from a Debian-based Linux system?",
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
    "explanation": "On Debian-based systems (such as Ubuntu), the package manager 'apt-get' is used to manage packages. The command 'sudo apt-get remove apache2' uninstalls the 'apache2' package but retains configuration files. 'sudo apt-get install apache2' installs the package. 'sudo yum remove apache2' and 'sudo dnf erase apache2' are used on Red Hat-based systems, not Debian-based. 'sudo rpm -e apache2' is also for RPM-based distributions and not applicable to Debian-based systems.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Supply Chain Security",
    "sources": [
      {
        "name": "Debian Administration - Package Management",
        "url": "https://wiki.debian.org/Apt"
      },
      {
        "name": "Ubuntu Official Documentation - Package Management",
        "url": "https://help.ubuntu.com/community/AptGet/Howto"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 243,
    "question": "Which command lists all installed packages on a Debian-based Linux system using the apt package manager?",
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
    "explanation": "The command 'apt list --installed' displays all packages installed via the apt package manager on Debian-based systems. While 'dpkg -l' also lists installed packages, it shows lower-level package information and is not specific to apt. 'rpm -qa' and 'yum list installed' are commands used on RPM-based systems like Red Hat or CentOS, and 'pkg info' is used in BSD-based systems, making them incorrect for Debian-based systems.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Supply Chain Security",
    "sources": [
      {
        "name": "Debian Wiki - APT",
        "url": "https://wiki.debian.org/Apt"
      },
      {
        "name": "Ubuntu Manpage - apt",
        "url": "https://manpages.ubuntu.com/manpages/focal/en/man8/apt.8.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 244,
    "question": "Which strace command-line option provides a summary of the time spent in each system call during program execution?",
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
    "explanation": "The '-c' option in strace outputs a summary report showing the count, total time, and average time spent in each system call, helping analyze performance bottlenecks. The '-p' option attaches strace to an existing process by PID, '-t' prefixes each line with a timestamp, '-e trace=%time' is not a valid option, and '-s' sets the maximum string size to print, so they do not provide a time summary.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "strace Manual",
        "url": "https://man7.org/linux/man-pages/man1/strace.1.html"
      },
      {
        "name": "Linux Journal - Using strace",
        "url": "https://www.linuxjournal.com/article/6460"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 245,
    "question": "Which strace command attaches to an already running process with PID 1234 to trace its system calls?",
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
    "explanation": "The correct command to attach strace to a running process with PID 1234 is 'strace -p 1234'. The '-p' option specifies the process ID to attach to. 'strace 1234' attempts to run a new process named '1234', which is invalid. 'strace -c 1234' runs strace with summary statistics on a new process named '1234'. 'sudo trace -pid 1234' is not a valid command, and 'strace --process 1234' is not a recognized option.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Observability",
    "sources": [
      {
        "name": "strace Manual",
        "url": "https://man7.org/linux/man-pages/man1/strace.1.html"
      },
      {
        "name": "Red Hat Documentation - strace",
        "url": "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sect-troubleshooting-strace"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 246,
    "question": "Which command calculates the SHA256 checksum of the file '/usr/bin/kubelet' on a Linux system?",
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
    "explanation": "The command 'sha256sum /usr/bin/kubelet' computes the SHA256 checksum of the specified file, which is commonly used to verify file integrity. 'sha1sum' and 'md5sum' calculate different hash algorithms (SHA1 and MD5 respectively). 'checksum -sha256' and 'hash -a sha256' are not standard Linux commands for checksum calculation.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "GNU Coreutils - sha256sum",
        "url": "https://www.gnu.org/software/coreutils/manual/html_node/sha256sum-invocation.html"
      },
      {
        "name": "Kubernetes Official Documentation - Verifying Binaries",
        "url": "https://kubernetes.io/docs/tasks/tools/install-kubectl/#verifying-the-kubectl-binary"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 247,
    "question": "Why is it critical to verify the checksums of Kubernetes binaries after downloading them?",
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
    "explanation": "Verifying the checksums of Kubernetes binaries ensures that the files have not been tampered with or corrupted during download, confirming their integrity and authenticity. This protects against malicious modifications or accidental corruption. Checking for the latest version, performance improvements, syntax errors, or enabling automatic updates are unrelated to checksum verification.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "PKI",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Verifying Binaries",
        "url": "https://kubernetes.io/docs/tasks/tools/install-kubectl/#verifying-the-kubectl-binary"
      },
      {
        "name": "NIST - Guide to Software Integrity Verification",
        "url": "https://csrc.nist.gov/publications/detail/sp/800-163/final"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 289,
    "question": "What is the primary function of a Service Mesh in Kubernetes architecture?",
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
    "explanation": "A Service Mesh is a dedicated infrastructure layer that manages service-to-service communication through sidecar proxies, providing features like traffic management, service discovery, and security policies without requiring application code changes. While pod communication occurs through the mesh, it's not merely a network overlay but rather a comprehensive communication management layer.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Service Mesh",
    "sources": [
      {
        "name": "Istio Documentation",
        "url": "https://istio.io/latest/docs/concepts/what-is-istio/"
      },
      {
        "name": "Kubernetes Service Mesh Interface (SMI) Specification",
        "url": "https://smi-spec.io/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 290,
    "question": "Which of the following are key advantages of implementing a Service Mesh in Kubernetes? (Select all that apply)",
    "options": [
      "Built-in observability through metrics, logs, and traces",
      "Simplifies application code by offloading cross-cutting concerns",
      "Enhanced security through mutual TLS encryption",
      "Adds significant latency to all communications",
      "Requires minimal operational expertise to implement"
    ],
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "Service Meshes provide three primary benefits: 1) Comprehensive observability through automatic collection of communication metrics and distributed tracing. 2) Offloading of cross-cutting concerns like retries, timeouts, and circuit breaking from application code. 3) Security enhancements through automatic mutual TLS and fine-grained access controls. While they add some overhead, modern implementations minimize latency impact through optimized data planes.",
    "question_type": "multiple-choice",
    "domain": "Platform Security",
    "subdomain": "Service Mesh",
    "sources": [
      {
        "name": "CNCF Service Mesh White Paper",
        "url": "https://www.cncf.io/blog/2020/10/06/service-mesh-a-cncf-white-paper/"
      },
      {
        "name": "Linkerd Documentation",
        "url": "https://linkerd.io/2.11/features/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  },
  {
    "id": 300,
    "question": "What is the correct kubectl command to set the default namespace for all subsequent operations in the current context?",
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
    "explanation": "The command 'kubectl config set-context --current --namespace=<namespace>' modifies the current context's namespace setting persistently. This differs from temporary namespace overrides using '-n' flag, and ensures all subsequent commands use the specified namespace by default. Other options either use incorrect syntax or modify different configuration aspects.",
    "question_type": "single-choice",
    "domain": "Platform Security",
    "subdomain": "Kubernetes Configuration",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - kubectl config",
        "url": "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#config"
      },
      {
        "name": "Kubernetes Cheat Sheet - Configuration",
        "url": "https://kubernetes.io/docs/reference/kubectl/cheatsheet/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 18:17:45"
  }
];
