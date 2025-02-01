// TODO: Implement functionality for cloudNativeSecurityQuestions
export const cloudNativeSecurityQuestions = 
    [
        {
          "id": 7,
          "question": "What is the primary purpose of a Cloud Workload Protection Platform (CWPP)?",
          "domain": "Cloud Native Security",
          "options": [
            "Monitor network traffic",
            "Secure workloads across various environments",
            "Manage cloud costs",
            "Provide identity and access management",
            "Automate infrastructure provisioning"
          ],
          "correct_answers": [1],
          "explanation": "CWPPs are designed to protect workloads in any environment.",
          "question_type": "single-choice"
        },
        {
          "id": 10,
          "question": "What is the purpose of image signing in container environments?",
          "domain": "Cloud Native Security",
          "options": [
            "To compress the image size",
            "To verify the image's integrity and authenticity",
            "To add metadata for deployment",
            "To enforce runtime policies",
            "To enable faster image pulls"
          ],
          "correct_answers": [1],
          "explanation": "Image signing ensures images are from trusted sources and have not been tampered with.",
          "question_type": "single-choice"
        },
        {
          "id": 14,
          "question": "What is the purpose of a multistage build in Docker?",
          "domain": "Cloud Native Security",
          "options": [
            "To run multiple containers in one image",
            "To build images compatible with multiple architectures",
            "To reduce image size by separating build and runtime stages",
            "To enable parallel builds",
            "To deploy to multiple environments simultaneously"
          ],
          "correct_answers": [2],
          "explanation": "Multistage builds allow copying only necessary artifacts to the final image.",
          "question_type": "single-choice"
        },
        {
          "id": 18,
          "question": "Which of the following statements are true about gVisor and Firecracker? (Select all that apply)",
          "domain": "Cloud Native Security",
          "options": [
            "gVisor is a user-space kernel providing sandboxing",
            "Firecracker uses lightweight microVMs with KVM",
            "Both provide full hardware virtualization",
            "Firecracker is a container runtime interface",
            "gVisor offers better performance than traditional VMs"
          ],
          "correct_answers": [0, 1, 4],
          "explanation": "gVisor provides sandboxing; Firecracker uses microVMs; gVisor offers better performance than traditional VMs.",
          "question_type": "multiple-choice"
        },
        {
          "id": 19,
          "question": "What is the primary difference between MicroVM and User-Space Kernel approaches?",
          "domain": "Cloud Native Security",
          "options": [
            "MicroVMs are larger in size",
            "User-space kernels provide hardware virtualization",
            "MicroVMs run directly on hardware without a host OS",
            "User-space kernels intercept system calls in user space",
            "There is no difference; they are the same"
          ],
          "correct_answers": [3],
          "explanation": "User-space kernels like gVisor run in user space and intercept system calls.",
          "question_type": "single-choice"
        },
        {
          "id": 22,
          "question": "What components are needed to verify the integrity of a container image?",
          "domain": "Cloud Native Security",
          "options": [
            "A checksum and the image manifest",
            "A digital signature, public key, and verification tool",
            "The Dockerfile used to build the image",
            "Access to the container registry logs",
            "The image's pull secret"
          ],
          "correct_answers": [1],
          "explanation": "These components verify image integrity and authenticity.",
          "question_type": "single-choice"
        },
        {
          "id": 28,
          "question": "What are the 4 Cs of cloud-native security?",
          "domain": "Cloud Native Security",
          "options": [
            "Code, Container, Cluster, Cloud",
            "Compute, Connectivity, Compliance, Cost",
            "Cloud, Core, Control, Compliance",
            "Code, Continuous Integration, Cloud, Compliance",
            "Containerization, Coordination, Configuration, Control"
          ],
          "correct_answers": [0],
          "explanation": "The 4 Cs represent layers where security should be applied.",
          "question_type": "single-choice"
        },
    
        {
            "id": 45,
            "question": "What could be a possible reason for failing to pull the latest version of an image from 'k8s.gcr.io'?",
            "domain": "Cloud Native Security",
            "options": [
            "The image registry is deprecated",
            "Incorrect image tag or name",
            "Network policies blocking egress traffic",
            "The node has insufficient resources",
            "kube-proxy is not running"
            ],
            "correct_answers": [1],
            "explanation": "A common reason is specifying an incorrect image name or tag.",
            "question_type": "single-choice"
        },
        {
            "id": 55,
            "question": "How does image signing enhance container security?",
            "domain": "Cloud Native Security",
            "options": [
            "By encrypting the image layers",
            "By verifying the image's source and integrity",
            "By compressing the image for faster deployment",
            "By scanning the image for vulnerabilities",
            "By optimizing runtime performance"
            ],
            "correct_answers": [1],
            "explanation": "Image signing helps ensure that images are from trusted sources and have not been altered.",
            "question_type": "single-choice"
        },
        {
            "id": 63,
            "question": "What is a potential risk of mounting the Docker socket ('/var/run/docker.sock') into a container?",
            "domain": "Cloud Native Security",
            "options": [
            "No risk; it's a common practice",
            "The container can control the Docker daemon and other containers",
            "It improves container performance",
            "It provides secure access to host resources",
            "It isolates the container from the host"
            ],
            "correct_answers": [1],
            "explanation": "Mounting the Docker socket can lead to full control over the host's Docker daemon.",
            "question_type": "single-choice"
        },
        {
            "id": 66,
            "question": "How can you ensure that only signed images are run in your Kubernetes cluster?",
            "domain": "Cloud Native Security",
            "options": [
            "Use imagePullSecrets",
            "Configure admission controllers to verify image signatures",
            "Manually inspect images before deployment",
            "Disable image caching on nodes",
            "Use a private container registry"
            ],
            "correct_answers": [1],
            "explanation": "Admission controllers can enforce policies to allow only signed images.",
            "question_type": "single-choice"
        },
        {
            "id": 73,
            "question": "What is a key benefit of using multistage Docker builds?",
            "domain": "Cloud Native Security",
            "options": [
            "Faster build times",
            "Smaller and more secure final images",
            "Compatibility with older Docker versions",
            "Simplified deployment scripts",
            "Enhanced network performance"
            ],
            "correct_answers": [1],
            "explanation": "Multistage builds produce lean images by excluding unnecessary build-time dependencies.",
            "question_type": "single-choice"
        },
        {
            "id": 90,
            "question": "What is the outcome of setting 'imagePullPolicy: Never' in a pod spec?",
            "domain": "Cloud Native Security",
            "options": [
            "The image will always be pulled from the registry",
            "The pod will fail to start if the image is not present locally",
            "The image will be pulled only if not present",
            "The pod will ignore image updates in the registry",
            "The kubelet will crash"
            ],
            "correct_answers": [1],
            "explanation": "Setting 'imagePullPolicy: Never' prevents pulling images; the image must exist locally.",
            "question_type": "single-choice"
        }
        
      ]
      
;
