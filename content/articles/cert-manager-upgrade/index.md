---
title: "Navigating Cert-Manager Upgrades in Our Kubernetes Clusters"
description: "A practical guide to upgrading cert-manager safely, with emphasis on backups, CRD handling, and avoiding configuration loss."
date: "2024-02-06"
banner:
  src: "../../images/cert-manager-banner.png"
  alt: "Cert-Manager Upgrade Guide"
  caption: 'Originally published on Notch8.com'
categories:
  - "Kubernetes"
  - "Security"
  - "Platform Engineering"
  - "DevOps"
keywords:
  - "cert-manager"
  - "Kubernetes"
  - "SSL/TLS"
  - "Cluster Management"
  - "DevOps"
---

*Originally published on [Notch8.com](https://www.notch8.com/post/upgrading-kubernetes)*

---

Upgrading our Kubernetes clusters and the associated tooling like cert-manager requires a careful approach to avoid disruptions and potential loss of critical configurations not only for our clients but our internal developer teams. This post guides you through the process of upgrading cert-manager after updating any Kubernetes cluster, emphasizing the importance of backups and the nuances of handling Custom Resource Definitions (CRDs).

## The Cautious Path to Upgrading

Erring on the side of caution cannot be overstated, especially when it comes to CRDs. There's a tangible risk of losing critical configurations, a scenario we all aim to avoid. As Rob Kaufman, our SVP of Software Development pointed out to me when I asked for advice, "Some cert-manager upgrades require removing and re-adding the CRDs, but that is rare and depends on the versions you are changing. Normally, a helm upgrade will work just fine." This highlights the necessity for a cautious approach.

## The CRD Conundrum

Handling CRDs during an upgrade can be tricky. As Xavier Lange from team sparkle pointed out to me when I asked for advice, "CRDs can be rough in Helm. Do note that deleting a CRD will delete all instances of that object type." This means if you were to delete the CRD for Certificates, it would remove all the certificate definitions in your cluster -- a situation we want to avoid at all costs.

## Backups are Imperative

Before proceeding with any upgrade, ensuring that you have a robust backup is crucial. The cert-manager documentation provides a comprehensive guide on backing up.

### Step 1: Backup ClusterIssuers and Secrets

Start by backing up your ClusterIssuers, which might contain critical privateKeySecretRef references:

```bash
kubectl get clusterissuers -oyaml > clusterissuers-backup.yaml
```

### Step 2: Review the backup file for any privateKeySecretRef to backup associated secrets:

```bash
kubectl get secret letsencrypt-staging -n cert-manager -oyaml > letsencrypt-staging-backup.yaml
```

### Step 3: Backup Certificates and Secrets

Don't forget to backup your Certificates and their associated secrets:

```bash
kubectl get certificates -A -oyaml > certs-backup.yaml
```

### Step 4: Backup the secrets identified as needed:

```bash
kubectl get secret secret-name -n namespace -oyaml > secret-name-backup.yaml
```

With these backups in place, we have mitigated risks and we are prepared to proceed with the upgrade process.

## Upgrading Cert-Manager

Following the upgrade documentation, add and update the Jetstack Helm repository with:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

If you manage CRDs separately, apply the new CRD versions first:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/<version>/cert-manager.crds.yaml
```

Then, upgrade cert-manager via Helm, ensuring that you replace `<version>` with your target version, and `<release_name>` with your actual release name, found using:

```bash
helm list --all-namespaces
```

For instance:

```bash
helm upgrade --version 1.12.0 cert-manager jetstack/cert-manager
```

## Manual Adjustments and Testing

After upgrading, you might need to manually adjust resources like Ingress to trigger the certificate reissuance process. This involves a series of steps typically managed automatically by cert-manager, from order creation and challenge fulfillment to certificate issuance and renewal.

## Conclusion

Upgrading cert-manager involves more than just executing a series of commands. It's about understanding the ecosystem of your Kubernetes cluster and taking proactive steps to safeguard your configurations. With the right preparation, the upgrade process can be smooth, ensuring your cluster remains secure and functional.

---

## FAQ

**How often should cert-manager be upgraded?**
Regularly, in alignment with the release of new versions that offer security patches, feature improvements, or compatibility updates with Kubernetes.

**Can I skip versions when upgrading cert-manager?**
It's recommended to follow the upgrade path outlined by the cert-manager documentation to avoid compatibility issues.

**How do I check my current cert-manager version?**
Use the following command to find the current version deployed:

```bash
kubectl get deployment -n cert-manager -l app=cert-manager -o jsonpath="{.items[0].metadata.labels['cert-manager\.io/version']}"
```

**What should I do if the upgrade fails?**
Refer to the backups you've made to restore your previous configuration and seek guidance from cert-manager's official support channels.

**Are there any resources for troubleshooting cert-manager issues post-upgrade?**
The cert-manager website and GitHub repository provide comprehensive guides and community-driven support for troubleshooting.

**How do I ensure my applications continue to function during the upgrade?**
Perform the upgrade during a maintenance window and test thoroughly in a staging environment before applying changes to production.

**What are the implications of not upgrading cert-manager?**
Failing to upgrade can expose your cluster to security vulnerabilities, compatibility issues, and miss out on new features that enhance cert-manager's functionality.

---

**References:**
- [Upgrading Cert-Manager, Official Documentation](https://cert-manager.io/docs/installation/upgrade/)
- [GitHub Repository for Cert-Manager](https://github.com/cert-manager/cert-manager)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)

---

*Have questions about Kubernetes security or cert-manager? [Get in touch](/contact).*
