// TODO: Implement functionality for cloudNativeSecurityQuestions
export const cloudNativeSecurityQuestions = 
[
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Workload and Application Code Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "multiple-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Isolation Techniques"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Isolation Techniques"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "The 4Cs of Cloud Native Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Cloud Provider and Infrastructure Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Controls and Frameworks"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Controls and Frameworks"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Isolation Techniques"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Artifact Repository and Image Security"
    },
    {
      "id": 79,
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Isolation Techniques"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Workload and Application Code Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "The 4Cs of Cloud Native Security"
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
      "question_type": "single-choice",
      "domain": "Cloud Native Security",
      "subdomain": "Workload and Application Code Security"
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
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "The 4Cs of Cloud Native Security"
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
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Workload and Application Code Security"
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
          "correct_answers": [2],
          "explanation": "The cloud metadata service is accessible at 169.254.169.254, so blocking this IP prevents access.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Cloud Provider and Infrastructure Security"
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
          "correct_answers": [4],
          "explanation": "Kubesec is a tool for static analysis of Kubernetes manifests to find security issues.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Controls and Frameworks"
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
          "correct_answers": [2],
          "explanation": "The correct annotation is 'container.apparmor.security.beta.kubernetes.io/<container_name>: <profile>', where '<container_name>' is 'nginx'.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Isolation Techniques"
        },
        {
          "id": 210,
          "question": "Which of the following are best practices for container image hardening? (Select all that apply)",
          "options": [
            "Use a minimal base image",
            "Run containers as root",
            "Remove unnecessary packages",
            "Expose all ports for flexibility",
            "Regularly scan images for vulnerabilities"
          ],
          "correct_answers": [0, 2, 4],
          "explanation": "Best practices include using minimal base images, removing unnecessary packages, and scanning for vulnerabilities. Running as root and exposing all ports are not recommended.",
          "question_type": "multiple-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [1],
          "explanation": "The 'USER' instruction sets the user to 'nobody', ensuring the application does not run as root.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Workload and Application Code Security"
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
          "correct_answers": [1],
          "explanation": "The correct command is 'trivy image --severity HIGH,CRITICAL myapp:latest'.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [2],
          "explanation": "The recommended action is to delete the pod running the vulnerable image to mitigate the risk.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [2],
          "explanation": "The '--pid=container:container1' flag allows sharing the PID namespace with 'container1'.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Isolation Techniques"
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
          "correct_answers": [1],
          "explanation": "Sharing the PID namespace allows containers to see and interact with each other's processes.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Isolation Techniques"
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
          "correct_answers": [1],
          "explanation": "Tags can point to different images over time, but digests refer to a specific image, ensuring immutability.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [3],
          "explanation": "The command 'docker inspect --format='{{index .RepoDigests 0}}' nginx:1.19' returns the image digest.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [2],
          "explanation": "Using an insecure registry can expose you to man-in-the-middle attacks where images can be tampered with.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
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
          "correct_answers": [2],
          "explanation": "Using authenticated and encrypted connections ensures secure access to the registry.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Artifact Repository and Image Security"
        },
        {
          "id": 273,
          "question": "Which of the following are Kubernetes best practices during the Build Phase? (Select all that apply)",
          "options": [
            "Use minimal base images",
            "Run containers as root",
            "Scan images for vulnerabilities",
            "Include unnecessary packages",
            "Use authorized images only"
          ],
          "correct_answers": [0, 2, 4],
          "explanation": "Best practices include using minimal base images, scanning for vulnerabilities, and using authorized images.",
          "question_type": "multiple-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Workload and Application Code Security"
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
          "correct_answers": [0, 3, 4],
          "explanation": "Best practices include implementing network policies, using the ImagePolicyWebhook admission controller, and applying security contexts.",
          "question_type": "multiple-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Controls and Frameworks"
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
          "correct_answers": [2],
          "explanation": "Distroless images are minimal and exclude unnecessary packages, reducing the attack surface.",
          "question_type": "single-choice",
          "domain": "Cloud Native Security",
          "subdomain": "Workload and Application Code Security"
        }      
  ]
  ;
