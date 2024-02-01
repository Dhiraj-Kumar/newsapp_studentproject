require('dotenv').config()
const request = require('request')

function NewsController(req,res){

    var email=req.params.email;
  request.post({
    url: `https://${process.env.DC}.api.mailchimp.com/3.0/lists/${process.env.LIST}/members`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.API_KEY}`
    },
    form: JSON.stringify({
      email_address: email,
      status: 'pending',
      merge_fields: {
        EMAIL: req.body.email
      }
    })
  }, function(err, httpResponse, body) {
    res.send(body);
  });
}

module.exports= {NewsController}