
#!/bin/bash

echo "configurando el selinux para desactivarlo"
sudo cat <<TEST> /etc/selinux/config
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted
TEST

echo "instalando vim"
sudo yum install vim -y
sudo yum install bind-utils bind-libs bind-* -
echo "detener servicios de networkmanager"
sudo service NetworkManager stop
sudo chkconfig NetworkManager off
echo "iniciar firewall"
sudo service firewalld start
sudo systemctl enable firewalld 
sudo firewall-cmd --zone=public --remove-interface=eth0 --permanent
sudo firewall-cmd --zone=public --remove-interface=eth2 --permanent
sudo firewall-cmd --zone=public --remove-interface=eth1 --permanent
sudo firewall-cmd --zone=internal --add-interface=eth1 --permanent
sudo firewall-cmd --zone=public --add-interface=eth2 --permanent
sudo firewall-cmd --zone=internal --add-port=8080/tcp --permanent
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --zone=public --add-service=http --permanent
sudo firewall-cmd --zone=internal --add-service=http --permanent
sudo firewall-cmd --zone=public --add-masquerade --permanent
sudo firewall-cmd --zone=internal --add-masquerade --permanent
sudo firewall-cmd --permanent --zone=internal --add-forward-port=port=8080:proto=tcp:toport=8080:toaddr=192.168.50.4
sudo firewall-cmd --permanent --zone=public --add-forward-port=port=8080:proto=tcp:toport=8080:toaddr=192.168.50.4
sudo firewall-cmd --reload
sudo firewall-cmd --list-all-zones