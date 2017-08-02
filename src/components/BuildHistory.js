import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bars'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import BuildHistoryItem from './BuildHistoryItem'

export default class BuildHistory extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            builds: PropTypes.array.isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectBuilds.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, builds } = apiData

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <div>
                    {builds.map(build =>
                        <BuildHistoryItem key={build.id} project={project} build={build} />
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Builds'}
                    subject={title ? null : subject}
                    icon={BuildsIcon}
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
