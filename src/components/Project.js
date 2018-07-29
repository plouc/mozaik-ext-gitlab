import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel,
    ExternalLink,
    GitlabIcon,
    LockIcon,
    UnlockIcon,
    StarIcon,
    GitBranchIcon,
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
            title = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <div
                    style={{
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
                        prefix={
                            project.public ? (
                                <UnlockIcon size="1.6vmin" />
                            ) : (
                                <LockIcon size="1.6vmin" />
                            )
                        }
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label="stars"
                        prefix={project.star_count}
                        suffix={<StarIcon size="1.6vmin" />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label={<ExternalLink href={`${project.web_url}/forks`}>forks</ExternalLink>}
                        prefix={project.forks_count}
                        suffix={<GitBranchIcon size="1.6vmin" />}
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
