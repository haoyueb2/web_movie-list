

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

// 数据源
const addjson = []

class Charts extends Component{
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }
  componentWillMount() {
      fetch("./films.json")
        .then(res => res.text())
        .then(text => {
          var textstring = text.split('\n')
          console.log(textstring)
          for (let currentvalue of textstring) {
            var itemjson = JSON.parse(currentvalue)
            addjson.push(itemjson)
          }
  
          this.setState({
            data: addjson,
          });
        })
        console.log(addjson)
    }


    render() {
      return (  <p>jkk</p>)
    }
}
export default Charts


