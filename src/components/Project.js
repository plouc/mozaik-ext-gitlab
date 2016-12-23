import React, { Component, PropTypes } from 'react'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLabel,
} from 'mozaik/ui'


export default class Project extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        apiData: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.project.${ project }`,
            params: { project },
        }
    }

    render() {
        const { apiData: project } = this.props

        if (!project) return null

        return (
            <Widget>
                <WidgetHeader
                    title={<a href={project.web_url} target="_blank">{project.name}</a>}
                    icon="gitlab"
                />
                <WidgetBody
                    style={{
                        padding:        '1.6vmin 1.6vmin 0',
                        display:        'flex',
                        flexWrap:       'wrap',
                        justifyContent: 'space-between',
                        alignContent:   'flex-start',
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
                </WidgetBody>
            </Widget>
        )
    }
}
