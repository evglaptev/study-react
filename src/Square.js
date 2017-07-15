import * as React from "react";
import './Square.css';
class Square extends React.Component{
    constructor(props){
        super(props);
        this.props = props

    }
    render = () =><button onClick={this.update}>{this.props.value}</button>
update = () => this.props.click(this.props.id)

}

export default Square;