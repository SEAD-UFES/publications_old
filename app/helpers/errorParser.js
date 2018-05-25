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
        };

        return error;
    }

    return parser;
}