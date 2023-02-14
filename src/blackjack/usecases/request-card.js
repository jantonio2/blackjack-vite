
/**
 * This function allows to take a card
 * @param {Array<String>} deck Array with all available cards
 * @returns {
 *  card,
 *  newDeck
 * } Return a card and the deck without it
 */

export const requestCard = (deck) => {

  if( !deck || deck.length === 0 ) {

    throw 'There aren\'t cards';

  } 

  let i = Math.floor(Math.random() * deck.length);
  const card = deck[i];
  deck = deck.filter((element) => element !== deck[i]);

  return {
    card,
    newDeck: deck
  }

}