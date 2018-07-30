import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { WidgetListItem, Text, typography, ClockIcon, ExternalLink } from '@mozaik/ui'

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

        return (
            <WidgetListItem
                title={
                    <Header>
                        <ExternalLink href={`${project.web_url}/tree/${branch.name}`}>
                            <Text variant="strong">{branch.name}</Text>
                        </ExternalLink>
                        &nbsp;
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
                    <Fragment>
                        <Text variant="small">{branch.commit.message}</Text>
                        <Text
                            variant="small"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ClockIcon size="1.8vmin" />
                            &nbsp;
                            {moment(branch.commit.committed_date).fromNow()}
                        </Text>
                    </Fragment>
                }
            />
        )
    }
}
