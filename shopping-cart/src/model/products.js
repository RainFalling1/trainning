import request from "../utils/request";


export default {
    namespace: 'products',
    state: {
        productsList: [],
    },

    effects: {
        *fetchData({ payload }, { call, put }) {
            yield new Promise((resolve) => { setTimeout(resolve,1500); });
            const data = yield call(() => request.get("./data/products.json"));
            yield put({ type: "save", payload: data });
        },
        //筛选商品
        *sortList({ payload }, { call, put }){
            yield new Promise((resolve) => { setTimeout(resolve,400); });
            const data = yield call(() => request.get("./data/products.json"));
            let lastList = [];
            if (payload.type === "size" && payload.key === "ALL"){
                yield put({ type: "save", payload: data });
            }else {
                //通过尺寸筛选
                lastList = data?.productsList?.filter(i => i.availableSizes.find(v => v === payload.key));
                yield put({ type: "save", payload: { productsList: lastList } });
            }

        },
    },

    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data };
        },
        sortByPrice(state, { payload }) {
            const products = [...state.productsList];
            payload.key === "up" ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);
            return { ...state, productsList:products};
        }
    },
};
