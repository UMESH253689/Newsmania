import React, { Component } from 'react';
import NewsUpdate from './NewsUpdate';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    category: 'general',
  };

  static propTypes = {
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { category } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=f31ef7e839274777bad4cab9e7be6d4e&page=${page}&pageSize=12`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  };

  nextclick = async () => {
    this.setState(
      (state) => ({ page: state.page + 1 }),
      this.fetchNews
    );
  };

  previousclick = async () => {
    this.setState(
      (state) => ({ page: state.page - 1 }),
      this.fetchNews
    );
  };

  render() {
    return (
      <div className="container my-3">
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.previousclick}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.nextclick}
          >
            Next
          </button>
        </div>
        <h2 className="text-center">TOP HEADLINES</h2>
        {this.state.loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
        <div className="row">
          {this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsUpdate
                title={element.title}
                newsUrl={element.url}

                description={element.description ? element.description.slice(0, 100) : ""}
                imageurl={element.urlToImage}
                 
              />
            </div>
          ))}
        </div>
        {this.state.loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.previousclick}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.nextclick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
