import React from 'react';
import './App.css';
import {sampleText}  from './sampleText'
import marked from 'marked'
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {text: sampleText};
    }

    handleChange= (event) => {
        let text= event.target.value;
        this.setState({text:text})
    }
    renderText=(text)=> {
        let html = marked(text,{sanitize:true})
        return {__html: html}
    }

    componentDidMount() {
        const text = localStorage.getItem('text')
        if(text) this.setState({text})
        else this.setState({text: sampleText})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        const {text}= this.state;
        localStorage.setItem('text',text)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                <textarea
                    onChange={this.handleChange}
                    value={this.state.text}
                    className="form-control"
                    rows={35}
                >
                </textarea>
                    </div>
                    <div className="col-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
