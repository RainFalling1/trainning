import React, {useState, useEffect} from "react";

import {connect} from "dva";
import {Drawer, InputNumber, Layout, Menu,Popconfirm,message} from "antd";

import {CheckCircleFilled} from '@ant-design/icons';

const CartDrawer = ({openCart, setOpenCart, cart, dispatch}) => {
    const {Footer} = Layout;

    const [isChecked, setIsChecked] = useState(false);
    const [chooseAll, setChooseAll] = useState(false);

    //管理
    const [showDelete, setShowDelete] = useState(false);
    //合计的钱
    const [totalMoney, setTotalMoney] = useState(0);

    const openDrawer = () => {
        console.log('-------------openDrawer------------');

    }

    useEffect(() => {
        initData().then(r =>  getTotal());
    },[]);

    const initData = async () =>{
        await dispatch({
            type: "cart/getData",
        });
    };

    //获得总价钱
    const getTotal = () => {
        // dispatch({
        //     type: "cart/getTotalMoney",
        // });
        let list = cart?.cartsList;
        let money = 0;
        let listSelect = list.filter(i => i.select === true);
        listSelect.map(i => {
            money = (i.price * i.num) + money
        });
        setTotalMoney(money)
    }

    //选中一件商品

    const chooseItem = (item, nextState) => {

        item.select = nextState;
        update(item).then(r => getTotal()
        )
    };

    const update = async (item) => {
        await dispatch({
            type: "cart/updateList",
            payload: item,
        });
    }

    const sizeMenu = (item) => {
        return (
            <Menu>
                {item?.availableSizes.map((item) => (
                    <Menu.Item key={item}>
                        <span>{item}</span>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    const chooseOfAll = (nextState) => {
        dispatch({
            type: "cart/chooseAll",
            payload: nextState,
        });
        getTotal()
        setChooseAll(nextState)
    }

    //宝贝的item
    const cartItem = (item, index) => {
        const selectOne = (e) => {
            // setIsChecked(!isChecked)
        }

        return (
            <div className={"cardItem"} key={index}>
                {
                    item?.select ?
                        <CheckCircleFilled style={{color: '#fc5c01', fontSize: 18}}
                                           onClick={() => chooseItem(item, false)}/> :
                        <CheckCircleFilled style={{color: '#D3D3D3', fontSize: 18}}
                                           onClick={() => chooseItem(item, true)}/>
                }
                <img src={`./data/img/products/${item.sku}_1.jpg`}
                     className={"cartImg"}/>

                <div style={{marginLeft: 25}}>
                    <h5>{item.title}</h5>
                    <label>{item.size}</label>

                    <div style={{flexDirection: 'row', display: 'flex', alignItems: 'flex-end'}}>
                        <label style={{
                            fontWeight: 'bold',
                            color: '#ff2501',
                            fontSize: 18,
                            marginRight: 10
                        }}>{"$" + item?.price?.toFixed(2)}</label>
                        <InputNumber
                            value={item.num}
                            style={{width: 50, height: 30}}
                            onChange={(value) => {
                                item.num = parseInt(value);

                                dispatch({
                                    type: "cart/changeNum",
                                    payload: item,
                                });
                                getTotal();
                            }

                            }
                        />
                    </div>
                </div>


            </div>
        )
    }

    return (
        <Drawer
            closable
            maskClosable
            mask
            visible={openCart}
            onClose={() => {
                setOpenCart(false)
            }}
            width="375"
            height="100%"
        >
            <div style={{height: "100px"}}>
                <div style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h1>购物车</h1>
                    <a onClick={() => setShowDelete(!showDelete)}
                       style={{marginRight: 20, textDecoration: 'none', color: "#333"}}>{showDelete ? "完成" : "管理"}</a>
                </div>

                {
                    cart?.cartsList?.map(
                        (i, index) => {
                            return (
                                <div style={{overflow: 'scroll', paddingBottom: 60, marginTop: 10}}>
                                    {cartItem(i, index)}

                                </div>
                            )
                        }
                    )
                }

                {/*底部结算*/}
                <div className={"cartConfig"}>
                    <div style={{display: 'flex'}}>
                        {
                            chooseAll ?
                                <CheckCircleFilled style={{color: '#fc5c01', fontSize: 18}}
                                                   onClick={() => chooseOfAll(false)}/> :
                                <CheckCircleFilled style={{color: '#D3D3D3', fontSize: 18}}
                                                   onClick={() => chooseOfAll(true)}/>
                        }
                        <label style={{marginLeft: 10, color: "#333"}}>全选</label>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {<label style={{color: "#333"}}>合计：
                            <label style={{color: '#ff2501'}}>{"$" + totalMoney?.toFixed(2)}</label>
                        </label>}
                        {showDelete ?
                            <Popconfirm  onConfirm={() => {
                                if (!totalMoney > 0){
                                    return message.info('请至少选择一项！')
                                }
                                dispatch({type: "cart/delete"});message.info('删除成功');setChooseAll(false);setTotalMoney(0)}} title="确定要删除？">
                               <a className={"deleteCart"}>删除</a>
                            </Popconfirm> :
                            <Popconfirm  onConfirm={() => {
                                if (!totalMoney > 0){
                                    return message.info('请至少选择一项！')
                                }
                                dispatch({type: "cart/delete"});message.info('恭喜你，宝贝结算成功！');setChooseAll(false);setTotalMoney(0)}
                            } title="前往结算？">
                                <a className={cart?.cartsList?.length > 0 ? "goPay" : "goPayNo"}>结算</a>
                            </Popconfirm>
                        }
                    </div>

                </div>

            </div>

        </Drawer>
    )
}

export default connect(({products, cart}) => ({
    cart: cart,
}))(CartDrawer);
