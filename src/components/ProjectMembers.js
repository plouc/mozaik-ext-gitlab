import React, { Component, PropTypes } from 'react'
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
                <div className="widget__header">
                    <span>
                        Project members
                        <span className="widget__header__count">
                            {members.length}
                        </span>
                    </span>
                    <i className="fa fa-child" />
                </div>
                <div className="widget__body">
                    {members.map(member => (
                        <ProjectMembersItem
                            key={`member.${member.id}`}
                            member={member}
                        />
                    ))}
                </div>
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
