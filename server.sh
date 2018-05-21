export LOG=/home/log/NodeAPI
export APP_PATH=/home/NodeAPI
export APP=$APP_PATH/server.js

forever -p $APP_PATH -l $LOG/access.log -e $LOG/error.log -o $LOG/out.log  -aw start $APP