echo net.ipv6.conf.all.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.default.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.lo.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.eth0.disable_ipv6 = 1 >> /etc/sysctl.conf
sync
echo 3 > /proc/sys/vm/drop_caches
cd /cpc-ui
sed -i "s/123.56.23.129:9898/testapi.gdtrafficad.com/g" $(grep -r -i -l "123.56.23.129:9898" *)
sed -i "s/123.56.23.129:9898/testapi.gdtrafficad.com/g" $(grep -r -i -l "123.56.23.129:9898" *)
npm run dev