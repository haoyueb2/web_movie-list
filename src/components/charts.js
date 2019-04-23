

import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

// 数据源
var addjson = [];

class Charts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        fetch("./films.json")
            .then(res => res.text())
            .then(text => {
                let textstring = text.split('\n');
                for (let currentvalue of textstring) {
                    let itemjson = JSON.parse(currentvalue);
                    addjson.push(itemjson)
                }
                this.setState({
                    data: addjson,
                });
            });
    }
    countryAnalyze(addjson) {
        for(let eachitem of addjson) {

        }
    }


    render() {
        return (  <p>jkk</p>)
    }
}
export default Charts


