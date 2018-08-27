/**
 * GET /employer
 * Display employer info
 */
const Employer = require('../models/Employer');

exports.getEmployer = (req, res) => {
  const employer = {
    company: 'careerNester.com',
  };
  res.render('employer/employer', {
    employer
  });
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
      name: res.body.name,
    },
    culture: {
    }
  });
  employer.save();
  res.render('/employer/', {
    employer
  });
};
