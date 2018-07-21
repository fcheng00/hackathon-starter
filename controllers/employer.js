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
