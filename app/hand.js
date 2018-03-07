function Hand(cards) {
  this.cards = cards;

	this.rank = function(){
		var result = 'high_card'
		if(this.isPair()){
			result = 'pair'
		}
		if(this.isThreeOfaKind()){
			result = 'threeOfaKind'
		}
		if(this.isFourOfaKind()){
			result = 'fourOfaKind'
		}
		if(this.isTwoPair()){
			result = 'twoPair'
		}
		return result
	}

	this.isPair = function(){
		var highCombination = this.highCombination();
		var result = false
		if(highCombination['count'] == 2){
			result = true
		}
		return result
	}

	this.isThreeOfaKind = function(){
		var highCombination = this.highCombination();
		var result = false
		if(highCombination['count'] == 3){
			result = true
		}
		return result
	}

	this.isFourOfaKind = function(){
		var highCombination = this.highCombination();
		var result = false
		if(highCombination['count'] == 4){
			result = true
		}
		return result
	}

	this.isTwoPair = function(){
		var highCombination = this.highCombination();
		var secondHighCombination = this.secondHighCombination()
		var result = false
		if(highCombination['count'] == 2 && secondHighCombination['count'] == 2){
			result = true
		}
		return result
	}

	this.composeCards = function(){
		var composedCards = this.cards.map(function(card) {
			object = {
				value: card[0],
				suit: card[1]
			};	
		  return object;
		});
		this.cards = composedCards
	}

	this.getDuplicated = function(){
		var duplicated = {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0, 
			'5': 0, 
			'6': 0, 
			'7': 0, 
			'8': 0, 
			'9': 0, 
			'10': 0, 
			'J': 0, 
			'Q': 0, 
			'K': 0, 
			'A': 0
		}
		this.cards.forEach(function(card){
			duplicated[card['value']] += 1;
		});
		return duplicated
	}
	
	this.highCombination = function(){
		var duplicated = this.getDuplicated()
		var keys = Object.keys(duplicated).filter(function(n){ return n != 'undefined' }); ;
		var values = keys.map(function ( key ) { return duplicated[key]; });
		var max = Math.max.apply( null, values );
		var valueIndex = values.indexOf(max);
		var key = keys[valueIndex];
		return {
			card: key,
			count: max
		}		
	}

	this.secondHighCombination = function(){
		var duplicated = this.extractHighCombination()
		var keys = Object.keys(duplicated).filter(function(n){ return n != 'undefined' }); ;
		var values = keys.map(function ( key ) { return duplicated[key]; });
		var max = Math.max.apply( null, values );
		var valueIndex = values.indexOf(max);
		var key = keys[valueIndex];
		return {
			card: key,
			count: max
		}		
	}

	this.extractHighCombination = function(){		
		var duplicated = this.getDuplicated()
		var highCombination = this.highCombination()
		delete duplicated[highCombination['card']]
		return duplicated
	}

}

function randomHand() {
  var cardValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  var suites = ['S', 'C', 'D', 'H']
  var hand = []
  for (i = 0; i < 5; i++) {
    var cardValue = cardValues[Math.floor(Math.random() * cardValues.length)];
    var suit = suites[Math.floor(Math.random() * suites.length)];
    var card = cardValue + suit
    hand.push(card)
  }
  return hand
}

module.exports = {
  hand: Hand, 
  randomHand: randomHand
}