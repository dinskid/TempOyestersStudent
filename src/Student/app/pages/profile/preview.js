import React from "react";
import ReactDOM from "react-dom";



class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange} />
        {this.state.file && (
          <div style={{ textAlign: "center" }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )}
        <img style={{ width: "20%" }} className="mt-3" src={this.state.file} />
      </div>
    );
  }
}

export default UploadPreview
