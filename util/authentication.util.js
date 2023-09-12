function createSession(req, user, action) {
    req.session._id = user._id.toString();
    req.session.isAdmin = user.isAdmin
    req.session.save(action);
};

function destroySession(req, action){
    // console.log(req.session.id);
    req.session._id = null
    // console.log(req.session, 'Test');
    req.session.save(action);

    // req.session.destroy((error) => {
    //     if (error) {
    //         console.error('Error destroying session:', error);
    //     } else {
    //         console.log('Session destroyed successfully.');
    //     }
    //     action();
    // });

    // console.log(req.session , ' null');


};



module.exports = {
    createSession: createSession,
    destroySession: destroySession
}