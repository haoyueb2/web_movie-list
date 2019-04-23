import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { List,Icon ,Input,Rate,Layout,Menu, Breadcrumb } from 'antd';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detail from './detail'
import Charts from './charts'
const Search = Input.Search;
const addjson = [];
const { Header, Content, Footer } = Layout;
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
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><a href={`/`}  > 电影列表</a></Menu.Item>
                        <Menu.Item key="2"><a href={`/charts`}  > 数据可视化</a></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
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
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
            )
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