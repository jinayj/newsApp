import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  

  constructor() {
    super();
    console.log("constructor");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("cdn");
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f0db7ad9588f4c719a4583e54b50c929&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults });
    console.log(parsedData);
  }

  handlePrevious = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f0db7ad9588f4c719a4583e54b50c929&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  handleNext = async () => {
    console.log("Next");
    
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f0db7ad9588f4c719a4583e54b50c929&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row ">
          { this.state.articles?.map((element) => {
            return (
              <div className="col md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0,80) : ""}
                  description={element.description ? element.description.slice(0,100) : ""}
                  newsUrl={element.url}
                  imageUrl={element.urlToImage}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            );
          })}
        </div>
        <dic className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            &larr;Previous
          </button>
          <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>
            Next &rarr;
          </button>
        </dic>
      </div>
    );
  }
}

export default News;
