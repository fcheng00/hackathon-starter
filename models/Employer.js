const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  culture: String
});

const newsSchema = new mongoose.Schema({
  createdon: Date,
  title: String,
  newsLink: String
});

const ceoSchema = new mongoose.Schema({
  fullname: String,
  image: String,
  introduction: String
});

const managerMsgSchema = mongoose.Schema({
  message: String
});

const employerSchema = new mongoose.Schema({
  overview: {
    company: { type: String, unique: true },
    description: String,
    headerquarters: String,
    type: { type: String, enum: ['private', 'public'] },
    size: { type: String, enum: ['1', '2 - 5', '6 - 9', '10+'] },
    website: { type: String },
    links: {
      facebook: String,
      linkedin: String,
      twitter: String
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => {
          /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
    },
    foundon: { type: Date },
    industry: { type: String, enum: ['Real Estate', 'Education', 'Media', 'IT', 'Other'] }
  },
  culture: [cultureSchema],
  news: [newsSchema],
  ceo: ceoSchema,
  managerMsg: [managerMsgSchema],
  status: { type: String, enum: ['active', 'pending', 'inactive'] }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = { Employer };
