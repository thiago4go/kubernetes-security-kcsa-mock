export const Kubernetes_Security_Fundamentals = [
  {
    "id": 1,
    "question": "How do Network Policies work in Kubernetes?",
    "options": [
      "They use iptables rules to control pod communication",
      "They are enforced by the kube-scheduler",
      "They require all pods to be isolated by default",
      "They can only restrict traffic between namespaces"
    ],
    "answer": 0,
    "explanation": "Network Policies are implemented through the Container Network Interface (CNI) plugin and typically use iptables rules to enforce traffic restrictions between pods. They allow fine-grained control over which pods can communicate with each other based on labels, namespaces, and IP blocks. [REFINED SINGLE QUESTION BY TEST SCRIPT]"
  },
  {
    "id": 2,
    "question": "Which component is responsible for authenticating API requests in Kubernetes?",
    "options": [
      "kube-scheduler",
      "kube-proxy",
      "kube-apiserver",
      "kubelet"
    ],
    "answer": 2,
    "explanation": "The kube-apiserver is the front-end for the Kubernetes control plane and is responsible for processing and validating requests before storing them in etcd. It handles authentication, authorization, and admission control for all API requests."
  }
];