
// Exported 36 questions for domain: Cloud Native Security
// Last revision date: 2025-02-06 14:05:18
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
    "question": "Which of the following statements are true about gVisor and Firecracker? (Select all that apply)",
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
    "explanation": "gVisor provides sandboxing; Firecracker uses microVMs; gVisor offers better performance than traditional VMs.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      3
    ],
    "explanation": "User-space kernels like gVisor run in user space and intercept system calls.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "These components verify image integrity and authenticity.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0
    ],
    "explanation": "The 4 Cs represent layers where security should be applied.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "The 4Cs of Cloud Native Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The security of the underlying infrastructure affects the cluster's security.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Cloud Provider and Infrastructure Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "Soft tenancy is suitable when strict isolation isn't required.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      0,
      1,
      2
    ],
    "explanation": "These methods help isolate resources in multi-tenancy setups.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Policy as code ensures consistent enforcement across clusters.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "A common reason is specifying an incorrect image name or tag.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "OPA allows you to define and enforce custom policies in Kubernetes and other systems.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "Mounting the Docker socket can lead to full control over the host's Docker daemon.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "explanation": "Admission controllers can enforce policies to allow only signed images.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "What is the outcome of setting 'imagePullPolicy: Never' in a pod spec?",
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
    "explanation": "Setting 'imagePullPolicy: Never' prevents pulling images; the image must exist locally.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      2
    ],
    "explanation": "While not a native Kubernetes object, BuildConfig is used in OpenShift for this purpose.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 4 Cs emphasise layered security across all levels.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "The 4Cs of Cloud Native Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "correct_answers": [
      1
    ],
    "explanation": "The 'envFrom' field in a pod spec allows environment variables from a ConfigMap to be injected.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 156,
    "question": "To block access to the cloud metadata API from Pods, which IP address should be blocked in the NetworkPolicy?",
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
    "explanation": "Blocking 169.254.169.254 prevents access to the cloud metadata service.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Cloud Provider and Infrastructure Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 164,
    "question": "Which tool can be used to perform static analysis of Kubernetes manifests for security issues?",
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
    "explanation": "Kubesec is a tool for static analysis of Kubernetes manifests to find security issues.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 203,
    "question": "Which annotation is used in a Pod manifest to specify an AppArmor profile for a container named 'nginx'?",
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
    "explanation": "The correct annotation is 'container.apparmor.security.beta.kubernetes.io/nginx: \"localhost/nginx-profile\"'.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "In a Dockerfile, which instruction can be used to ensure the application runs as a non-root user?",
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
    "explanation": "The USER instruction sets the running user to 'nobody', ensuring the container does not run as root.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 212,
    "question": "Which command scans a Docker image 'myapp:latest' for HIGH and CRITICAL vulnerabilities using Trivy?",
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
    "explanation": "The command 'trivy image --severity HIGH,CRITICAL myapp:latest' scans the image for critical vulnerabilities.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 213,
    "question": "After identifying a vulnerable image in your cluster, what is the recommended immediate action?",
    "options": [
      "Ignore the vulnerability",
      "Update the image tag to 'latest'",
      "Delete the pod using the image",
      "Restart the Kubernetes cluster",
      "Rebuild the image without changes"
    ],
    "correct_answers": [
      2
    ],
    "explanation": "Deleting the pod running the vulnerable image is the recommended immediate action to mitigate risk.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 216,
    "question": "Which flag allows you to run a Docker container sharing the PID namespace with another container named 'container1'?",
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
    "explanation": "The '--pid=container:container1' flag allows sharing the PID namespace with 'container1'.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 217,
    "question": "What is the effect of sharing the PID namespace between two Docker containers?",
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
    "explanation": "Sharing the PID namespace allows containers to see and interact with each other's processes.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Isolation Techniques",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "explanation": "Digests refer to a specific, immutable image version, ensuring consistency.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 219,
    "question": "How do you obtain the digest of an image 'nginx:1.19'?",
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
    "explanation": "The 'docker inspect --format='{{index .RepoDigests 0}}' nginx:1.19' command returns the image digest.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 248,
    "question": "What is a potential risk of using an insecure container registry?",
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
    "explanation": "An insecure registry can be compromised in transit, leading to tampered images.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 249,
    "question": "Which of the following is a best practice when configuring container registries?",
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
    "explanation": "Using HTTPS with authentication secures registry access.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Artifact Repository and Image Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
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
    "question": "Which of the following are Kubernetes best practices during the Deploy Phase? (Select all that apply)",
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
    "explanation": "Deploy best practices include implementing network policies, using admission controllers for images, and applying security contexts.",
    "question_type": "multiple-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Controls and Frameworks",
    "sources": [],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 288,
    "question": "Which of the following is a reason to use 'distroless' images?",
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
    "explanation": "Distroless images are minimal and reduce the attack surface by excluding unnecessary packages.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [],
    "revision": 0,
    "revision_date": null
  }
];
