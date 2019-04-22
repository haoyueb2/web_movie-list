import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Icon } from 'antd';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'; 

const addjson = []
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Index extends Component {
 
    constructor() {
        super()
        this.state = {
          data: [],
          loading: false,
          hasMore: true,
          isLiked:true,
        }
      }
      componentWillMount() {
        this.fetchData()
      }
      componentDidMount() {
        this.fetchData()
      }
    
      fetchData () {
        fetch("./films.json")
          .then(res => res.text())
          .then(text => {
            var textstring = text.split('\n')
            for (let currentvalue of textstring) {
              var itemjson = JSON.parse(currentvalue)
              addjson.push(itemjson)
            }
            for (let currentAdd of addjson) {
              var img = new Image();
              img.src = currentAdd.poster;
            }
            this.setState({
              data: addjson,
            });
          })
          console.log(addjson)
      }
  render() {
    return (
        <div>
 
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={this.state.data}
      footer={< div > <b>ant design</b> footer part</div >}
      renderItem={
        item => (
          <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.rating.average}/>]}
          extra={<img width={1} alt="logo" src= {item.poster} />}
        >
            <List.Item.Meta
              avatar={<Avatar shape = "square" size = {150} src={item.poster} width = {100} alt="logo"/>}
              title={item.title}
              description={item.pubdate+"("+item.genres+")             "+"主演："+item.casts[0].name+'/'+item.casts[1].name}
            
            />
            {item.summary}
          </List.Item>)}
    />
    </div>)
  }


}
class About extends Component{
  render() {
    return (
      <div>
        <h2>Index</h2>
        {"Welcome to your Inbox"}
      </div>
    )
  }
}

expaut default Index;