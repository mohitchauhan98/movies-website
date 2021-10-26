import axios from "axios";
import React, { Component } from "react";
import "./styles.css";
import styles from "./mo.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filterMovies: []
    };
  }

  searchedMovies(value) {
    const { filterMovies } = this.state;
    const searchedMovies = filterMovies.filter((item) =>
      item.Title.toLowerCase().includes(value)
    );
    this.setState({ movies: searchedMovies });
  }

  componentDidMount() {
    axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war").then((res) => {
      this.setState({ movies: res.data.Search, filterMovies: res.data.Search });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.movies.length > 0) {
      return true;
    } else return false;
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <div className={styles.mainContainer}>
          <h1>Movies</h1>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchBox}
              type="text"
              placeholder="Search here for a Movie..."
              onChange={(e) => this.searchedMovies(e.target.value)}
            />
          </div>
          <div className={styles.moviesContainer}>
            {movies.length
              ? movies.map((item) => <MovieCards item={item} />)
              : ""}
          </div>
        </div>
      </>
    );
  }
}
export default App;

class MovieCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: false,
      activeCardId: null
    };
  }
  render() {
    return (
      <>
        <div
          key={this.props.item.imdbID}
          className={styles.moviesCards}
          onClick={() => this.setState({ activeCard: !this.state.activeCard })}
        >
          <img
            className={styles.moviePoster}
            src={this.props.item.Poster}
            alt={this.props.item.Title}
          />
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>{this.props.item.Title}</h4>
          </div>
        </div>
      </>
    );
  }
}
