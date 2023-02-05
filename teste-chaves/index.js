const brackets = (bracket) => ["(", "[", "{"].includes(bracket);

const getBracket = (endBracket) => {
    let brackets = {
        ')' : '(',
        ']' : '[',
        '}' : '{',
    };
    return brackets[endBracket];
};

const sequenceValid = (sequenceBrackets) => {
  const bracketList = [];

  for (let i = 0; i < sequenceBrackets.length; i++) {
    const bracket = sequenceBrackets[i];

    if (brackets(bracket)) {
        bracketList.push(bracket);
      continue;
    }

    const lastBracket = bracketList.pop();
    if (lastBracket !== getBracket(bracket)) {
        return false
    }
  }

  return bracketList.length === 0;
};

const bracketsForAnalysis = [
    "(){}[]", 
    "[{()}](){}", 
    "[]{()", "[{)]"
];

bracketsForAnalysis.forEach((analysis) =>
  console.log(
    `${analysis}: ${
        sequenceValid(analysis) ? "Válido." : "Não é Válido."
    }`
  )
);