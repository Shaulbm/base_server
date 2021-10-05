export class Routes {
    static init(router: Router) {
        router.route('/')
            .get('/', (req, res) => {
                res.sendFile('index.html', { root: __dirname })
            });
    }
}