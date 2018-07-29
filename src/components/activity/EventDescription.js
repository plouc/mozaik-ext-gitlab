import React, { Component } from 'react'
import { truncate as trunc } from 'lodash'
import { eventPropType } from './propTypes'

const truncate = str => trunc(str, { length: 84 })

export default class EventDescription extends Component {
    static propTypes = eventPropType

    render() {
        const { target_type, target_title, note, push_data } = this.props

        if (target_type === 'Note' || target_type === 'DiffNote') {
            return <div>{truncate(note.body)}</div>
        }

        if (target_type === 'Issue' || target_type === 'MergeRequest') {
            return <div>{truncate(target_title)}</div>
        }

        if (push_data !== undefined) {
            return <div>{truncate(push_data.commit_title)}</div>
        }

        return null
    }
}
