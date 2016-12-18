import React, { Component, PropTypes } from 'react'
import { WidgetHeader, WidgetBody }    from 'mozaik/ui'
import BuildHistoryItem                from './BuildHistoryItem'


class BuildHistory extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBuilds.${project}`,
            params: { project }
        }
    }

    render() {
        const { apiData: {  project, builds } } = this.props

        return (
            <div>
                <WidgetHeader
                    title="Build history"
                    icon="bars"
                />
                <WidgetBody>
                    {builds.map(build => (
                        <BuildHistoryItem key={build.id} project={project} build={build} />
                    ))}
                </WidgetBody>
            </div>
        )
    }
}

BuildHistory.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    apiData: PropTypes.shape({
        project: PropTypes.object,
        builds:  PropTypes.array.isRequired,
    }),
}

BuildHistory.defaultProps = {
    apiData: {
        project: null,
        builds:  [],
    },
}


export default BuildHistory
