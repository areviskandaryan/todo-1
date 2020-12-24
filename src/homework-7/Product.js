import React, {Component} from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";


export default class Product extends Component {

    render() {
        const {name, price, description} = this.props;
        return (
            <>
                <Price price={price}/>
                <Name name={name}/>
                <Description description={description}/>
            </>

        )
    }
}
