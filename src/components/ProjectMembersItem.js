import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui'

export default class ProjectMembersItem extends Component {
    static propTypes = {
        member: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar_url: PropTypes.string,
            web_url: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
        }).isRequired,
    }

    render() {
        const { member: { name, avatar_url, web_url, state } } = this.props

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
                title={
                    <a href={web_url} target="_blank">
                        {name}
                    </a>
                }
                href={web_url}
                pre={avatar}
                meta={state}
            />
        )
    }
}
