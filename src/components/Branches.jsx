import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import Branch                          from './Branch.jsx';


class Branches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project:  null,
            branches: []
        };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectBranches.${ project }`,
            params: { project }
        };
    }

    onApiData({ project, branches }) {
        this.setState({ project, branches });
    }

    render() {
        const { project, branches } = this.state;

        return (
            <div>
                <div className="widget__header">
                    Project branches
                    <span className="widget__header__count">
                        {branches.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {branches.map(branch => (
                        <Branch key={branch.name} project={project} branch={branch} />
                    ))}
                </div>
            </div>
        );
    }
}

Branches.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(Branches.prototype, ListenerMixin);
reactMixin(Branches.prototype, Mozaik.Mixin.ApiConsumer);


export default Branches;
