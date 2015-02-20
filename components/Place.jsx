'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var places        = require('../public/data/places');
var NotFound      = require('./NotFound.jsx');

function findPlace(id) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id) return places[i];
  }
}

var Place = React.createClass({
  statics: {
    willTransitionTo: function (transition, params) {
      if (params.id) {
        transition.redirect("/q/place-" + params.id);
      }
    }
  },

  findId: function findId() {
    if (this.getParams().id) {
      return this.getParams().id;
    } else {
      return this.getPath().split('-')[1];
    }
  },

  render: function () {
    var place = findPlace(this.findId());

    if (!place) return <NotFound />;

    return (
      <DocumentTitle title={ place.name }>
        <div className="place">
          <h2>{ place.name }</h2>
          <img src={ '/images/' + place.id + '.jpg' }/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Place;
