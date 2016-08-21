import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import ProjectContributorsItem         from './ProjectContributorsItem'


class ProjectContributors extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectContributors.${ project }`,
            params: { project }
        }
    }

    render() {
        let { apiData: contributors } = this.props
        contributors = _.orderBy(contributors.slice(), ['commits'], ['desc'])

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
        )
    }
}

ProjectContributors.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    apiData: PropTypes.array.isRequired,
}

ProjectContributors.defaultProps = {
    apiData: [],
}


export default ProjectContributors
