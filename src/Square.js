import * as React from "react";
import './Square.css';
class Square extends React.Component{
    constructor(props){
        super(props);
        this.props = props

    }
    render = () => <div className={`square color_${this.props.value}`}/>
    update = () => this.props.click(this.props.id)

}

export default Square;
