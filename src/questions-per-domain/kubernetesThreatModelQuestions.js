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
    }
  ]
;
