Using p5js as a PWA as per these steps > https://medium.com/p/d5b9d0a1d726

1) Start the WiFi hotspot
2) Use "nmcli connection" to discover the UUID of this network
3) Use "nmcli connection show UUID" to show the properties of this network
4) Use "nmcli connection modify UUID connection.autoconnect yes connection.autoconnect-priority 100" to have it start automatically
5) Use "nmcli connection show UUID" to make sure these values were set

1) sudo ln -s /home/pi/hotdata/hotdata.service /etc/systemd/system/hotdata.service 
2) sudo systemctl daemon-reload
3) sudo systemctl start hotdata
4) sudo systemctl enable hotdata
5) sudo journalctl -fu hotdata
