module.exports = app => {
    const api = app.api.auth;
   
    app
        .route(app.get('authApiUri'))
        .post(api.login);
}