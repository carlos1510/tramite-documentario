import React from 'react'

export default function Header() {
  return (
    <div className="row border-bottom">
      <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        <div className="navbar-header">
          <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#" onClick={e => e.preventDefault()} ><i className="fa fa-bars" /> </a>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li style={{padding: 20}}>
            <span className="m-r-sm text-muted welcome-message"></span>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
              <i className="fa fa-envelope" />  <span className="label label-warning">0</span>
            </a>
            <ul className="dropdown-menu dropdown-messages dropdown-menu-right">
              {/*<li>
                <div className="dropdown-messages-box">
                  <a className="dropdown-item float-left" href="profile.html">
                    <img alt="image" className="rounded-circle" src="img/a7.html" />
                  </a>
                  <div className="media-body">
                    <small className="float-right">46h ago</small>
                    <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br />
                    <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                  </div>
                </div>
              </li>
              <li className="dropdown-divider" />
              <li>
                <div className="dropdown-messages-box">
                  <a className="dropdown-item float-left" href="profile.html">
                    <img alt="image" className="rounded-circle" src="img/a4.html" />
                  </a>
                  <div className="media-body ">
                    <small className="float-right text-navy">5h ago</small>
                    <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br />
                    <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                  </div>
                </div>
              </li>
              <li className="dropdown-divider" />
              <li>
                <div className="dropdown-messages-box">
                  <a className="dropdown-item float-left" href="profile.html">
                    <img alt="image" className="rounded-circle" src="img/profile.html" />
                  </a>
                  <div className="media-body ">
                    <small className="float-right">23h ago</small>
                    <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br />
                    <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                  </div>
                </div>
              </li>
              <li className="dropdown-divider" />
              <li>
                <div className="text-center link-block">
                  <a href="mailbox.html" className="dropdown-item">
                    <i className="fa fa-envelope" /> <strong>Read All Messages</strong>
                  </a>
                </div>
              </li>*/}
            </ul>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
              <i className="fa fa-bell" />  <span className="label label-primary">0</span>
            </a>
            <ul className="dropdown-menu dropdown-alerts">
              {/*<li>
                <a href="mailbox.html" className="dropdown-item">
                  <div>
                    <i className="fa fa-envelope fa-fw" /> You have 16 messages
                    <span className="float-right text-muted small">4 minutes ago</span>
                  </div>
                </a>
              </li>
              <li className="dropdown-divider" />
              <li>
                <a href="profile.html" className="dropdown-item">
                  <div>
                    <i className="fa fa-twitter fa-fw" /> 3 New Followers
                    <span className="float-right text-muted small">12 minutes ago</span>
                  </div>
                </a>
              </li>
              <li className="dropdown-divider" />
              <li>
                <a href="grid_options.html" className="dropdown-item">
                  <div>
                    <i className="fa fa-upload fa-fw" /> Server Rebooted
                    <span className="float-right text-muted small">4 minutes ago</span>
                  </div>
                </a>
              </li>
              <li className="dropdown-divider" />
              <li>
                <div className="text-center link-block">
                  <a href="notifications.html" className="dropdown-item">
                    <strong>See All Alerts</strong>
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
            </li>*/}
            </ul>
          </li>
          <li>
            <a href="login.html">
              <i className="fa fa-sign-out" /> Log out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
