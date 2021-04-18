
import dva from "dva";
import './index.css';

import products from "./model/products";
import cart from "./model/cart";
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(products);
app.model(cart);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
