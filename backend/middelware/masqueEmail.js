exports.crypte =  (string) => {
    let emailArray = string.split('@').reverse();
   for(let i= 0; i<emailArray.length; i++){
        emailArray[i] = emailArray[i].split('').reverse().join('');
    } 
    emailArray = emailArray.join('arobase');
    emailArray = emailArray.split('');
    
    for(let i = 0; i<emailArray.length; i++){
        emailArray[i] = emailArray[i].charCodeAt();
        emailArray[i] = emailArray[i] + 7 - i;
        emailArray[i] = String.fromCharCode(emailArray[i]);
    }
    console.log(emailArray.join(''))
    let resultat = Buffer.from(emailArray.join(''), 'utf-8');
    resultat = resultat.toString('base64')
    return resultat
}

exports.decrypte = (string) => {
    const buffer = Buffer.from(string, "base64")
    let SString = buffer.toString('utf-8')
    console.log(SString)
    let emailArray = SString.split('')
    
    for(let i = 0; i<emailArray.length; i++){
        emailArray[i] = emailArray[i].charCodeAt();
        emailArray[i] = emailArray[i] - 7 + i;
        emailArray[i] = String.fromCharCode(emailArray[i]);
    }
    emailArray = emailArray.join('')
    emailArray = emailArray.split('arobase').reverse()
    for(let i= 0; i<emailArray.length; i++){
        emailArray[i] = emailArray[i].split('').reverse().join('');
    }
    emailArray = emailArray.join('@')
    return emailArray
}