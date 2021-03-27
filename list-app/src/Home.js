import React from "react";
import aditya from "./images/mike-marrah.jpg";
import yadav from "./images/efe-yagiz.jpg";
import "./Home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.userList = this.generatedata();
    this.state = {
      offset: 0,
      users: [],
      isShowLoader: false,
      isAllFetched: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    if (!this.props.location.state) {
      this.logout();
    } else {
      this.getUserList();
    }
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  generatedata = () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        arr.push({ id: i, name: `Aditya${i}`, imgPath: aditya });
      } else {
        arr.push({ id: i, name: `yadav${i}`, imgPath: yadav });
      }
    }
    return arr;
  };

  logout = () => {
    this.props.history.push("/login");
  };

  getUserList = () => {
    const { offset } = this.state;

    const newArray = this.userList.slice(0, offset + 5);
    const isAllFetched = newArray.length === this.userList.length;
    this.setState({
      offset: offset + 5,
      users: newArray,
      isShowLoader: false,
      isAllFetched: isAllFetched,
    });
  };

  handleScroll() {
    const { isShowLoader, isAllFetched } = this.state;
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight && !isShowLoader && !isAllFetched) {
      console.log("end of scroll");
      this.setState(
        {
          isShowLoader: true,
        },
        () => {
          console.log("After setstate");
          setTimeout(() => {
            console.log("Inside Timeout");
            this.getUserList();
          }, 1000);
        }
      );
    }
  }

  render() {
    const { users, isShowLoader, isAllFetched } = this.state;
    const list =
      users.length >= 1
        ? users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <img className="userimg" src={user.imgPath} alt={""} />
              </td>
            </tr>
          ))
        : [];
    console.log("isShowLoader = ", isShowLoader);
    console.log("isAllFetched = ", isAllFetched);
    return (
      <div>
        <div>
          <span className="font-size-20">This is home</span>
          <button className="logout" onClick={this.logout}>
            Logout
          </button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
              </tr>
              {list}
            </tbody>
          </table>
          <div className={isShowLoader ? "loader" : "d-none"}></div>
          <div className={isAllFetched ? "" : "d-none"}>End of user list.</div>
        </div>
      </div>
    );
  }
}

export default Home;
