import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import BuildHistoryItem                from './BuildHistoryItem.jsx';


class BuildHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            builds:  []
        };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectBuilds.${project}`,
            params: { project }
        };
    }

    onApiData({ project, builds }) {
        this.setState({ project, builds });
    }

    render() {
        const { project, builds } = this.state;

        return (
            <div>
                <div className="widget__header">
                    Build history
                    <i className="fa fa-bars" />
                </div>
                <div className="widget__body">
                    {builds.map(build => (
                        <BuildHistoryItem key={build.id} project={project} build={build} />
                    ))}
                </div>
            </div>
        );
    }
}

BuildHistory.displayName = 'BuildHistory';

BuildHistory.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(BuildHistory.prototype, ListenerMixin);
reactMixin(BuildHistory.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildHistory;
