import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { WidgetListItem, Text, typography, ClockIcon } from '@mozaik/ui'

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

const CommitSha = styled.a`
    ${props => typography(props.theme, 'mono', 'small')};
`

export default class BranchesItem extends Component {
    static propTypes = {
        project: PropTypes.shape({
            web_url: PropTypes.string.isRequired,
        }).isRequired,
        branch: PropTypes.shape({
            name: PropTypes.string.isRequired,
            protected: PropTypes.bool.isRequired,
            commit: PropTypes.shape({
                id: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
                author_name: PropTypes.string.isRequired,
                committed_date: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }

    render() {
        const { project, branch } = this.props

        // {branch.protected && (<span><i className="fa fa-lock" /> protected</span>)}

        return (
            <WidgetListItem
                title={
                    <Header>
                        <a href={`${project.web_url}/tree/${branch.name}`} target="_blank">
                            <Text variant="strong">{branch.name}</Text>
                        </a>&nbsp;
                        <CommitSha
                            href={`${project.web_url}/commit/${branch.commit.id}`}
                            target="_blank"
                            style={{ textDecoration: 'underline' }}
                        >
                            {branch.commit.id.substring(0, 7)}
                        </CommitSha>
                    </Header>
                }
                meta={
                    <div>
                        <Text variant="small">{branch.commit.message}</Text>
                        <Text
                            variant="small"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ClockIcon />&nbsp;
                            {moment(branch.commit.committed_date).fromNow()}
                        </Text>
                    </div>
                }
            />
        )
    }
}
