function getSessionData(req) {
   const sessionData =  req.session.userData;

   req.session.userData = null;

   return sessionData;
}


function flashUserdata(req, data,action) {
  req.session.userData = data;
  req.session.save(() => {
    action
  })
}

module.exports = {
  flashUserdata: flashUserdata,
  getSessionData: getSessionData,
};
