exports.login = (user) => {
    const verifEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
    const email = verifEmail.test(user.email)
    
    const verifPassword = /.{4,}/;
    const password = verifPassword.test(user.password)

    if(email===true && password === true) return true
    if(!email && !password) return "aucun des champs n'est correct"
    if(!password) return 'votre mot de passe et incorect'
    if(!email) return 'votre email et incorect'
}

exports.signup = (user) => {
    const verifEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
    const email = verifEmail.test(user.email)
    
    const verifTaille = /.{4,}/;
    const password = verifTaille.test(user.password)

    const userName = verifTaille.test(user.userName)

    if(email===true && password === true && userName === true) return true
    if(!email && !password) return "aucun des champs n'est correct"
    if(!userName) return 'votre nom et trop court'
    if(!password) return 'votre mot de passe et incorect'
    if(!email) return 'votre email et incorect'
}