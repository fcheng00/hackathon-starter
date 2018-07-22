/**
 * GET /employer
 * Display employer info
 */

exports.getEmployer = (req, res) => {
  const employer = {
    company: 'careerNester.com'
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
