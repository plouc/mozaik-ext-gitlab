import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class Project extends Component {
    constructor(props) {
        super(props);

        this.state = { project: null };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.project.${ project }`,
            params: { project }
        };
    }

    onApiData(project) {
        //console.log(project);
        this.setState({ project });
    }

    render() {
        const { project } = this.state;

        if (project === null) {
            return null;
        }

        return (
            <div>
                <div className="widget__header">
                    <a href={project.web_url} target="_blank">{project.name}</a>
                    <i className="fa fa-info" />
                </div>
                <div className="widget__body">
                    <span className="label__group">
                        <span className="label__addon">
                            <i className={`fa fa-${project.public ? 'unlock' : 'lock'}`} />
                        </span>
                        <span className="label">
                            {project.public ? 'public' : 'private'}
                        </span>
                    </span>
                    <span className="label__group">
                        <span className="label__addon">
                            {project.star_count}
                        </span>
                        <span className="label">stars</span>
                        <span className="label__addon">
                            <i className="fa fa-star" />
                        </span>
                    </span>
                    <a className="label__group" href={`${project.web_url}/forks`} target="_blank">
                        <span className="label__addon">
                            {project.forks_count}
                        </span>
                        <span className="label">forks</span>
                        <span className="label__addon">
                            <i className="fa fa-code-fork" />
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}

Project.displayName = 'Project';

Project.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(Project.prototype, ListenerMixin);
reactMixin(Project.prototype, Mozaik.Mixin.ApiConsumer);


export default Project;
