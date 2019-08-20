import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetListItem,
    ExternalLink,
} from '@mozaik/ui'

export default class ProjectMilestones extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object.isRequired,
            milestones: {
                items: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        title: PropTypes.string.isRequired,
                        state: PropTypes.string.isRequired,
                        due_date: PropTypes.string.isRequired,
                    })
                ).isRequired,
                pagination: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
            },
        }),
        apiError: PropTypes.object,
    }
    static getApiRequest({ project, client = 'default' }) {
        return {
            id: `gitlab.projectMilestones.${client}.${project}`,
            params: { project, client },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count
        if (apiData) {
            const { project, milestones } = apiData

            count = milestones.pagination.total

            subject = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <Fragment>
                    {milestones.items.map(milestone => (
                        <WidgetListItem
                            key={`milestone.${milestone.id}`}
                            title={milestone.title}
                            meta={milestone.due_date}
                            post={milestone.state}
                        />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Milestones'}
                    subject={title ? null : subject}
                    count={count}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
