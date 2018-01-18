import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import styles from './MainNav.css'
import LogoSpin from '../../assets/images/LogoSpin.png';
import Logo from '../../assets/images/Logo.png';
import Aux from '../../hoc/Aux/Aux'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  // NavItem
} from 'reactstrap';

import Students from '../../containers/Students/Students'
import Teachers from '../../containers/Teachers/Teachers'
import Lessons from '../../containers/Lessons/Lessons'
import Resources from '../../containers/Resources/Resources'
import LessonResources from '../../containers/LessonResources/LessonResources'

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container>
        <Navbar className={styles.MainNav} light expand="md">
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <Link to='/students/' className={styles.Item}>students</Link>
              <Link to='/teachers/' className={styles.Item}>teachers</Link>
              <Link to='/resources/' className={styles.Item}>resources</Link>
              <Link to='/lessons/' className={styles.Item}>lessons</Link>
              {/* <NavItem><Link to='/lesson_resources/' className={styles.Item}>lessonResources</Link></NavItem> */}
            </Nav>
          </Collapse>
          {/* <NavbarBrand> */}
          <div className="logo-home">
            <Link to='/'>
              music
                <img src={LogoSpin} height="60px" className={styles.LogoSpin} alt="app-logo" />
              studio
              </Link>
          </div>
          {/* </NavbarBrand> */}
          <NavbarToggler onClick={this.toggle} />
        </Navbar >
        <div>
          <Route path="/" exact render={() => (
            <div className={styles.Center}>
              <br />
              <h5>Welcome!</h5>
              <h5>Ready to play some music?</h5>
              <img src={Logo} height="150px" className={styles.Logo} alt="app-logo" /><br />
              <h3>II III II III II III II III II III II III II</h3>
              <div><hr /> <hr /> <hr /> <hr /> <hr /></div>
            </div>
          )} />
          <Route path="/students" component={Students} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/lessons/" component={Lessons} />
          <Route path="/resources" component={Resources} />
          <Route path="/lesson_resources" component={LessonResources} />
        </div>
      </Container >
    );
  }
}

export default MainNav