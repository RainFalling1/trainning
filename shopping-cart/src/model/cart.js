export default {
    namespace: "cart",

    state: {
        //多一个num属性，size属性，select属性
        cartsList: [
        //     {
        //     "id": 12,
        //     "sku": 12064273040195392,
        //     "title": "Cat Tee Black T-Shirt",
        //     "description": "4 MSL",
        //     "availableSizes": ["S", "XS"],
        //     "style": "Black with custom print",
        //     "price": 10.9,
        //     "installments": 9,
        //     "currencyId": "USD",
        //     "currencyFormat": "$",
        //     "num":1,
        //     "size":"XS",
        //     "isFreeShipping": true
        // }
        ],
        totalMoney:0,
    },


    effects: {

    },

    reducers: {
        getData(state, { payload }) {
            const data = localStorage.getItem("cart");
            if (data) {
                return { cartsList: JSON.parse(localStorage.getItem("cart")) };
            }
            return { cartsList: [] };
        },
        add(state, { payload }) {
            let currentItem = {...payload.item,size:payload.size,select:false};
            //检查list里面有无一样型号的衣服
            let list = state.cartsList;
            const index = state.cartsList.findIndex(i => i.id === currentItem.id && i.size === currentItem.size);
            if (index > -1){
                //you
                list[index].num ++;
            }else {
                currentItem = {...currentItem,num:1};
                list.push(currentItem);
            }

            const json = JSON.stringify(list);
            localStorage.setItem("cart", json);

            return {...state, cartsList: list };
        },

        changeNum(state, { payload }) {
            // if (payload.num <= 0){
            //
            // }
            const item = payload;
            let list = state.cartsList;
            const index = state.cartsList.findIndex(i => i.id === item.id && i.size === item.size);
            list.splice(index,1,item);//替换
            if (item.num <=0){
                list.splice(index,1);//直接删除了
            }
            const json = JSON.stringify(list);
            localStorage.setItem("cart", json);
            return {...state,  cartsList: list };

        },


        //更新状态
        updateList(state, { payload }) {
            const item = payload;
            let list = state.cartsList;
            const index = state.cartsList.findIndex(i => i.id === item.id && i.size === item.size);
            list.splice(index,1,item);//替换
            const json = JSON.stringify(list);
            localStorage.setItem("cart", json);
            return {...state,  cartsList: list };

        },

        getTotalMoney(state, { payload }) {

            let list = state.cartsList;
            let money = 0;
            let listSelect = list.filter(i => i.select === true);
            listSelect.map(i => {
                money = (i.price * i.num) + money
            })
            return {...state,totalMoney: money}

        },

        chooseAll(state, { payload:value }) {
            let list = state.cartsList;
            for (let i =0;i < list.length;i++){
                list[i].select = value;
            }
            return {...state,cartsList: list}

        },

        //清除
        delete(state, { payload }) {
            let list = state.cartsList;
            //未选中的保存
            let listSelect = list.filter(i => i.select === false);
            if (listSelect.length === 0){
                localStorage.removeItem("cart")
            }else {
                const json = JSON.stringify(listSelect);
                localStorage.setItem("cart", json);
            }

            return {...state,cartsList: listSelect}
        },

        //结算
        goToPay(state, { payload }) {
            // localStorage.setItem("cart", []);
            return {...state,cartsList: []}
        },
    },
};
