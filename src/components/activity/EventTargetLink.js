import React, { Component } from 'react'
import { eventPropType } from './propTypes'

export default class EventTargetLink extends Component {
    static propTypes = eventPropType

    render() {
        const { target_type, target_id, target_iid, note, push_data } = this.props

        if (target_type === 'Issue') {
            return (
                <a>
                    {target_type} #{target_iid}
                </a>
            )
        }

        if (target_type === 'MergeRequest') {
            return (
                <a>
                    {target_type} !{target_iid}
                </a>
            )
        }

        if (target_type === 'Note' || target_type === 'DiffNote') {
            if (note.noteable_type === 'Issue') {
                return (
                    <a>
                        {note.noteable_type} #{note.noteable_iid}
                    </a>
                )
            }

            if (note.noteable_type === 'MergeRequest') {
                return (
                    <a>
                        {note.noteable_type} !{note.noteable_iid}
                    </a>
                )
            }
        }

        if (push_data !== undefined) {
            return (
                <a>
                    {push_data.ref_type} {push_data.ref}
                </a>
            )
        }

        return (
            <span>
                {target_type} {target_id} {target_iid}
            </span>
        )
    }
}
