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
        return req.redirect('/employers/employers');
      }
      Employer.findOne({ company: req.user.company }, (err, employer) => {
        if (!employer) {
          req.flash('errors', { msg: 'We were unable to find employer by company name' });
          return res.redirect('/employer/employers');
        }
        return res.render('employer/employer/', {
          employer,
          employerId: employer._id
        });
      });
    });
  }
  // should get all valid employers and list them
  res.render('employer/employers');
};

exports.postJob = (req, res) => {
  const jobs = {
    role: 'SDE',
    description: 'This is the SDE job description'
  };
  res.render('employer/job', {
    jobs
  });
};

exports.postUpdateProfile = (req, res) => {
  const employer = new Employer({
    overview: {
      company: res.body.company,
      description: res.body.description,
      foundedon: req.body.foundedon,
      size: req.body.size,
      type: req.body.type,
      website: req.body.website,
      headerquarters: req.body.hdq,
      industry: req.body.industry

    },
    culture: [{ culture: req.body.culture }],
    news: [{
      createdon: req.body.news.createdon,
      title: req.body.news.title,
      url: req.body.news.url
    }],
    ceo: {
      name: req.body.ceo.name,
      description: req.body.ceo.description,
      url: req.body.ceo.url
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
