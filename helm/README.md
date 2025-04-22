# KCSA Mock - Helm Deployment Guide

A simple Helm chart to deploy `kcsa-mock` on a Kubernetes cluster.

## 📦 Chart Info

- **Chart Name**: `kcsa-mock`
- **Chart Version**: `1.1.0`
- **App Version**: `1.0`
- **Maintainer**: Gabriel Carmo (📧 contato@gabrielandre.com.br)

---

## 🚀 Prerequisites

Before deploying this chart, ensure you have the following:

- A running **Kubernetes cluster** (v1.21+ recommended)
- `helm` installed (version 3.x or later)
- `kubectl` configured to access your cluster
- Permissions to create resources like Namespace, Ingress, ServiceAccount, etc.

---

## 🛠️ Installation

### 1. Clone the repository

If you're using the chart from source:

```bash
git clone https://gitlab.com/devops_gabs/kcsa-mock.git
cd kcsa-mock/helm
```

### 2. Install the chart using Helm

```bash
helm install kcsa-mock-prod . \
  --namespace kcsa-prod \
  --create-namespace
```

> This will create the namespace (`kcsa-prod`) and deploy the application using default values from `values.yaml`.

---

## ⚙️ Configuration

You can customize the deployment by editing `values.yaml` or using the `--set` flag.

### Example with CLI overrides:

```bash
helm install kcsa-mock-prod . \
  --namespace kcsa-prod \
  --create-namespace \
  --set image.tag=stable \
  --set ingress.tls.enabled=true
```

### Common Configuration Options

| Parameter                      | Description                               | Default                     |
|--------------------------------|-------------------------------------------|-----------------------------|
| `replicaCount`                 | Number of pod replicas                    | `1`                         |
| `image.repository`             | Container image repository                | See `values.yaml`           |
| `image.tag`                    | Image tag                                 | `latest`                    |
| `service.type`                 | Kubernetes Service type                   | `ClusterIP`                 |
| `ingress.enabled`              | Enable Ingress                            | `true`                      |
| `ingress.hosts[0].host`        | Domain name for ingress                   | `kcsa.gabrielandre.com.br` |
| `resources.limits`             | CPU/Memory limits                         | `200m / 512Mi`              |
| `hpa.enabled`                  | Enable Horizontal Pod Autoscaler          | `true`                      |
| `rbac.serviceAccountName`      | ServiceAccount used by the deployment     | `kcsa-mock-service-account` |

---

## 🔄 Upgrade

To apply updates to your deployment (after editing values or pulling new chart versions):

```bash
helm upgrade kcsa-mock-prod . \
  --namespace kcsa-prod
```

---

## 🧹 Uninstall

To remove the deployment from your cluster:

```bash
helm uninstall kcsa-mock-prod --namespace kcsa-prod
```

> Note: The namespace will remain unless manually deleted.

---

## 🔐 TLS & Ingress Notes

- TLS is disabled by default. To enable it:
  ```yaml
  ingress:
    tls:
      enabled: true
      secretName: kcsa-mock-tls
      issuer: letsencrypt-prod
  ```
- Make sure the TLS secret (`kcsa-mock-tls`) exists in the same namespace or use cert-manager to provision it automatically.

---

## 📞 Maintainer

- **Name**: Gabriel Carmo  
- **Email**: [contato@gabrielandre.com.br](mailto:contato@gabrielandre.com.br)

---

## 📄 License

This project is under your preferred license. Please update this section accordingly.