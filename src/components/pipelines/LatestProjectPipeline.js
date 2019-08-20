import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { truncate } from 'lodash'
import moment from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetBody,
    WidgetLoader,
    ClockIcon,
    GitBranchIcon,
    GitCommitIcon,
    PauseCircleIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    FastForwardIcon,
    ExternalLink,
    WidgetAvatar,
    typography,
} from '@mozaik/ui'

const Container = styled.div`
    display: grid;
    grid-template-columns: 3vmin auto;
    grid-column-gap: 2vmin;
    height: 100%;
    padding-right: 2vmin;
`

const InnerContainer = styled.div`
    padding-top: 1.4vmin;
    display: flex;
    height: 100%;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${props => typography(props.theme, 'default', 'small')};
`

const Footer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`

const Status = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1.7vmin;
`

const InfoItem = styled.div`
    white-space: pre;
    ${props => typography(props.theme, 'default', 'small')};
`

const Stages = styled.div`
    display: grid;
    grid-column-gap: 2px;
`

const Stage = styled.div`
    align-self: end;
    max-width: 36vmin;
    overflow: hidden;
`

const StageLabel = styled.div`
    padding: 0 2vmin 0 1vmin;
    white-space: pre;
    ${props => typography(props.theme, 'default', 'small')};
`

const StageIndicator = styled.div`
    height: 0.6vmin;
    margin-top: 1vmin;
`

export const colorByStatus = (colors, status) => {
    if (status === 'skipped' || status === 'canceled') {
        return colors.unknown
    }

    if (status === 'running' || status === 'pending' || status === 'success_with_error') {
        return colors.warning
    }

    if (status === 'success') {
        return colors.success
    }

    return colors.failure
}

export const iconByStatus = status => {
    if (status === 'success') {
        return CheckCircleIcon
    }

    if (status === 'failed') {
        return AlertCircleIcon
    }

    if (status === 'skipped') {
        return FastForwardIcon
    }

    return PauseCircleIcon
}

export default class LatestProjectPipeline extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        gitRef: PropTypes.string,
        hideCommitMessage: PropTypes.bool.isRequired,
        apiData: PropTypes.shape({
            id: PropTypes.number.isRequired,
            ref: PropTypes.string.isRequired,
            started_at: PropTypes.string.isRequired,
            duration: PropTypes.number,
            status: PropTypes.oneOf([
                'running',
                'pending',
                'success',
                'failed',
                'canceled',
                'skipped',
            ]).isRequired,
            project: PropTypes.shape({
                web_url: PropTypes.string.isRequired,
            }).isRequired,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired,
                web_url: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
            }).isRequired,
            commit: PropTypes.shape({
                id: PropTypes.string.isRequired,
                short_id: PropTypes.string.isRequired,
            }).isRequired,
            stages: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    status: PropTypes.oneOf([
                        'running',
                        'pending',
                        'success',
                        'failed',
                        'success_with_error',
                        'canceled',
                        'skipped',
                        'manual',
                    ]).isRequired,
                })
            ).isRequired,
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        hideCommitMessage: false,
    }
    static getApiRequest({ project, gitRef, client = 'default' }) {
        let id = `gitlab.latestProjectPipeline.${client}.${project}`
        if (gitRef !== undefined) {
            id += `.${gitRef}`
        }

        return {
            id,
            params: { project, ref: gitRef, client },
        }
    }

    render() {
        const { hideCommitMessage, apiData, apiError, theme } = this.props

        let content = <WidgetLoader />
        if (apiData && !apiError) {
            const GlobalIcon = iconByStatus(apiData.status)

            content = (
                <Container>
                    <Status
                        style={{
                            background: colorByStatus(theme.colors, apiData.status),
                            color: theme.colors.background,
                        }}
                    >
                        <GlobalIcon size="2vmin" />
                    </Status>
                    <InnerContainer>
                        <Header>
                            <InfoItem>
                                <ExternalLink
                                    href={`${apiData.project.web_url}/pipelines/${apiData.id}`}
                                >
                                    #{apiData.id}
                                </ExternalLink>{' '}
                                by{' '}
                                <WidgetAvatar
                                    size="2.6vmin"
                                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                >
                                    <img src={apiData.user.avatar_url} alt={apiData.user.name} />
                                </WidgetAvatar>{' '}
                                <ExternalLink href={apiData.user.web_url}>
                                    {apiData.user.name}
                                </ExternalLink>
                            </InfoItem>
                            <InfoItem>
                                <GitBranchIcon
                                    size="1.8vmin"
                                    style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                    }}
                                />{' '}
                                <ExternalLink
                                    href={`${apiData.project.web_url}/commits/${apiData.ref}`}
                                >
                                    {apiData.ref}
                                </ExternalLink>{' '}
                                <GitCommitIcon
                                    size="1.8vmin"
                                    style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                    }}
                                />{' '}
                                <ExternalLink
                                    href={`${apiData.project.web_url}/commit/${apiData.commit.id}`}
                                >
                                    {apiData.commit.short_id}
                                </ExternalLink>
                            </InfoItem>
                            <InfoItem>
                                <ClockIcon
                                    size="1.8vmin"
                                    style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                    }}
                                />{' '}
                                {moment(apiData.started_at).fromNow()}
                            </InfoItem>
                        </Header>
                        <Content>
                            {hideCommitMessage
                                ? ''
                                : truncate(apiData.commit.message, { length: 80 })}
                        </Content>
                        <Footer>
                            <Stages
                                style={{
                                    gridTemplateColumns: apiData.stages.map(() => '1fr').join(' '),
                                }}
                            >
                                {apiData.stages.map(stage => {
                                    const StageIcon = iconByStatus(stage.status)

                                    return (
                                        <Stage key={stage.name}>
                                            <StageLabel>
                                                <StageIcon
                                                    size="1.8vmin"
                                                    style={{
                                                        display: 'inline-block',
                                                        verticalAlign: 'middle',
                                                    }}
                                                    color={colorByStatus(
                                                        theme.colors,
                                                        stage.status
                                                    )}
                                                />{' '}
                                                {stage.name}
                                            </StageLabel>
                                            <StageIndicator
                                                style={{
                                                    background: colorByStatus(
                                                        theme.colors,
                                                        stage.status
                                                    ),
                                                }}
                                            />
                                        </Stage>
                                    )
                                })}
                            </Stages>
                        </Footer>
                    </InnerContainer>
                </Container>
            )
        }

        return (
            <Widget>
                <WidgetBody disablePadding={true} isHeaderless={true}>
                    <TrapApiError error={apiError}>{content}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
