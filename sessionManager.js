const jwt = require('jsonwebtoken');
const useragent = require('useragent');
require('dotenv').config();

const Session = require('./models/sessionModel');

const SECRET_KEY =process.env.SECRET_KEY;
const COOKIE_NAME = process.env.COOKIE_NAME;

async function createTokenAndCookie(user, res) {
    const userAgentString = req.headers['user-agent'];
    const userAgent = useragent.parse(userAgentString);
    const expireTime = 30 * 24 * 60 * 60;
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    const expires = new Date(Date.now() + expireTime * 1000);

    client = {os: userAgent.os.toString(), browser: userAgent.family, date: date};
    clientName = 'desde ' + client.browser + ' en ' + client.os + ' el ' + client.date.toLocaleDateString();
    try{
        await Session.create({
          userId: user.id,
          token,
          expires,
          name: clientName,
        });
        res.cookie(COOKIE_NAME, token, { 
            expires,
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            overwrite: true,
        });
        return res.redirect('/');
    }catch(e){
        return res.redirect('/sign-in')
    }
}

async function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies[COOKIE_NAME]; 
        if (!token) {
            return res.redirect('sign-in');
        }
        const sessionData = await Session.findOne({
        where: { token },
        });

        if (!sessionData) {
            return res.redirect('sign-in');
        }
        req.userId = sessionData.userId;
        next();
    } catch (err) {
        console.error(err);
        return res.redirect('sign-in');
    }
    
}
async function isNotLoggedIn(req, res, next) {
    try{
        const token = req.cookies[COOKIE_NAME]; 
        if (!token) {
            return next()
        }

        const sessionData = await Session.findOne({
            where: { token },
        });

        if (!sessionData) {
            return next();
        }
        return res.redirect('/')
    
    } catch(e) {
        console.log(e)
        return res.redirect('/')
    }
}

module.exports = {
    createTokenAndCookie,
    isLoggedIn,
    isNotLoggedIn,
}