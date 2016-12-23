import React, { Component, PropTypes } from 'react'
import Branch                          from './Branch'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class Branches extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        apiData: PropTypes.shape({
            project:  PropTypes.object,
            branches: PropTypes.array.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        apiData: {
            project:  null,
            branches: [],
        },
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBranches.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: { project, branches } } = this.props

        return (
            <Widget>
                <WidgetHeader
                    title="Project branches"
                    count={branches.length}
                    icon="code-fork"
                />
                <WidgetBody>
                    {branches.map(branch => (
                        <Branch key={branch.name} project={project} branch={branch} />
                    ))}
                </WidgetBody>
            </Widget>
        )
    }
}
