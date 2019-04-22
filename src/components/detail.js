import React, { Component } from 'react';
const addjson = []
var currentjson = {}
class Detail extends Component{
    constructor() {
      super()
      this.state = {
        data: {},
        directors:"",
        casts:"",
        writers:"",
        rating:{average:"",rating_people:""},
      }
      }
    componentDidMount() {
      
        fetch("./../films.json")
        .then(res => res.text())
        .then(text => {
          var textstring = text.split('\n')
          for (let currentvalue of textstring) {
            var itemjson = JSON.parse(currentvalue)
            addjson.push(itemjson)
          }
          for(let currentItem of addjson) {
            if(currentItem._id == this.props.match.params.id){
              currentjson = currentItem;
              console.log(currentjson);
              let tepdirect=""
              for(let i of currentjson.directors) {
                tepdirect += i.name;
              }
              let tepcasts=""
              for(let i of currentjson.casts) {
                tepcasts = tepcasts+i.name+"/";
              }
              let tepwriters=""
              for(let i of currentjson.writers) {
                tepwriters = tepwriters+i.name+"/";
              }
              let teprating = {average:"",rating_people:""};
              teprating.average=currentjson.rating.average;
              teprating.rating_people=currentjson.rating.rating_people;
              this.setState({
                data: currentjson,
                directors: tepdirect,
                casts:tepcasts,
                writers:tepwriters,
                rating:teprating,
              }); 
            }
          }
           
        })

  }

    render() {
  
      return (
        <div>
          <h1>{this.state.data.title}</h1>
          <img src = {this.state.data.poster}></img>
          <h2>导演：{this.state.directors}</h2>
          <h2>主演：{this.state.casts}</h2>
          <h2>原著：{this.state.writers}</h2>
          <h2>语言：{this.state.data.languages}</h2>
          <h2>上映日期：{this.state.data.pubdata}</h2>
          <h2>时长：{this.state.data.duration}分钟</h2>
          <h2>评分：{this.state.rating.average}(评分人数{this.state.rating.rating_people}人)</h2>
          <p>剧情梗概：{this.state.data.summary}</p>
        </div>
      )
    }
  }
  export default Detail