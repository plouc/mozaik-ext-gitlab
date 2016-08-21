import React, { Component, PropTypes } from 'react'


class Project extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.project.${ project }`,
            params: { project },
        }
    }

    render() {
        const { apiData: project } = this.props

        if (!project) {
            return null
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
        )
    }
}

Project.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    apiData: PropTypes.object,
}


export default Project
