# Budibase Kubernetes Cheatsheet

## Local Environment
`kind` is an option for creating a local docker based kubernetes cluster 
https://kind.sigs.k8s.io/

create cluster
```
kind create cluster --name <cluster-name>
```

Metadata about the cluster is installed into
> ~/.kube/config

list clusters
```
kind get clusters
```

delete cluster

```
kind delete cluster <cluster-name>
```

## Kubectl

`kubectl` is the kubernetes command line interface used to manage cluster resources. 

https://kubernetes.io/docs/reference/kubectl/cheatsheet/

print config
```
kubectl config view
```

view nodes
```
kubectl get nodes
```

get contexts
```
kubectl config get-contexts
```

get current context
```
kubectl config current-context
```

set current context
```
kubectl config use-context <context-name>
```

set current namespace
```
kubectl config set-context --current --namespace=<namespace>
```

get cluster info
```
kubectl cluster-info --context <context-name>
```

get pods
```
kubectl get pods
```

## Helm
`helm` is a package manager for kubernetes that makes it easier to manage and deploy applications

add repo
```
helm repo add <repo-name> <repo-url>
```
e.g.
```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

list charts in repo
```
helm search repo <repo-name>
```

install chart 
```
help repo update
helm install <repo-name>/<chart-name> --generate-name
```
e.g.
```
helm install bitnami/mysql --generate-name
```

install chart with name into new namespace
```
helm install <name> <repo-name>/<chart-name> -n <namespace-name> --create-namespace
```
e.g.
```
helm install dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace
```

list releases
```
helm list
```

status of a release
```
helm status <release-name>
```
