const {getHouseById} = require("../sevices/housing");

function isUser() {
    return function (req, res, next) {
        if (req.session.user) {
            next()
        } else {
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return function (req, res, next) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

function isOwner() {
    return async function (req, res, next) {
        const userId = req.session.user._id;
        const id = req.params.id;
        const house = await getHouseById(id);
        //TODO change property name to match collection
        if (house.owner._id == userId) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}