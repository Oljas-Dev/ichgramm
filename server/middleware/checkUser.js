const checkUser = (req, res, next) => {
  try {
    const authenticatedUser = req.user.id;
    const requestedUserId = req.params.userId;

    if (authenticatedUser !== requestedUserId) {
      return res.status(403).json({
        message: "You are not authorized to update this profile",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }
};

export default checkUser;
