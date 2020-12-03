exports.login = (user) => {
    const verifEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
    const email = verifEmail.test(user.email)
    
    const verifPassword = /.{4,}/;
    const password = verifPassword.test(user.password)

    if(email===true && password === true) return true
    if(!email && !password) return "Aucun des champs n'est correct"
    if(!password) return 'Votre mot de passe est incorrect'
    if(!email) return 'Votre email est incorrect'
}

exports.signup = (user) => {
    const verifEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
    const email = verifEmail.test(user.email)
    
    const verifTaille = /.{4,}/;
    const password = verifTaille.test(user.password)

    const userName = verifTaille.test(user.userName)

    if(email===true && password === true && userName === true) return true
    if(!email && !password) return "Aucun des champs n'est correct"
    if(!userName) return 'Votre nom est trop court'
    if(!password) return 'Votre mot de passe est incorrect'
    if(!email) return 'Votre email est incorrect'
}