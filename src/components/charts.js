

import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import {Rate,Layout,Menu, Breadcrumb ,Card} from 'antd';
const { Header, Content, Footer} = Layout;
// 数据源
var addjson = [];

class Charts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
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
    }
    countryAnalyze(addjson) {
   /*     let analysis=[{country:"美国",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let eachana of analysis) {
                if(eachana.country === eachitem.country){
                    eachana.movieNumber++;
                    isexist = true;
                }
            }
            if(!isexist) {
            analysis.push({country:eachitem.})
            }

        }*/
    }


    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
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
                        content

                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>)
    }
}
export default Charts


