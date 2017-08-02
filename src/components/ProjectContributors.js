import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ContributorsIcon from 'react-icons/lib/fa/child'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import ProjectContributorsItem from './ProjectContributorsItem'

export default class ProjectContributors extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object.isRequired,
            contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectContributors.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count
        if (apiData) {
            const { project, contributors } = apiData

            const sortedContributors = _.orderBy(contributors.slice(), ['commits'], ['desc'])

            count = contributors.length

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <div>
                    {sortedContributors.map(contributor =>
                        <ProjectContributorsItem
                            key={`contributor.${contributor.email}`}
                            contributor={contributor}
                        />
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Contributors'}
                    subject={title ? null : subject}
                    count={count}
                    icon={ContributorsIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
