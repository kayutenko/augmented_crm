const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'newDB',
  password: 'Password',
  port: 5432,
})


const getCompany = (request, response) => {
	
  pool.query(`SELECT * FROM  company1 where inn=\'${request.body.inn}\'`, (error, results) => {
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
	
  pool.query(`SELECT * FROM  contact_faces1 where company_id=\'${request.body.comp_id}\'`, (error, results) => {
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
	pool.query(`SELECT name,  stroke,fill,icon, probability,a.product_id FROM  product1 as a, recommendedProducts as b where a.product_id=b.product_id and b.person_id=${request.body.persone_id}`, (error, results) => {
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
	pool.query(`SELECT name,  stroke,fill,icon,a.product_id FROM  product1 as a, ProductOwnership as b where a.product_id=b.product_id and b.person_id=${request.body.persone_id}`, (error, results) => {
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
	pool.query(`SELECT name, Description FROM  product1 where product_id=${request.body.product_id}`, (error, results) => {
    if (error) {
      console.log(error);
	  response.send('err');
    }
	else{	
		response.status(200).json(results.rows)
	}
  });
}
const searchInnLike = (request, response) => {
	pool.query(`SELECT * FROM  company1 where inn like\'${request.body.inn}\%'`, (error, results) => {
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