/**
 * GET /skill
 * Display skill info
 */

exports.getSkill = (req, res) => {
  const skill = {
    skill: 'careerNester.com'
  };
  res.render('skill/skill', {
    skill
  });
};
