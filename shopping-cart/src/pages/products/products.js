import React, {useEffect, useState} from "react";

import {connect} from "dva";
import {
    Button,
    Row,
    Badge,
    Menu,
    Col,
    Dropdown,
    Layout,
    Spin
} from "antd";
import {
    ShoppingCartOutlined,
    CaretUpOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import ProductCard from "./compnents/productCard";
import CartDrawer from "./compnents/cartDrawer";

const Products = ({dispatch, productsList, loading,cart}) => {
    const {Header, Footer, Sider, Content} = Layout;

    const [selectSize, setSelectSize] = useState("ALL");
    //打开购物车
    const [openCart, setOpenCart] = useState(false);
    const [refresh, setRefresh] = useState(true);

    const [sortType,setSorType] = useState(undefined);

    useEffect(() => {
        initData().then();

    }, []);


    //初始化数据
    const initData = async () => {
        await dispatch({
            type: "products/fetchData",
        });
        setRefresh(false)
    };

    const sortByPrice = async (key) =>{
            await dispatch({
                type: "products/sortByPrice",
                payload: {
                    type: "price",
                    key: key,
                }
            });
    };

    //价格选择排序
    const priceMenu = () => {

        return (
            <Menu>
                <Menu.Item  onClick={() => {
                    setSorType("up")
                    sortByPrice("up")
                }}>up</Menu.Item>
                <Menu.Item  onClick={() => {
                    setSorType("down")
                    sortByPrice("down")
                }}>down</Menu.Item>
            </Menu>
        )
    }



//顶部筛选栏
const sizeButtonArea = () =>
    <Row type="flex" justify="center" align="middle">
        <Dropdown overlay={priceMenu} trigger="click">
            <Button size={"large"} style={{height:36}}>
                {sortType || "price"}
                <CaretDownOutlined/>
            </Button>
        </Dropdown>
        {
            ["ALL", "XS", "S", "M", "ML", "L", "XL", "XXL"].map(
                (i, index) => (
                    <a key={index} className={selectSize === i ? "size-button-select" : "size-button-unselect"}
                       onClick={async () => {
                           setRefresh(true)
                           setSelectSize(i)
                           await dispatch({
                               type: "products/sortList",
                               payload: {
                                   type: "size",
                                   key: i,
                               }
                           });
                           sortByPrice(sortType)
                           setRefresh(false)
                       }}>
                        {i}
                    </a>
                ),
            )
        }

    </Row>;


//右侧的购物车
const cartLogo = () => {
    return (
        <div style={{position: 'fixed', right: 30, zIndex: 100, top: "250px"}}>
            <Badge
                count={cart?.cartsList?.length}
            >
                <ShoppingCartOutlined
                    style={{fontSize: "48px", color: "#fc5c01"}}
                    onClick={() => {
                        setOpenCart(true)
                    }}
                />
            </Badge>
        </div>
    )
};

return (
    <>
        <Layout>
            <Header>
                <h1 style={{color: '#fff', textAlign: 'center', height: "50px"}}>Shopping street</h1>
            </Header>
            {/*购物车*/}
            <CartDrawer openCart={openCart} setOpenCart={setOpenCart}/>
            {cartLogo()}
            <Content style={{flexDirection: 'column', alignItems: 'center', display: 'flex'}}>
                {sizeButtonArea()}
                {refresh ? (
                        <div style={{ textAlign: "center" }}>
                            <Spin />
                        </div>
                    ) :
                <Row>
                    {productsList?.map((i, index) =>
                        // eslint-disable-next-line react/jsx-no-undef
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <ProductCard item={i}/>
                       </Col>
                    )}

                </Row>
                }

            </Content>

        </Layout>

    </>

)
}
;


export default connect(({loading, products, cart}) => ({
    productsList: products.productsList,
    cart: cart,
    loading: loading.effects["data/getData"],
}))(Products);
