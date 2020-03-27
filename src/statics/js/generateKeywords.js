/* eslint-disable */

export const generateKeywords = sentence => {
  const normalWordsArray = sentence.toLowerCase().split(' ').filter(word => word.length >= 3)
  const cleanWordsArray = slugify(sentence).split(/[\s\W]/gm).filter(word => word.length >= 3)
  const fullWordsArray = normalWordsArray.concat(cleanWordsArray)

  return removeDuplicates(fullWordsArray).join(' ')
}

function slugify (str) {
  var map = {
      'a' : 'á|à|ã|â|À|Á|Ã|Â',
      'e' : 'é|è|ê|É|È|Ê',
      'i' : 'í|ì|î|Í|Ì|Î',
      'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c' : 'ç|Ç',
      'n' : 'ñ|Ñ'
  }

  str = str.toLowerCase()

  for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern)
  }

  return str
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
}
