#1/bin/sh
goStatic -fallback "/index.html" &
nginx
wait -n
