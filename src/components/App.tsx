import React from "react";
import {withRouter} from "react-router-dom";

export class App extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.history.location.pathname);
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }

}

export default withRouter(App);
