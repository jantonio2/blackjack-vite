
/**
 * This function return the value of the card
 * @param {String} card Example 6D
 * @returns {Number} Numeric value of the card
 */

export const cardValue = ( card ) => {

  const value = card.substring( 0, card.length - 1 )

  return ( isNaN( value ) ) 
    ? ( value === 'A' ) ? 11 : 10
    : value * 1

}