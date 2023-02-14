import _ from 'underscore'

// This function creates a new deck
export const createDeck = (types, specials) => {

  let deck = []

  for ( let i = 2; i <= 10; i++ ){
    for ( let type of types ) {
      deck.push( i + type )
    }
  }

  for (let type of types) {
    for (let esp of specials) {
      deck.push( esp + type )
    }
  }

  return _.shuffle( deck )

}