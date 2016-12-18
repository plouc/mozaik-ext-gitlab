import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import ProjectContributorsItem         from './ProjectContributorsItem'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


class ProjectContributors extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectContributors.${ project }`,
            params: { project }
        }
    }

    render() {
        let { apiData: contributors, apiError } = this.props
        contributors = _.orderBy(contributors.slice(), ['commits'], ['desc'])

        return (
            <div>
                <WidgetHeader
                    title="Project contributors"
                    count={contributors.length}
                    icon="child"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <div>
                            {contributors.map(contributor => (
                                <ProjectContributorsItem
                                    key={`contributor.${contributor.email}`}
                                    contributor={contributor}
                                />
                            ))}
                        </div>
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}

ProjectContributors.propTypes = {
    project:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    apiData:  PropTypes.array.isRequired,
    apiError: PropTypes.object,
}

ProjectContributors.defaultProps = {
    apiData: [],
}


export default ProjectContributors
