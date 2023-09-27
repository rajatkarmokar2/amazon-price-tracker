const express = require( 'express' );
const { getProducts,getProduct } = require( './controller/product' );
const app = express();
const port = process.env.PORT || 4000
const cors = require( 'cors' )

app.use( cors({
    origin:['http:localhost:3000']
}) )

app.get( '/',( req,res ) => {
    res.send( 'hello' )
} );

app.get( '/all-products',getProducts );
app.get( '/product',getProduct );

app.listen( port,() => {
    console.log( `Port ${port}` );
} );
