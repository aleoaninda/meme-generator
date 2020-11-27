import React from "react"

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.genImage = this.genImage.bind(this)
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            })
    }
    
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    
    genImage(){
        this.setState(prevState => {
            const index = Math.floor(Math.random() * prevState.allMemeImgs.length)
            return({randImage: prevState.allMemeImgs[index].url})
        })
        //console.log(Math.floor(Math.random() * this.state.allMemeImgs.length))
    }
    
    render(){
        return(
            <div>
                <form className="meme-form">
                    <input 
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button type="button" onClick={this.genImage}>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator