exports.taille = (string) => {
    const verifTaille = /.{4,}/;
    return verifTaille.test(string)
}

exports.email= (string) => {
    const verifEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
    return verifEmail.test(string)
}