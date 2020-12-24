import React, {Component} from "react";

export default class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            currencyInUsd: true,
        };
    }

    handleClick = () => {
        const {price, currencyInUsd} = this.state;
        const priceInAmd = parseFloat(price) * 500 + "AMD";
        const priceInUsd = parseFloat(price) / 500 + "$";
        this.setState({
            price: (currencyInUsd ? priceInAmd : priceInUsd),
            currencyInUsd: !currencyInUsd,
        })

    }

    render() {
        const {price} = this.state;
        return (
            <div>
                <span>Price: {price}</span>
                <button type="button" onClick={this.handleClick}>Change the currency</button>

            </div>
        )
    }
}
