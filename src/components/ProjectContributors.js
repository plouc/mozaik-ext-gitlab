import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader, UsersIcon } from '@mozaik/ui'
import ProjectContributorsItem from './ProjectContributorsItem'

export default class ProjectContributors extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object.isRequired,
            contributors: {
                items: PropTypes.array.isRequired,
                pagination: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
            },
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

            const sortedContributors = _.orderBy(contributors.items.slice(), ['commits'], ['desc'])

            count = contributors.pagination.total

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <Fragment>
                    {sortedContributors.map(contributor => (
                        <ProjectContributorsItem
                            key={`contributor.${contributor.email}`}
                            contributor={contributor}
                        />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Contributors'}
                    subject={title ? null : subject}
                    count={count}
                    icon={UsersIcon}
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
