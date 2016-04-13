import React  from 'react';
import Mozaik from 'mozaik/browser';
import gitlab from 'mozaik-ext-gitlab';


const MozaikComponent = Mozaik.Component.Mozaik;
const ConfigActions   = Mozaik.Actions.Config;

Mozaik.Registry.addExtensions({ gitlab });

React.render(<MozaikComponent/>, document.getElementById('mozaik'));

ConfigActions.loadConfig();
