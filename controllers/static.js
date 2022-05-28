const generalHandle = async (action, res, errorMeg) => {
  try {
    await action();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: errorMeg });
  }
};

module.exports = generalHandle;
