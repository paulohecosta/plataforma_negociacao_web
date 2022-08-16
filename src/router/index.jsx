import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import Dump from '../components/dump';
import GiroProposalView from '../pages/GiroProposalView';
import HomeView from '../pages/HomeView';
import NegotiationsView from '../pages/NegotiationsView';
import NotFoundView from '../pages/NotFoundView';
import TasksView from '../pages/TasksView';
import Route from './Route';


export const RPATHS = {
  BASE: '/',
  LOGIN: '/login',
  HOME: '/home',
  NEGOTATIONS: '/negotations',
  TASKS: '/tasks',
  GIRO_PROPOSAL: '/products/giro',
  EXPLORE: '/explore',
  LISTS: '/lists'
}

const Routes = () => (
  <Switch>
    <Redirect exact from={RPATHS.BASE} to={RPATHS.HOME}/>
    <Route path={RPATHS.HOME} exact component={HomeView}/>
    <Route path={RPATHS.NEGOTATIONS} exact component={NegotiationsView}/>
    <Route path={RPATHS.TASKS} exact component={TasksView}/>
    <Route path={RPATHS.GIRO_PROPOSAL} component={GiroProposalView}/>
    <Route path={RPATHS.EXPLORE} exact component={Dump}/>
    <Route path={RPATHS.LISTS} exact component={Dump}/>
    <Route component={NotFoundView} />
  </Switch>
)

export default Routes;