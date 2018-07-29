import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ExternalLink,
    GitBranchIcon,
} from '@mozaik/ui'
import BranchesItem from './BranchesItem'

export default class Branches extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.shape({
                name: PropTypes.string.isRequired,
                web_url: PropTypes.string.isRequired,
            }).isRequired,
            branches: PropTypes.shape({
                items: PropTypes.array.isRequired,
                pagination: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectBranches.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count = 0
        if (apiData) {
            const { project, branches } = apiData

            count = branches.pagination.total

            subject = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <Fragment>
                    {branches.items.map(branch => (
                        <BranchesItem key={branch.name} project={project} branch={branch} />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Branches'}
                    subject={title ? null : subject}
                    count={count}
                    icon={GitBranchIcon}
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
