'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const buildApiRequest = (path, params) => {
        const url = config.get('gitlab.baseUrl')

        const options = {
            uri: `${url}${path}`,
            qs: {},
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'PRIVATE-TOKEN': config.get('gitlab.token'),
            },
        }

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(chalk.yellow(`[gitlab] calling ${url}${path}${paramsDebug}`))

        if (params) {
            options.qs = params
        }

        return request(options)
    }

    const operations = {
        project({ project }) {
            return buildApiRequest(`/projects/${encodeURIComponent(project)}`).then(res => res.body)
        },
        projectMembers({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(`/projects/${encodeURIComponent(project)}/members`).then(
                    res => res.body
                ),
            ]).then(([project, members]) => ({
                project,
                members,
            }))
        },
        projectContributors({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/repository/contributors`
                ).then(res => res.body),
            ]).then(([project, contributors]) => ({
                project,
                contributors,
            }))
        },
        projectBuilds({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(`/projects/${encodeURIComponent(project)}/builds?per_page=40`).then(
                    res => res.body
                ),
            ]).then(([project, builds]) => ({
                project,
                builds,
            }))
        },
        projectBranches({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/repository/branches`
                ).then(res => res.body),
            ]).then(([project, branches]) => ({
                project,
                branches,
            }))
        },
        projectMergeRequests({ project, query = {} }) {
            return buildApiRequest(
                `/projects/${encodeURIComponent(project)}/merge_requests`,
                query
            ).then(res => {
                return {
                    total: parseInt(res.header['x-total'], 10),
                    results: res.body,
                }
            })
        },
        projectLabels({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(`/projects/${encodeURIComponent(project)}/labels`).then(
                    res => res.body
                ),
            ]).then(([project, labels]) => ({
                project,
                labels,
            }))
        },
    }

    return operations
}

module.exports = client
