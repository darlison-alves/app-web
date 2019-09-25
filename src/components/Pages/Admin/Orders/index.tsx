import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import { OrdersList } from './List';

export default class OrderIndexPage extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='/' component={OrdersList} />
      </Switch>
    );
  }
}
