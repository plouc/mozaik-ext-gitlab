import React, { Component, PropTypes } from 'react'
import ProjectMembersItem              from './ProjectMembersItem'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class ProjectMembers extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        title:   PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object.isRequired,
            members: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectMembers.${ project }`,
            params: { project }
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body    = <WidgetLoader />
        let subject = null
        let count
        if (apiData) {
            const { project, members } = apiData

            count = members.length

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <div>
                    {members.map(member => <ProjectMembersItem key={`member.${member.id}`} member={member}/>)}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Members'}
                    subject={title ? null : subject}
                    count={count}
                    icon="child"
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
