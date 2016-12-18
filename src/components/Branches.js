import React, { Component, PropTypes } from 'react'
import { WidgetHeader, WidgetBody }    from 'mozaik/ui'
import Branch                          from './Branch'


class Branches extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBranches.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: { project, branches } } = this.props

        return (
            <div>
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
            </div>
        )
    }
}

Branches.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    apiData: PropTypes.shape({
        project:  PropTypes.object,
        branches: PropTypes.array.isRequired,
    }).isRequired,
}

Branches.defaultProps = {
    apiData: {
        project:  null,
        branches: [],
    },
}


export default Branches
