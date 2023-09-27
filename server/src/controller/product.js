const axios = require( 'axios' );
const cheerio = require( 'cheerio' );

let domain = 'https://www.amazon.in'

module.exports.getProducts = async ( req,res ) => {
    let url = 'https://www.amazon.in/s?k=mobile+under+10000'
    let data = await scrapeProducts( url )
    data = {
        length: data.length,
        url,
        data
    }
    res.send( data )
}

module.exports.getProduct = async ( req,res ) => {
    let url = 'https://www.amazon.in/Samsung-Storage-MediaTek-Octa-core-Processor/dp/B0BMGB3CH9/ref=sr_1_1?keywords=mobile+under+10000&qid=1695814299&sr=8-1'
    let data = await scrapeProduct( url )
    res.send( data )
}

const scrapeProducts = async ( url ) => {
    let data = []
    return await axios.get( url ).then( res => {
        const $ = cheerio.load( res.data )
        $( '[data-component-type=s-search-result]' ).each( ( index,element ) => {
            let name = $( element ).find( 'h2 span' ).text()
            let link = $( element ).find( 'h2 a' ).attr( 'href' )
            let image = $( element ).find( '.s-image' ).attr( 'src' )
            let price = $( element ).find( '.a-price-whole' ).text()

            link = domain + link
            data.push( { name,image,price,link } )
        } )
        return data
    } ).catch( error => {
        return error
    } )
}

const scrapeProduct = async ( url ) => {
    return await axios.get( url ).then( res => {
        const $ = cheerio.load( res.data )
        let name = $( 'h1#title' ).text().trim()
        let price = $( 'span.a-price-whole' ).text().trim()
        let landingImage = $( '#landingImage' ).attr( 'src' )
        let availability = $( '#availability' ).text().trim()
        let marketPrice = $( '[data-a-strike="true"] span' ).first().text().trim()
        let reviews = $( '#averageCustomerReviews .a-icon-alt' ).first().text()
        let altImages = []
        $( '#altImages .item  img' ).each( ( index,element ) => {
            altImages.push( $( element ).attr( 'src' ) )
        } )
        return { name,price,landingImage,altImages,availability,marketPrice,reviews }
    } ).catch( error => {
        return error
    } )
}

