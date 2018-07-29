import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetListItem, WidgetAvatar, ExternalLink } from '@mozaik/ui'

export default class ProjectMembersItem extends Component {
    static propTypes = {
        member: PropTypes.shape({
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            avatar_url: PropTypes.string,
            web_url: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
        }).isRequired,
    }

    render() {
        const {
            member: { name, username, avatar_url, web_url, state },
        } = this.props

        let avatar = null
        if (avatar_url) {
            avatar = (
                <WidgetAvatar size="3vmin">
                    <img src={avatar_url} alt={name} />
                </WidgetAvatar>
            )
        }

        return (
            <WidgetListItem
                title={<ExternalLink href={web_url}>{name}</ExternalLink>}
                href={web_url}
                pre={avatar}
                meta={`@${username} - ${state}`}
                align="top"
            />
        )
    }
}
