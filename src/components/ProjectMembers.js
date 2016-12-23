import React, { Component, PropTypes } from 'react'
import ProjectMembersItem              from './ProjectMembersItem'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class ProjectMembers extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        apiData: PropTypes.array.isRequired,
    }

    static defaultProps = {
        apiData: [],
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectMembers.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: members } = this.props

        return (
            <Widget>
                <WidgetHeader
                    title="Project members"
                    count={members.length}
                    icon="child"
                />
                <WidgetBody
                    style={{
                        padding:        '1.6vmin',
                        display:        'flex',
                        flexWrap:       'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    {members.map(member => (
                        <ProjectMembersItem
                            key={`member.${member.id}`}
                            member={member}
                        />
                    ))}
                </WidgetBody>
            </Widget>
        )
    }
}
