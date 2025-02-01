// TODO: Implement functionality for kubernetesThreatModelQuestions
export const kubernetesThreatModelQuestions = 
[
    {
      "id": 15,
      "question": "What is a container breakout?",
      "domain": "Kubernetes Threat Model",
      "options": [
        "When a container fails to start",
        "A container exceeding its resource limits",
        "An exploit where an attacker escapes the container to the host",
        "Scaling a container beyond maximum replicas",
        "Moving a container to another node"
      ],
      "correct_answers": [2],
      "explanation": "Container breakout is when isolation is breached, and host access is gained.",
      "question_type": "single-choice"
    },
    {
      "id": 23,
      "question": "In the STRIDE threat model, under which category does a Trojan compromising the build server fall?",
      "domain": "Kubernetes Threat Model",
      "options": [
        "Spoofing",
        "Repudiation",
        "Information Disclosure",
        "Denial of Service",
        "Tampering"
      ],
      "correct_answers": [4],
      "explanation": "A Trojan compromising the build server is an act of tampering.",
      "question_type": "single-choice"
    },
    {
        "id": 48,
        "question": "Which combination of capabilities allows a compromised pod to access and modify the host? (Select all that apply)",
        "domain": "Kubernetes Threat Model",
        "options": [
        "Running in privileged mode",
        "Mounting the host filesystem",
        "Using host networking",
        "Dropping all Linux capabilities",
        "Running as a non-root user"
        ],
        "correct_answers": [0, 1, 2],
        "explanation": "These capabilities allow a pod to access and modify the host.",
        "question_type": "multiple-choice"
    },
    {
        "id": 49,
        "question": "When an attacker gains access to a pod, which scenario is not persistent?",
        "domain": "Kubernetes Threat Model",
        "options": [
        "The attacker modifies the container image",
        "The attacker installs malware in the pod's filesystem",
        "The attacker exfiltrates data from the pod",
        "The attacker alters data in a mounted PersistentVolume",
        "The attacker changes configurations stored in a ConfigMap"
        ],
        "correct_answers": [1],
        "explanation": "Changes in the container's filesystem are ephemeral and not persistent.",
        "question_type": "single-choice"
    },
    {
        "id": 72,
        "question": "Which of the following practices can help prevent container breakouts? (Select all that apply)",
        "domain": "Kubernetes Threat Model",
        "options": [
        "Running containers as root",
        "Using minimal base images",
        "Applying the principle of least privilege",
        "Disabling SELinux or AppArmor",
        "Regularly updating container runtimes"
        ],
        "correct_answers": [1, 2, 4],
        "explanation": "Using minimal base images, applying least privilege, and updating runtimes help prevent container breakouts.",
        "question_type": "multiple-choice"
    }      
  ]
;
