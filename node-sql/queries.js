
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kayutenko',
  host: 'localhost',
  database: 'ocrmdb',
  password: '',
  port: 5432
})

const getCompany = (request, response) => {
	
  pool.query(`SELECT * FROM  company where inn=\'${request.body.inn}\'`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{

		response.status(200).json(results.rows)
	}
  });
  
}
const ContactPerson = (request, response) => {
	
  pool.query(`SELECT * FROM  contact_faces where company_id=\'${request.body.comp_id}\'`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{

		response.status(200).json(results.rows)
	}
  });
  
}
const RecommendedProducts = (request, response) => {
	pool.query(`SELECT name, stroke,fill,icon,a.product_id FROM  product1 as a, recommendedproducts as b where a.product_id=b.product_id and b.person_id=${request.body.persone_id}`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{

		response.status(200).json(results.rows)
	}
  });
  
}
const ProductOwnership = (request, response) => {
	pool.query(`SELECT name,  stroke,fill,icon,a.product_id FROM  product1 as a, productownership as b where a.product_id=b.product_id and b.person_id=${request.body.persone_id}`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{
		
		response.status(200).json(results.rows)
	}
  });
  
}

const ProductDescription = (request, response) => {
	
	pool.query(`SELECT name, description FROM  product1 where product_id=${request.body.product_id}`, (error, result) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{	
		response.status(200).json(result.rows)
	}
  });
}
const searchInnLike = (request, response) => {
	pool.query(`SELECT * FROM  company where inn like\'${request.body.inn}\%'`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{	
		
		response.status(200).json(results.rows)
	}
  });
}
module.exports = {
  getCompany,ContactPerson,RecommendedProducts,ProductOwnership,ProductDescription, searchInnLike
	
}