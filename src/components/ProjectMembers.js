import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ExternalLink,
    UsersIcon,
} from '@mozaik/ui'
import ProjectMembersItem from './ProjectMembersItem'

export default class ProjectMembers extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.shape({
                name: PropTypes.string.isRequired,
                web_url: PropTypes.string.isRequired,
            }).isRequired,
            members: PropTypes.shape({
                items: PropTypes.array.isRequired,
                pagination: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        }),
        apiError: PropTypes.object,
    }
    static getApiRequest({ project, client = 'default' }) {
        return {
            id: `gitlab.projectMembers.${client}.${project}`,
            params: { project, client },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count
        if (apiData) {
            const { project, members } = apiData

            count = members.pagination.total

            subject = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <Fragment>
                    {members.items.map(member => (
                        <ProjectMembersItem key={`member.${member.id}`} member={member} />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Members'}
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
