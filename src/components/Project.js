import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GitlabIcon from 'react-icons/lib/fa/gitlab'
import PublicIcon from 'react-icons/lib/fa/unlock'
import PrivateIcon from 'react-icons/lib/fa/lock'
import StarsIcon from 'react-icons/lib/fa/star'
import ForksIcon from 'react-icons/lib/fa/code-fork'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel,
} from '@mozaik/ui'

export default class Project extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.object,
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.project.${project}`,
            params: { project },
        }
    }

    render() {
        const { title: _title, apiData: project, apiError } = this.props

        let body = <WidgetLoader />
        let title = 'Project'
        if (project) {
            title = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <div
                    style={{
                        padding: '1.6vmin 1.6vmin 0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignContent: 'flex-start',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <WidgetLabel
                        label={project.public ? 'public' : 'private'}
                        prefix={project.public ? <PublicIcon /> : <PrivateIcon />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label="stars"
                        prefix={project.star_count}
                        suffix={<StarsIcon />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label={
                            <a href={`${project.web_url}/forks`} target="_blank">
                                forks
                            </a>
                        }
                        prefix={project.forks_count}
                        suffix={<ForksIcon />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader title={_title || title} icon={GitlabIcon} />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
