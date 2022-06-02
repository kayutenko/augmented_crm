
	


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries');



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.static('public'));
app.get('/', (request, response) => {
  res.send('Hello World!');
})

app.post('/', function(req, res){
	console.log(req.query.act);
	console.log('--------------');
	if(req.query.act == 'searchInn'){db.getCompany(req, res);}
	if(req.query.act == 'ContactPerson'){db.ContactPerson(req, res);}
	if(req.query.act == 'Product'){db.RecommendedProducts(req, res);}
	if(req.query.act == 'ProductOwnership'){db.ProductOwnership(req, res);}
	if(req.query.act == 'ProductDescription'){console.log('))))');db.ProductDescription(req, res);}
	if(req.query.act == 'searchInnLike'){db.searchInnLike(req, res);}
	

});
/*app.post('/', (req, res) => {
	console.log('req.body.inn');
    console.log(req.body.inn);
    res.send('result');
});*/

app.listen(port, () => {
	console.log('!'+process.env.MYSQL_PORT);
  console.log(`App running on port ${port}.`);
})


