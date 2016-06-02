import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
import ProjectContributorsItem         from './ProjectContributorsItem.jsx';


class ProjectContributors extends Component {
    constructor(props) {
        super(props);

        this.state = { contributors: [] };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectContributors.${ project }`,
            params: { project }
        };
    }

    onApiData(contributors) {
        const orderedContributors = _.orderBy(contributors.slice(), ['commits'], ['desc']);
        this.setState({ contributors: orderedContributors });
    }

    render() {
        const { contributors } = this.state;

        return (
            <div>
                <div className="widget__header">
                    Project contributors
                    <span className="widget__header__count">
                        {contributors.length}
                    </span>
                    <i className="fa fa-child" />
                </div>
                <div className="widget__body">
                    {contributors.map(contributor => (
                        <ProjectContributorsItem
                            key={`contributor.${contributor.email}`}
                            contributor={contributor}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

ProjectContributors.displayName = 'ProjectContributors';

ProjectContributors.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(ProjectContributors.prototype, ListenerMixin);
reactMixin(ProjectContributors.prototype, Mozaik.Mixin.ApiConsumer);


export default ProjectContributors;
