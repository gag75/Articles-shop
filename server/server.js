import bodyParser from 'body-parser'
import * as UserController from './controllers/userController'
import * as ArticlesController from './controllers/articlesController'
import * as CategoriesController from './controllers/categoriesController'
import * as BasketController from './controllers/basketController'
const jsonParser = bodyParser.json();

export function App(app, express) {
    app.use(jsonParser);

    app.post('/user', UserController.create);
    app.post('/user/auth', UserController.auth);
    app.post('/user/authHash', UserController.authHash);
    app.post('/user/existenceName', UserController.existenceName);
    app.post('/user/existenceEmail', UserController.existenceEmail);
    app.post('/user/setHashResetPass', UserController.setHashResetPass);
    app.post('/user/setNewPassByHash', UserController.setNewPassByHash);
    app.post('/user/hasHashResetPass', UserController.hasHashResetPass);
    app.post('/user/changePassHash', UserController.changePassHash);
    app.post('/user/changeNameHash', UserController.changeNameHash);
    app.post('/articles/search', ArticlesController.search);
    app.post('/articles/item', ArticlesController.item);
    app.post('/articles/addArticle', ArticlesController.addArticle);
    app.post('/articles/showListAdmin', ArticlesController.showListAdmin);
    app.post('/categories/show', CategoriesController.show);
    app.post('/categories/create', CategoriesController.create);
    app.post('/categories/update', CategoriesController.update);
    app.post('/categories/delete', CategoriesController.deleteCategories);
    app.post('/basket/buy', BasketController.buy);
    app.post('/basket/articleAdminOk', BasketController.articleAdminOk);
    app.post('/basket/articleAdminCancel', BasketController.articleAdminCancel);
    app.use('/image', express.static('../images'));
}