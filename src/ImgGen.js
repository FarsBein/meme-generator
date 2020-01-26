import React, { Component } from 'react';

class ImgGen extends Component {
    constructor(){
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allImgs: []
        }
    }

    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    allImgs: res.data.memes
                })
            })
            .then(()=>console.log(this.state))
        
    }

    handleClick = (event) => {
        event.preventDefault()
        const rand = Math.floor(Math.random() * this.state.allImgs.length)
        this.setState({
            randomImg: this.state.allImgs[rand].url
        })
    }

    render(){
        return (
            <div>
                <form className='meme-form'>
                    <input type='text' name='topText' value={this.state.topText} onChange={this.handleChange} placeholder='Top Text'/>
                    <input type='text' name='bottomText' value={this.state.bottomText} onChange={this.handleChange} placeholder='Bottom Text'/>
                    <button onClick={this.handleClick}>Generate</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImg} alt=''/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
                    
            </div>
        );
    }
}

export default ImgGen;