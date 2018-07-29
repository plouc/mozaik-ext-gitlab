import React, { Fragment, Component } from 'react'
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui'
import { eventPropType } from './propTypes'
import EventTargetLink from './EventTargetLink'
import EventDescription from './EventDescription'

export default class ProjectActivityItem extends Component {
    static propTypes = eventPropType

    render() {
        const { action_name, author } = this.props

        return (
            <WidgetListItem
                title={
                    <Fragment>
                        <a href={author.web_url}>{author.name}</a> {action_name}{' '}
                        <EventTargetLink {...this.props} />
                    </Fragment>
                }
                meta={<EventDescription {...this.props} />}
                pre={
                    <WidgetAvatar size="3vmin">
                        <img src={author.avatar_url} alt={author.name} />
                    </WidgetAvatar>
                }
                align="top"
            />
        )
    }
}
