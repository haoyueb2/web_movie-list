import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Icon ,Input,Rate} from 'antd';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detail from './detail'
import Charts from './charts'
const Search = Input.Search;
const addjson = [];
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Index extends Component {

    constructor(props) {
        super(props);
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
                let textstring = text.split('\n');
                for (let currentvalue of textstring) {
                    let itemjson = JSON.parse(currentvalue);

                    addjson.push(itemjson)
                }

                this.setState({
                    data: addjson,
                });
            });
        console.log(addjson)
    }
    searchTitle(value) {
        let searchResult=[];
        for(let eachitem of addjson) {
            if(eachitem.title.indexOf(value) !== -1) {
                searchResult.push(eachitem);
            }
        }
        this.setState({
            data:searchResult
        })

    }
    render() {
        return (

            <div>
                <h1>Movie list</h1>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => this.searchTitle(value)}
                />
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
                    footer={< div > <b>movie</b> list</div >}
                    renderItem={
                        item => (
                            <List.Item
                                key={item.title}
                                actions={[<Rate disabled defaultValue={parseFloat(item.rating.average)/2}
                                                allowHalf tooltips={[item.rating.average,item.rating.average,item.rating.average,item.rating.average,item.rating.average]}/>,
                                    <IconText type="edit" text={item.rating.average+"分"}/>,
                                    <IconText type="user" text={item.rating.rating_people}/>]}
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