/**
 * GET /candidate
 * go to job seeker page
 */

exports.getJob = (req, res) => {
  const jobs = {
    job: 'careerNester.com'
  };
  res.render('job/job', {
    title: 'Search jobs',
    jobs
  });
};
