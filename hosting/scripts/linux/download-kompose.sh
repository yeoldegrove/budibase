#!/bin/bash
curl -s https://api.github.com/repos/kubernetes/kompose/releases/latest \
| grep "browser_download_url.*kompose-linux-amd64" \
| grep -v "tar" \
| cut -d '"' -f 4 \
| wget -qi - -O kompose
chmod +x ./kompose
sudo mv ./kompose /usr/local/bin/kompose
