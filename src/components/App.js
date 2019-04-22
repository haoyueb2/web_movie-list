import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Icon } from 'antd';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Detail from './detail'
import Charts from './charts'

const addjson = []
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class Index extends Component {
 
    constructor() {
        super();
        this.state = {
          data: [],
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
    return (
        <div>
          <button onClick={() => this.props.history.push('/charts')}>通过函数跳转</button>
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
          extra={<img width={100} alt="logo" src= {item.poster} />}
        >
            <List.Item.Meta
              //avatar={<Avatar shape = "square" size = {150} src={item.poster} width = {100} alt="logo"/>}
              title={<a href={`/detail/${item._id}`}  >  {item.title}</a>}
              description={item.pubdate+"("+item.genres+")"}
            
            />
            

          </List.Item>)}
    />
    </div>)
  }


}


class RouterIndex extends Component {
  render(){
    return(
    <Router> 
    <Route exact path="/" component={Index} />
    <Route path = "/detail/:id" component={Detail} />
    <Route path = "/charts" component={Charts} />
    </Router>)
  }
}
export default RouterIndex;