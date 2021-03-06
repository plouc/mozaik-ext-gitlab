import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { WidgetListItem, WidgetLabel, WidgetStatusChip, ClockIcon, ExternalLink } from '@mozaik/ui'

export default class JobHistoryItem extends Component {
    static propTypes = {
        project: PropTypes.shape({
            web_url: PropTypes.string.isRequired,
        }).isRequired,
        job: PropTypes.shape({
            id: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            finished_at: PropTypes.string,
            commit: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }

    render() {
        const { project, job } = this.props

        return (
            <div>
                <WidgetListItem
                    title={
                        <span>
                            <ExternalLink
                                href={`${project.web_url}/jobs/${job.id}`}
                                style={{ textDecoration: 'underline' }}
                            >
                                #{job.id}
                            </ExternalLink>
                            &nbsp;
                            <WidgetLabel label={job.ref} prefix="ref" />
                            &nbsp;
                            <WidgetLabel label={job.stage} prefix="stage" />
                            &nbsp;
                            {job.commit && <span>{job.commit.message}</span>}
                        </span>
                    }
                    meta={
                        job.finished_at && (
                            <time
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ClockIcon />
                                &nbsp;
                                {moment(job.finished_at).fromNow()}
                            </time>
                        )
                    }
                    pre={<WidgetStatusChip status={job.status} />}
                />
            </div>
        )
    }
}
