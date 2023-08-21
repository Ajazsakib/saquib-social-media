module.exports.registrationPage = function (req, res) {
  return res.render("registration", {
    title: "Saquib Social Media",
  });
};

var login = false;

module.exports.homePage = function (req, res) {
  if (login) {
    return res.render("index", {
      title: "Saquib Social Media",
    });
  } else {
    return res.render("login", {
      title: "Saquib Social Media",
    });
  }
};
