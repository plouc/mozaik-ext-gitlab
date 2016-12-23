import React, { Component, PropTypes } from 'react'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel,
} from 'mozaik/ui'


export default class Project extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        title:   PropTypes.string,
        apiData: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.project.${ project }`,
            params: { project },
        }
    }

    render() {
        const { title: _title, apiData: project, apiError } = this.props

        let body  = <WidgetLoader />
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
                        padding:        '1.6vmin 1.6vmin 0',
                        display:        'flex',
                        flexWrap:       'wrap',
                        justifyContent: 'space-between',
                        alignContent:   'flex-start',
                        width:          '100%',
                        height:         '100%',
                    }}
                >
                    <WidgetLabel
                        label={project.public ? 'public' : 'private'}
                        prefix={<i className={`fa fa-${project.public ? 'unlock' : 'lock'}`} />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label="stars"
                        prefix={project.star_count}
                        suffix={<i className="fa fa-star" />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                    <WidgetLabel
                        label={<a href={`${project.web_url}/forks`} target="_blank">forks</a>}
                        prefix={project.forks_count}
                        suffix={<i className="fa fa-code-fork" />}
                        style={{ width: '48%', marginBottom: '1.6vmin' }}
                    />
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={_title || title}
                    icon="gitlab"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
