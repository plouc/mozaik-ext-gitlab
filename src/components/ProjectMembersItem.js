import React, { Component, PropTypes } from 'react'


class ProjectMembersItem extends Component {
    render() {
        const { member } = this.props

        return (
            <a className="gitlab__project-members__item" href={member.web_url} target="_blank">
                <span className="gitlab__project-members__item__avatar">
                    <img src={member.avatar_url} alt={member.username} />
                </span>
                {member.username}
            </a>
        )
    }
}

ProjectMembersItem.propTypes = {
    member: PropTypes.shape({
        username:   PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        web_url:    PropTypes.string.isRequired,
    }).isRequired
}


export default ProjectMembersItem
