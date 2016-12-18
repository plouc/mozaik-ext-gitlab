import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    WidgetListItem,
    WidgetLabel,
    WidgetStatusChip,
} from 'mozaik/ui'


class BuildHistoryItem extends Component {
    render() {
        const { project, build } = this.props

        return (
            <div>
                <WidgetListItem
                    title={(
                        <span>
                            <a
                                href={`${project.web_url}/builds/${build.id}`}
                                target="_blank"
                                style={{ textDecoration: 'underline' }}
                            >
                                #{build.id}
                            </a>&nbsp;
                            <WidgetLabel label={build.ref} prefix="ref"/>&nbsp;
                            <WidgetLabel label={build.stage} prefix="stage"/>&nbsp;
                            {build.commit && (
                                <span>{build.commit.message}</span>
                            )}
                        </span>
                    )}
                    meta={build.finished_at && (
                        <time>
                            <i className="fa fa-clock-o" />&nbsp;
                            {moment(build.finished_at).fromNow()}
                        </time>
                    )}
                    pre={<WidgetStatusChip status={build.status}/>}
                />
            </div>
        )
    }
}

BuildHistoryItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    build: PropTypes.shape({
        id:          PropTypes.number.isRequired,
        status:      PropTypes.string.isRequired,
        finished_at: PropTypes.string,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
}


export default BuildHistoryItem
