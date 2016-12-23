import React, { Component, PropTypes } from 'react'
import Branch                          from './Branch'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class Branches extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        title:   PropTypes.string,
        apiData: PropTypes.shape({
            project:  PropTypes.object,
            branches: PropTypes.array.isRequired,
        }),
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBranches.${ project }`,
            params: { project }
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body    = <WidgetLoader />
        let subject = null
        let count
        if (apiData) {
            const { project, branches } = apiData

            count = branches.length

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body  = (
                <div>
                    {branches.map(branch => (
                        <Branch key={branch.name} project={project} branch={branch} />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Branches'}
                    subject={title ? null : subject}
                    count={count}
                    icon="code-fork"
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
