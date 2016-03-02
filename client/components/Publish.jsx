Publish = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  done() {
    Meteor.call("setState", this.props.podcastId, 99, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
    ReactLayout.render(Result, {podcastId: this.props.podcastId});
  },

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  save() {
    var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    var notes = ReactDOM.findDOMNode(this.refs.notes).value.trim();
    Meteor.call("setup", this.props.podcastId, title, notes, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  // saveImage() {
  //   var bucket = new AWS.S3({params: {Bucket: 'stories-images'}});
  //
  //   var file = ReactDOM.findDOMNode(this.refs.filechooser).value.trim();
  //
  //   if (file) {
  //     this.setState({imageResults: ""});
  //
  //     var _this = this;
  //     var params = {Key: this.props.podcastId, Body: file};
  //     bucket.upload(params, function (err, data) {
  //       _this.setState({imageResults: err ? 'Error' : 'Success'});
  //     });
  //   } else {
  //     this.setState({imageResults: "Nothing to upload"});
  //   }
  // },

  render() {
    return <div className="publish">
      <Header />
      <br></br>
      <br></br>
      <Title podcastId={this.props.podcastId}/>

      <h3>Publish</h3>
      <div>Title : </div>
      <div><input type="text" ref="title" placeholder="Enter title" defaultValue={this.data.podcast && this.data.podcast.title ? this.data.podcast.title : ""}></input></div>
      <div>Notes : </div>
      <div><textarea ref="notes" placeholder="Enter notes" defaultValue={this.data.podcast && this.data.podcast.notes ? this.data.podcast.notes : ""}></textarea></div>
      <input type="submit" value="Save" onClick={this.save}></input>
        <br></br>
        <br></br>
      <button onClick={this.done} className="btn btn-primary">Done</button>
    </div>
  }
});