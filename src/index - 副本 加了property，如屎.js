
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Icon } from 'antd';

var addjson = []


class Index extends Component {
 
    constructor(props) {
      super(props)
        this.state = {
          data: props.datap,
          loading: false,
          hasMore: true,
          isLiked:true,
        }

      }
    componentWillMount() {
        console.log(this.props.datap.addjson)
      }
   
  fetchData (){
    fetch("./films.json")
      .then(res => res.text())
      .then(text => {
        var textstring = text.split('\n')
        for (let currentvalue of textstring) {
          var itemjson = JSON.parse(currentvalue)
          addjson.push(itemjson)
        }
        //console.log(addjson)
      })
      this.setState({
        data: addjson,
      });
      console.log(this.state.data)
    }
  render() {
    return (
        <div>
        <button onClick={this.fetchData.bind(this)}>
        {this.state.isLiked ? '取消' : '点赞'} 👍
      </button>
 
    <List 
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={this.props.datap}
      footer={< div > <b>ant design</b> footer part</div >}
      renderItem={
        item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
              title={item.title}
              description={item.summary}
            />
          </List.Item>)}
    />
    </div>)
  }

}
class HigherIndex extends Component {
  constructor() {
    super()
    fetch("./films.json")
    .then(res => res.text())
    .then(text => {
      var textstring = text.split('\n')
      for (let currentvalue of textstring) {
        var itemjson = JSON.parse(currentvalue)
        addjson.push(itemjson)
      }
      //console.log(addjson)
      console.log("ok")
    })
    this.state = {
      data: addjson,
      loading: false,
      hasMore: true,
      isLiked:true,
    }
    console.log(this.state.data)
  }
componentWillMount() {
    //this.fetchData()
  }

fetchData (){
fetch("./films.json")
  .then(res => res.text())
  .then(text => {
    var textstring = text.split('\n')
    for (let currentvalue of textstring) {
      var itemjson = JSON.parse(currentvalue)
      addjson.push(itemjson)
    }
    console.log(addjson)
  })
  this.setState({
    data: addjson,
  });
  console.log(this.state.data)
}
render() {
  fetch("./films.json")
  .then(res => res.text())
  .then(text => {
    var textstring = text.split('\n')
    for (let currentvalue of textstring) {
      var itemjson = JSON.parse(currentvalue)
      addjson.push(itemjson)
    }
    //console.log(addjson)
  })
return (
  <Index datap = {addjson} />
    )
}
}
ReactDOM.render(<HigherIndex/>, document.getElementById('root'));