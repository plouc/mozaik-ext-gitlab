import React, { Component, PropTypes } from 'react'
import { WidgetHeader, WidgetBody }    from 'mozaik/ui'
import ProjectMembersItem              from './ProjectMembersItem'


class ProjectMembers extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectMembers.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: members } = this.props

        return (
            <div>
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
            </div>
        )
    }
}

ProjectMembers.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    apiData: PropTypes.array.isRequired,
}

ProjectMembers.defaultProps = {
    apiData: [],
}


export default ProjectMembers
