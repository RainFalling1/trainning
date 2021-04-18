import {connect} from "dva";
import {Button, Card,Menu,Dropdown} from "antd";
import React from "react";
import "../products.css"

const ProductCard = ({item,cartsList,dispatch}) =>{

    //超出部分截去
    const formatName = (str) => {
        if (str.length > 25) {
            return `${str.substr(0, 25)}...`;
        }
        return str;
    };

    const menu = (
        <Menu>
            {item?.availableSizes.map((i,index) => (
                <Menu.Item key={index} onClick={() => {
                    dispatch({
                        type: "cart/add",
                        payload:{
                            item:item,
                            size:i
                        },
                    });
                }}>
                    <span>{i}</span>
                </Menu.Item>
            ))}
        </Menu>
    );

    return(
        <Card style={{ width: 240 ,margin:"10px auto"}} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
                <img alt="example" width="100%" src={`./data/img/products/${item.sku}_1.jpg`} />
            </div>
            <div className="custom-card">
                <h4 style={{overflow:'hide',width:'100%'}}>{formatName(item.title)}</h4>
                <p>{formatName(item.style) || "--"}</p>
                <h2>{'$' + (item.price).toFixed(2)}</h2>
                <Dropdown overlay={menu}  trigger="click" placement="topRight">
                    <Button  style={{ width: "100%",backgroundColor:"#fc5c01",border:"none",color:'#fff' }}>
                        Add to Cart
                    </Button>
                </Dropdown>
            </div>
        </Card>
        // <div style={{width:200,height:50,backgroundColor:"pink",margin:"10px 10px"}}>dsjdjf</div>
    )


};

export default connect(({ products,cart }) => ({
    cartsList: cart.cartsList,
}))(ProductCard);
