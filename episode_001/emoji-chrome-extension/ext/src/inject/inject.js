function* emojiGenerator() {
  const emojis = [
    '🌱',
    '😎 ',
    '👹',
    '🤓',
    '🤯',
    '🐍',
    '🐢 ',
  ]

  let index = 0
  
  while(true) {
    yield emojis[index++ % emojis.length]
  }
}

function getAllElements() {
  const elements = document.querySelectorAll('p, span, a')
  return elements
}

const theEmoji = emojiGenerator()

function replaceElements(elements) {
  // console.log('elements', elements)
  const regularExpression = /the/gi
  elements.forEach(element => {
    element.textContent = element.textContent.replace(regularExpression, theEmoji.next().value)
  })
}

function replaceAllWords() {
  const elements = getAllElements()
  replaceElements(elements)

  setTimeout(() => {
    replaceAllWords()
  }, 1000)
}

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
			
      // the code goes here
      replaceAllWords()

    }
  }, 10)
})
