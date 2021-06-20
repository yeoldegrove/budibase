#!/bin/bash
if ! command -v minikube &> /dev/null
then
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
  chmod +x ./kind
  sudo mv ./kind /usr/local/bin/kind
  rm kubectl
  rm minikube-linux-amd64
fi
minikube start
minikube dashboard
