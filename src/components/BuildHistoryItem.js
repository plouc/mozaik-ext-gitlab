import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { WidgetListItem, WidgetLabel, WidgetStatusChip } from '@mozaik/ui'

export default class BuildHistoryItem extends Component {
    static propTypes = {
        project: PropTypes.shape({
            web_url: PropTypes.string.isRequired,
        }).isRequired,
        build: PropTypes.shape({
            id: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            finished_at: PropTypes.string,
            commit: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }

    render() {
        const { project, build } = this.props

        return (
            <div>
                <WidgetListItem
                    title={
                        <span>
                            <a
                                href={`${project.web_url}/builds/${build.id}`}
                                target="_blank"
                                style={{ textDecoration: 'underline' }}
                            >
                                #{build.id}
                            </a>&nbsp;
                            <WidgetLabel label={build.ref} prefix="ref" />&nbsp;
                            <WidgetLabel label={build.stage} prefix="stage" />&nbsp;
                            {build.commit &&
                                <span>
                                    {build.commit.message}
                                </span>}
                        </span>
                    }
                    meta={
                        build.finished_at &&
                        <time
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ClockIcon />&nbsp;
                            {moment(build.finished_at).fromNow()}
                        </time>
                    }
                    pre={<WidgetStatusChip status={build.status} />}
                />
            </div>
        )
    }
}
