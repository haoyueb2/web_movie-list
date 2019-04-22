
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Icon } from 'antd';

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
    componentWillMount1() {
        fetch("./films.json")
      .then(res => res.text())
      .then(text => {
        var textstring = text.split('\n')
        for (let currentvalue of textstring) {
          var itemjson = JSON.parse(currentvalue)
          addjson.push(itemjson)
        }
        
      })
      this.setState({
        data: addjson,
      });
      this.setState((prevState) => {
        return "ok"  // 上一个 setState 的返回是 count 为 0，当前返回 1
      })
      console.log(this.state.data)
      }
      componentWillMount() {
        this.fetchData((myjson) => {
          this.setState({
            data: myjson,
          });
        });
      }    

  fetchData = (callback) => {
    fetch("./films.json")
      .then(res => res.text())
      .then(text => {
        var textstring = text.split('\n')
        for (let currentvalue of textstring) {
          var itemjson = JSON.parse(currentvalue)
          addjson.push(itemjson)
        }
      })
/*       this.setState({
        data: addjson,
      }); */
      callback(addjson)
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
      dataSource={this.state.data}
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
ReactDOM.render(<Index />, document.getElementById('root'));