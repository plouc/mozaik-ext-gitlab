'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

/**
 * @typedef {Object} Pagination
 * @property {number} total
 * @property {number} page
 * @property {number} pages
 * @property {number} perPage
 * @property {number} previousPage
 * @property {number} nextPage
 */

/**
 * @param {object} headers
 * @return {Pagination}
 */
const paginationFromHeaders = headers => ({
    total: Number(headers['x-total']),
    page: Number(headers['x-page']),
    pages: Number(headers['x-total-pages']),
    perPage: Number(headers['x-per-page']),
    previousPage: Number(headers['x-prev-page']),
    nextPage: Number(headers['x-next-page']),
})

/**
 * @param {Mozaik} mozaik
 */
const index = mozaik => {
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
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/members`
                ).then(res => ({
                    items: res.body,
                    pagination: paginationFromHeaders(res.headers),
                })),
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
                ).then(res => ({
                    items: res.body,
                    pagination: paginationFromHeaders(res.headers),
                })),
            ]).then(([project, contributors]) => ({
                project,
                contributors,
            }))
        },
        projectJobs({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/jobs?per_page=40`
                ).then(res => ({
                    items: res.body,
                    pagination: paginationFromHeaders(res.headers),
                })),
            ]).then(([project, jobs]) => ({
                project,
                jobs,
            }))
        },
        projectBranches({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/repository/branches`
                ).then(res => ({
                    items: res.body,
                    pagination: paginationFromHeaders(res.headers),
                })),
            ]).then(([project, branches]) => ({
                project,
                branches,
            }))
        },
        projectMergeRequests({ project, query = {} }) {
            return buildApiRequest(
                `/projects/${encodeURIComponent(project)}/merge_requests`,
                query
            ).then(res => ({
                items: res.body,
                pagination: paginationFromHeaders(res.headers),
            }))
        },
        projectLabels({ project }) {
            return Promise.all([
                operations.project({ project }),
                buildApiRequest(
                    `/projects/${encodeURIComponent(project)}/labels`
                ).then(res => ({
                    items: res.body,
                    pagination: paginationFromHeaders(res.headers),
                })),
            ]).then(([project, labels]) => ({
                project,
                labels,
            }))
        },
    }

    return operations
}

module.exports = index
