
// Exported 36 questions for domain: Cloud Native Security
// Last revision date: 2025-04-18 17:57:37
export const CloudNativeSecurityQuestions = [
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
    "correct_answers": [
      1
    ],
    "explanation": "CWPPs are designed to protect workloads in any environment.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [],
    "revision": 1,
    "revision_date": "2025-02-04 09:03:39"
  },
  {
    "id": 10,
    "question": "What is the primary purpose of signing container images in a cloud-native environment?",
    "options": [
      "To reduce the image size for deployment",
      "To verify the image's integrity and authenticity",
      "To include metadata for deployment automation",
      "To enforce runtime security policies",
      "To speed up image pulling during deployment"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The primary purpose of image signing is to ensure that a container image originates from a trusted source and has not been tampered with. This process involves cryptographically signing the image, allowing users to verify its integrity and authenticity before use. Incorrect options such as reducing image size or speeding up deployment do not relate to the security function of signing. Similarly, metadata inclusion and runtime policy enforcement are separate mechanisms unrelated to image signing.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Content Trust Documentation",
        "url": "https://docs.docker.com/engine/security/trust/"
      },
      {
        "name": "CNCF Cloud Native Security Whitepaper",
        "url": "https://github.com/cncf/tag-security/blob/main/security-whitepaper/cloud-native-security-whitepaper.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:25:13"
  },
  {
    "id": 14,
    "question": "How do multistage builds in Docker reduce image size?",
    "options": [
      "By running multiple containers within a single image",
      "By creating images compatible with multiple architectures",
      "By separating build-time dependencies from runtime components in different stages",
      "By enabling parallel builds across multiple stages",
      "By deploying to multiple environments simultaneously"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Multistage builds in Docker allow developers to separate build-time dependencies (e.g., compilers, libraries) from runtime components by using multiple `FROM` instructions in a single Dockerfile. This ensures that only the necessary artifacts (e.g., binaries) are included in the final image, significantly reducing its size and improving security. While multistage builds can simplify workflows, they do not inherently enable parallel builds or support multi-environment deployments.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Documentation: Multi-Stage Builds",
        "url": "https://docs.docker.com/get-started/docker-concepts/building-images/multi-stage-builds/"
      },
      {
        "name": "Earthly Blog: Understanding Docker Multistage Builds",
        "url": "https://earthly.dev/blog/docker-multistage/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:13:12"
  },
  {
    "id": 18,
    "question": "What are the key characteristics of gVisor and Firecracker? (Select all that apply)",
    "options": [
      "gVisor is a user-space kernel providing sandboxing",
      "Firecracker uses lightweight microVMs with KVM",
      "Both provide full hardware virtualization",
      "Firecracker is a container runtime interface",
      "gVisor offers better performance than traditional VMs"
    ],
    "correct_answers": [
      0,
      1,
      4
    ],
    "explanation": "gVisor provides sandboxing by running in user space and intercepting system calls, which enhances security without the need for full hardware virtualization. Firecracker uses microVMs, leveraging KVM for efficient isolation. gVisor can offer better performance compared to traditional VMs due to its lightweight nature.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "gVisor Documentation",
        "url": "https://gvisor.dev/docs/"
      },
      {
        "name": "Firecracker Documentation",
        "url": "https://firecracker-microvm.github.io/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 19,
    "question": "What is the primary difference between MicroVM and User-Space Kernel approaches in cloud native security?",
    "options": [
      "MicroVMs are larger in size",
      "User-space kernels provide hardware virtualization",
      "MicroVMs run directly on hardware without a host OS",
      "User-space kernels intercept system calls in user space",
      "There is no difference; they are the same"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The primary difference lies in how they operate. User-space kernels, like gVisor, run in user space and intercept system calls, providing a lightweight sandboxing mechanism. MicroVMs, on the other hand, are full-fledged virtual machines that run directly on hardware but require a host OS for management.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "gVisor Documentation",
        "url": "https://gvisor.dev/docs/"
      },
      {
        "name": "MicroVM Overview",
        "url": "https://www.redhat.com/en/topics/virtualization/what-is-microvm"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 22,
    "question": "What components are necessary to verify the integrity and authenticity of a container image?",
    "options": [
      "A checksum and the image manifest",
      "A digital signature, public key, and verification tool",
      "The Dockerfile used to build the image",
      "Access to the container registry logs",
      "The image's pull secret"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "To verify the integrity and authenticity of a container image, you need a digital signature, a public key to verify the signature, and a verification tool. This ensures that the image has not been tampered with and comes from a trusted source.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Security Documentation",
        "url": "https://docs.docker.com/engine/security/"
      },
      {
        "name": "Container Image Security Best Practices",
        "url": "https://www.suse.com/c/suse-best-practices/container-image-security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 28,
    "question": "What are the four key areas of focus for cloud-native security, often referred to as the '4 Cs'?",
    "options": [
      "Code, Container, Cluster, Cloud",
      "Compute, Connectivity, Compliance, Cost",
      "Cloud, Core, Control, Compliance",
      "Code, Continuous Integration, Cloud, Compliance",
      "Containerization, Coordination, Configuration, Control"
    ],
    "correct_answers": [
      0
    ],
    "explanation": "The '4 Cs' of cloud-native security are Code, Container, Cluster, and Cloud. These represent the layers where security should be applied to ensure comprehensive protection across the entire cloud-native stack.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "The 4Cs of Cloud Native Security",
    "sources": [
      {
        "name": "Cloud Native Security Overview",
        "url": "https://cloudnativecomputing.dev/"
      },
      {
        "name": "Cloud Security Best Practices",
        "url": "https://www.cisecurity.org/insights/articles/cloud-security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 32,
    "question": "How does the underlying cloud infrastructure impact the security of a Kubernetes cluster?",
    "options": [
      "No impact, as Kubernetes abstracts infrastructure entirely",
      "Yes, infrastructure vulnerabilities can compromise cluster security",
      "Only if using on-premises hardware",
      "It depends on the Kubernetes version",
      "Only when running stateful applications"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The security of the underlying cloud infrastructure directly impacts the security of a Kubernetes cluster. Vulnerabilities in the infrastructure can compromise the cluster, making it essential to ensure the infrastructure is secure.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Cloud Provider and Infrastructure Security",
    "sources": [
      {
        "name": "Kubernetes Security Documentation",
        "url": "https://kubernetes.io/docs/concepts/security/"
      },
      {
        "name": "Cloud Security Best Practices",
        "url": "https://www.cisecurity.org/insights/articles/cloud-security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 38,
    "question": "In which scenarios is soft multi-tenancy preferred over hard multi-tenancy in cloud-native environments?",
    "options": [
      "When strict tenant isolation is mandatory",
      "For workloads from untrusted tenants requiring strong isolation",
      "To maximize resource utilization efficiency in trusted tenant environments",
      "When compliance with strict regulatory requirements is necessary",
      "When deploying workloads across multiple Kubernetes clusters"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Soft multi-tenancy is preferred when tenants are trusted and strict isolation is not required, allowing for more efficient sharing of resources. Hard multi-tenancy, by contrast, enforces strict isolation suitable for untrusted tenants or compliance-driven environments. Therefore, soft multi-tenancy optimizes resource usage in trusted settings but is not suitable where strong isolation or regulatory compliance is mandatory.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Multi-tenancy",
        "url": "https://kubernetes.io/docs/concepts/security/multi-tenancy/"
      },
      {
        "name": "CNCF - Multi-tenancy in Kubernetes",
        "url": "https://www.cncf.io/blog/2020/05/27/multi-tenancy-in-kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 39,
    "question": "Which methods can be used to isolate resources effectively in a multi-tenant Kubernetes environment? (Select all that apply)",
    "options": [
      "Deploying separate Kubernetes clusters for each tenant",
      "Using Kubernetes namespaces combined with Role-Based Access Control (RBAC)",
      "Applying Kubernetes Network Policies to restrict traffic",
      "Sharing service accounts among tenants to simplify access",
      "Disabling resource quotas to allow unlimited resource usage"
    ],
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "Effective resource isolation in multi-tenant Kubernetes environments can be achieved by deploying separate clusters, using namespaces with RBAC to control access, and applying network policies to restrict communication. Sharing service accounts among tenants reduces isolation and is insecure. Disabling resource quotas removes limits on resource consumption, which can lead to resource contention and is not recommended.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Namespaces",
        "url": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
      },
      {
        "name": "Kubernetes Official Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 40,
    "question": "What is an effective and consistent approach to enforce policies across multiple Kubernetes clusters?",
    "options": [
      "Manually applying policies individually on each cluster",
      "Using policy-as-code tools such as Open Policy Agent (OPA) or Kyverno",
      "Relying solely on default Kubernetes security settings",
      "Implementing different policies tailored for each environment",
      "Enforcing policies only at the application layer"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Using policy-as-code tools like OPA or Kyverno enables automated, consistent, and scalable enforcement of policies across multiple Kubernetes clusters. Manual application is error-prone and inconsistent. Default Kubernetes settings are minimal and insufficient for comprehensive policy enforcement. Tailoring different policies per environment can lead to inconsistencies. Enforcing policies only at the application layer misses cluster-level security controls.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [
      {
        "name": "Open Policy Agent Documentation",
        "url": "https://www.openpolicyagent.org/docs/latest/"
      },
      {
        "name": "Kyverno Policy Management",
        "url": "https://kyverno.io/docs/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 45,
    "question": "What is a common cause for failing to pull the latest version of a container image from the 'k8s.gcr.io' registry?",
    "options": [
      "The image registry has been deprecated or is unavailable",
      "Specifying an incorrect image name or tag in the pull command",
      "Network policies blocking outbound traffic from the node",
      "The Kubernetes node lacks sufficient CPU or memory resources",
      "The kube-proxy component is not running on the node"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "A frequent reason for image pull failures is specifying an incorrect image name or tag, which leads to the registry not finding the requested image. While registry deprecation or network policies can also cause issues, the most common and easily overlooked cause is a typo or mismatch in the image reference. Insufficient node resources or kube-proxy issues typically do not directly cause image pull failures.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Container Images",
        "url": "https://kubernetes.io/docs/concepts/containers/images/"
      },
      {
        "name": "Google Container Registry Troubleshooting",
        "url": "https://cloud.google.com/container-registry/docs/troubleshooting"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 54,
    "question": "What is the primary function of the Open Policy Agent (OPA) in Kubernetes environments?",
    "options": [
      "A tool for monitoring and analyzing cluster performance metrics",
      "A general-purpose policy engine that enables defining and enforcing custom policies",
      "A built-in Kubernetes admission controller for validating resources",
      "A network policy enforcement tool for controlling pod communication",
      "A secret management system for storing sensitive data"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Open Policy Agent (OPA) is a flexible, general-purpose policy engine that allows administrators to define and enforce custom policies across Kubernetes and other systems. It integrates with Kubernetes admission controllers but is not itself built-in. OPA is not a monitoring tool, network policy enforcer, or secret management system, although it can be used to enforce policies related to these areas.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [
      {
        "name": "Open Policy Agent Official Documentation",
        "url": "https://www.openpolicyagent.org/docs/latest/"
      },
      {
        "name": "Kubernetes Admission Controllers - OPA Gatekeeper",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#opa-gatekeeper"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 63,
    "question": "What security risk is associated with mounting the Docker socket ('/var/run/docker.sock') into a container?",
    "options": [
      "No risk; it's a common practice",
      "The container can control the Docker daemon and other containers",
      "It improves container performance",
      "It provides secure access to host resources",
      "It isolates the container from the host"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Mounting the Docker socket into a container allows the container to control the host's Docker daemon, potentially leading to unauthorized access or manipulation of other containers and host resources. This practice should be avoided unless absolutely necessary and properly secured.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "Docker Documentation",
        "url": "https://docs.docker.com/engine/reference/commandline/dockerd/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
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
    "correct_answers": [
      1
    ],
    "explanation": "To ensure only signed images are run in a Kubernetes cluster, you can configure admission controllers like Gatekeeper or Kyverno to enforce policies that verify image signatures. This ensures that only trusted images are deployed.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Kubernetes Admission Controllers",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      },
      {
        "name": "Gatekeeper Documentation",
        "url": "https://open-policy-agent.github.io/gatekeeper/website/docs/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 73,
    "question": "What is the primary benefit of using multistage Docker builds?",
    "options": [
      "Faster build times by reusing intermediate stages",
      "Smaller and more secure final images by excluding build-time dependencies",
      "Compatibility with older Docker versions for broader deployment",
      "Simplified deployment scripts for easier automation",
      "Enhanced network performance during container communication"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The primary advantage of multistage Docker builds is the ability to create smaller and more secure final images. By separating the build and runtime stages, unnecessary build-time dependencies (e.g., compilers, libraries) are excluded from the final image. This reduces the image size, minimizes the attack surface, and enhances security. While multistage builds can indirectly improve build times by optimizing layers, their main focus is on producing leaner and safer images. They do not specifically address network performance or deployment script simplification.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Documentation: Multi-Stage Builds",
        "url": "https://docs.docker.com/get-started/docker-concepts/building-images/multi-stage-builds/"
      },
      {
        "name": "Cherry Servers: Docker Multi-Stage Build",
        "url": "https://www.cherryservers.com/blog/docker-multistage-build"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 13:13:12"
  },
  {
    "id": 90,
    "question": "What is the outcome of setting 'imagePullPolicy: Never' in a Kubernetes pod specification?",
    "options": [
      "The image will always be pulled from the registry",
      "The pod will fail to start if the image is not present locally",
      "The image will be pulled only if not present",
      "The pod will ignore image updates in the registry",
      "The kubelet will crash"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Setting 'imagePullPolicy: Never' in a Kubernetes pod specification means that the image will not be pulled from the registry. The pod will only start if the image is already present locally. This policy is useful for environments where network connectivity is limited or unreliable.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Kubernetes Image Pull Policy",
        "url": "https://kubernetes.io/docs/concepts/containers/images/#imagepullpolicy"
      },
      {
        "name": "Kubernetes Pod Spec Documentation",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#podspec-v1-core"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 133,
    "question": "Which Kubernetes or related object defines how to build and deploy an application from source code?",
    "options": [
      "Deployment",
      "StatefulSet",
      "BuildConfig (OpenShift)",
      "DaemonSet",
      "Job"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "While Kubernetes itself does not have a native object for building applications from source code, OpenShift uses the 'BuildConfig' object for this purpose. It defines how to build and deploy applications from source code into containers.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "OpenShift BuildConfig Documentation",
        "url": "https://docs.openshift.com/container-platform/4.11/builds/what-are-builds.html"
      },
      {
        "name": "Kubernetes Workloads Documentation",
        "url": "https://kubernetes.io/docs/concepts/workloads/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 146,
    "question": "What are the key principles of the 4 Cs of cloud-native security?",
    "options": [
      "Encrypting data at rest only",
      "Applying security at Code, Container, Cluster, and Cloud levels",
      "Relying solely on cloud provider security",
      "Using containers to bypass security checks",
      "Limiting security to the network layer"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 4 Cs of cloud-native security emphasize the importance of applying security measures at multiple levels: Code (secure coding practices), Container (secure containerization), Cluster (secure Kubernetes clusters), and Cloud (secure cloud infrastructure). This layered approach ensures comprehensive security.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "The 4Cs of Cloud Native Security",
    "sources": [
      {
        "name": "Cloud Native Security Principles",
        "url": "https://cloudnative.io/cloud-native-security/"
      },
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 150,
    "question": "Which Kubernetes Pod specification field allows you to inject environment variables from a ConfigMap into containers?",
    "options": [
      "VolumeMount",
      "envFrom",
      "Secret",
      "Annotation",
      "Label"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'envFrom' field in a Pod specification enables injecting all key-value pairs from a ConfigMap as environment variables into the container. 'VolumeMount' is used for mounting volumes, 'Secret' is a separate object for sensitive data, 'Annotation' and 'Label' are metadata and do not inject environment variables.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - Configure a Pod to Use a ConfigMap",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/"
      },
      {
        "name": "Kubernetes API Reference - PodSpec envFrom",
        "url": "https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#envfromsource-v1-core"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 156,
    "question": "To prevent Pods from accessing the cloud provider's metadata API, which IP address should be blocked in a Kubernetes NetworkPolicy?",
    "options": [
      "0.0.0.0/0",
      "127.0.0.1/32",
      "169.254.169.254/32",
      "255.255.255.255/32",
      "192.168.0.1/32"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The IP address 169.254.169.254 is the standard link-local address used by cloud providers (such as AWS, GCP, Azure) for their metadata service. Blocking this IP in a NetworkPolicy prevents Pods from querying sensitive metadata, mitigating risks like metadata service exploitation. Other IPs listed do not correspond to the cloud metadata service.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Cloud Provider and Infrastructure Security",
    "sources": [
      {
        "name": "AWS Documentation - Instance Metadata and User Data",
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html"
      },
      {
        "name": "Kubernetes NetworkPolicy Documentation",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 164,
    "question": "Which tool is specifically designed to perform static security analysis of Kubernetes manifests to identify potential security issues?",
    "options": [
      "kube-bench",
      "kube-hunter",
      "kube-score",
      "kubectl describe",
      "kubesec"
    ],
    "correct_answers": [
      4
    ],
    "explanation": "Kubesec is a static analysis tool that scans Kubernetes manifests for security risks and best practices violations before deployment. 'kube-bench' checks cluster nodes against CIS benchmarks, 'kube-hunter' performs active scanning for vulnerabilities, 'kube-score' provides general manifest validation but is less focused on security, and 'kubectl describe' is a CLI command for inspecting resources.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [
      {
        "name": "Kubesec Official GitHub Repository",
        "url": "https://github.com/controlplaneio/kubesec"
      },
      {
        "name": "CNCF Security Tools Landscape",
        "url": "https://landscape.cncf.io/category=security&format=card-mode&grouping=category"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 203,
    "question": "In a Kubernetes Pod manifest, which annotation is used to specify an AppArmor profile for a container named 'nginx'?",
    "options": [
      "apparmor.security.beta.kubernetes.io/nginx: 'localhost/nginx-profile'",
      "security.alpha.kubernetes.io/apparmor/nginx: 'localhost/nginx-profile'",
      "container.apparmor.security.beta.kubernetes.io/nginx: 'localhost/nginx-profile'",
      "nginx.apparmor.kubernetes.io/profile: 'localhost/nginx-profile'",
      "securityContext.apparmorProfile: 'localhost/nginx-profile'"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct annotation format to specify an AppArmor profile for a container named 'nginx' is 'container.apparmor.security.beta.kubernetes.io/nginx: \"localhost/nginx-profile\"'. This annotation applies the profile to the specific container. Other options are either incorrect prefixes, deprecated, or invalid Kubernetes annotation keys.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "Kubernetes Official Documentation - AppArmor",
        "url": "https://kubernetes.io/docs/tutorials/clusters/apparmor/"
      },
      {
        "name": "AppArmor Kubernetes Integration",
        "url": "https://gitlab.com/apparmor/apparmor/-/wikis/Kubernetes"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 210,
    "question": "What are the key best practices for hardening container images to enhance security?",
    "options": [
      "Use a minimal base image to reduce the attack surface.",
      "Run containers as root to simplify privilege management.",
      "Remove unnecessary packages and dependencies to minimize potential vulnerabilities.",
      "Expose all ports for maximum connectivity and flexibility.",
      "Regularly scan images for known vulnerabilities and apply necessary patches."
    ],
    "correct_answers": [
      0,
      2,
      4
    ],
    "explanation": "To effectively harden container images, it is crucial to minimize the attack surface and potential vulnerabilities. Using minimal base images ensures that only essential components are included, reducing the number of potential security flaws. Removing unnecessary packages further decreases the likelihood of exploitable vulnerabilities. Regularly scanning images for known vulnerabilities allows for proactive identification and remediation of security risks. Running containers as root is discouraged because it gives the process elevated privileges that it does not need and exposes the host system to vulnerabilities. Exposing all ports creates unnecessary entry points for attackers.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "NIST Special Publication 800-190",
        "url": "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf"
      },
      {
        "name": "OWASP Container Security Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Container_Security_Cheat_Sheet.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:05:18"
  },
  {
    "id": 211,
    "question": "In a Dockerfile, which instruction is used to specify that the container should run as a non-root user?",
    "options": [
      "FROM nonroot",
      "USER nobody",
      "RUN chmod 777 /app",
      "EXPOSE 80",
      "ENTRYPOINT [\"/app\"]"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The 'USER' instruction in a Dockerfile sets the user under which the container process runs. Using 'USER nobody' ensures the application runs as a non-root user, enhancing container security. 'FROM nonroot' is not a valid instruction, 'RUN chmod 777 /app' changes permissions but does not change the user, 'EXPOSE' declares ports, and 'ENTRYPOINT' specifies the executable.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "Dockerfile reference - USER instruction",
        "url": "https://docs.docker.com/engine/reference/builder/#user"
      },
      {
        "name": "Docker Security Best Practices",
        "url": "https://docs.docker.com/develop/dev-best-practices/#user"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 212,
    "question": "What command is used to scan a Docker image named 'myapp:latest' for HIGH and CRITICAL vulnerabilities using Trivy?",
    "options": [
      "trivy myapp:latest",
      "trivy image --severity HIGH,CRITICAL myapp:latest",
      "trivy scan --critical myapp:latest",
      "trivy image --vulnerabilities HIGH,CRITICAL myapp:latest",
      "trivy inspect myapp:latest"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "The correct command to scan for HIGH and CRITICAL vulnerabilities is 'trivy image --severity HIGH,CRITICAL myapp:latest'. This command specifically targets vulnerabilities of those severities in the Docker image.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Trivy Documentation",
        "url": "https://aquasecurity.github.io/trivy/v0.34/docs/commands/image/"
      },
      {
        "name": "Docker Security Best Practices",
        "url": "https://docs.docker.com/engine/security/security-bestpractices/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 213,
    "question": "Upon identifying a vulnerable Docker image in your Kubernetes cluster, what is the recommended immediate action to mitigate the risk?",
    "options": [
      "Ignore the vulnerability",
      "Update the image tag to 'latest'",
      "Delete the pod using the vulnerable image",
      "Restart the Kubernetes cluster",
      "Rebuild the image without changes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The recommended immediate action is to delete the pod running the vulnerable image. This action helps mitigate the risk by removing the vulnerable container from your environment.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/security-best-practices/"
      },
      {
        "name": "Vulnerability Management in Kubernetes",
        "url": "https://www.suse.com/products/security/vulnerability-management-in-kubernetes/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 216,
    "question": "Which Docker flag allows a container to share the PID namespace with another container named 'container1'?",
    "options": [
      "--pid=host",
      "--pid=container1",
      "--pid=container:container1",
      "--net=container:container1",
      "--namespace=pid:container1"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "The correct flag to share the PID namespace is '--pid=container:container1'. This allows processes in one container to see and interact with processes in the other container.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "Docker Run Reference",
        "url": "https://docs.docker.com/engine/reference/commandline/run/"
      },
      {
        "name": "PID Namespace Sharing",
        "url": "https://man7.org/linux/man-pages/man7/pid_namespaces.7.html"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 217,
    "question": "What is the primary effect of sharing the PID namespace between two Docker containers?",
    "options": [
      "They share the same network interfaces",
      "They can see and signal each other's processes",
      "They share the same filesystem",
      "They can access each other's environment variables",
      "They share the same memory space"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Sharing the PID namespace allows containers to see and interact with each other's processes. This means they can send signals to processes running in the other container.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [
      {
        "name": "PID Namespaces",
        "url": "https://man7.org/linux/man-pages/man7/pid_namespaces.7.html"
      },
      {
        "name": "Docker Container Isolation",
        "url": "https://docs.docker.com/engine/security/container_isolation/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 218,
    "question": "Why is it recommended to use image digests instead of tags in Kubernetes manifests?",
    "options": [
      "Digests are shorter than tags",
      "Tags can be mutable, but digests ensure image immutability",
      "Using digests is required by Kubernetes",
      "Tags are not supported in private registries",
      "Digests allow for automatic updates"
    ],
    "correct_answers": [
      1
    ],
    "explanation": "Image digests are recommended because they refer to a specific, immutable version of an image. This ensures consistency and predictability in deployments, unlike mutable tags.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Kubernetes Image Pull Policy",
        "url": "https://kubernetes.io/docs/concepts/containers/images/#imagepullpolicy"
      },
      {
        "name": "Immutable Docker Images",
        "url": "https://docs.docker.com/registry/introduction/#immutable-images"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 219,
    "question": "How can you retrieve the digest (content hash) of the Docker image 'nginx:1.19' using the Docker CLI?",
    "options": [
      "docker images nginx:1.19 --digests",
      "docker inspect nginx:1.19 --format='{{.Id}}'",
      "docker pull nginx@sha256",
      "docker inspect --format='{{index .RepoDigests 0}}' nginx:1.19",
      "docker tag nginx:1.19 nginx:sha256"
    ],
    "correct_answers": [
      3
    ],
    "explanation": "The command 'docker inspect --format='{{index .RepoDigests 0}}' nginx:1.19' extracts the image digest from the image's metadata, showing the content-addressable identifier (digest) of the image. Option 1 lists digests for all images but may not show the specific digest for the tag. Option 2 shows the image ID, which is different from the digest. Option 3 is incomplete and incorrect syntax. Option 5 is unrelated to obtaining the digest, as it tags images but does not display digests.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Documentation - Inspect",
        "url": "https://docs.docker.com/engine/reference/commandline/inspect/"
      },
      {
        "name": "Docker Documentation - Image Digests",
        "url": "https://docs.docker.com/engine/reference/commandline/pull/#pull-an-image-by-digest-immutable-identifier"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 248,
    "question": "What is a significant security risk associated with using an insecure container registry?",
    "options": [
      "Faster image downloads",
      "Increased image caching",
      "Man-in-the-middle attacks leading to compromised images",
      "Improved image availability",
      "Automatic image updates"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Using an insecure container registry exposes images to interception and tampering during transit, enabling man-in-the-middle attacks that can compromise container images. This can lead to running malicious or altered images in production. The other options describe benefits or neutral effects unrelated to security risks.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "CNCF - Container Registry Security Best Practices",
        "url": "https://github.com/cncf/tag-security/blob/main/security-whitepaper/container-registry-security.md"
      },
      {
        "name": "Docker Documentation - Registry Security",
        "url": "https://docs.docker.com/registry/security/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 249,
    "question": "Which of the following is a recommended best practice when configuring container registries to ensure security?",
    "options": [
      "Use HTTP instead of HTTPS for performance",
      "Allow anonymous access",
      "Use authenticated and encrypted connections (HTTPS)",
      "Disable TLS verification",
      "Expose the registry publicly without restrictions"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Using HTTPS with authentication ensures that communication with the container registry is encrypted and access is controlled, preventing unauthorized access and tampering. Using HTTP or disabling TLS verification exposes the registry to interception and attacks. Allowing anonymous or unrestricted public access increases the risk of unauthorized image uploads or downloads.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [
      {
        "name": "Docker Documentation - Registry Security",
        "url": "https://docs.docker.com/registry/security/"
      },
      {
        "name": "CNCF - Container Registry Security Best Practices",
        "url": "https://github.com/cncf/tag-security/blob/main/security-whitepaper/container-registry-security.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 273,
    "question": "During the build phase of a Kubernetes application, which practices are most effective for ensuring security?",
    "options": [
      "Use minimal base images to reduce the attack surface.",
      "Run containers as root to simplify privilege management.",
      "Scan images for vulnerabilities to identify and remediate potential security flaws.",
      "Include unnecessary packages to provide additional functionality.",
      "Use only authorized images from trusted registries to prevent the introduction of malicious code."
    ],
    "correct_answers": [
      0,
      2,
      4
    ],
    "explanation": "In the build phase, security is best ensured by minimizing the image footprint with minimal base images, regularly scanning for vulnerabilities to catch issues early, and using only authorized images from trusted sources.  Minimal base images reduce the attack surface.  Vulnerability scanning identifies and allows remediation of security flaws before deployment. Using authorized images prevents the introduction of untrusted or malicious code. Running containers as root is a security risk, and including unnecessary packages increases the potential attack surface.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "Kubernetes Security Best Practices",
        "url": "https://kubernetes.io/docs/concepts/security/best-practices/"
      },
      {
        "name": "SANS Institute: Securing Docker Containers",
        "url": "https://www.sans.org/white-papers/36267/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-02-06 14:05:18"
  },
  {
    "id": 284,
    "question": "Which of the following are Kubernetes security best practices to follow during the Deploy phase? (Select all that apply)",
    "options": [
      "Implement network policies",
      "Run containers as root",
      "Use image tags like 'latest'",
      "Use the ImagePolicyWebhook admission controller",
      "Apply security contexts to pods and containers"
    ],
    "correct_answers": [
      0,
      3,
      4
    ],
    "explanation": "During deployment, implementing network policies restricts pod communication to only necessary traffic, reducing attack surfaces. The ImagePolicyWebhook admission controller enforces image security policies to prevent untrusted images from running. Applying security contexts defines permissions and restrictions for pods and containers, enhancing security. Running containers as root and using mutable tags like 'latest' are discouraged as they increase security risks and reduce traceability.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [
      {
        "name": "Kubernetes Documentation - Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      },
      {
        "name": "Kubernetes Documentation - Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  },
  {
    "id": 288,
    "question": "Why are 'distroless' container images recommended for use in production environments?",
    "options": [
      "They include a shell for debugging",
      "They have a larger attack surface",
      "They are minimal images that reduce vulnerabilities",
      "They support all Linux distributions",
      "They are required by Kubernetes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "'Distroless' images contain only the application and its runtime dependencies, excluding package managers, shells, and other unnecessary tools. This minimalism reduces the attack surface and potential vulnerabilities. They do not include shells, which can make debugging harder but improves security. They are not required by Kubernetes and do not inherently support all Linux distributions.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "Google Distroless Images GitHub",
        "url": "https://github.com/GoogleContainerTools/distroless"
      },
      {
        "name": "CNCF - Container Image Security Best Practices",
        "url": "https://github.com/cncf/tag-security/blob/main/security-whitepaper/container-image-security.md"
      }
    ],
    "revision": 1,
    "revision_date": "2025-04-18 17:57:37"
  }
];
