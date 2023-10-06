module.exports = (io) => {
    io.on("connection", async (socket) => {
        try{
            console.log(socket.handshake.headers.cookie);
          
        }catch(error){
            console.log(error)
        }
    });

}

