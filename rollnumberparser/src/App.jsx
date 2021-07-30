import React from "react";
import "./App.css";
import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      branch: "",
      data: "",
      year: "",
      level: "",
      rollno: "",
      display: false,
    };
  }
  componentDidMount() {
    const fetchdata = async () => {
      try {
        const res = await fetch("http://localhost:80/body");
        const data = await res.json();
        this.setState({
          data: data,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchdata();
  }
  handleChange = (e) => {
    if (e.target.value.length >= 8) {
      this.setState({
        inputValue: e.target.value.toLowerCase(),
        branch:
          typeof this.state.data.find(
            (elem) => elem.acronym === e.target.value.toLowerCase().slice(0, 2)
          ) === "undefined"
            ? null
            : this.state.data.find(
                (elem) => elem.acronym === e.target.value.toLowerCase().slice(0, 2)
              ).name,
        year:
          e.target.value.slice(2, 4) >= 15 && e.target.value.toLowerCase().slice(2, 4) <= 20
            ? e.target.value.slice(2, 4)
            : null,
        level:
          typeof this.state.data.find(
            (elem) => elem.acronym === e.target.value.toLowerCase().slice(4, 5)
          ) === "undefined"
            ? null
            : this.state.data.find(
                (elem) => elem.acronym === e.target.value.toLowerCase().slice(4, 5)
              ).name,
        rollno: e.target.value.toLowerCase().slice(5, 8),
        display: true,
      });
    } else {
      this.setState({
        inputValue: e.target.value.toLowerCase(),
        branch: "",
        year: "",
        level: "",
        rollno: "",
        display: false,
      });
    }
  };
  render() {
    if (this.state.branch && this.state.year && this.state.level) {
      return (
        <div className="container">
          <div className="form">
            <div className="input">
              <input
                type="text"
                name="rollnumber"
                id="rollnumber"
                value={this.state.inputValue}
                onChange={this.handleChange}
                placeholder="Enter your roll number"
              />
            </div>
            <div>
              {this.state.display && (
                <div class="result">
                  <CheckIcon />{" "}
                  <p>
                    {" "}
                    You are doing a {this.state.level} degree in{" "}
                    {this.state.branch} and enrolled in {20 + this.state.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="form">
            <div className="input">
              <input
                type="text"
                name="rollnumber"
                id="rollnumber"
                value={this.state.inputValue}
                onChange={this.handleChange}
                placeholder="Enter your roll number"
              />
            </div>

            {this.state.display && (
              <div className="errors">
                <p>
                  {this.state.branch ? null : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <ErrorIcon /> <p>Enter a valid branch</p>
                    </div>
                  )}
                </p>
                <p>
                  {this.state.year ? null : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <ErrorIcon />{" "}
                      <p>Bruh(in a gender neutral way) Really??</p>
                    </div>
                  )}
                </p>
                <p>
                  {this.state.level ? null : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <ErrorIcon /> <p>Enter a valid degree</p>
                    </div>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default App;
