

import React, { Component } from 'react';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import {Rate, Layout, Menu, Breadcrumb, Card, Icon} from 'antd';
const { Header, Content, Footer} = Layout;
// 数据源
var addjson = [];
const SubMenu = Menu.SubMenu;
class Charts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            genresNumber: [],
            countryNumber:[],
            languageNumber:[],
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
                    genresNumber:this.genreAnalyze(addjson),
                    countryNumber:this.countryAnalyze(addjson),
                    languageNumber:this.languageAnalyze(addjson),
                });
                console.log(this.state.languageNumber)
            });
    }
    genreAnalyze(addjson) {
        let analysis=[{genre:"剧情",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let eachgen of eachitem.genres) {
                for (let eachana of analysis) {
                    if (eachana.genre === eachgen) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({genre:eachgen,movieNumber:1})
                }
            }
        }
        return analysis;
    }
    countryAnalyze(addjson){
        let analysis=[{country:"美国",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let each of eachitem.countries) {
                for (let eachana of analysis) {
                    if (eachana.country === each) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({country:each,movieNumber:1})
                }
            }
        }
        return analysis;
    }
    languageAnalyze(addjson){
        let analysis=[{language:"英语",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let each of eachitem.languages) {
                for (let eachana of analysis) {
                    if (eachana.language === each) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({language:each,movieNumber:1})
                }
            }
        }
        return analysis;
    }

    searchGenre(value) {
        let searchResult=[];
        for(let eachitem of addjson) {
            for(let eachgen of eachitem.genres) {
                if (eachgen.indexOf(value) !== -1) {
                    searchResult.push(eachitem);
                }
            }
        }
        this.setState({
            data:searchResult
        })
    }
    render() {
        const gerecols = {
            movieNumber: {
                tickInterval: 20
            }
        };
        const countrycols = {
            movieNumber: {
                tickInterval: 10
            }
        };
        const languagecols = {
            movieNumber: {
                tickInterval: 10
            }
        };
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
                        <Menu.Item key="1"><a href={`/web_lab2_movie-list`}  > <Icon type="bars" />电影列表</a></Menu.Item>
                        <Menu.Item key="2"><a href={`/web_lab2_movie-list/#/charts`}  > <Icon type="bar-chart" />数据可视化</a></Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>charts</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Chart height={400} data={this.state.genresNumber} scale={gerecols} forceFit>
                            <Axis name="genre" />
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="genre*movieNumber" color="genre" />
                        </Chart>
                        <Chart height={400} data={this.state.countryNumber} scale={countrycols} forceFit>
                            <Axis name="country" />
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="country*movieNumber" color="country" />
                        </Chart>
                        <Chart height={400} data={this.state.languageNumber} scale={languagecols} forceFit>
                            <Axis name="language" />
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="language*movieNumber" color="language" />
                        </Chart>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    同济大学软件学院Web课lab02 ©2018 Created by 白皓月
                </Footer>
            </Layout>)
    }
}
export default Charts


