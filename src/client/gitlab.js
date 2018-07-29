'use strict'

const chalk = require('chalk')

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
exports.paginationFromHeaders = headers => ({
    total: Number(headers['x-total']),
    page: Number(headers['x-page']),
    pages: Number(headers['x-total-pages']),
    perPage: Number(headers['x-per-page']),
    previousPage: Number(headers['x-prev-page']),
    nextPage: Number(headers['x-next-page']),
})

class GitLab {
    constructor(baseUrl, token, request, logger) {
        this.baseUrl = baseUrl
        this.token = token
        this.request = request
        this.logger = logger
    }

    makeRequest(path, qs) {
        const uri = `${this.baseUrl}${path}`

        const options = {
            uri,
            qs,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'PRIVATE-TOKEN': this.token,
            },
        }

        const paramsDebug = qs ? ` ${JSON.stringify(qs)}` : ''
        this.logger.info(chalk.yellow(`[gitlab] calling ${uri}${paramsDebug}`))

        return this.request(options)
    }

    getProject(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}`).then(res => res.body)
    }

    getProjectMembers(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}/members`).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectContributors(projectId) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/repository/contributors`
        ).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectJobs(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}/jobs`, {
            per_page: 40,
        }).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectBranches(projectId) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/repository/branches`
        ).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectMergeRequests(projectId, query = {}) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/merge_requests`,
            query
        ).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectLabels(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}/labels`).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    getProjectMilestones(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}/milestones`).then(
            res => ({
                items: res.body,
                pagination: exports.paginationFromHeaders(res.headers),
            })
        )
    }

    getProjectEvents(projectId) {
        return this.makeRequest(`/projects/${encodeURIComponent(projectId)}/events`).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }
}

exports.Gitlab = GitLab
