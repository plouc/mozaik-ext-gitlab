import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ExternalLink,
    ActivityIcon,
} from '@mozaik/ui'
import ProjectActivityItem from './ProjectActivityItem'
import { eventPropType } from './propTypes'

export default class ProjectActivity extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.shape({
                name: PropTypes.string.isRequired,
                web_url: PropTypes.string.isRequired,
            }).isRequired,
            events: PropTypes.shape({
                items: PropTypes.arrayOf(PropTypes.shape(eventPropType)).isRequired,
                pagination: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectEvents.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, events } = apiData

            subject = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <Fragment>
                    {events.items.map((event, i) => (
                        <ProjectActivityItem key={`${i}.${event.created_at}`} {...event} />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'activity'}
                    subject={title ? null : subject}
                    icon={ActivityIcon}
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
