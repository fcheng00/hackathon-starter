/**
 * GET /plan
 * Display plan info
 */

exports.getPlan = (req, res) => {
  const plan = {
    plan: 'careerNester.com'
  };
  res.render('plan/plan', {
    plan
  });
};
