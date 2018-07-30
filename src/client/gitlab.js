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
 * @typedef {Object} PaginationOptions
 * @property {number} [per_page]
 * @property {number} [page]
 */

/**
 * @typedef {Object} PipelineOptions
 * @property {number}                                                      [per_page]
 * @property {number}                                                      [page]
 * @property {'running'|'pending'|'finished'|'branches'|'tags'}            [scope]       - The scope of pipelines, one of: running, pending, finished, branches, tags
 * @property {'running'|'pending'|'success'|'failed'|'canceled'|'skipped'} [status]      - The status of pipelines, one of: running, pending, success, failed, canceled, skipped
 * @property {string}                                                      [ref]         - The ref of pipelines
 * @property {string}                                                      [sha]         - The sha or pipelines
 * @property {boolean}                                                     [yaml_errors] - Returns pipelines with invalid configurations
 * @property {string}                                                      [name]        - The name of the user who triggered pipelines
 * @property {string}                                                      [username]    - The username of the user who triggered pipelines
 * @property {'id'|'status'|'ref'|'user_id'}                               [order_by]    - Order pipelines by id, status, ref, or user_id (default: id)
 * @property {'asc'|'desc'}                                                [sort]        - Sort pipelines in asc or desc order (default: desc)
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

    /**
     * @param {string|number}   projectId
     * @param {PipelineOptions} options
     *
     * @return {Promise<object>}
     */
    getProjectPipelines(projectId, options = {}) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/pipelines`,
            options
        ).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }

    /**
     * @param {string|number} projectId
     * @param {number}        pipelineId
     *
     * @return {Promise<object>}
     */
    getProjectPipeline(projectId, pipelineId) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/pipelines/${pipelineId}`
        ).then(res => res.body)
    }

    /**
     * @param {string|number}     projectId
     * @param {number}            pipelineId
     * @param {PaginationOptions} options
     *
     * @return {Promise<object>}
     */
    getProjectPipelineJobs(projectId, pipelineId, options = {}) {
        return this.makeRequest(
            `/projects/${encodeURIComponent(projectId)}/pipelines/${pipelineId}/jobs`,
            options
        ).then(res => ({
            items: res.body,
            pagination: exports.paginationFromHeaders(res.headers),
        }))
    }
}

exports.Gitlab = GitLab
