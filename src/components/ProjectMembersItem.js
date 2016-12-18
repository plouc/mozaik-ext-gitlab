import React, { Component, PropTypes }  from 'react'
import { WidgetListItem, WidgetAvatar } from 'mozaik/ui'


class ProjectMembersItem extends Component {
    render() {
        const { member } = this.props

        return (
            <WidgetListItem
                title={member.username}
                href={member.web_url}
                pre={
                    <WidgetAvatar size="3vmin">
                        <img
                            src={member.avatar_url}
                            alt={member.username}
                        />
                    </WidgetAvatar>
                }
                style={{
                    width:        '48%',
                    marginBottom: '1vmin',
                    borderBottom: 0,
                    padding:      0,
                }}
            />
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
