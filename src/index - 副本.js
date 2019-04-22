import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css';
import { Button} from 'antd';
class LikeButton extends Component {
  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    var addjson =[]
    this.setState({
      isLiked: !this.state.isLiked
    })
    fetch("./films.json")
     .then(res => res.text())
     .then(text => {
       //console.log(text)
       var textstring = text.split('\n')
       for ( let currentvalue of textstring) {
        var itemjson = JSON.parse(currentvalue)
        addjson.push(itemjson)
       }
       console.log(addjson)})
  }

  render () {
    return (
      <Button type='danger' onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? '取消' : '点赞'} 👍
      </Button>
    )
  }
}
class Index extends Component {
    render () {
      return (
        <div>
          <LikeButton />
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <Index />,
    document.getElementById('root')
  
  )
  

