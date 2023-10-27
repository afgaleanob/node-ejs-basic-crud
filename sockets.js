const Session = require('./models/sessionModel');

module.exports = (io) => {
    io.on("connection", async (socket) => {
        //VALIDATE USER IN NEW CONNECTION
        const cookie  = socket.handshake.headers.cookie;
        let user = 0;
        if(cookie){
            try{
                token = cookie.substring( process.env.COOKIE_NAME.length + 1);
                const sessionData = await Session.findOne({
                    where: { token },
                });
                if(sessionData){
                    user = sessionData.userId;
                }
            }catch(e){
                console.error(e);
            }
        }
        // NEW CONNECTION - JOIN USER
        if(user){
            socket.join(user);
        }

        //

        //

        //DISCONECT
        socket.on('disconnect', () => {
            if(user){
                socket.leave(user);
            }
        });

    });
}