import { createDeck } from './usecases/create-deck'

/*
  2C = Two of Clovers
  2D = Two of Diamonds
  2H = Two of Hearts
  2S = Two of Swords
*/

// Self invoking function
// (function() {

// })()

// const myModule = (() => {
(() => {

  'use strict'

  let deck = []
  const types = [ 'C', 'D', 'H', 'S' ],
        specials = [ 'A', 'J', 'Q', 'K' ]

  // let playerPoints = 0,
  //     computerPoints = 0
  let playersPoints = []

  // References to HTML elements
  const btnAskFor = document.querySelector('#btnAskFor'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew')

  const divCardsPlayers = document.querySelectorAll('.divCards')

  const smallPoints = document.querySelectorAll('small')


  // This function initializes the game
  const initializeGame = ( numPlayers = 1 ) => {

    deck = createDeck()
    playersPoints = []

    for (let i = 0; i <= numPlayers; i++) {
      playersPoints.push(0)
    }

    console.clear()

    smallPoints.forEach( elem => elem.innerText = 0 )

    divCardsPlayers.forEach( elem => elem.innerHTML = '' )

    btnAskFor.disabled = false
    btnStop.disabled = false

  }

  createDeck()

  // This function allows to take a card
  const askForCard = () => {

    if(deck.length === 0) {

      throw 'There aren\'t cards';

    } 

    let i = Math.floor(Math.random() * deck.length);
    const card = deck[i];
    deck = deck.filter((element) => element !== deck[i]);

    return card

  }

  // This function return the value of the card
  const cardValue = ( card ) => {

    const value = card.substring( 0, card.length - 1 )

    return ( isNaN( value ) ) 
      ? ( value === 'A' ) ? 11 : 10
      : value * 1

  }

  // This function collect the points
  const collectPoints = ( card, turn ) => {

    playersPoints[turn] = playersPoints[turn] + cardValue( card )
    smallPoints[turn].innerText = playersPoints[turn]

    return playersPoints[turn]

  }

  // This function creates the card a show it in the HTML
  const createCard = ( card, turn ) => {

    const imgCard = document.createElement('img')
    imgCard.src = `assets/cards/${ card }.png`
    imgCard.classList.add('custom-card')
    divCardsPlayers[turn].append( imgCard )

  }

  // This function shows the winner
  const showWinner = () => {

    const [ minimunPoints, computerPoints ] = playersPoints

    setTimeout(() => {
      if ( minimunPoints === computerPoints ){
        alert('DRAW' )
      } else if ( minimunPoints > computerPoints && minimunPoints <= 21  || computerPoints > 21 ) {
        alert('PLAYER WON')  
      } else if ( minimunPoints < computerPoints && computerPoints <= 21 || minimunPoints > 21 ) {
        alert('COMPUTER WON')
      }
    }, 100);

  }


  // This function emulates computer behavior in the game
  const computerTurn = ( minimunPoints ) => {
    
    let computerPoints = 0;

    do {

      const card = askForCard()

      computerPoints = collectPoints( card, playersPoints.length - 1 )
      createCard( card, playersPoints.length - 1 )

      if ( minimunPoints > 21 ) {
        break
      }

    } while ( computerPoints < minimunPoints );

    showWinner();

  }

  // Events
  btnAskFor.addEventListener('click', () => {
    
    const card = askForCard()
    const playersPoints = collectPoints( card, 0 )

    createCard( card, 0 )

    if ( playersPoints > 21 ) {
      console.warn( 'I\'m so sorry. You lost' )
      btnAskFor.disabled = true
      btnStop.disabled = true
      computerTurn( playersPoints )
    } else if ( playersPoints === 21 ) {
      console.log( '21, awesome!' )
      btnAskFor.disabled = true
      btnStop.disabled = true
      computerTurn( playersPoints )
    }

  })

  btnStop.addEventListener('click', () => {
    btnAskFor.disabled = true
    btnStop.disabled = true
    computerTurn( playersPoints[0] )
  })

  btnNew.addEventListener('click', () => {

    initializeGame()
    
  })

  return {
    newGame: initializeGame
  }
    
})();