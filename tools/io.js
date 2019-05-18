var socket = require('socket.io')

var io = {
  offlineUsers: [
    {
      userName: 'Coco',
      uid: '1109',
      socketId: ''
    },
    {
      userName: 'Mr.Chen',
      uid: '777',
      socketId: ''
    },
    {
      userName: '佩奇',
      uid: '666',
      socketId: ''
    },
    {
      userName: '乔治',
      uid: '111',
      socketId: ''
    }
  ],

  onlineUsers: [],
  
  connectionHandler: function (server) {
    // console.log(socketio, 'sdfds');
    var socketio = socket(server);
    var me = this;
    socketio.on('connection',function (socket) {
      console.log('a user connected');
      console.log(me);
      console.log(me.onlineUsers, '1');
      
      
      // 找出登入的用户
      // 这里先拿出未登录的队列第一个用户
      const loginUser = me.offlineUsers.shift()
      console.log(loginUser, 'loginUser');
      console.log(socket);
      loginUser.socketId = socket.id

      // 这里假装将用户存入session中
      me.onlineUsers.push(loginUser)
      
      if (socketio.sockets.connected[socket.id]) {
        socketio.sockets.connected[socket.id].emit('connected', loginUser);
        socketio.emit('user connected', loginUser);
      }
      // socketio.emit('connected', loginUser)
      
      console.log(me.onlineUsers, '2');

      
      socket.broadcast.emit('hi');
      socket.on('chat message', function (record) {
          console.log('message:' + record);
          socketio.emit('chat message', record);
      });
      socket.on('disconnect',function (reason){
          console.log(reason);
          console.log(socket.id);
          console.log(me.onlineUsers, '3');
          
          // 找出登出用户
          const tmpLogoutUser = me.onlineUsers.find((item) => {
            return item.socketId === socket.id
          })
          
          // 将用户从session中取出，放入未登录队列中
          const logoutUser = me.onlineUsers.splice(me.onlineUsers.indexOf(tmpLogoutUser), 1)[0]
          logoutUser.socketId = ''
          me.offlineUsers.push(logoutUser)
          
          console.log(me.onlineUsers, '4');
          console.log('user disconnected');
      })
    });
  }
}

module.exports = io;