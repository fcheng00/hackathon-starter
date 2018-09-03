
/**
 * GET /employer
 * Display employer info
 */
const { Employer } = require('../models/Employer');
const { User } = require('../models/User');

exports.getEmployer = (req, res) => {
  if (req.user.company) {
    User.findOne({ company: req.user.company }, (err, user) => {
      if (!user) {
        req.flash('errors', { msg: 'Cannot find a user by company name' });
        return req.redirect('/signup');
      }
      Employer.findOne({ 'overview.company': req.user.company }, (err, employer) => {
        if (!employer) {
          req.flash('errors', { msg: 'We were unable to find employer by company name' });
          return res.redirect('/signup');
        }
        res.render('employer/employer', {
          employer
        });
      });
    });
  }
  // should get all valid employers and list them
  // res.render('employer/employers');
};

exports.postJob = (req, res) => {
  const jobs = {
    role: 'SDE',
    description: 'This is the SDE job description'
  };
  res.render('employer/employer', {
    jobs
  });
};

// display publish job page
exports.getJob = (req, res) => {
  res.render('employer/job');
};

exports.postUpdateProfile = (req, res, next) => {
  const employer = new Employer({
    overview: {
      company: req.body.company,
      description: req.body.description,
      foundedon: req.body.foundedon,
      size: req.body.size,
      type: req.body.type,
      website: req.body.website,
      headerquarters: req.body.hdq,
      industry: req.body.industry,
      phone: req.body.phone

    },
    culture: [{ culture: req.body.culture }],
    news: [{
      createdon: req.body.news_createdon,
      title: req.body.news_title,
      url: req.body.news_url
    }],
    ceo: {
      name: req.body.ceo_name,
      description: req.body.ceo_description,
      url: req.body.ceo_url
    },
    managerMsg: [
      { message: req.body.manageMsg }
    ]
  });
  employer.save((err) => {
    if (err) { return next(err); }
  });
  res.render('employer/employer', {
    employer
  });
};
