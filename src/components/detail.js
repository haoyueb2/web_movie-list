import React, { Component } from 'react';
import {Rate, Layout, Menu, Breadcrumb, Card, Icon} from 'antd';
const { Header, Content, Footer} = Layout;
var addjson = [];
var currentjson = {};
const SubMenu = Menu.SubMenu;
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            directors: "",
            casts: "",
            writers: "",
            rating: { average:1 , rating_people: "" },
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
                for (let currentItem of addjson) {
                    if (currentItem._id === this.props.match.params.id) {
                        currentjson = currentItem;
                        console.log(currentjson);
                        let tepdirect = "";
                        for (let i of currentjson.directors) {
                            tepdirect += i.name;
                        }
                        let tepcasts = "";
                        for (let i of currentjson.casts) {
                            tepcasts = tepcasts + i.name + "/";
                        }
                        let tepwriters = "";
                        for (let i of currentjson.writers) {
                            tepwriters = tepwriters + i.name + "/";
                        }
                        let teprating = { average: 5, rating_people: "" };
                        teprating.average = parseFloat(currentjson.rating.average);
                        teprating.rating_people = currentjson.rating.rating_people;
                        this.setState({
                            data: currentjson,
                            directors: tepdirect,
                            casts: tepcasts,
                            writers: tepwriters,
                            rating: teprating,
                        });
                    }
                }

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
                        <Menu.Item key="1"><a href={`/`}  > <Icon type="bars" />电影列表</a></Menu.Item>
                        <Menu.Item key="2"><a href={`/charts`}  > <Icon type="bar-chart" />数据可视化</a></Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>details</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={{ background: '#fff', padding: 24, minHeight: 280,Align: 'center' }}>
                        <h1>{this.state.data.title}</h1>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={this.state.data.poster} />}
                        >
                        </Card>
                        <h2>导演：{this.state.directors}</h2>
                        <h2>主演：{this.state.casts}</h2>
                        <h3>评分：{this.state.rating.average}(评分人数{this.state.rating.rating_people}人)</h3>
                        <Rate disabled value={this.state.rating.average/2} allowHalf />
                        <h3>上映日期：{this.state.data.pubdata}</h3>
                        <h3>时长：{this.state.data.duration}分钟</h3>
                        <h4>原著：{this.state.writers}</h4>
                        <h4>语言：{this.state.data.languages}</h4>

                        <p>剧情梗概：{this.state.data.summary}</p>

                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    同济大学软件学院Web课lab02 ©2018 Created by 白皓月
                </Footer>
            </Layout>


        )
    }
}
export default Detail