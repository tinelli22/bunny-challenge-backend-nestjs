echo "Pulling from Master"

git pull origin

sleep 5

echo "Pulled successfully from master"

sleep 5

echo "Restarting server..."

pm2 restart 0

echo "Server restarted Successfully"

echo "Pau na maquina !!!"