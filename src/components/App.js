import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { List,Icon ,Input,Rate,Layout,Menu, Breadcrumb ,Select} from 'antd';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Detail from './detail'
import Charts from './charts'
const Search = Input.Search;
var addjson = [];
const { Header, Content, Footer} = Layout;
const Option = Select.Option;
var howsearch = "title";
const SubMenu = Menu.SubMenu;
const webBase = 'https://www.mooooon333.cn:5000';
//const webBase = '';
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
            pageNum:10000,
            pageId:1,
            genre:"",
            title:"",
            all:"",
            listContent:"",
        }
    }
    componentWillMount() {
        this.fetchData(1)
    }

    fetchData(page) {
        fetch(webBase+'/api/films/'+page)
            .then(res => res.json())
            .then(json =>  {
                console.log(json);
                addjson = json;
                console.log(addjson);
                this.handleJson();
                this.setState({
                    data: addjson,
                });
            });
    }
    handleJson() {
        for(let tmp of addjson) {
            console.log(tmp);
            for(let tmpIn in tmp) {
                try {
                    tmp[tmpIn] = JSON.parse(tmp[tmpIn]);
                } catch(e) {
                    //console.log("出错"+tmpIn+e);
                }
                //tmp[tmpIn] = tmp[tmpIn].substring(0,tmp[tmpIn].length);
                //console.log(tmp[tmpIn]);
            }
        }
    }
    searchTitle(value) {
        fetch(webBase+'/api/title/'+value)
            .then(res => res.text())
            .then(text=>  {
                console.log(text);
                this.setState({
                    pageNum: text,
                    title:value,
                });
            });
        this.fetchTitleData(value,1);
    }
    fetchTitleData(title,page) {
        fetch(webBase+'/api/title/'+title+'/'+page)
            .then(res => res.json())
            .then(json =>  {
                addjson = json;
                this.handleJson();
                this.setState({
                    data: addjson,
                });
            });
    }
    searchGenre(value) {
        fetch(webBase+'/api/genre/'+value)
            .then(res => res.text())
            .then(text=>  {
                console.log(text);
                this.setState({
                    pageNum: text,
                    genre:value,
                });
            });

        this.fetchGenreData(value,1);
    }
    fetchGenreData(genre,page) {
        fetch(webBase+'/api/genre/'+genre+'/'+page)
            .then(res => res.json())
            .then(json =>  {
                addjson = json;
                this.handleJson();
                this.setState({
                    data: addjson,
                });
                console.log("页调试："+this.state.listContent,this.state.genre);
            });
    }
    searchAll(value) {
        fetch(webBase+'/api/all/'+value)
            .then(res => res.text())
            .then(text=>  {
                console.log(text);
                this.setState({
                    pageNum: text,
                    all:value,
                });
            });

        this.fetchAllData(value,1);
    }
    fetchAllData(all,page) {
        fetch(webBase+'/api/all/'+all+'/'+page)
            .then(res => res.json())
            .then(json =>  {
                addjson = json;
                this.handleJson();
                this.setState({
                    data: addjson,
                });
                console.log("页调试："+this.state.listContent,this.state.genre);
            });
    }


    render() {

        const selectBefore = (
            <Select defaultValue="按标题" style={{ width: 90 }} onChange={value => {
                howsearch = value;
            }}>

                <Option value="title">按标题</Option>
                <Option value="genre">按类别</Option>
                <Option value="all">全文搜索</Option>
            </Select>
        );
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
                        <Menu.Item key="1"><a href={`./`}  > <Icon type="bars" />电影列表</a></Menu.Item>
                        <Menu.Item key="2"><a href={`./#/charts`}  > <Icon type="bar-chart" />数据可视化</a></Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="plus-square" /><span>按类别浏览</span></span>}
                            onClick={(key)=>{
                                console.log(key.key);
                                this.setState({
                                    listContent : "genre",
                                });
                                this.searchGenre(key.key);
                            }}
                        >
                            <Menu.Item key="剧情">剧情</Menu.Item>
                            <Menu.Item key="喜剧">喜剧</Menu.Item>
                            <Menu.Item key="动作">动作</Menu.Item>
                            <Menu.Item key="科幻">科幻</Menu.Item>
                            <Menu.Item key="动画">动画</Menu.Item>
                            <Menu.Item key="惊悚">惊悚</Menu.Item>
                            <Menu.Item key="爱情">爱情</Menu.Item>
                            <Menu.Item key="犯罪">犯罪</Menu.Item>
                            <Menu.Item key="冒险">冒险</Menu.Item>

                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <h1>Movie list</h1>
                        <Search
                            addonBefore={selectBefore}
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={(value) => {
                                this.setState({
                                    listContent : howsearch,
                                });
                                if(howsearch ==="title") {
                                    this.searchTitle(value);
                                } else if(howsearch === "genre") {
                                    this.searchGenre(value);
                                } else if(howsearch === "all") {
                                    this.searchAll(value);
                                }
                            }}
                        />
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    if(this.state.listContent === "") {
                                        this.fetchData(page);
                                    } else if(this.state.listContent === "genre") {
                                        this.fetchGenreData(this.state.genre, page);
                                    } else if(this.state.listContent === "title") {
                                        this.fetchTitleData(this.state.title, page);
                                    }
                                    this.setState({
                                        pageId : page
                                    });
                                    console.log(page);
                                },
                                pageSize: 10,
                                total : this.state.pageNum,
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
                                            title={<a href={`./#/detail/${item._id}`}  >  {item.title}</a>}
                                            description={item.pubdate+"("+item.genres+")"}
                                        />
                                    </List.Item>)}
                        />
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    同济大学软件学院Web课lab03 ©2018 Created by 白皓月
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