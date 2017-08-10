// Include React as a dependency
var React = require("react");

// Include the Query and Results components
var Query = require("./search/Query");
var Results = require("./search/Results");

var mapHelpers = require("../utils/mapHelpers");

// Create the Search component
var Search = React.createClass({

  // Here we set the initial state variables
  // (this allows us to propagate the variables for maniuplation by the children components
  // Also note the "resuls" state. This will be where we hold the data from our results
  getInitialState: function() {
    return {
      results: {}
    };
  },

  // This function will be passed down into child components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search
  setQuery: function( search, newStart, fLon, fLat) {
    mapHelpers.getMapData( search, newStart, fLon, fLat).then(function(data) {
      this.setState({ results: { data: data } });
    }.bind(this));
  },

  // Render the component. Note how we deploy both the Query and the Results Components
  render: function() {
    return (
      <div className="main-container">
        <div className="img_news"> <img src={"../img/dog-grooming.jpg"} alt="Blog Image"/> </div>
        <h3><center>Find dog bars and services close to you!</center></h3>
        {/* Note how we pass the setQuery function to enable Query to perform searches */}
        <Query updateSearch={this.setQuery} />
        {/* Note how we pass in the results into this component */}
        <Results results={this.state.results} />
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Search;
