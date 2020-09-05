#!/bin/bash

sudo iptables -t nat -A PREROUTING -i lo -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i venet0:0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i venet0 -p tcp --dport 80 -j REDIRECT --to-port 8080
