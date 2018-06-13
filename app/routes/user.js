module.exports = app => {
    const api = app.api.user;
    
    app
        .route(app.get('userApiUri'))
        .post(api.create)
        .get(api.list);
    
    app
        .route(app.get('userApiUri')+"me")
        .get(api.me);
}