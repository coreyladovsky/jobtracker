const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    req.user = {
      id: uid,
      email,
    };
    next();
  } catch (error) {
    console.log("code broke in auth middleware!", error);
    res.status(401).json({ message: "No user authenticated!" });
  }
};

module.exports = { checkFirebaseToken };
