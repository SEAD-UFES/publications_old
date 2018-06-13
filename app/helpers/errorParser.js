module.exports = app => {
    let parser = {};
    let error = {};

    parser.parse = (errorCode, errorObject) => {
        switch(errorCode){
            case 'users-1':
                error = {
                    errorCode,
                    moreInfo: app.get('errorsUri') + '/' + errorCode,
                    userMessage: 'Erro no cadastro: Informações do usuário não foram enviadas corretamente.',
                    devMessage: 'Body does not contains an user object.'
                };
                break;
            case 'auth-1':
                error = {
                    errorCode,
                    moreInfo: app.get('errorsUri') + '/' + errorCode,
                    userMessage: 'Erro na autenticação: Erro interno do servidor.',
                    devMessage: errorObject
                };
                break;
            case 'auth-2':
                error = {
                    errorCode,
                    moreInfo: app.get('errorsUri') + '/' + errorCode,
                    userMessage: 'Erro na autenticação: ' + errorObject.message,
                    devMessage: errorObject
                };
                break;
        };

        return error;
    }

    return parser;
}