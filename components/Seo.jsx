'use strict';
var React = require('react');
var Router= require('react-router');

module.exports = React.createClass({
    mixins:[Router.State],   
    render: function () {
        var handler = this.getRoutes()[0].routes[0].handler;
        return (React.createElement(handler, null));
    }
});