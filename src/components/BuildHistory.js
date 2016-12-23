import React, { Component, PropTypes } from 'react'
import BuildHistoryItem                from './BuildHistoryItem'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class BuildHistory extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            builds:  PropTypes.array.isRequired,
        }),
    }

    static defaultProps = {
        apiData: {
            project: null,
            builds:  [],
        },
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBuilds.${project}`,
            params: { project }
        }
    }

    render() {
        const { apiData: {  project, builds } } = this.props

        return (
            <Widget>
                <WidgetHeader
                    title="Build history"
                    icon="bars"
                />
                <WidgetBody>
                    {builds.map(build => (
                        <BuildHistoryItem key={build.id} project={project} build={build} />
                    ))}
                </WidgetBody>
            </Widget>
        )
    }
}
